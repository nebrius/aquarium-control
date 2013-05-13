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

var fs = require('fs'),
	path = require('path'),
	Logger = require('transport-logger'),
	logger,
	appSettings,
	userSettings;

appSettings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings', 'appsettings.json')));
userSettings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings', 'usersettings.json')));

if (!appSettings['log-file']) {
	throw new Error('"log-file" must be specified in app settings');
}
if (!appSettings['log-min-level']) {
	throw new Error('"log-min-level" must be specified in app settings');
}

logger = new Logger({
	file: appSettings['log-file'],
	minLevel: appSettings['log-min-level']
});

require('./scheduler').run(appSettings, userSettings, logger);
require('./server').run(appSettings, userSettings, logger);
