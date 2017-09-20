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

import { exists, writeFile } from 'fs';
import { dirname } from 'path';
import { Client, Message } from 'azure-iot-device';
import { Mqtt as Protocol } from 'azure-iot-device-mqtt';
import * as makeDir from 'make-dir';
import { IConfig } from './common/IConfig';
import { IState } from './common/IState';
import { state } from './state';

let client: Client;
let config: IConfig = {
  mode: 'override',
  overrideState: 'off',
  schedule: []
};

const CONFIG_FILE_PATH = '/var/local/aquarium-control/config.json';

export function getCurrentConfig(): IConfig {
  return config;
}

function saveConfig(cb: (err: Error | undefined) => void): void {
  writeFile(CONFIG_FILE_PATH, JSON.stringify(config, null, '  '), cb);
}

function connect(cb: (err: Error | undefined) => void): void {
  const IOT_HUB_DEVICE_CONNECTION_STRING = process.env.IOT_HUB_DEVICE_CONNECTION_STRING;
  if (typeof IOT_HUB_DEVICE_CONNECTION_STRING !== 'string') {
    throw new Error('Environment variable IOT_HUB_DEVICE_CONNECTION_STRING is not defined');
  }
  console.log('Connecting to IoT Hub');
  client = Client.fromConnectionString(IOT_HUB_DEVICE_CONNECTION_STRING, Protocol);
  client.open((err) => {
    if (err) {
      cb(err);
      return;
    }
    client.on('error', (err) => console.error(err));
    client.on('disconnect', () => client.removeAllListeners());
    console.log('Connected to IoT Hub');
    cb(undefined);

    state.on('change', (newState: IState) => {
      const message = new Message(JSON.stringify({
        type: 'state-updated',
        data: newState
      }));
      console.log('Sending message: ' + message.getData());
      client.sendEvent(message, (err, res) => {
        if (err) {
          console.error(`Send error: ${err}`);
        } else if (res) {
          console.log(`Send status: ${res.constructor.name}`);
        }
      });
    });
  });
}

export function init(cb: (err: Error | undefined) => void): void {
  exists(CONFIG_FILE_PATH, (exists) => {
    if (exists) {
      connect(cb);
      return;
    }
    makeDir(dirname(CONFIG_FILE_PATH)).then(() => {
      saveConfig((err) => {
        if (err) {
          cb(err);
          return;
        }
        connect(cb);
      })
    }).catch(cb);
  });
}
