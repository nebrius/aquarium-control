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

var fs = require('fs');
var path = require('path');
var schedulePath = path.join(__dirname, '..', 'settings', 'schedule.json');
var schedule = require(schedulePath);
var status = {};
var callbacks = [];

exports.getSchedule = function getSchedule() {
  return schedule;
};

exports.setSchedule = function setSchedule(newSchedule) {
  schedule = newSchedule;
  fs.writeFileSync(schedulePath, JSON.stringify(schedule, null, '  '));
  callbacks.forEach(function (cb) {
    cb();
  });
};

exports.getStatus = function getStatus() {
  return status;
};

exports.setStatus = function setStatus(newStatus) {
  status = newStatus;
};

exports.onScheduleChanged = function onScheduleChanged(cb) {
  callbacks.push(cb);
};
