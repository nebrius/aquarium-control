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
const azure_iothub_1 = require("azure-iothub");
// import { updateState } from './db';
let registry;
function init(cb) {
    const IOT_HUB_CONNECTION_STRING = process.env.IOT_HUB_CONNECTION_STRING;
    if (typeof IOT_HUB_CONNECTION_STRING !== 'string') {
        throw new Error('Environment variable IOT_HUB_DEVICE_CONNECTION_STRING is not defined');
    }
    registry = azure_iothub_1.Registry.fromConnectionString(IOT_HUB_CONNECTION_STRING);
    // const client = Client.fromConnectionString(IOT_HUB_CONNECTION_STRING);
    // client.open()
    //   .then(client.getPartitionIds.bind(client))
    //   .then((partitionIds: any) =>
    //     partitionIds.map((partitionId: Client.PartitionId) =>
    //       client.createReceiver('$Default', partitionId, {
    //         startAfterTime: Date.now()
    //       }).then((receiver: Receiver) => {
    //         console.log('Created partition receiver: ' + partitionId);
    //         receiver.on('errorReceived', (err: Error) => console.error(err));
    //         receiver.on('message', (message: Message) => updateState(message.body));
    //       })
    //     ))
    //   .catch((err: Error) => console.error(err));
    setImmediate(cb);
}
exports.init = init;
function getConfig(deviceId, cb) {
    registry.getTwin(deviceId, (err, twin) => {
        if (err) {
            cb(err, undefined, undefined);
            return;
        }
        try {
            const config = JSON.parse(twin.properties.desired.config);
            cb(undefined, config, twin.properties.desired.$version === twin.properties.reported.$version);
        }
        catch (e) {
            cb(e, undefined, undefined);
        }
    });
}
exports.getConfig = getConfig;
function setConfig(deviceId, config, cb) {
    const patch = {
        properties: {
            desired: {
                config: JSON.stringify(config)
            }
        }
    };
    registry.updateTwin(deviceId, patch, '*', cb);
}
exports.setConfig = setConfig;
//# sourceMappingURL=messaging.js.map