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
const DAY_IN_MS = 24 * 60 * 60 * 1000;
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
            encrypt: true,
            rowCollectionOnDone: true,
            database: getEnvironmentVariable('AZURE_SQL_DATABASE')
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
        throw new Error('Tried to get config while not connected to the database');
    }
}
exports.getConfig = getConfig;
function getState(deviceId, cb) {
    if (!isConnected) {
        throw new Error('Tried to get state while not connected to the database');
    }
}
exports.getState = getState;
function getTemperatureHistory(deviceId, period, cb) {
    if (!isConnected) {
        throw new Error('Tried to get day temperature while not connected to the database');
    }
    const rows = [];
    let cutoffDate = Date.now();
    switch (period) {
        case 'day':
            cutoffDate -= DAY_IN_MS;
            break;
        case 'week':
            cutoffDate -= DAY_IN_MS * 7;
            break;
        default:
            throw new Error(`Invalid period "${period}"`);
    }
    const request = new tedious_1.Request(`SELECT currentTime, currentTemperature FROM aquarium_state WHERE currentTime >= ${cutoffDate} ORDER BY currentTime`, (err, rowCount) => {
        if (err) {
            cb(err, undefined);
            return;
        }
        if (rows.length !== rowCount) {
            cb(new Error('Supplied row count does not match number of rows returned'), undefined);
        }
        else {
            cb(undefined, rows);
        }
    });
    request.on('row', (columns) => {
        let date = null;
        let temperature = NaN;
        for (const column of columns) {
            switch (column.metadata.colName) {
                case "currentTime":
                    date = new Date(parseInt(column.value));
                    break;
                case "currentTemperature":
                    temperature = parseFloat(column.value);
                    break;
                default:
                    cb(new Error(`Received unknown column "${column.metadata.colName}" in database record`), undefined);
                    return;
            }
        }
        if (date === null) {
            cb(new Error('Date missing in database record'), undefined);
            return;
        }
        if (temperature === NaN) {
            cb(new Error('Temperature missing in database record'), undefined);
            return;
        }
        rows.push({
            date,
            temperature
        });
    });
    connection.execSql(request);
}
exports.getTemperatureHistory = getTemperatureHistory;
//# sourceMappingURL=db.js.map