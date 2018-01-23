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

import { Client, Message } from 'azure-iot-device';
import { Mqtt as Protocol } from 'azure-iot-device-mqtt';
import { validate } from 'revalidator';
import { IConfig, configValidationSchema } from './common/IConfig';
import { IState } from './common/IState';
import { state } from './state';

import equals = require('deep-equal');

export function init(cb: (err: Error | undefined) => void): void {
  const IOT_HUB_DEVICE_CONNECTION_STRING = process.env.IOT_HUB_DEVICE_CONNECTION_STRING;
  if (typeof IOT_HUB_DEVICE_CONNECTION_STRING !== 'string') {
    throw new Error('Environment variable IOT_HUB_DEVICE_CONNECTION_STRING is not defined');
  }
  console.log('Connecting to IoT Hub');
  const client = Client.fromConnectionString(IOT_HUB_DEVICE_CONNECTION_STRING, Protocol);
  client.open((openErr) => {
    if (openErr) {
      cb(openErr);
      return;
    }

    client.on('error', (err) => console.error(err));
    client.on('disconnect', () => client.removeAllListeners());

    client.getTwin((getTwinErr, twin) => {
      if (getTwinErr || !twin) {
        cb(getTwinErr || new Error('Could not get device Twin'));
        return;
      }

      twin.properties.reported.config = JSON.stringify(state.getState());

      // Read configuration changes from the cloud to the device
      twin.on('properties.desired', (desiredChange) => {

        // Validate the incoming data and see if there are any changes, if so save it
        const newConfig: IConfig = JSON.parse(desiredChange.config);
        if (validate(newConfig, configValidationSchema).valid && !equals(state.getConfig(), newConfig)) {
          state.setConfig(newConfig);
        }

        // Check if we don't need to acknowledge receipt of the changes and skip if so
        if (twin.properties.desired.$version === twin.properties.reported.$version) {
          return;
        }
      });

      // Send state changes from the device to the cloud
      state.on('change-state', (newState: IState) => {
        const message = new Message(JSON.stringify(newState));
        console.log('Sending message: ' + message.getData());
        client.sendEvent(message, (err, res) => {
          if (err) {
            console.error(`Send error: ${err}`);
          } else if (res) {
            console.log(`Send status: ${res.constructor.name}`);
          }
        });
      });

      console.log('Connected to IoT Hub');
      cb(undefined);
    });
  });
}
