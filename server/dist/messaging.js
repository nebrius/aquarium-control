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
const event_hubs_1 = require("@azure/event-hubs");
const db_1 = require("./db");
const util_1 = require("./util");
let registry;
function init(cb) {
    console.debug('Initializing messaging module');
    doInit()
        .then(cb)
        .catch(cb);
}
exports.init = init;
async function doInit() {
    const IOT_HUB_CONNECTION_STRING = util_1.getEnvironmentVariable('IOT_HUB_CONNECTION_STRING');
    registry = azure_iothub_1.Registry.fromConnectionString(IOT_HUB_CONNECTION_STRING);
    const client = await event_hubs_1.EventHubClient.createFromIotHubConnectionString(IOT_HUB_CONNECTION_STRING);
    const hubInfo = await client.getHubRuntimeInformation();
    console.log(`Connected to IoT Hub at ${hubInfo.path}`);
    client.receive('1', (eventData) => {
        if (eventData.annotations) {
            const enqueuedTime = eventData.annotations['x-opt-enqueued-time'];
            console.debug(`Received message from IoT Hub, enqueued at ${enqueuedTime}`);
        }
        else {
            console.debug(`Received message from IoT Hub`);
        }
        db_1.updateState(eventData.body);
    }, (error) => {
        console.error(`Error receiving message from Event Hubs: ${error}`);
    }, {
        eventPosition: event_hubs_1.EventPosition.fromEnqueuedTime(Date.now())
    });
}
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