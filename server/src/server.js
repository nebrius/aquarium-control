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
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, '..', '..', 'client-dist')));
app.use(bodyParser.json());

app.get('/api/schedule', function (req, res) {
  res.send(schedule.getSchedule());
});

app.post('/api/schedule', function(req, res) {
  schedule.setSchedule(req.body);
  res.send('ok');
});

app.get('/api/status', function(req, res) {
  res.send(schedule.getStatus());
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Aquarium control server listening at http://%s:%s', host, port);
});
