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
function run() {
    const IOT_HUB_CONNECTION_STRING = process.env.IOT_HUB_CONNECTION_STRING;
    if (typeof IOT_HUB_CONNECTION_STRING !== 'string') {
        throw new Error('Environment variable IOT_HUB_DEVICE_CONNECTION_STRING is not defined');
    }
    console.log('Connecting to Event Hub');
    const registry = azure_iothub_1.Registry.fromConnectionString(IOT_HUB_CONNECTION_STRING);
    // List devices
    console.log('**listing devices...');
    registry.list((err, deviceList) => {
        if (err || !deviceList) {
            console.error(err);
            return;
        }
        deviceList.forEach((device) => {
            let key = '<no primary key>';
            if (device.authentication && device.authentication.symmetricKey) {
                key = device.authentication.symmetricKey.primaryKey;
            }
            console.log(`${device.deviceId}: ${key}`);
        });
        function printAndContinue(op, next) {
            return function printResult(err, deviceInfo, res) {
                if (err)
                    console.log(op + ' error: ' + err.toString());
                if (res)
                    console.log(op + ' status: ' + res.statusCode + ' ' + res.statusMessage);
                if (deviceInfo)
                    console.log(op + ' device info: ' + JSON.stringify(deviceInfo));
                if (next)
                    next();
            };
        }
        // Create a new device
        var device = {
            deviceId: 'sample-device-' + Date.now()
        };
        console.log('\n**creating device \'' + device.deviceId + '\'');
        registry.create(device, printAndContinue('create', () => {
            // Get the newly-created device
            console.log('\n**getting device \'' + device.deviceId + '\'');
            registry.get(device.deviceId, printAndContinue('get', () => {
                // Delete the new device
                console.log('\n**deleting device \'' + device.deviceId + '\'');
                registry.delete(device.deviceId, printAndContinue('delete', () => { }));
            }));
        }));
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map