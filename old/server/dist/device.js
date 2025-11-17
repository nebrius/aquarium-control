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
const TEMPERATURE_UPDATE_RATE = 10000;
const TEMPERATURE_SAMPLE_SIZE = (5 * 60 * 1000) / TEMPERATURE_UPDATE_RATE;
async function init() {
    console.debug('[Device]: initializing module');
    return new Promise((resolve, reject) => {
        raspi_1.init(() => {
            const oneWire = new raspi_onewire_1.OneWire();
            oneWire.searchForDevices((searchErr, devices) => {
                if (searchErr || !devices) {
                    if (typeof searchErr === 'string') {
                        searchErr = new Error(searchErr);
                    }
                    console.warn(`[Device]: error searching for 1-wire devices, temperature logging will be disabled: ${searchErr}`);
                }
                else if (devices.length === 0) {
                    console.warn('[Device]: no 1-Wire sensors found, temperature logging will be disabled');
                }
                else if (devices.length > 1) {
                    console.warn('[Device]: multiple 1-Wire sensors found, did you connect more than one accidentally? Temperature logging will be disabled');
                }
                else if (devices[0][0] !== 40) {
                    console.warn('[Device]: the connected 1-Wire device does not appear to be a DS18B20 temperature sensor, temperature logging will be disabled');
                }
                else {
                    const temperatureSensorId = devices[0];
                    let temperatureSamples = [];
                    let hasReportedFirstTemperature = false;
                    setInterval(() => {
                        oneWire.readAllAvailable(temperatureSensorId, (err, data) => {
                            if (err || !data) {
                                console.error(`[Device]: ${err}`);
                                return;
                            }
                            const match = TEMPERATURE_REGEX.exec(data.toString());
                            if (!match) {
                                console.error(`[Device]: invalid data received from sensor: ${data.toString()}`);
                                return;
                            }
                            const newTemperature = parseInt(match[1], 10) / 1000;
                            temperatureSamples.push(newTemperature);
                            if (!hasReportedFirstTemperature) {
                                hasReportedFirstTemperature = true;
                                state_1.state.setCurrentTemperature(newTemperature);
                            }
                            else if (temperatureSamples.length >= TEMPERATURE_SAMPLE_SIZE) {
                                // Take the median temperature and throw the rest away.
                                temperatureSamples.sort();
                                const currentTemperature = temperatureSamples[Math.floor(TEMPERATURE_SAMPLE_SIZE / 2)];
                                state_1.state.setCurrentTemperature(currentTemperature);
                                temperatureSamples = [];
                            }
                        });
                    }, TEMPERATURE_UPDATE_RATE);
                }
                const dayLed = new raspi_gpio_1.DigitalOutput(config_1.getServerConfig().dayPin);
                const nightLed = new raspi_gpio_1.DigitalOutput(config_1.getServerConfig().nightPin);
                function setState(newState) {
                    switch (newState.currentState) {
                        case 'day':
                            console.log('[Device]: setting the state to "day"');
                            dayLed.write(raspi_gpio_1.HIGH);
                            nightLed.write(raspi_gpio_1.LOW);
                            break;
                        case 'night':
                            console.log('[Device]: setting the state to "night"');
                            dayLed.write(raspi_gpio_1.LOW);
                            nightLed.write(raspi_gpio_1.HIGH);
                            break;
                        case 'off':
                            dayLed.write(raspi_gpio_1.LOW);
                            console.log('[Device]: setting the state to "off"');
                            nightLed.write(raspi_gpio_1.LOW);
                            break;
                    }
                }
                state_1.state.on('change-state', setState);
                setState(state_1.state.getState());
                console.debug('[Device]: module initalized');
                resolve();
            });
        });
    });
}
exports.init = init;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RldmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLGlDQUEwQztBQUMxQywyQ0FBc0Q7QUFDdEQsaURBQXdDO0FBRXhDLG1DQUFnQztBQUNoQyxxQ0FBMkM7QUFFM0MsTUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUM7QUFDdkMsTUFBTSx1QkFBdUIsR0FBRyxLQUFLLENBQUM7QUFDdEMsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsdUJBQXVCLENBQUM7QUFFbkUsS0FBSyxVQUFVLElBQUk7SUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsWUFBUyxDQUFDLEdBQUcsRUFBRTtZQUNiLE1BQU0sT0FBTyxHQUFHLElBQUksdUJBQU8sRUFBRSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxTQUFTLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ3pCLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO3dCQUNqQyxTQUFTLEdBQUcsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ2xDO29CQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsdUZBQXVGLFNBQVMsRUFBRSxDQUFDLENBQUM7aUJBQ2xIO3FCQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMseUVBQXlFLENBQUMsQ0FBQztpQkFDekY7cUJBQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtv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