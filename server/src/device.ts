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

import { init as initRaspi } from 'raspi';
import { DigitalOutput, LOW, HIGH } from 'raspi-gpio';
import { OneWire } from 'raspi-onewire';
import { IState } from './common/common';
import { state } from './state';
import { getEnvironmentVariable } from './util';

const DAY_PIN = getEnvironmentVariable('DAY_PIN');
const NIGHT_PIN = getEnvironmentVariable('NIGHT_PIN');

const TEMPERATURE_REGEX = /t=([0-9]*)/;
const TEMPERATURE_UPDATE_RATE = 10000;
const TEMPERATURE_SAMPLE_SIZE = (5 * 60 * 1000) / TEMPERATURE_UPDATE_RATE;

export async function init(): Promise<void> {
  return new Promise((resolve, reject) => {
    initRaspi(() => {
      const oneWire = new OneWire();
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
        let temperatureSamples: number[] = [];
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
              state.setCurrentTemperature(newTemperature);
            } else if (temperatureSamples.length >= TEMPERATURE_SAMPLE_SIZE) {
              // Take the median temperature and throw the rest away.
              temperatureSamples.sort();
              const currentTemperature = temperatureSamples[Math.floor(TEMPERATURE_SAMPLE_SIZE / 2)];
              state.setCurrentTemperature(currentTemperature);
              temperatureSamples = [];
            }
          });
        }, TEMPERATURE_UPDATE_RATE);

        const dayLed = new DigitalOutput(DAY_PIN);
        const nightLed = new DigitalOutput(NIGHT_PIN);

        function setState(newState: IState): void {
          switch (newState.currentState) {
            case 'day':
              console.log('Setting the state to "day"');
              dayLed.write(HIGH);
              nightLed.write(LOW);
              break;
            case 'night':
              console.log('Setting the state to "night"');
              dayLed.write(LOW);
              nightLed.write(HIGH);
              break;
            case 'off':
              dayLed.write(LOW);
              console.log('Setting the state to "off"');
              nightLed.write(LOW);
              break;
          }
        }
        state.on('change-state', setState);
        setState(state.getState());

        resolve();
      });
    });
  });
}
