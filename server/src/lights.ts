import {
  type Color,
  type ColorSet,
  type LightState,
  type Override,
  type Schedule,
} from '@aquarium/shared';
import equal from 'fast-deep-equal';

import { getColorSet, getOverride, getSchedule } from './db/db.ts';
import { logger } from './logging.ts';

const UPDATE_INTERVAL = 100;
const OVERRIDE_TRANSITION_TIME = 5_000;

const OFF_COLOR: Color = {
  h: 0,
  s: 0,
  v: 0,
};

let schedule = getSchedule();
let override = getOverride();
let colorSet = { ...getColorSet(), off: OFF_COLOR };

/* ---- Animation ---- */

// Animation state
let previousColor: Color = OFF_COLOR;
let currentColor: Color = OFF_COLOR;
let targetColor: Color = OFF_COLOR;
let transitionStartTime: number = 0;
let transitionEndTime: number = 0;
let scheduleTimeout: NodeJS.Timeout | undefined;

// This function computes the target color from the previous color, taking into
// account when lights are off.
function setTargetColor(nextLightState: LightState) {
  logger.debug(`Setting target color to ${nextLightState}`);
  const nextColor = colorSet[nextLightState];

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

const lightColorChangedCallbacks: ((color: Color) => void)[] = [];
export function onLightColorChanged(cb: (color: Color) => void) {
  lightColorChangedCallbacks.push(cb);
}

// This sets the current color, aka updating the actual color of the LED strip
function setCurrentColor(color: Color) {
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

    // Always wrap through 360:
    // If previous < target: go backwards (decrease through 0)
    // If previous > target: go forwards (increase through 360)
    let currentHue: number;
    if (previousColor.h < targetColor.h) {
      // Go backwards: previous -> 0 -> 360 -> target
      const distance = previousColor.h + (360 - targetColor.h);
      currentHue = previousColor.h - distance * progress;
      if (currentHue < 0) {
        currentHue += 360;
      }
    } else if (previousColor.h > targetColor.h) {
      // Go forwards: previous -> 360 -> 0 -> target
      const distance = 360 - previousColor.h + targetColor.h;
      currentHue = previousColor.h + distance * progress;
      if (currentHue >= 360) {
        currentHue -= 360;
      }
    } else {
      // Same hue, no transition needed
      currentHue = previousColor.h;
    }

    const nextColor = {
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
export function handleScheduleUpdate(newSchedule: Schedule) {
  schedule = newSchedule;
  handleChange();
}

export function handleOverrideUpdate(newOverride: Override) {
  override = newOverride;
  handleChange();
}

export function handleColorUpdate(newColorSet: ColorSet) {
  colorSet = { ...newColorSet, off: OFF_COLOR };
  handleChange();
}

function handleChange() {
  logger.debug(`Handling state change`);
  // Stop the currently running schedule, if there is one running. We'll restart
  // the schedule if we still need to be in scheduled mode in a later step
  clearTimeout(scheduleTimeout);

  // If we're in override mode, set the color to the override color
  if (override.enabled) {
    setTargetColor(override.state);
    setTransitionTimes(Date.now(), OVERRIDE_TRANSITION_TIME);
    return;
  }

  // Otherwise, kick start the scheduler with a fast transition
  scheduleNextTransition({ currentTransitionTime: OVERRIDE_TRANSITION_TIME });
}

/* ---- Scheduling ---- */

function getScheduledColors():
  | {
      currentLightState: LightState;
      nextTransitionDuration: number;
      nextStartTime: { hour: number; minute: number };
    }
  | undefined {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (
    hour < schedule.offToNight.hour ||
    (hour === schedule.offToNight.hour && minute < schedule.offToNight.minute)
  ) {
    return {
      currentLightState: 'off',
      nextTransitionDuration: schedule.offToNight.fade,
      nextStartTime: {
        hour: schedule.offToNight.hour,
        minute: schedule.offToNight.minute,
      },
    };
  }

  if (
    hour < schedule.nightToDay.hour ||
    (hour === schedule.nightToDay.hour && minute < schedule.nightToDay.minute)
  ) {
    return {
      currentLightState: 'night',
      nextTransitionDuration: schedule.nightToDay.fade,
      nextStartTime: {
        hour: schedule.nightToDay.hour,
        minute: schedule.nightToDay.minute,
      },
    };
  }

  if (
    hour < schedule.dayToNight.hour ||
    (hour === schedule.dayToNight.hour && minute < schedule.dayToNight.minute)
  ) {
    return {
      currentLightState: 'day',
      nextTransitionDuration: schedule.dayToNight.fade,
      nextStartTime: {
        hour: schedule.dayToNight.hour,
        minute: schedule.dayToNight.minute,
      },
    };
  }

  if (
    hour < schedule.nightToOff.hour ||
    (hour === schedule.nightToOff.hour && minute < schedule.nightToOff.minute)
  ) {
    return {
      currentLightState: 'night',
      nextTransitionDuration: schedule.nightToOff.fade,
      nextStartTime: {
        hour: schedule.nightToOff.hour,
        minute: schedule.nightToOff.minute,
      },
    };
  }

  return undefined;
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

  // Get the target color.
  const targetLightState = currentScheduledColors
    ? currentScheduledColors.currentLightState
    : 'off';

  // Get the target transition time.
  const nextTransitionTime = currentScheduledColors
    ? // Convert minutes to ms
      currentScheduledColors.nextTransitionDuration * 60_000
    : // If we're in the off->midnight transition, then we _most likely_ are
      // going from off->off at this time. I _think_ this is guaranteed to be
      // true, but just in case let's add a fallback to the override transition
      // time so we don't flash lights
      OVERRIDE_TRANSITION_TIME;

  // Get the start of the next transition
  const nextStartTime = currentScheduledColors
    ? new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        currentScheduledColors.nextStartTime.hour,
        currentScheduledColors.nextStartTime.minute + 1, // Add 1 minute to avoid edge conditions
        0, // second
        0 // millisecond
      )
    : // If we're in the off -> midnight transition, then we just schedule for
      // 00:01 the following day where we'll then schedule the first transition
      // of the day (off -> night)
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, // hour
        1, // Add 1 minute to avoid edge conditions
        0, // second
        0 // millisecond
      );

  // Set the target color and transition time
  setTargetColor(targetLightState);
  setTransitionTimes(now.getTime(), currentTransitionTime);

  // Schedule the next transition
  scheduleTimeout = setTimeout(() => {
    scheduleNextTransition({ currentTransitionTime: nextTransitionTime });
  }, nextStartTime.getTime() - now.getTime());

  logger.info(
    `Scheduled next transition at ${nextStartTime.toLocaleTimeString()} with transition time ${Math.round(nextTransitionTime / 1000)}s`
  );
}

/* ---- Lighting startup ---- */

// Set up initial state
handleChange();

// Start the animation loop
setInterval(loop, UPDATE_INTERVAL);
