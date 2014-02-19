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

var request = require('request'),
    xml2js = require('xml2js'),
    schedule = require('node-schedule'),

    mode = 'override',

    dailySchedule,

    STATE_OFF = 'off',
    STATE_DAY = 'day',
    STATE_NIGHT = 'night',

    currentState = STATE_OFF,

    configuration;

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

function fetch(callback) {
  log('info', 'Fetching sunrise/sunset information');
  var date = new Date(),
      config = JSON.parse(process.env.appSettings).timing;
  request([config.endpoint, config.latitude, config.longitude, date.getDate(), (date.getMonth() + 1),
      (-(new Date()).getTimezoneOffset() / 60), '0'].join('/'), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      xml2js.parseString(body, function (err, results) {
        var sunriseTwilight = results.sun.morning[0].twilight[0],
            sunrise = results.sun.morning[0].sunrise[0],
            sunset = results.sun.evening[0].sunset[0],
            sunsetTwilight = results.sun.evening[0].twilight[0],
            parseDate;
        switch (date.getDay()) {
          case 0: parseDate = 'Sun'; break;
          case 1: parseDate = 'Mon'; break;
          case 2: parseDate = 'Tue'; break;
          case 3: parseDate = 'Wed'; break;
          case 4: parseDate = 'Thu'; break;
          case 5: parseDate = 'Fri'; break;
          case 6: parseDate = 'Sat'; break;
        }
        parseDate += ', ' + date.getDate() + ' ';
        switch (date.getMonth()) {
          case 0: parseDate += 'Jan'; break;
          case 1: parseDate += 'Feb'; break;
          case 2: parseDate += 'Mar'; break;
          case 3: parseDate += 'Apr'; break;
          case 4: parseDate += 'May'; break;
          case 5: parseDate += 'Jun'; break;
          case 6: parseDate += 'Jul'; break;
          case 7: parseDate += 'Aug'; break;
          case 8: parseDate += 'Sep'; break;
          case 9: parseDate += 'Oct'; break;
          case 10: parseDate += 'Nov'; break;
          case 11: parseDate += 'Dec'; break;
        }
        parseDate += ' ' + date.getFullYear() + ' ';
        callback({
          morning: {
            astronomical: new Date(parseDate + sunriseTwilight.astronomical[0]).getTime(),
            nautical: new Date(parseDate + sunriseTwilight.nautical[0]).getTime(),
            civil: new Date(parseDate + sunriseTwilight.civil[0]).getTime(),
            sunrise: new Date(parseDate + sunrise).getTime(),
          },
          evening: {
            astronomical: new Date(parseDate + sunsetTwilight.astronomical[0]).getTime(),
            nautical: new Date(parseDate + sunsetTwilight.nautical[0]).getTime(),
            civil: new Date(parseDate + sunsetTwilight.civil[0]).getTime(),
            sunset: new Date(parseDate + sunset).getTime(),
          }
        });
      });
    }
  });
}

refreshSchedule();
function refreshSchedule() {
  fetch(function (times) {
    // If we haven't recieved the configuration yet or were switched to override mode while fetching, short circuit
    if (!configuration || mode == 'override') {
      return;
    }

    var currentTime = Date.now(),
        i;

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
      var time,
          temp;

      // Get the timestamp
      if (entry.type == 'dynamic') {
        if (entry.source.set == 'morning') {
          time = times.morning[entry.source.event];
        } else {
          time = times.evening[entry.source.event];
        }
      } else {
        time = new Date();
        temp = new Date(entry.time);
        time.setHours(temp.getHours(), temp.getMinutes(), 0, 0);
        time = time.getTime();
      }

      // Compensate for this time technically occuring tomorrow by adding 24 hours to it, if need be
      if (time < currentTime) {
        time += 24 * 60 * 60 * 1000;
      }

      return {
        state: entry.state,
        time: time
      }
    });

    for (i = 1; i < dailySchedule.length; i++) {
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
  });
}

function scheduleNextChange() {

  // Break the recursion chain so that the stack doesn't keep growing and growing
  setTimeout(function () {

    // if we are in override mode or haven't recieved the configuration yet, short circuit the scheduler
    if (mode == 'override' || !configuration) {
      return;
    }

    if (!dailySchedule.length) {
      refreshSchedule();
      return;
    }

    var nextStateChange = dailySchedule.shift();

    // Schedule the next state change
    schedule.scheduleJob(new Date(nextStateChange.time), function () {

    process.send({
      destination: 'broadcast',
      type: 'lights.set',
      data: nextStateChange.state
    });
    scheduleNextChange();
  }, 1);
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
      currentState = configuration.overrideState;
      process.send({
        destination: 'broadcast',
        type: 'lights.set',
        data: currentState
      });
    } else {
      throw new Error('Invalid mode "' + configuration.mode + '"');
    }
  }
});
