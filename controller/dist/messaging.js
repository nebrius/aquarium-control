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
const azure_iot_device_1 = require("azure-iot-device");
const azure_iot_device_mqtt_1 = require("azure-iot-device-mqtt");
const revalidator_1 = require("revalidator");
const IConfig_1 = require("./common/IConfig");
const state_1 = require("./state");
const equals = require("deep-equal");
function init(cb) {
    const IOT_HUB_DEVICE_CONNECTION_STRING = process.env.IOT_HUB_DEVICE_CONNECTION_STRING;
    if (typeof IOT_HUB_DEVICE_CONNECTION_STRING !== 'string') {
        throw new Error('Environment variable IOT_HUB_DEVICE_CONNECTION_STRING is not defined');
    }
    console.log('Connecting to IoT Hub');
    const client = azure_iot_device_1.Client.fromConnectionString(IOT_HUB_DEVICE_CONNECTION_STRING, azure_iot_device_mqtt_1.Mqtt);
    client.open((err) => {
        if (err) {
            cb(err);
            return;
        }
        client.on('error', (err) => console.error(err));
        client.on('disconnect', () => client.removeAllListeners());
        client.getTwin((err, twin) => {
            if (err || !twin) {
                cb(err || new Error('Could not get device Twin'));
                return;
            }
            twin.properties.reported.config = JSON.stringify(state_1.state.getState());
            // Read configuration changes from the cloud to the device
            twin.on('properties.desired', (desiredChange) => {
                // Validate the incoming data and see if there are any changes, if so save it
                const newConfig = JSON.parse(desiredChange.config);
                if (revalidator_1.validate(newConfig, IConfig_1.configValidationSchema).valid && !equals(state_1.state.getConfig(), newConfig)) {
                    state_1.state.setConfig(newConfig);
                }
                // Check if we don't need to acknowledge receipt of the changes and skip if so
                if (twin.properties.desired.$version === twin.properties.reported.$version) {
                    return;
                }
            });
            // Send state changes from the device to the cloud
            state_1.state.on('change-state', (newState) => {
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
            console.log('Connected to IoT Hub');
            cb(undefined);
        });
    });
}
exports.init = init;
//# sourceMappingURL=messaging.js.map