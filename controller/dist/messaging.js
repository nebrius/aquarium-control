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
const fs_1 = require("fs");
const path_1 = require("path");
const azure_iot_device_1 = require("azure-iot-device");
const azure_iot_device_mqtt_1 = require("azure-iot-device-mqtt");
const makeDir = require("make-dir");
const state_1 = require("./state");
const config_1 = require("./config");
let client;
let config = {
    mode: 'override',
    overrideState: 'off',
    schedule: []
};
function getCurrentConfig() {
    return config;
}
exports.getCurrentConfig = getCurrentConfig;
function saveConfig(cb) {
    fs_1.writeFile(config_1.CONFIG_FILE_PATH, JSON.stringify(config, null, '  '), cb);
}
function connect(cb) {
    const IOT_HUB_DEVICE_CONNECTION_STRING = process.env.IOT_HUB_DEVICE_CONNECTION_STRING;
    if (typeof IOT_HUB_DEVICE_CONNECTION_STRING !== 'string') {
        throw new Error('Environment variable IOT_HUB_DEVICE_CONNECTION_STRING is not defined');
    }
    console.log('Connecting to IoT Hub');
    client = azure_iot_device_1.Client.fromConnectionString(IOT_HUB_DEVICE_CONNECTION_STRING, azure_iot_device_mqtt_1.Mqtt);
    client.open((err) => {
        if (err) {
            cb(err);
            return;
        }
        client.on('error', (err) => console.error(err));
        client.on('disconnect', () => client.removeAllListeners());
        client.on('message', (msg) => {
            console.log(JSON.parse(msg.getData().toString()));
            client.complete(msg, () => {
            });
        });
        console.log('Connected to IoT Hub');
        cb(undefined);
        state_1.state.on('change', (newState) => {
            const message = new azure_iot_device_1.Message(JSON.stringify(newState));
            console.log('Sending message: ' + message.getData());
            client.sendEvent(message, (err, res) => {
                if (err) {
                    console.error(`Send error: ${err}`);
                }
                else if (res) {
                    console.log(`Send status: ${res.constructor.name}`);
                }
            });
        });
    });
}
function init(cb) {
    fs_1.exists(config_1.CONFIG_FILE_PATH, (exists) => {
        if (exists) {
            connect(cb);
            return;
        }
        makeDir(path_1.dirname(config_1.CONFIG_FILE_PATH)).then(() => {
            saveConfig((err) => {
                if (err) {
                    cb(err);
                    return;
                }
                connect(cb);
            });
        }).catch(cb);
    });
}
exports.init = init;
//# sourceMappingURL=messaging.js.map