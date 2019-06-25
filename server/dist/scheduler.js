"use strict";
/*
Copyright (C) 2013-2017 Bryan Hughes <bryan@nebri.us>

Aquarium Control is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Aquarium Control is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Aquarium Control.  If not, see <http://www.gnu.org/licenses/>.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const suncalc_1 = require("suncalc");
const state_1 = require("./state");
const db_1 = require("./db");
const config_1 = require("./config");
let scheduleTimeout = null;
let dailySchedule = [];
function createDate(hours, minutes, seconds) {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
}
function scheduleMidnightReset() {
    const midnightDate = new Date(createDate(0, 0, 0).getTime() + 24 * 60 * 60 * 1000);
    console.log(`Scheduling the daily schedule preparation for ${midnightDate}`);
    state_1.state.setNextTransitionTime(midnightDate);
    state_1.state.setNextTransitionState('off');
    scheduleTimeout = setTimeout(updateSchedule, midnightDate.getTime() - Date.now());
}
function scheduleNextTransition() {
    const nextScheduleEntry = dailySchedule.shift();
    if (!nextScheduleEntry) {
        console.warn('Internal Error: schedule queue is unexpectedly empty, prematurely scheduling midnight reset');
        scheduleMidnightReset();
        return;
    }
    const currentState = state_1.state.getState();
    console.log('Scheduling the next transition from ' + currentState.currentState +
        ' to ' + nextScheduleEntry.state + ' at ' + nextScheduleEntry.date);
    state_1.state.setNextTransitionTime(nextScheduleEntry.date);
    state_1.state.setNextTransitionState(nextScheduleEntry.state);
    setTimeout(() => {
        state_1.state.setCurrentState(nextScheduleEntry.state);
        if (dailySchedule.length) {
            scheduleNextTransition();
        }
        else {
            scheduleMidnightReset();
        }
    }, nextScheduleEntry.date.getTime() - Date.now());
}
async function init() {
    await updateSchedule();
    state_1.state.on('change-config', updateSchedule);
}
exports.init = init;
async function updateSchedule() {
    const currentSchedule = await db_1.getConfig();
    if (!currentSchedule) {
        throw new Error('Internal Error: currentSchedule is undefined');
    }
    // Cancel the previous schedule, if it was running
    if (scheduleTimeout) {
        clearTimeout(scheduleTimeout);
        scheduleTimeout = null;
    }
    // If we're in override mode, set that mode and exit early
    if (currentSchedule.mode === 'override') {
        console.log('Setting override mode and skipping daily schedule creation');
        state_1.state.setCurrentState(currentSchedule.overrideState);
        state_1.state.setCurrentMode('override');
        return;
    }
    // Calculate the daily schedule
    console.log('Creating the daily schedule');
    state_1.state.setCurrentMode('program');
    let entries = currentSchedule.schedule.map((entry) => {
        // If we're manual, calculate the time for today and return it
        if (entry.type === 'manual') {
            const manualDetails = entry.details;
            return {
                date: createDate(manualDetails.hour, manualDetails.minute, 0),
                state: entry.state,
                name: entry.name
            };
        }
        // If we're dynamic, use suncalc to figure out the time
        const dynamicDetails = entry.details;
        const times = suncalc_1.getTimes(createDate(12, 0, 0), config_1.getServerConfig().latitude, config_1.getServerConfig().longitude);
        const date = times[dynamicDetails.event];
        if (!date) {
            const eventNames = Object.keys(times).join(', ');
            throw new Error(`Invalid dynamic event "${dynamicDetails.event}". Must be one of ${eventNames}.`);
        }
        return {
            date,
            state: entry.state,
            name: entry.name
        };
    });
    // Remove any events that occur after the next event, e.g. sunset is late enough that
    // it would occur after a manual time event due to time of year
    entries = entries.filter((entry, i) => {
        if (i === entries.length - 1) {
            return true;
        }
        const isValid = entry.date.getTime() < entries[i + 1].date.getTime();
        if (!isValid) {
            console.warn(`Entry ${entry.name} occurs after the next entry and will be ignored`);
        }
        return isValid;
    });
    // Add an entry at the beginning of the day, e.g. 00:00:00, to kickstart the lights
    entries.unshift({
        date: createDate(0, 0, 0),
        state: entries[entries.length - 1].state,
        name: 'Initial state'
    });
    // Find the most recent schedule in the past to set the current lighting state
    // We set a 1 second buffer so that we don't miss anything while processing
    const currentTime = Date.now();
    const currentEntry = entries.filter((entry) => entry.date.getTime() <= currentTime + 1000).pop();
    if (!currentEntry) {
        throw new Error('Internal error: could not find current entry');
    }
    state_1.state.setCurrentState(currentEntry.state);
    // Remove the entries that are in the past, using the 1 second buffer as above
    entries = entries.filter((entry) => entry.date.getTime() > currentTime + 1000);
    // Store the entries to the global state for use by scheduleNextTransition
    dailySchedule = entries;
    console.log('The daily schedule is as follows: ');
    entries.forEach((entry) => console.log('  ' + entry.state + ': ' + entry.date));
    // If there are no entries left, we are done with the schedule for today and just
    // need to wait until tomorrow to do it again
    if (!entries.length) {
        scheduleMidnightReset();
    }
    else {
        scheduleNextTransition();
    }
}
exports.updateSchedule = updateSchedule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjaGVkdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLHFDQUFtQztBQUVuQyxtQ0FBZ0M7QUFDaEMsNkJBQWlDO0FBQ2pDLHFDQUEyQztBQVEzQyxJQUFJLGVBQWUsR0FBd0IsSUFBSSxDQUFDO0FBQ2hELElBQUksYUFBYSxHQUFxQixFQUFFLENBQUM7QUFFekMsU0FBUyxVQUFVLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFlO0lBQ2pFLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsU0FBUyxxQkFBcUI7SUFDNUIsTUFBTSxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDbkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM3RSxhQUFLLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUMsYUFBSyxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLGVBQWUsR0FBRyxVQUFVLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNwRixDQUFDO0FBRUQsU0FBUyxz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