import {
  type Color,
  type Override,
  type RawColor,
  type ScheduleEntry,
} from '@aquarium/shared';
import equal from 'fast-deep-equal';

import { getColors, getOverride, getSchedule } from './db/db.ts';
import { logger } from './logging.ts';

const UPDATE_INTERVAL = 100;
const OVERRIDE_TRANSITION_TIME = 5_000;
const GREEN_HUE = 110;

const DEFAULT_COLOR: RawColor = {
  h: 0,
  s: 0,
  v: 0,
};

let schedule = getSchedule();
let override = getOverride();
let colors: Color[] = getColors();

/* ---- Animation ---- */

// Animation state
let previousColor: RawColor = DEFAULT_COLOR;
let currentColor: RawColor = DEFAULT_COLOR;
let targetColor: RawColor = DEFAULT_COLOR;
let transitionStartTime: number = 0;
let transitionEndTime: number = 0;
let scheduleTimeout: NodeJS.Timeout | undefined;

// This function computes the target color from the previous color, taking into
// account when lights are off.
function setTargetColor(nextColor: Color) {
  logger.debug(`Setting target color to ${nextColor.name}`);

  // Compute the actual next color
  if (currentColor.v === 0) {
    // If we're currently off, override the previous color with the next color
    // except for it's value so we don't mix colors on the fade in. For example,
    // if we do the sequence day -> off -> night, we'd get a weird black -> red
    // -> blue fade in, but we want just a black -> blue -> blue fade in
    previousColor = {
      h: nextColor.h,
      s: nextColor.s,
      v: 0,
    };
    targetColor = nextColor;
  } else if (nextColor.v === 0) {
    previousColor = currentColor;
    // If we're going to off, override the target color with the previous color
    // except for it's value so we don't mix colors on the fade out, similar to
    // the fade in case
    targetColor = {
      h: previousColor.h,
      s: previousColor.s,
      v: 0,
    };
  } else {
    // Otherwise, we do a standard transition between colors
    previousColor = currentColor;
    targetColor = nextColor;
  }
}

function setTransitionTimes(startTime: number, duration: number) {
  logger.debug(
    `Setting transition times: start=${new Date(startTime).toLocaleTimeString()}, duration=${duration}ms`
  );
  transitionStartTime = startTime;
  transitionEndTime = startTime + duration;
}

const lightColorChangedCallbacks: ((color: RawColor) => void)[] = [];
export function onLightColorChanged(cb: (color: RawColor) => void) {
  lightColorChangedCallbacks.push(cb);
}

// This sets the current color, aka updating the actual color of the LED strip
function setCurrentColor(color: RawColor) {
  currentColor = color;

  // TODO: send to strip, but only if we're on the raspberry pi

  // Notify listeners
  lightColorChangedCallbacks.forEach((cb) => {
    cb(color);
  });
}

export function getCurrentColor() {
  return currentColor;
}

function loop() {
  const now = Date.now();
  if (now > transitionEndTime) {
    // Handle edge case where we don't _quite_ reach the target color by the end
    // of the transition.
    if (!equal(currentColor, targetColor)) {
      setCurrentColor(targetColor);
    }
  } else {
    const progress =
      (now - transitionStartTime) / (transitionEndTime - transitionStartTime);

    // We always want to avoid green, if possible. To do so, we need to consider
    // four possibilities:
    // - both are less than:
    //   - previous < next: increase
    //   - previous > next: decrease
    // - previous < green (red), next > green (blue)
    //   - decrease, wraparound 360 degrees
    // - previous > green (blue), next < green (red)
    //   - increase, wraparound 360 degrees
    // - both are > green
    //   - previous < next: increase
    //   - previous > next: decrease

    let currentHue: number;
    if (previousColor.h === targetColor.h) {
      // Same hue, no transition needed
      currentHue = previousColor.h;
    } else {
      // Determine direction based on avoiding green
      let shouldIncrease: boolean;
      if (previousColor.h < GREEN_HUE && targetColor.h < GREEN_HUE) {
        // Both less than green: direct path
        shouldIncrease = previousColor.h < targetColor.h;
      } else if (previousColor.h > GREEN_HUE && targetColor.h > GREEN_HUE) {
        // Both greater than green: direct path
        shouldIncrease = previousColor.h < targetColor.h;
      } else if (previousColor.h < GREEN_HUE && targetColor.h > GREEN_HUE) {
        // Previous is red side, target is blue side: decrease through 0/360
        shouldIncrease = false;
      } else {
        // Previous is blue side, target is red side: increase through 360/0
        shouldIncrease = true;
      }

      if (shouldIncrease) {
        // Increase hue (possibly wrapping through 360)
        const distance =
          targetColor.h > previousColor.h
            ? targetColor.h - previousColor.h
            : 360 - previousColor.h + targetColor.h;
        currentHue = previousColor.h + distance * progress;
        if (currentHue >= 360) {
          currentHue -= 360;
        }
      } else {
        // Decrease hue (possibly wrapping through 0)
        const distance =
          previousColor.h > targetColor.h
            ? previousColor.h - targetColor.h
            : previousColor.h + (360 - targetColor.h);
        currentHue = previousColor.h - distance * progress;
        if (currentHue < 0) {
          currentHue += 360;
        }
      }
    }

    const nextColor: RawColor = {
      h: Math.round(currentHue),
      s: Math.round(
        previousColor.s + (targetColor.s - previousColor.s) * progress
      ),
      v: Math.round(
        previousColor.v + (targetColor.v - previousColor.v) * progress
      ),
    };

    // Make sure there was enough of a change in color that it's worth updating
    // everyone. Given the slow transition times, we'll often end up with the
    // same color value each tick several times in a row
    if (!equal(nextColor, currentColor)) {
      setCurrentColor(nextColor);
    }
  }
}

/* ---- State Change ---- */

// These handlers take in the different types of updates and makes the change
export function handleScheduleUpdate(newSchedule: ScheduleEntry[]) {
  schedule = newSchedule;
  handleChange();
}

export function handleOverrideUpdate(newOverride: Override) {
  override = newOverride;
  handleChange();
}

export function handleColorUpdate(newColors: Color[]) {
  colors = newColors;
  handleChange();
}

function handleChange() {
  logger.debug(`Handling state change`);
  // Stop the currently running schedule, if there is one running. We'll restart
  // the schedule if we still need to be in scheduled mode in a later step
  clearTimeout(scheduleTimeout);

  // If we're in override mode, set the color to the override color
  if (override.enabled) {
    const overrideColor = colors.find((c) => c.id === override.colorId);
    if (!overrideColor) {
      throw new Error(`No color found with id ${override.colorId}`);
    }
    setTargetColor(overrideColor);
    setTransitionTimes(Date.now(), OVERRIDE_TRANSITION_TIME);
    return;
  }

  // Otherwise, kick start the scheduler with a fast transition
  scheduleNextTransition({ currentTransitionTime: OVERRIDE_TRANSITION_TIME });
}

/* ---- Scheduling ---- */

function getScheduledColors(): {
  color: Color;
  nextTransitionDuration: number;
  nextStartTime: { hour: number; minute: number };
} {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  let colorId: number | undefined;
  let nextTransitionDuration: number | undefined;
  let nextStartTime: { hour: number; minute: number } | undefined;

  // Sanity check in case all schedules are deleted
  if (!schedule.length) {
    return {
      color: {
        id: -1,
        name: 'default',
        h: 0,
        s: 0,
        v: 0,
      },
      nextTransitionDuration: OVERRIDE_TRANSITION_TIME,
      nextStartTime: { hour: 23, minute: 59 },
    };
  }

  // First, check if we're before the first scheduled entry, aka we're after
  // midnight but before the first scheduled entry
  if (
    hour < schedule[0].hour ||
    (hour === schedule[0].hour && minute < schedule[0].minute)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const currentSchedule = schedule.at(-1)!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const nextSchedule = schedule.at(0)!;

    colorId = currentSchedule.colorId;
    nextTransitionDuration = nextSchedule.fade;
    nextStartTime = {
      hour: nextSchedule.hour,
      minute: nextSchedule.minute,
    };
  }

  // Otherwise, find the schedule that occured closest to, but before, the
  // current time. This represents the currently running schedule
  else {
    for (let i = schedule.length - 1; i >= 0; i--) {
      const scheduleEntry = schedule[i];
      if (
        hour > scheduleEntry.hour ||
        (hour === scheduleEntry.hour && minute >= scheduleEntry.minute)
      ) {
        const nextSchedule =
          i === schedule.length - 1 ? schedule[0] : schedule[i + 1];
        colorId = scheduleEntry.colorId;
        nextTransitionDuration = nextSchedule.fade;
        nextStartTime = {
          hour: nextSchedule.hour,
          minute: nextSchedule.minute,
        };
        break;
      }
    }
  }

  if (
    colorId === undefined ||
    nextTransitionDuration === undefined ||
    nextStartTime === undefined
  ) {
    throw new Error('schedule info is unexpectedly undefined');
  }

  const color = colors.find((c) => c.id === colorId);
  if (!color) {
    throw new Error(`No color found with id ${colorId}`);
  }

  return {
    color,
    nextTransitionDuration,
    nextStartTime,
  };
}

function scheduleNextTransition({
  currentTransitionTime,
}: {
  currentTransitionTime: number;
}) {
  logger.debug(`Scheduling next transition`);

  // Get the current schedule
  const currentScheduledColors = getScheduledColors();
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Get the target color.
  const targetColorId = currentScheduledColors.color;

  // Get the target transition time.
  const nextTransitionDuration =
    currentScheduledColors.nextTransitionDuration * 60_000;

  // Get the start of the next transition
  const isTomorrow =
    hour > currentScheduledColors.nextStartTime.hour ||
    (hour === currentScheduledColors.nextStartTime.hour &&
      minute > currentScheduledColors.nextStartTime.minute);
  const nextStartTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + (isTomorrow ? 1 : 0),
    currentScheduledColors.nextStartTime.hour,
    currentScheduledColors.nextStartTime.minute + 1, // Add 1 minute to avoid edge conditions
    0, // second
    0 // millisecond
  );

  // Set the target color and transition time
  setTargetColor(targetColorId);
  setTransitionTimes(now.getTime(), currentTransitionTime);

  // Schedule the next transition
  scheduleTimeout = setTimeout(() => {
    scheduleNextTransition({ currentTransitionTime: nextTransitionDuration });
  }, nextStartTime.getTime() - now.getTime());

  logger.info(
    `Scheduled next transition at ${nextStartTime.toLocaleTimeString()} with transition time ${Math.round(nextTransitionDuration / 1000)}s`
  );
}

/* ---- Lighting startup ---- */

// Set up initial state
handleChange();

// Start the animation loop
setInterval(loop, UPDATE_INTERVAL);
