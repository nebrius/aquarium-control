import { type Override, type Schedule } from '@aquarium/shared';

import { getOverride, getSchedule } from './db/db.ts';

const UPDATE_INTERVAL = 1_000;

let schedule = getSchedule();
let override = getOverride();

export function handleScheduleUpdate(newSchedule: Schedule) {
  schedule = newSchedule;
}

export function handleOverrideUpdate(newOverride: Override) {
  override = newOverride;
}

const previousColor: { h: number; s: number; v: number } | 'off' = 'off';
const currentColor: { h: number; s: number; v: number } | 'off' = 'off';
const transitionStartTime: number = 0;
const transitionEndTime: number = 0;
function loop() {
  // Schedule -> Schedule or Override -> Schedule cases:
  // 1. Off -> Night
  //    - set previousColor to schedule.night but with a v of 0
  //    - set currentColor to schedule.night
  //    - set transitionStartTime to now
  //    - set transitionEndTime to now + fade converted to minutes
  // 2. Night -> Day
  //    - set previousColor to currentColor
  //    - set currentColor to schedule.day
  //    - set transitionStartTime to now
  //    - set transitionEndTime to now + fade converted to minutes
  // 3. Day -> Night
  //    - set previousColor to currentColor
  //    - set currentColor to schedule.night
  //    - set transitionStartTime to now
  //    - set transitionEndTime to now + fade converted to minutes
  // 4. Night -> Off
  //    - set previousColor to currentColor
  //    - set currentColor to previousColor but with a v of 0
  //    - set transitionStartTime to now
  //    - set transitionEndTime to now + fade converted to minutes
  // Schedule -> Override or Override -> Override cases:
  // 1. To off
  //    - set previousColor to previousColor
  //    - set currentColor to previousColor but with a v of 0
  //    - set transitionStartTime to now
  //    - set transitionEndTime to now + fade converted to minutes
  // 2. To day or night
  //    - If currentColor is off: set previousColor to override.color but with a v of 0, else set previousColor to currentColor
  //    - set currentColor to override.color
  //    - set transitionStartTime to now
  //    - set transitionEndTime to now + fade converted to minutes
}
setInterval(loop, UPDATE_INTERVAL);
