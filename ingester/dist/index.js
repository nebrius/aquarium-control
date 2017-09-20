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
const azure_event_hubs_1 = require("azure-event-hubs");
function run() {
    const IOT_HUB_CONNECTION_STRING = process.env.IOT_HUB_CONNECTION_STRING;
    if (typeof IOT_HUB_CONNECTION_STRING !== 'string') {
        throw new Error('Environment variable IOT_HUB_DEVICE_CONNECTION_STRING is not defined');
    }
    console.log('Connecting to Event Hub');
    const client = azure_event_hubs_1.Client.fromConnectionString(IOT_HUB_CONNECTION_STRING);
    client.open()
        .then(client.getPartitionIds.bind(client))
        .then((partitionIds) => partitionIds.map((partitionId) => client.createReceiver('$Default', partitionId, { 'startAfterTime': Date.now() })
        .then((receiver) => {
        console.log(`Created partition receiver: ${partitionId}`);
        receiver.on('errorReceived', (err) => console.error(err));
        receiver.on('message', (message) => {
            console.log('Message received: ');
            console.log(message.body);
            // message.annotations['iothub-connection-device-id']
            // message.body
        });
    })))
        .catch((err) => console.error(err));
}
exports.run = run;
//# sourceMappingURL=index.js.map