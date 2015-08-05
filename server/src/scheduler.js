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

var mode = 'override';

var dailySchedule;
var configuration;

function log(level, message) {
  process.send({
    destination: 'master',
    type: 'log',
    data: {
      level: level,
      message: message
    }
  });
}

function refreshSchedule() {

  log('info', 'Refreshing the schedule');

  // Create the daily schedule
  dailySchedule = configuration.scheduleEntries.sort(function (x, y) {
    if (x.id < y.id) {
      return -1;
    } else if (x.id == y.id) {
      return 0;
    } else {
      return 1;
    }
  }).map(function (entry) {

    // Get the timestamp
    var time = new Date();
    time.setUTCHours(entry.time.hours);
    time.setUTCMinutes(entry.time.minutes);
    time.setUTCSeconds(0);
    time = time.getTime();

    // Compensate for this time technically occurring tomorrow by adding 24 hours to it, if need be
    if (time < Date.now()) {
      time += 24 * 60 * 60 * 1000;
    }

    return {
      state: entry.state,
      time: time
    };
  });

  for (var i = 1; i < dailySchedule.length; i++) {
    if (dailySchedule[i].time < dailySchedule[i - 1].time) {
      dailySchedule = dailySchedule.slice(i).concat(dailySchedule.slice(0, i));
      break;
    }
  }

  process.send({
    destination: 'broadcast',
    type: 'lights.set',
    data: dailySchedule[dailySchedule.length - 1].state
  });

  // Pump the scheduler
  scheduleNextChange();
}

function scheduleNextChange() {

  // Break the recursion chain so that the stack doesn't keep growing and growing
  process.nextTick(function () {

    // if we are in override mode or haven't received the configuration yet, short circuit the scheduler
    if (mode == 'override' || !configuration) {
      return;
    }

    if (!dailySchedule.length) {
      log('Refreshing the schedule before scheduling next change due to empy daily schedule');
      refreshSchedule();
      return;
    }

    // Schedule the next state change
    var nextStateChange = dailySchedule.shift();
    log('info', 'Scheduling the next change for ' + nextStateChange.time);
    setTimeout(function() {
      log('info', 'Setting lights for next scheduled change');
      process.send({
        destination: 'broadcast',
        type: 'lights.set',
        data: nextStateChange.state
      });
      scheduleNextChange();
    }, nextStateChange.time - Date.now());
  });
}

log('info', 'Scheduler started');

process.on('message', function (message) {
  if (message.type === 'configuration.set') {
    configuration = message.data;
    mode = configuration.mode;
    if (mode === 'program') {
      refreshSchedule();
    } else if (mode === 'override') {
      process.send({
        destination: 'broadcast',
        type: 'lights.set',
        data: configuration.overrideState
      });
    } else {
      throw new Error('Invalid mode "' + configuration.mode + '"');
    }
  }
});
