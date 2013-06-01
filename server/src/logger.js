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

module.exports = {
	trace: function (message) {
		log('info', message);
	},
	debug: function (message) {
		log('info', message);
	},
	info: function (message) {
		log('info', message);
	},
	warn: function (message) {
		log('info', message);
	},
	error: function (message) {
		log('info', message);
	}
};