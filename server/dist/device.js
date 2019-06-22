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
const util_1 = require("./util");
const DAY_PIN = util_1.getEnvironmentVariable('DAY_PIN');
const NIGHT_PIN = util_1.getEnvironmentVariable('NIGHT_PIN');
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
                    reject(searchErr);
                    return;
                }
                if (devices.length === 0) {
                    reject(new Error('No 1-Wire sensors found'));
                    return;
                }
                if (devices.length > 1) {
                    reject(new Error('Multiple 1-Wire sensors found, did you connect more than one accidentally?'));
                    return;
                }
                if (devices[0][0] !== 40) {
                    reject(new Error('The connected 1-Wire device does not appear to be a DS18B20 temperature sensor'));
                    return;
                }
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
                const dayLed = new raspi_gpio_1.DigitalOutput(DAY_PIN);
                const nightLed = new raspi_gpio_1.DigitalOutput(NIGHT_PIN);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RldmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLGlDQUEwQztBQUMxQywyQ0FBc0Q7QUFDdEQsaURBQXdDO0FBRXhDLG1DQUFnQztBQUNoQyxpQ0FBZ0Q7QUFFaEQsTUFBTSxPQUFPLEdBQUcsNkJBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEQsTUFBTSxTQUFTLEdBQUcsNkJBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFdEQsTUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUM7QUFDdkMsTUFBTSx1QkFBdUIsR0FBRyxLQUFLLENBQUM7QUFDdEMsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsdUJBQXVCLENBQUM7QUFFbkUsS0FBSyxVQUFVLElBQUk7SUFDeEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxZQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSx1QkFBTyxFQUFFLENBQUM7WUFDOUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFO2dCQUM5QyxJQUFJLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDekIsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7d0JBQ2pDLFNBQVMsR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDbEM7b0JBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNsQixPQUFPO2lCQUNSO2dCQUVELElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENB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