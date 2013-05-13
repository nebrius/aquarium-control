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

exports.run = function run(appSettings, usersettings, logger) {
	var schedule = require('node-schedule'),
		times = require('./times');

	function scheduleSunrise(time) {
		schedule.scheduleJob(time, function () {
		});
	}

	function scheduleSunset(time) {
		schedule.scheduleJob(time, function () {
			scheduleUpdate();
		});
	}

	function scheduleUpdate() {
		var currentTime = new Date(),
			scheduledTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDay(), 1);
		if (currentTime.getHour() > 1) {
			scheduledTime = new Date(scheduledTime.getTime() + 24 * 60 * 1000);
		}
		schedule.scheduleJob(scheduledTime, processTimes);
	}

	function processTimes() {
		times.fetch(function (results) {
			var currentTime = Date.now();
			if (results.sunrise.getTime() > currentTime) {
				scheduleSunrise(results.sunrise);
			} else if (results.sunset.getTime() > currentTime) {
				scheduleSunset(results.sunset);
			} else {
				scheduleUpdate();
			}
		});
	}

	processTimes();
};