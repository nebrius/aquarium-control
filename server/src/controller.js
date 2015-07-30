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

var raspi = require('raspi');
var gpio = require('raspi-gpio');

var STATE_DAY = 'day';
var STATE_NIGHT = 'night';
var DAY_GPIO = 'GPIO3';
var NIGHT_GPIO = 'GPIO2';
var RELAY_DELAY = 50;
var TRANSITION_STATE_READY = 1;
var TRANSITION_STATE_TRANSITIONING = 2;

var transitionState = TRANSITION_STATE_READY;
var newState;
var dayLight;
var nightLight;
var initialized = false;
var initialState = 'off';

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

function turnDayOn() {
  dayLight.write(gpio.LOW);
}

function turnDayOff() {
  dayLight.write(gpio.HIGH);
}

function turnNightOn() {
  nightLight.write(gpio.LOW);
}

function turnNightOff() {
  nightLight.write(gpio.HIGH);
}

function setState(newState) {
  turnDayOff();
  turnNightOff();
  if (transitionState == TRANSITION_STATE_READY) {
    transitionState = TRANSITION_STATE_TRANSITIONING;
    setTimeout(function () {
      switch(newState) {
        case STATE_DAY:
          turnDayOn();
          break;
        case STATE_NIGHT:
          turnNightOn();
          break;
      }
      transitionState = TRANSITION_STATE_READY;
    }, RELAY_DELAY);
  }
}

process.on('message', function (message) {
  if (message.type == 'lights.set') {
    newState = message.data;
    if (!initialized) {
      initialState = newState;
    } else {
      setState(newState);
    }
  }
});

raspi.init(function() {
  log('info', 'Controller started');
  initialized = true;
  dayLight = new gpio.DigitalOutput(DAY_GPIO);
  nightLight = new gpio.DigitalOutput(NIGHT_GPIO);
  setState(initialState);
});