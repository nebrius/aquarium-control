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
    console.debug('[Scheduler]: initializing module');
    await updateSchedule();
    state_1.state.on('change-config', updateSchedule);
    console.debug('[Scheduler]: module initalized');
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
        console.log('[Scheduler]: setting override mode and skipping daily schedule creation');
        state_1.state.setCurrentState(currentSchedule.overrideState);
        state_1.state.setCurrentMode('override');
        return;
    }
    // Calculate the daily schedule
    console.log('[Scheduler]: creating the daily schedule');
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
            console.warn(`[Scheduler]: entry ${entry.name} occurs after the next entry and will be ignored`);
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
    console.log('[Scheduler]: the daily schedule is as follows: ');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjaGVkdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLHFDQUFtQztBQUVuQyxtQ0FBZ0M7QUFDaEMsNkJBQWlDO0FBQ2pDLHFDQUEyQztBQVEzQyxJQUFJLGVBQWUsR0FBd0IsSUFBSSxDQUFDO0FBQ2hELElBQUksYUFBYSxHQUFxQixFQUFFLENBQUM7QUFFekMsU0FBUyxVQUFVLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFlO0lBQ2pFLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsU0FBUyxxQkFBcUI7SUFDNUIsTUFBTSxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDbkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM3RSxhQUFLLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUMsYUFBSyxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLGVBQWUsR0FBRyxVQUFVLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNwRixDQUFDO0FBRUQsU0FBUyxzQkFBc0I7SUFDN0IsTUFBTSxpQkFBaUIsR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEQsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkZBQTZGLENBQUMsQ0FBQztRQUM1RyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3hCLE9BQU87S0FDUjtJQUNELE1BQU0sWUFBWSxHQUFHLGFBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxHQUFHLFlBQVksQ0FBQyxZQUFZO1FBQzVFLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsTUFBTSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RFLGFBQUssQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxhQUFLLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLGFBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3hCLHNCQUFzQixFQUFFLENBQUM7U0FDMUI7YUFBTTtZQUNMLHFCQUFxQixFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFTSxLQUFLLFVBQVUsSUFBSTtJQUN4QixPQUFPLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDbEQsTUFBTSxjQUFjLEVBQUUsQ0FBQztJQUN2QixhQUFLLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMxQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUxELG9CQUtDO0FBRU0sS0FBSyxVQUFVLGNBQWM7SUFFbEMsTUFBTSxlQUFlLEdBQUcsTUFBTSxjQUFTLEVBQUUsQ0FBQztJQUMxQyxJQUFJLENBQUMsZUFBZSxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztLQUNqRTtJQUVELGtEQUFrRDtJQUNsRCxJQUFJLGVBQWUsRUFBRTtRQUNuQixZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUIsZUFBZSxHQUFHLElBQUksQ0FBQztLQUN4QjtJQUVELDBEQUEwRDtJQUMxRCxJQUFJLGVBQWUsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUVBQXlFLENBQUMsQ0FBQztRQUN2RixhQUFLLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRCxhQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLE9BQU87S0FDUjtJQUVELCtCQUErQjtJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7SUFDeEQsYUFBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxJQUFJLE9BQU8sR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBRW5ELDhEQUE4RDtRQUM5RCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzNCLE1BQU0sYUFBYSxHQUF5QixLQUFLLENBQUMsT0FBK0IsQ0FBQztZQUNsRixPQUFPO2dCQUNMLElBQUksRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDN0QsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO2dCQUNsQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7YUFDakIsQ0FBQztTQUNIO1FBRUQsdURBQXVEO1FBQ3ZELE1BQU0sY0FBYyxHQUEwQixLQUFLLENBQUMsT0FBZ0MsQ0FBQztRQUNyRixNQUFNLEtBQUssR0FBRyxrQkFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLHdCQUFlLEVBQUUsQ0FBQyxRQUFRLEVBQUUsd0JBQWUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RHLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLGNBQWMsQ0FBQyxLQUFLLHFCQUFxQixVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQ25HO1FBQ0QsT0FBTztZQUNMLElBQUk7WUFDSixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDbEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1NBQ2pCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILHFGQUFxRjtJQUNyRiwrREFBK0Q7SUFDL0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLEtBQUssT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEtBQUssQ0FBQyxJQUFJLGtEQUFrRCxDQUFDLENBQUM7U0FDbEc7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVILG1GQUFtRjtJQUNuRixPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ2QsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSztRQUN4QyxJQUFJLEVBQUUsZUFBZTtLQUN0QixDQUFDLENBQUM7SUFFSCw4RUFBOEU7SUFDOUUsMkVBQTJFO0lBQzNFLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMvQixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNqRyxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztLQUNqRTtJQUNELGFBQUssQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTFDLDhFQUE4RTtJQUM5RSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFFL0UsMEVBQTBFO0lBQzFFLGFBQWEsR0FBRyxPQUFPLENBQUM7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO0lBQy9ELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRWhGLGlGQUFpRjtJQUNqRiw2Q0FBNkM7SUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDbkIscUJBQXFCLEVBQUUsQ0FBQztLQUN6QjtTQUFNO1FBQ0wsc0JBQXNCLEVBQUUsQ0FBQztLQUMxQjtBQUNILENBQUM7QUEvRkQsd0NBK0ZDIn0=