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
const tedious_1 = require("tedious");
let connection;
let isConnected = false;
function init(cb) {
    function getEnvironmentVariable(variable) {
        const value = process.env[variable];
        if (typeof value !== 'string') {
            throw new Error(`Environment variable ${variable} is not defined`);
        }
        return value;
    }
    console.log('Connecting to Azure SQL');
    connection = new tedious_1.Connection({
        userName: getEnvironmentVariable('AZURE_SQL_USERNAME'),
        password: getEnvironmentVariable('AZURE_SQL_PASSWORD'),
        server: getEnvironmentVariable('AZURE_SQL_SERVER'),
        options: {
            encrypt: true
        }
    });
    connection.on('connect', (err) => {
        if (err) {
            cb(err);
            return;
        }
        console.log('Connected to Azure SQL');
        isConnected = true;
        cb(undefined);
    });
}
exports.init = init;
function saveConfig(deviceId, config, cb) {
    if (!isConnected) {
        throw new Error('Tried to save config while not connected to the database');
    }
}
exports.saveConfig = saveConfig;
function getConfig(deviceId, cb) {
    if (!isConnected) {
        throw new Error('Tried to save config while not connected to the database');
    }
}
exports.getConfig = getConfig;
function getState(deviceId, cb) {
    if (!isConnected) {
        throw new Error('Tried to save config while not connected to the database');
    }
}
exports.getState = getState;
//# sourceMappingURL=db.js.map