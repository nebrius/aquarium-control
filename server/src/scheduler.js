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

	mode = 'manual',

	dailySchedule,

	STATE_OFF = 'off',
	STATE_DAY = 'day',
	STATE_NIGHT = 'night';

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
    var date = new Date(),
        config = JSON.parse(process.env.appSettings).timing;
    request([config.endpoint, config.latitude, config.longitude, date.getDate(), (date.getMonth() + 1),
            (-(new Date()).getTimezoneOffset() / 60), '0'].join('/'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            xml2js.parseString(body, function (err, results) {
                var sunriseTwilight = results.sun.morning[0].twilight[0].astronomical[0],
                    sunrise = results.sun.morning[0].sunrise[0],
                    sunset = results.sun.evening[0].sunset[0],
                    sunsetTwilight = results.sun.evening[0].twilight[0].astronomical[0],
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
                    sunriseTwilight: new Date(parseDate + sunriseTwilight).getTime(),
                    sunrise: new Date(parseDate + sunrise).getTime(),
                    sunset: new Date(parseDate + sunset).getTime(),
                    sunsetTwilight: new Date(parseDate + sunsetTwilight).getTime()
                });
            });
        }
    });
}

function scheduleNextChange() {
	
	// if we are in manual mode, short circuit the scheduler
	if (mode == 'manual') {
		return;
	}

	var currentTime = Date.now(),
		nextStateChange;

	// Find the next state to set
	while((nextStateChange = dailySchedule.shift()).time < currentTime);

	// Schedule the next state change
	schedule.scheduleJob(new Date(nextStateChange.time), function () {

		// if we are in manual mode, short circuit the scheduler
	    if (mode == 'manual') {
    	    return;
    	}

		// Break the recursion chain so that the stack doesn't keep growing and growing
		setTimeout(function () {
			process.send({
				destination: 'broadcast',
				type: 'lights.set',
				data: nextStateChange.state
			});
			scheduleNextChange();
		}, 1000);
	});
}

log('info', 'Scheduler started');

process.on('message', function (message) {
	var configuration;
	if (message.type === 'configuration.set') {
		log('debug', 'Setting configuration: ' + JSON.stringify(message));
		configuration = message.data;
		mode = configuration.mode;
		if (mode === 'automatic') {
			fetch(function (times) {
				
				// Create the daily schedule
				dailySchedule = [{
					state: STATE_NIGHT,
					time: times.sunriseTwilight
				},{
                    state: STATE_DAY,
                    time: times.sunrise
                },{
                    state: STATE_NIGHT,
                    time: times.sunset
                },{
                    state: STATE_OFF,
                    time: times.sunsetTwilight,
                }];

				// Adjuset the schedule if the international date line slices the times, e.g. sunrise is after sunset because it is te next day in UTC
				if (times.sunriseTwilight > times.sunrise) {
					dailySchedule = dailySchedule.slice(1).concat(dailySchedule.slice(0, 1));
				} else if (times.sunrise > times.sunset) {
					dailySchedule = dailySchedule.slice(2).concat(dailySchedule.slice(0, 2));
				} else if (times.sunset > times.sunsetTwilight) {
					dailySchedule = dailySchedule.slice(3).concat(dailySchedule.slice(0, 3));
				}

				// Set the current state (in case it's not already set)
				process.send({
                    destination: 'broadcast',
                    type: 'lights.set',
                    data: dailySchedule[3].state
                });

				// Pump the scheduler
				scheduleNextChange();
			});
		} else if (mode === 'manual') {
			process.send({
				destination: 'broadcast',
				type: 'lights.set',
				data: configuration.manual
			});
		} else {
			throw new Error('Invalid mode "' + configuration.mode + '"');
		}
	}
});
