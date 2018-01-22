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

import { Registry, Twin } from 'azure-iothub';
import { Client, Receiver, Message } from 'azure-event-hubs';
import { IConfig } from './common/IConfig';
import { updateState } from './db';

let registry: Registry;

export function init(cb: (err: Error | undefined) => void): void {
  const IOT_HUB_CONNECTION_STRING = process.env.IOT_HUB_CONNECTION_STRING;
  if (typeof IOT_HUB_CONNECTION_STRING !== 'string') {
    throw new Error('Environment variable IOT_HUB_DEVICE_CONNECTION_STRING is not defined');
  }
  registry = Registry.fromConnectionString(IOT_HUB_CONNECTION_STRING);

  const client = Client.fromConnectionString(IOT_HUB_CONNECTION_STRING);
  client.open()
    .then(client.getPartitionIds.bind(client))
    .then((partitionIds: any) =>
      partitionIds.map((partitionId: Client.PartitionId) =>
        client.createReceiver('$Default', partitionId, {
          startAfterTime: Date.now()
        }).then((receiver: Receiver) => {
          console.log('Created partition receiver: ' + partitionId);
          receiver.on('errorReceived', (err) => console.error(err));
          receiver.on('message', (message: Message) => updateState(message.body));
        })
      ))
    .catch((err) => console.error(err));
  setImmediate(cb);
}

export function getConfig(
  deviceId: string,
  cb: (err: Error | undefined, config: IConfig | undefined, isConfigUpToDate: boolean | undefined) => void
): void {
  registry.getTwin(deviceId, (err, twin: Twin) => {
    if (err) {
      cb(err, undefined, undefined);
      return;
    }
    try {
      const config: IConfig = JSON.parse(twin.properties.desired.config);
      cb(undefined, config, twin.properties.desired.$version === twin.properties.reported.$version);
    } catch (e) {
      cb(e, undefined, undefined);
    }
  });
}

export function setConfig(deviceId: string, config: IConfig, cb: (err: Error | undefined) => void): void {
  const patch = {
    properties: {
      desired: {
        config: JSON.stringify(config)
      }
    }
  };
  registry.updateTwin(deviceId, patch, '*', cb);
}
