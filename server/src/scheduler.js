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

	currentState = STATE_OFF,

	STATE_OFF = 'off',
	STATE_DAY = 'day',
	STATE_NIGHT = 'night';

function getBaseDate() {
	var currentTime = new Date();
	return new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()).getTime();
}

/**
 * Fetches the time that sunrise and sunset will occur
 *
 * @param  {Function} callback The callback to call once the times have been fetched
 */
function fetch(callback) {
	var date = new Date(),
		config = JSON.parse(process.env.appSettings).timing;
	request([config.endpoint, config.latitude, config.longitude, date.getDate(), (date.getMonth() + 1),
			(-(new Date()).getTimezoneOffset() / 60), '0'].join('/'), function (error, response, body) {
		if (!error && response.statusCode == 200) {
			xml2js.parseString(body, function (err, results) {
				var sunrise = results.sun.morning[0].sunrise[0],
					sunset = results.sun.evening[0].sunset[0],
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
					sunrise: new Date(parseDate + sunrise).getTime(),
					sunset: new Date(parseDate + sunset).getTime()
				});
			});
		}
	});
}

function scheduleNextChange(configuration) {
	var currentTime = Date.now(),
		newState,
		nextState,
		nextStateChange;

	// Check the current state and make sure it's valid
	if (currentTime < configuration.sunrise - configuration.nightOnBeforeSunrise) {
		newState = STATE_OFF;
		nextState = STATE_NIGHT;
		nextStateChange = configuration.sunrise - configuration.nightOnBeforeSunrise;
	} else if (currentTime < configuration.sunrise) {
		newState = STATE_NIGHT;
		nextState = STATE_DAY;
		nextStateChange = configuration.sunrise;
	} else if (currentTime < configuration.sunset) {
		newState = STATE_DAY;
		nextState = STATE_NIGHT;
		nextStateChange = configuration.sunset;
	} else if (currentTime < configuration.sunset + configuration.nightOnAfterSunset) {
		newState = STATE_NIGHT;
		nextState = STATE_OFF;
		nextStateChange = configuration.sunset + configuration.nightOnAfterSunset;
	} else {
		newState = STATE_OFF;
		nextState = STATE_OFF;
		currentTime = new Date();
		nextStateChange = new Date(getBaseDate() + 1000 * 60 * 60 * 24);
	}
	if (newState !== currentState) {
		process.send({
			destination: 'broadcast',
			type: 'scheduler.changeState',
			data: newState
		});
		currentState = newState;
	}

	// Schedule the next state change
	schedule.scheduleJob(new Date(nextStateChange), function () {
		setTimeout(function () {
			scheduleNextChange(configuration);
		}, 1000);
	});
}

process.send({
	destination: 'master',
	type: 'log',
	data: {
		level: 'info',
		message: 'Scheduler started'
	}
});

process.on('message', function (message) {
	var configuration;
	if (message.type === 'configuration.set') {
		configuration = message.data;
		if (configuration.mode === 'auto') {
			fetch(function (times) {
				scheduleNextChange({
					sunrise: times.sunrise + configuration.auto.sunriseOffset,
					sunset: times.sunset + configuration.auto.sunsetOffset,
					nightOnAfterSunset: configuration.nightOnAfterSunset * 60000,
					nightOnBeforeSunrise: configuration.nightOnBeforeSunrise * 60000
				});
			});
		} else if (configuration.mode === 'manual') {
			scheduleNextChange({
				sunrise: getBaseDate() + (configuration.manual.sunrise.hour * 60 + configuration.manual.sunrise.minute) * 60000,
				sunset: getBaseDate() + (configuration.manual.sunset.hour * 60 + configuration.manual.sunset.minute) * 60000,
				nightOnAfterSunset: configuration.nightOnAfterSunset * 60000,
				nightOnBeforeSunrise: configuration.nightOnBeforeSunrise * 60000
			});
		} else {
			throw new Error('Invalid mode "' + configuration.mode + '"');
		}
	}
});