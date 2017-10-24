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
const util_1 = require("./util");
const tedious_1 = require("tedious");
let connection;
let isConnected = false;
const userInfoCache = {};
const DAY_IN_MS = 24 * 60 * 60 * 1000;
function init(cb) {
    console.log('Connecting to Azure SQL');
    connection = new tedious_1.Connection({
        userName: util_1.getEnvironmentVariable('AZURE_SQL_USERNAME'),
        password: util_1.getEnvironmentVariable('AZURE_SQL_PASSWORD'),
        server: util_1.getEnvironmentVariable('AZURE_SQL_SERVER'),
        options: {
            encrypt: true,
            rowCollectionOnRequestCompletion: true,
            useColumnNames: true,
            database: util_1.getEnvironmentVariable('AZURE_SQL_DATABASE')
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
let isQueryRequestPending = false;
const queryRequests = [];
function pump() {
    if (isQueryRequestPending) {
        return;
    }
    const nextRequest = queryRequests.shift();
    if (nextRequest) {
        isQueryRequestPending = true;
        nextRequest(() => {
            isQueryRequestPending = false;
            pump();
        });
    }
}
function queueRequest(operation) {
    queryRequests.push(operation);
    pump();
}
function isUserRegistered(userId, cb) {
    if (!isConnected) {
        throw new Error('Tried to see if user is registered while not connected to the database');
    }
    if (userInfoCache[userId]) {
        setImmediate(() => cb(undefined, true));
        return;
    }
    queueRequest((done) => {
        const query = `SELECT deviceId FROM aquarium_users WHERE facebookId=@userId`;
        const request = new tedious_1.Request(query, (err, rowCount, rows) => {
            done();
            if (err) {
                cb(err, undefined);
            }
            else if (rowCount === 0) {
                cb(undefined, false);
            }
            else if (rowCount === 1) {
                if (!rows[0].hasOwnProperty('deviceId') || !rows[0].deviceId.value) {
                    cb(new Error(`Received result without deviceId property`), undefined);
                }
                else {
                    userInfoCache[userId] = rows[0].deviceId.value;
                    cb(undefined, true);
                }
            }
            else {
                cb(new Error(`More than one user found for user ID ${userId}`), undefined);
            }
        });
        request.addParameter('userId', tedious_1.TYPES.VarChar, userId);
        connection.execSql(request);
    });
}
exports.isUserRegistered = isUserRegistered;
function getDeviceForUserId(userId) {
    return userInfoCache[userId];
}
exports.getDeviceForUserId = getDeviceForUserId;
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
    queueRequest((done) => {
        const query = `SELECT TOP(1) * FROM aquarium_state WHERE deviceId=@deviceId ORDER BY currentTime DESC`;
        const request = new tedious_1.Request(query, (err, rowCount, rows) => {
            done();
            if (err) {
                cb(err, undefined);
            }
            else if (rowCount === 0) {
                cb(undefined, undefined);
            }
            else if (rowCount === 1) {
                const state = {
                    deviceId,
                    currentTime: parseInt(rows[0].currentTime.value),
                    currentTemperature: rows[0].currentTemperature.value,
                    currentState: rows[0].currentState.value,
                    currentMode: rows[0].currentMode.value,
                    nextTransitionTime: parseInt(rows[0].nextTransitionTime.value),
                    nextTransitionState: rows[0].nextTransitionState.value
                };
                cb(undefined, state);
            }
            else {
                cb(new Error(`Internal Error: more than one state entry returned.`), undefined);
            }
        });
        request.addParameter('deviceId', tedious_1.TYPES.VarChar, deviceId);
        connection.execSql(request);
    });
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