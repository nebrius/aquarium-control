#!/usr/bin/env node
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

var program = require('commander');
var fs = require('fs');
var path = require('path');

var DEFAULT_CONFIG = '/etc/aquarium-control/config.json';

program
  .version(require('../../package.json').version)
  .option(
    '-c, --config [config]',
    'Specify the location of the config file. Defaults to ' + DEFAULT_CONFIG,
    DEFAULT_CONFIG
  )
  .parse(process.argv);

if (!fs.existsSync(program.config)) {
  console.error('No config file found at "' + program.config + '"');
  process.exit(1);
}
var config = fs.readFileSync(program.config);
try {
  config = JSON.parse(config);
} catch(e) {
  console.error('Could not parse ' + type + ' file: ' + e);
  process.exit(1);
}
config.configPath = path.resolve(program.config);

require('../src/schedule.js').setConfig(config);
require('../src/server.js');
require('../src/controller.js');
