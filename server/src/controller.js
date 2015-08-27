/*
  Copyright (C) 2013-2015  Bryan Hughes <bryan@theoreticalideations.com>

  This file is part of Aquarium Control.

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

var sunCalc = require('suncalc');
var schedule = require('./schedule.js');
var lights = require('./lights.js');
var logger = require('./logger.js');
var settings = require('../settings/settings.json');

var scheduleTimeout = null;
var dailySchedule;

function createDate(hours, minutes, seconds) {
  var date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  return date;
}

function scheduleMidnightReset() {
  var midnightDate = new Date(createDate(0, 0, 0).getTime() + 24 * 60 * 60 * 1000);
  logger.info('Scheduling the daily schedule preparation for ' + midnightDate);
  scheduleTimeout = setTimeout(setSchedule, midnightDate.getTime() - Date.now());
}

function scheduleNextTransition() {
  var nextScheduleEntry = dailySchedule.shift();
  var currentStatus = schedule.getStatus();
  logger.info('Scheduling the next transition from ' + currentStatus.state +
    ' to ' + nextScheduleEntry.state + ' for ' + nextScheduleEntry.date);
  setTimeout(function() {
    lights.setState(nextScheduleEntry.state);
    if (dailySchedule.length) {
      scheduleNextTransition();
    } else {
      scheduleMidnightReset();
    }
  }, nextScheduleEntry.date.getTime() - Date.now());
}

function setSchedule() {

  var currentSchedule = schedule.getSchedule();

  // Cancel the previous schedule, if it was running
  if (scheduleTimeout) {
    clearTimeout(scheduleTimeout);
    scheduleTimeout = null;
  }

  // If we're in override mode, set that mode and exit early
  if (currentSchedule.mode == 'override') {
    logger.info('Setting the override mode and skipping daily schedule creation');
    lights.setState(currentSchedule.overrideState);
    return;
  }
  logger.info('Creating the daily schedule');

  // Calculate the daily schedule
  var entries = currentSchedule.schedule.map(function(entry) {

    // If we're manual, calculate the time for today and return it
    if (entry.type == 'manual') {
      return {
        date: createDate(entry.manualTime.hour, entry.manualTime.minute, 0),
        state: entry.state,
        name: entry.name
      };
    }

    // If we're dynamic, use suncalc to figure out the time
    var times = sunCalc.getTimes(new Date(), settings.location.latitude, settings.location.longitude);
    var date = times[entry.dynamicEvent];
    if (!date) {
      throw new Error('Invalid dynamic event "' + entry.dynamicEvent + '". Must be one of ' +
        Object.keys(times).join(', '));
    }
    return {
      date: date,
      state: entry.state,
      name: entry.name
    };
  });

  // Remove any events that occur after the next event, e.g. sunset is late enough that
  // it would occur after a manual time event due to time of year
  entries = entries.filter(function (entry, i) {
    if (i == entries.length - 1) {
      return true;
    }
    var isValid = entry.date.getTime() < entries[i + 1].date.getTime();
    if (!isValid) {
      logger.warn('Entry ' + entry.name + ' occurs after the next entry and will be ignored');
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
  var currentTime = Date.now();
  var currentEntry = entries.filter(function(entry) {
    return entry.date.getTime() <= currentTime + 1000;
  }).pop();
  if (!currentEntry) {
    throw new Error('Internal error: could not find current entry');
  }
  lights.setState(currentEntry.state);

  // Remove the entries that are in the past, using the 1 second buffer as above
  entries = entries.filter(function(entry) {
    return entry.date.getTime() > currentTime + 1000;
  });

  // Store the entries to the global state for use by scheduleNextTransition
  dailySchedule = entries;
  logger.info('The daily schedule is as follows: ');
  entries.forEach(function (entry) {
    logger.info('  ' + entry.state + ': ' + entry.date);
  });

  // If there are no entries left, we are done with the schedule for today and just
  // need to wait until tomorrow to do it again
  if (!entries.length) {
    scheduleMidnightReset();
  } else {
    scheduleNextTransition();
  }
}

schedule.onScheduleChanged(setSchedule);
setSchedule();
