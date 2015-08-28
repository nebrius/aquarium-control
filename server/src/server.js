/*
  Copyright (C) 2013-2015  Bryan Hughes <bryan@theoreticalideations.com>

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
var schedule = require('./schedule.js');
var logger = require('./logger.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, '..', '..', 'client-dist')));
app.use(bodyParser.json());

app.get('/api/schedule', function (req, res) {
  logger.info('Serving the schedule to the web client');
  res.send(schedule.getSchedule());
});

app.post('/api/schedule', function(req, res) {
  logger.info('Updating the schedule from the web client');
  schedule.setSchedule(req.body);
  res.send('ok');
});

app.get('/api/status', function(req, res) {
  var status = schedule.getStatus();
  var clonedStatus = {};
  for (var p in status) {
    if (status.hasOwnProperty(p)) {
      clonedStatus[p] = status[p];
    }
  }
  clonedStatus.time = Date.now();
  res.send(clonedStatus);
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  logger.info('Aquarium control server listening on port ' + port);
});
