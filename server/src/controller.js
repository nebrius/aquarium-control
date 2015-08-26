/*
  Copyright (C) 2013  Bryan Hughes <bryan@theoreticalideations.com>

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
var settings = require('../settings/settings.json');

var scheduleTimeout = null;
var dailySchedule;

function setLightsToDay() {
  console.log('setting lights to day');
}

function setLightsToNight() {
  console.log('setting lights to night');
}

function setLightsToOff() {
  console.log('setting lights to off');
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
    lights.setState(schedule.overrideState);
    return;
  }

  function createDate(hours, minutes, seconds) {
    var date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
  }

  // Calculate the daily schedule
  dailySchedule = [];
  var entries = currentSchedule.schedule.map(function(entry) {

    // If we're manual, calculate the time for today and return it
    if (entry.type == 'manual') {
      return {
        date: createDate(entry.manualTime.hour, entry.manualTime.minute, 0),
        state: entry.state
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
      state: entry.state
    };
  });

  // Add an entry at the beginning of the day, e.g. 00:00:00, to kickstart the lights
  entries.unshift({
    date: createDate(0, 0, 0),
    state: entries[entries.length - 1].state
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

  if (!entries.length) {
    // TODO
  }

  // TODO: Add lots of logging using transport-logger
}

schedule.onScheduleChanged(setSchedule);
setSchedule();
