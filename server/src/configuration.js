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
	fs = require('fs'),
	express = require('express'),

	DEFAULT_PORT = 8080,

	configuration,
	configurationPath = path.join(__dirname, '..', 'settings', 'usersettings.json'),
	appConfiguration,

	app,
	lightState = 'off';

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

function saveConfiguration() {
	fs.writeFileSync(configurationPath, JSON.stringify(configuration, false, '\t'));
	process.send({
		destination: 'broadcast',
		type: 'configuration.set',
		data: configuration
	});
}

function validateScheduleEntry(request, response) {
	var attributes = request.params;
	if (typeof attributes.title != 'string') {
		response.send(400, 'ScheduleEntryModel validation error: title must be a string');
		return false;
	}

	// Validate the type
	if (attributes.type != 'automatic' && attributes.type != 'manual') {
		response.send(400, 'ScheduleEntryModel validation error: type must be "automatic" or "manual"');
		return false;
	}

	// Validate the source
	if (typeof attributes.source != 'object') {
		response.send(400, 'ScheduleEntryModel validation error: source must be an object');
		return false;
	}
	if (attributes.source.set != 'morning' && attributes.source.set != 'evening') {
		response.send(400, 'ScheduleEntryModel validation error: source.set must be "morning" or "evening"');
		return false;
	}
	if (attributes.type == 'automatic' &&
			attributes.source.event != 'civil' &&
			attributes.source.event != 'nautical' &&
			attributes.source.event != 'astronomical' &&
			(attributes.source.set != 'morning' || attributes.source.event != 'sunrise') &&
			(attributes.source.set != 'evening' || attributes.source.event != 'sunset')) {
		response.send(400, 'ScheduleEntryModel validation error: invalid source.event value ' +
			attributes.source.event);
		return false;
	}

	// Validate the time
	if (typeof attributes.time != 'object') {
		response.send(400, 'ScheduleEntryModel validation error: time must be an object');
		return false;
	}
	if (typeof attributes.time.hour != 'number' ||
			attributes.time.hour < 0 ||
			attributes.time.hour > 23) {
		response.send(400, 'ScheduleEntryModel validation error: time.hour must be a number between 0 and 23');
		return false;
	}
	if (typeof attributes.time.minute != 'number' ||
			attributes.time.minute < 0 ||
			attributes.time.minute > 59) {
		response.send(400, 'ScheduleEntryModel validation error: time.minute must be a number between 0 and 59');
		return false;
	}
	return true;
}

// **** Initialize the server ****

// Listen for light messages for updating the status page
process.on('message', function (message) {
	if (message.type === 'lights.set') {
		lightState = message.data;
	}
});

// Load the configuration
try {
	configuration = JSON.parse(fs.readFileSync(configurationPath));
	appConfiguration = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings', 'appsettings.json')));
} catch(e) {
	log('error', 'Configuration file is invalid');
	process.exit(1);
}

// Create the static site
app = express();
app.use(express.static(path.join(__dirname, '..', 'templates')));

// **** Create the API endpoints ****

// Get the status summary
app.get('/api/status', function (request, response) {
	log('info', 'Serving the status summary');
	response.send({
		time: new Date().toString(),
		state: lightState
	});
});

// Get the list of schedule entries
app.get('/api/schedule_entries', function (request, response) {
	log('info', 'Serving the list of scheduled entries');
	response.send(configuration.scheduleEntries);
});

// Get a single schedule entry
app.get('/api/schedule_entries/:id', function (request, response) {
	var requestId = request.params.id;
	if (!configuration.scheduleEntries[requestId]) {
		log('error', 'Invalid request, schedule entry id "' + requestId + '" was not found');
		response.send(400, 'Invalid request');
	} else {
		log('info', 'Serving the scheduled entry with id "' + requestId + '"');
		response.send(configuration.scheduleEntries[requestId]);
	}
});

// Add a new schedule entry
app.post('/api/scedule_entries', function (request, response) {
	if (!validateScheduleEntry(request, response)) {
		return;
	}
	log('info', 'Creating new schedule entry: ' + JSON.stringify(request.params, false, '\t'));
	configuration.scheduleEntries.push(request.params);
	saveConfiguration();
	response.send(200, 'OK');
});

// Update a schedule entry
app.post('/api/scedule_entries/:id', function (request, response) {
	var requestId = request.params.id;
	if (!configuration.scheduleEntries[requestId]) {
		log('error', 'Invalid request, schedule entry id "' + requestId + '" was not found');
		response.send(400, 'Invalid request');
	}
	if (!validateScheduleEntry(request, response)) {
		return;
	}
	delete request.params.id;
	log('info', 'Updating existing schedule entry: ' + JSON.stringify(request.params, false, '\t'));
	configuration.scheduleEntries[requestId] = request.params;
	saveConfiguration();
	response.send(200, 'OK');
});

// Delete a schedule entry
app.delete('/api/schedule_entries/:id', function (request, response) {
	var requestId = request.params.id;
	if (!configuration.scheduleEntries[requestId]) {
		log('error', 'Invalid request, schedule entry id "' + requestId + '" was not found');
		response.send(400, 'Invalid request');
	}
	log('info', 'Deleting the scheduled entry with id "' + requestId + '"');
	configuration.scheduleEntries.splice(requestId, 1);
	saveConfiguration();
	response.send(200, 'OK');
});

// **** Start the server ****

// Start the server
app.listen(appConfiguration.port || DEFAULT_PORT);
log('info', 'Configuration started on port ' + appConfiguration.port || DEFAULT_PORT);

// Save the configuration
saveConfiguration();
