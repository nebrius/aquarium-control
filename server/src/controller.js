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

var path = require('path'),
	exec = require('child_process').exec,

	STATE_OFF = 'off',
	STATE_DAY = 'day',
	STATE_NIGHT = 'night',

	driverPath = path.join(__dirname, '..', '..', 'driver', 'driver.py');

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

exec(driverPath + ' off');

log('info', 'Controller started');

process.on('message', function (message) {
	if (message.type === 'lights.set') {
		process.send({
			destination: 'master',
			type: 'log',
			data: {
				level: 'info',
				message: 'State change: ' + message.data
			}
		});
		switch(message.data) {
			case STATE_OFF:
				exec(driverPath + ' off');
				break;
			case STATE_DAY:
				exec(driverPath + ' day');
				break;
			case STATE_NIGHT:
				exec(driverPath + ' night');
				break;
		}
	}
});
