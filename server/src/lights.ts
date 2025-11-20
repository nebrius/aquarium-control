import {
  type Color,
  type ColorSet,
  type Override,
  type Schedule,
} from '@aquarium/shared';
import equal from 'fast-deep-equal';

import { getColorSet, getOverride, getSchedule } from './db/db.ts';

const UPDATE_INTERVAL = 1_000;
const OVERRIDE_TRANSITION_TIME = 5_000;

const OFF_COLOR: Color = {
  h: 0,
  s: 0,
  v: 0,
};

let schedule = getSchedule();
let override = getOverride();
let colorSet = getColorSet();
let updatedColorSet: ColorSet | undefined = undefined;

export function handleScheduleUpdate(newSchedule: Schedule) {
  schedule = newSchedule;
}

export function handleOverrideUpdate(newOverride: Override) {
  override = newOverride;
}

export function handleColorUpdate(newColorSet: ColorSet) {
  updatedColorSet = newColorSet;
}

// TODO: This is all wrong. Schedules represent transitions, not states
function getCurrentScheduledColor() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (
    hour < schedule.offToNight.hour ||
    (hour === schedule.offToNight.hour && minute < schedule.offToNight.minute)
  ) {
    return { type: 'off', fade: schedule.nightToOff.fade };
  }

  if (
    hour < schedule.nightToDay.hour ||
    (hour === schedule.nightToDay.hour && minute < schedule.nightToDay.minute)
  ) {
    return { type: 'night', fade: schedule.offToNight.fade };
  }

  if (
    hour < schedule.dayToNight.hour ||
    (hour === schedule.dayToNight.hour && minute < schedule.dayToNight.minute)
  ) {
    return { type: 'day', fade: schedule.dayToNight.fade };
  }

  if (
    hour < schedule.nightToOff.hour ||
    (hour === schedule.nightToOff.hour && minute < schedule.nightToOff.minute)
  ) {
    return { type: 'night', fade: schedule.dayToNight.fade };
  }

  return { type: 'off', fade: schedule.nightToOff.fade };
}

// Schedule state
const currentOverride = override.enabled ? override : undefined;
const currentScheduleEntry:
  | ReturnType<typeof getCurrentScheduledColor>
  | undefined = undefined;

// Animation state
let previousColor: Color = OFF_COLOR;
let currentColor: Color = OFF_COLOR;
let targetColor: Color = OFF_COLOR;
let transitionStartTime: number = 0;
let transitionEndTime: number = 0;

export function getCurrentColor() {
  return currentColor;
}

function updateState() {
  const nextScheduleEntry = getCurrentScheduledColor();

  const previousRawColor = currentColor;
  let nextRawColor: Color | undefined = undefined;
  let transitionTime: number | undefined = undefined;

  // First check if colors have changed and short circuit. If anything else
  // changed at the same time, it'll be picked up on the next tick
  if (updatedColorSet) {
    // Figure out what type of color we were previously on
    const previousColorSetType = equal(currentColor, colorSet.day)
      ? 'day'
      : equal(currentColor, colorSet.night)
        ? 'night'
        : 'off';

    // Get the next version of that color
    nextRawColor =
      previousColorSetType === 'off'
        ? OFF_COLOR
        : updatedColorSet[previousColorSetType];

    // Mark the color as updated
    colorSet = updatedColorSet;
    updatedColorSet = undefined;

    // Animation like this was an override, since we want to see it quickly
    transitionTime = OVERRIDE_TRANSITION_TIME;
  }

  // Then check if the override has been enabled or the previously enabled
  // color has changed, which requires a transition
  else if (override.enabled) {
    // If we're the same override state as before, do nothing
    if (equal(override, currentOverride)) {
      return;
    }
    nextRawColor =
      override.state === 'off' ? OFF_COLOR : colorSet[override.state];
    transitionTime = OVERRIDE_TRANSITION_TIME;
  }

  // Next, check if:
  // 1. we previously were in override mode and are transitioning
  // to schedule mode
  // 2. this is the first time we're running
  // 3. check if the schedule has changed
  else if (
    currentOverride ||
    !currentScheduleEntry ||
    !equal(currentScheduleEntry, nextScheduleEntry)
  ) {
    switch (nextScheduleEntry.type) {
      case 'off': {
        nextRawColor = OFF_COLOR;
        break;
      }
      case 'day': {
        nextRawColor = colorSet.day;
        break;
      }
      case 'night': {
        nextRawColor = colorSet.night;
        break;
      }
    }
    transitionTime = !currentScheduleEntry
      ? OVERRIDE_TRANSITION_TIME
      : nextScheduleEntry.fade;
  }

  if (
    // Bail if there was no color or transition time
    !nextRawColor ||
    !transitionTime ||
    // Bail of the colors are the same
    equal(nextRawColor, currentColor) ||
    // Bail if the color is off, regardless of the color we faded from
    (nextRawColor.v === 0 && currentColor.v === 0)
  ) {
    return;
  }

  // Compute the actual next color
  if (previousRawColor.v === 0) {
    // If we're currently off, override the previous color with the next color
    // except for it's value so we don't mix colors on the fade (e.g. day -> off
    // -> night would do a weird red-> blue fade in)
    previousColor = {
      h: nextRawColor.h,
      s: nextRawColor.s,
      v: 0,
    };
    targetColor = nextRawColor;
  } else if (nextRawColor.v === 0) {
    // If we're going to off, override the target color with the previous color
    // except for it's value so we don't mix colors on the fade (e.g. day -> off
    // -> night would do a weird red-> blue fade in)
    targetColor = {
      h: previousColor.h,
      s: previousColor.s,
      v: 0,
    };
  } else {
    // Otherwise, we do a standard fade between colors
    targetColor = nextRawColor;
  }

  transitionStartTime = Date.now();
  transitionEndTime = transitionStartTime + transitionTime;
}

function updateAnimation() {
  const now = Date.now();
  if (now > transitionEndTime) {
    currentColor = targetColor;
  } else {
    const progress =
      (now - transitionStartTime) / (transitionEndTime - transitionStartTime);
    currentColor = {
      h: previousColor.h + (targetColor.h - previousColor.h) * progress,
      s: previousColor.s + (targetColor.s - previousColor.s) * progress,
      v: previousColor.v + (targetColor.v - previousColor.v) * progress,
    };
  }
  // TODO: send to strip, but only if we're on the raspberry pi
}

function loop() {
  updateState();
  updateAnimation();
}
setInterval(loop, UPDATE_INTERVAL);
