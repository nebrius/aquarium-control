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

var Logger = require('transport-logger');
var settings = require('../settings.json');

module.exports = new Logger([{
  destination: settings.logFile,
  minLevel: 'info',
  timestamp: true,
  prependLevel: true,
  colorize: false
}, {
  minLevel: 'trace',
  timestamp: true,
  prependLevel: true,
  colorize: true
}]);
