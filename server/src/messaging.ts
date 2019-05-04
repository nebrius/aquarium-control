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
import { EventHubClient, EventPosition } from '@azure/event-hubs';
import { IConfig } from './common/common';
import { updateState } from './db';
import { getEnvironmentVariable } from './util';

let registry: Registry;

export function init(cb: (err: Error | undefined) => void): void {
  console.debug('Initializing messaging module');
  doInit()
    .then(cb as any)
    .catch(cb);
}

async function doInit() {
  const IOT_HUB_CONNECTION_STRING = getEnvironmentVariable('IOT_HUB_CONNECTION_STRING');
  registry = Registry.fromConnectionString(IOT_HUB_CONNECTION_STRING);

  const client = await EventHubClient.createFromIotHubConnectionString(IOT_HUB_CONNECTION_STRING);
  const hubInfo = await client.getHubRuntimeInformation();
  console.log(`Connected to IoT Hub at ${hubInfo.path}`);

  client.receive(
    '1',
    (eventData) => { // on 'message
      if (eventData.annotations) {
        const enqueuedTime = eventData.annotations['x-opt-enqueued-time'];
        console.debug(`Received message from IoT Hub, enqueued at ${enqueuedTime}`);
      } else {
        console.debug(`Received message from IoT Hub`);
      }
      updateState(eventData.body);
    },
    (error) => {
      console.error(`Error receiving message from Event Hubs: ${error}`);
    },
    {
      eventPosition: EventPosition.fromEnqueuedTime(Date.now())
    }
  );
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
