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
    return new Promise((resolve, reject) => {
        raspi_1.init(() => {
            const oneWire = new raspi_onewire_1.OneWire();
            oneWire.searchForDevices((searchErr, devices) => {
                if (searchErr || !devices) {
                    if (typeof searchErr === 'string') {
                        searchErr = new Error(searchErr);
                    }
                    console.warn(`Error searching for 1-wire devices, temperature logging will be disabled: ${searchErr}`);
                }
                else if (devices.length === 0) {
                    console.warn('No 1-Wire sensors found, temperature logging will be disabled');
                }
                else if (devices.length > 1) {
                    console.warn('Multiple 1-Wire sensors found, did you connect more than one accidentally? Temperature logging will be disabled');
                }
                else if (devices[0][0] !== 40) {
                    console.warn('The connected 1-Wire device does not appear to be a DS18B20 temperature sensor, temperature logging will be disabled');
                }
                else {
                    const temperatureSensorId = devices[0];
                    let temperatureSamples = [];
                    let hasReportedFirstTemperature = false;
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
                resolve();
            });
        });
    });
}
exports.init = init;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RldmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLGlDQUEwQztBQUMxQywyQ0FBc0Q7QUFDdEQsaURBQXdDO0FBRXhDLG1DQUFnQztBQUNoQyxxQ0FBMkM7QUFFM0MsTUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUM7QUFDdkMsTUFBTSx1QkFBdUIsR0FBRyxLQUFLLENBQUM7QUFDdEMsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsdUJBQXVCLENBQUM7QUFFbkUsS0FBSyxVQUFVLElBQUk7SUFDeEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxZQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSx1QkFBTyxFQUFFLENBQUM7WUFDOUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFO2dCQUM5QyxJQUFJLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDekIsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7d0JBQ2pDLFNBQVMsR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDbEM7b0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyw2RUFBNkUsU0FBUyxFQUFFLENBQUMsQ0FBQztpQkFDeEc7cUJBQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQywrREFBK0QsQ0FBQyxDQUFDO2lCQUMvRTtxQkFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLGlIQUFpSCxDQUFDLENBQUM7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