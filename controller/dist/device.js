"use strict";
/*
Copyright (C) 2013-2017 Bryan Hughes <bryan@nebri.us>

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
Object.defineProperty(exports, "__esModule", { value: true });
const raspi_1 = require("raspi");
const raspi_gpio_1 = require("raspi-gpio");
const raspi_onewire_1 = require("raspi-onewire");
const state_1 = require("./state");
const config_1 = require("./config");
const TEMPERATURE_REGEX = /t=([0-9]*)/;
function init(cb) {
    raspi_1.init(() => {
        const oneWire = new raspi_onewire_1.OneWire();
        oneWire.searchForDevices((err, devices) => {
            if (err || !devices) {
                if (typeof err === 'string') {
                    err = new Error(err);
                }
                cb(err);
                return;
            }
            if (devices.length === 0) {
                cb(new Error('No 1-Wire sensors found'));
                return;
            }
            if (devices.length > 1) {
                cb(new Error('Multiple 1-Wire sensors found, did you connect more than one accidentally?'));
                return;
            }
            if (devices[0][0] !== 40) {
                cb(new Error('The connected 1-Wire device does not appear to be a DS18B20 temperature sensor'));
                return;
            }
            const temperatureSensorId = devices[0];
            setInterval(() => {
                oneWire.readAllAvailable(temperatureSensorId, (err, data) => {
                    if (err || !data) {
                        console.error(err);
                        return;
                    }
                    const match = TEMPERATURE_REGEX.exec(data.toString());
                    if (!match) {
                        console.error(`Invalid data received from sensor: ${data.toString()}`);
                        return;
                    }
                    state_1.state.setCurrentTemperature(parseInt(match[1]) / 1000);
                });
            }, config_1.TEMPERATURE_UPDATE_RATE);
            const dayLed = new raspi_gpio_1.DigitalOutput(config_1.DAY_PIN);
            const nightLed = new raspi_gpio_1.DigitalOutput(config_1.NIGHT_PIN);
            function setState(state) {
                switch (state.currentState) {
                    case 'day':
                        console.log('Setting the state to "day"');
                        dayLed.write(raspi_gpio_1.HIGH);
                        nightLed.write(raspi_gpio_1.LOW);
                        break;
                    case 'night':
                        console.log('Setting the state to "night"');
                        dayLed.write(raspi_gpio_1.LOW);
                        nightLed.write(raspi_gpio_1.HIGH);
                        break;
                    case 'off':
                        dayLed.write(raspi_gpio_1.LOW);
                        console.log('Setting the state to "off"');
                        nightLed.write(raspi_gpio_1.LOW);
                        break;
                }
            }
            state_1.state.on('change-state', setState);
            setState(state_1.state.getState());
            cb(undefined);
        });
    });
}
exports.init = init;
//# sourceMappingURL=device.js.map