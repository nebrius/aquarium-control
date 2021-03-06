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
import { getServerConfig } from './config';

const TEMPERATURE_REGEX = /t=([0-9]*)/;
const TEMPERATURE_UPDATE_RATE = 10000;
const TEMPERATURE_SAMPLE_SIZE = (5 * 60 * 1000) / TEMPERATURE_UPDATE_RATE;

export async function init(): Promise<void> {
  console.debug('[Device]: initializing module');
  return new Promise((resolve, reject) => {
    initRaspi(() => {
      const oneWire = new OneWire();
      oneWire.searchForDevices((searchErr, devices) => {
        if (searchErr || !devices) {
          if (typeof searchErr === 'string') {
            searchErr = new Error(searchErr);
          }
          console.warn(`[Device]: error searching for 1-wire devices, temperature logging will be disabled: ${searchErr}`);
        } else if (devices.length === 0) {
          console.warn('[Device]: no 1-Wire sensors found, temperature logging will be disabled');
        } else if (devices.length > 1) {
          console.warn('[Device]: multiple 1-Wire sensors found, did you connect more than one accidentally? Temperature logging will be disabled');
        } else if (devices[0][0] !== 40) {
          console.warn('[Device]: the connected 1-Wire device does not appear to be a DS18B20 temperature sensor, temperature logging will be disabled');
        } else {
          const temperatureSensorId = devices[0];
          let temperatureSamples: number[] = [];
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
        }

        const dayLed = new DigitalOutput(getServerConfig().dayPin);
        const nightLed = new DigitalOutput(getServerConfig().nightPin);

        function setState(newState: IState): void {
          switch (newState.currentState) {
            case 'day':
              console.log('[Device]: setting the state to "day"');
              dayLed.write(HIGH);
              nightLed.write(LOW);
              break;
            case 'night':
              console.log('[Device]: setting the state to "night"');
              dayLed.write(LOW);
              nightLed.write(HIGH);
              break;
            case 'off':
              dayLed.write(LOW);
              console.log('[Device]: setting the state to "off"');
              nightLed.write(LOW);
              break;
          }
        }
        state.on('change-state', setState);
        setState(state.getState());

        console.debug('[Device]: module initalized');
        resolve();
      });
    });
  });
}
