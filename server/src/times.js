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
	request = require('request'),
	xml2js = require('xml2js');

/**
 * Fetches the time that sunrise and sunset will occur
 *
 * @param  {Function} callback The callback to call once the times have been fetched
 */
exports.fetch = function fetch(callback) {
	var date = new Date(),
		config = require(path.join(__dirname, '..', 'config', 'config.json')).timing;
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
					sunrise: new Date(parseDate + sunrise),
					sunset: new Date(parseDate + sunset)
				});
			});
		}
	});
};