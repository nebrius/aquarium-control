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

// import { IConfig } from './common/IConfig';
import { IState } from './common/IState';
import { state } from './state';
import { Client, Message } from 'azure-iot-device';
import { Mqtt as Protocol } from 'azure-iot-device-mqtt';

let client: Client;

// export function getCurrentConfig(): IConfig {
//   return {

//   };
// }

function sendMessage(payload: string, cb: (err: string | Error | undefined) => void): void {
  const message = new Message(payload);
  console.log('Sending message: ' + message.getData());
  client.sendEvent(message, (err, res) => {
    if (err) {
      console.error(`Send error: ${err}`);
    } else if (res) {
      console.log(`Send status: ${res.constructor.name}`);
    }
  });
}

export function init() {
  const IOT_HUB_DEVICE_CONNECTION_STRING = process.env.IOT_HUB_DEVICE_CONNECTION_STRING;
  if (typeof IOT_HUB_DEVICE_CONNECTION_STRING !== 'string') {
    throw new Error('Environment variable IOT_HUB_DEVICE_CONNECTION_STRING is not defined');
  }
  console.log('Connecting to IoT Hub');
  client = Client.fromConnectionString(IOT_HUB_DEVICE_CONNECTION_STRING, Protocol);
  client.open((err) => {
    if (err) {
      console.error(`Could not connect to IoT Hub: ${err}`);
      return;
    }
    client.on('error', (err) => console.error(err));
    client.on('disconnect', () => client.removeAllListeners());
    console.log('Connected to IoT Hub');

    state.on('change', (newState: IState) => {
      sendMessage(JSON.stringify(newState), () => {});
    });
  });
}
