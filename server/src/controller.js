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

var fs = require('fs').exec,

    STATE_DAY = 'day',
    STATE_NIGHT = 'night',

    DAY_GPIO = 10,
    NIGHT_GPIO = 9,

    RELAY_DELAY = 500,

    TRANSITION_STATE_READY = 1,
    TRANSITION_STATE_TRANSITIONING = 2,

    transitionState = TRANSITION_STATE_READY,
    newState,

    GPIO_PATH_PREFIX = '/sys/class/gpio';

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
  fs.writeFileSync(GPIO_PATH_PREFIX + '/gpio' + DAY_GPIO + '/direction', '1');
}

function turnDayOff() {
  fs.writeFileSync(GPIO_PATH_PREFIX + '/gpio' + DAY_GPIO + '/direction', '0');
}

function turnNightOn() {
  fs.writeFileSync(GPIO_PATH_PREFIX + '/gpio' + NIGHT_GPIO + '/direction', '1');
}

function turnNightOff() {
  fs.writeFileSync(GPIO_PATH_PREFIX + '/gpio' + NIGHT_GPIO + '/direction', '0');
}

// Initialize pins 19/GPIO10 (day) and 21/GPIO9 (night) as outputs
fs.writeFileSync(GPIO_PATH_PREFIX + '/export', DAY_GPIO);
fs.writeFileSync(GPIO_PATH_PREFIX + '/export', NIGHT_GPIO);
fs.writeFileSync(GPIO_PATH_PREFIX + '/gpio' + DAY_GPIO + '/direction', 'out');
fs.writeFileSync(GPIO_PATH_PREFIX + '/gpio' + NIGHT_GPIO + '/direction', 'out');
turnDayOff();
turnNightOff();

log('info', 'Controller started');

process.on('message', function (message) {
  turnDayOff();
  turnNightOff();
  newState = message.data;
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
});
