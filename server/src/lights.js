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

var logger = require('./logger.js');
var schedule = require('./schedule.js');
var raspi = require('raspi');
var gpio = require('raspi-gpio');
var config = schedule.getConfig();

var setStateAfterInit = null;
var initialized = false;
var dayPin = null;
var nightPin = null;

raspi.init(function(){
  dayPin = new gpio.DigitalOutput(config.pins.day);
  nightPin = new gpio.DigitalOutput(config.pins.night);
  initialized = true;
  if (setStateAfterInit) {
    exports.setState(setStateAfterInit);
  }
});

exports.setState = function setState(state) {
  switch(state) {
    case 'day':
      setDay();
      break;
    case 'night':
      setNight();
      break;
    case 'off':
      setOff();
      break;
    default:
      logger.error('A light change was requested for an invalid state "' + state +
        '". Must be one of "day", "night", or "off"');
  }
};

function setDay() {
  if (!initialized) {
    setStateAfterInit = 'day';
    return;
  }
  logger.info('Setting the lighting state to day');
  schedule.getStatus().state = 'day';
  dayPin.write(gpio.HIGH);
  nightPin.write(gpio.LOW);
}

function setNight() {
  if (!initialized) {
    setStateAfterInit = 'night';
    return;
  }
  logger.info('Setting the lighting state to night');
  schedule.getStatus().state = 'night';
  dayPin.write(gpio.LOW);
  nightPin.write(gpio.HIGH);
}

function setOff() {
  if (!initialized) {
    setStateAfterInit = 'off';
    return;
  }
  logger.info('Setting the lighting state to off');
  schedule.getStatus().state = 'off';
  dayPin.write(gpio.LOW);
  nightPin.write(gpio.LOW);
}
