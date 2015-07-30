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

var path = require('path');
var fs = require('fs');
var express = require('express');

var DEFAULT_PORT = 8080;

var configuration;
var configurationPath = path.join(__dirname, '..', 'settings', 'usersettings.json');
var appConfiguration;

var app;
var lightState = 'off';

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
  fs.writeFileSync(configurationPath, JSON.stringify(configuration, null, '  '));
  process.send({
    destination: 'broadcast',
    type: 'configuration.set',
    data: configuration
  });
}

function validateScheduleEntry(request, response) {
  var attributes = request.body;

  if (typeof attributes.id != 'number') {
    response.send(400, 'ScheduleEntryModel validation error: id must be a number');
    return false;
  }

  if (typeof attributes.name != 'string') {
    response.send(400, 'ScheduleEntryModel validation error: name must be a string');
    return false;
  }

  // Validate the type
  if (attributes.type != 'dynamic' && attributes.type != 'manual') {
    response.send(400, 'ScheduleEntryModel validation error: type must be "dynamic" or "manual"');
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
  if (attributes.type == 'dynamic' &&
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
    throw new Error('ScheduleEntryModel validation error: time must be an object');
  }
  if (isNaN(attributes.time.hours) || attributes.time.hours < 0 || attributes.time.hours > 23) {
    throw new Error('ScheduleEntryModel validation error: time.hours must be a number between 0 and 23');
  }

  return true;
}

function lookupScheduleEntryLocation(id) {
  var entries = configuration.scheduleEntries,
      len = entries.length;
  for (var i = 0; i < len; i++) {
    if (entries[i].id === id) {
      return i;
    }
  }
  return NaN;
}

function lookupScheduleEntry(id) {
  var idx = lookupScheduleEntryLocation(id);
  if (!isNaN(idx)) {
    return configuration.scheduleEntries[idx];
  }
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
  log('error', 'Configuration file is invalid: ' + e);
  process.exit(1);
}

// Create the static site
app = express();
app.use(express.static(path.join(__dirname, '..', 'templates')));
app.use(express.json());

// **** Create the API endpoints ****

// Get the status summary
app.get('/api/app', function (request, response) {
  log('info', 'Serving the app summary');
  response.send({
    time: new Date().toString(),
    state: lightState,
    mode: configuration.mode,
    overrideState: configuration.overrideState
  });
});

app.post('/api/app', function (request, response) {
  log('info', 'Setting the mode');
  var attributes = request.body;
  if (attributes.mode != 'program' && attributes.mode != 'override') {
    response.send(400, 'ScheduleEntryModel validation error: program must be either "program" or "override"');
    return;
  }
  if (['day', 'night', 'off'].indexOf(attributes.overrideState) == -1) {
    response.send(400, 'ScheduleEntryModel validation error: overrideState must be either "day", "night", or "off');
    return;
  }
  configuration.mode = attributes.mode;
  configuration.overrideState = attributes.overrideState;
  saveConfiguration();
  response.send(200, 'OK');
});

// Get the list of schedule entries
app.get('/api/schedule', function (request, response) {
  log('info', 'Serving the list of scheduled entries');
  response.send(configuration.scheduleEntries);
});

// Get a single schedule entry
app.get('/api/schedule/:id', function (request, response) {
  var requestId = parseInt(request.params.id, 10),
      entry = lookupScheduleEntry(requestId);
  if (!entry) {
    log('error', 'Invalid request, schedule entry id "' + requestId + '" was not found');
    response.send(400, 'Invalid request');
  } else {
    log('info', 'Serving the scheduled entry with id "' + requestId + '"');
    response.send(entry);
  }
});

// Update a schedule entry
app.put('/api/schedule/:id', function (request, response) {
  var requestId = request.body.id,
      oldEntryIdx = lookupScheduleEntryLocation(requestId);
  if (!validateScheduleEntry(request, response)) {
    return;
  }
  if (!isNaN(oldEntryIdx)) {
    log('info', 'Updating existing schedule entry with id "' + requestId + '": ' + JSON.stringify(request.body, null, '  '));
    configuration.scheduleEntries[oldEntryIdx] = request.body;
  } else {
    log('info', 'Creating new schedule entry with id "' + requestId + '": ' + JSON.stringify(request.body, null, '  '));
    configuration.scheduleEntries.push(request.body);
  }
  saveConfiguration();
  response.send(200, 'OK');
});

// Delete a schedule entry
app.delete('/api/schedule/:id', function (request, response) {
  var requestId = parseInt(request.params.id, 10),
      entryIdx = lookupScheduleEntryLocation(requestId);
  if (isNaN(entryIdx)) {
    log('error', 'Invalid request, schedule entry id "' + requestId + '" was not found');
    response.send(400, 'Invalid request');
    return;
  }
  log('info', 'Deleting the scheduled entry with id "' + requestId + '"');
  configuration.scheduleEntries.splice(entryIdx, 1);
  saveConfiguration();
  response.send(200, 'OK');
});

// **** Start the server ****

// Start the server
app.listen(appConfiguration.port || DEFAULT_PORT);
log('info', 'Configuration started on port ' + appConfiguration.port || DEFAULT_PORT);

// Save the configuration
saveConfiguration();
