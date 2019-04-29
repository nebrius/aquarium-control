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
const async_1 = require("async");
const userInfoCache = {};
const dailyTemperatureCache = {};
const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;
function getUsernameForUserId(userId) {
    return userInfoCache[userId].userName;
}
exports.getUsernameForUserId = getUsernameForUserId;
function getDeviceForUserId(userId) {
    return userInfoCache[userId].deviceId;
}
exports.getDeviceForUserId = getDeviceForUserId;
function getUserIdForDeviceId(deviceId) {
    for (const userId in userInfoCache) {
        if (!userInfoCache.hasOwnProperty(userId)) {
            continue;
        }
        if (userInfoCache[userId].deviceId === deviceId) {
            return userId;
        }
    }
    return undefined; // User is missing for some reason
}
exports.getUserIdForDeviceId = getUserIdForDeviceId;
function getTimezoneForUserId(userId) {
    return userInfoCache[userId].timezone;
}
exports.getTimezoneForUserId = getTimezoneForUserId;
function getUser(userId) {
    return userInfoCache[userId];
}
exports.getUser = getUser;
function init(cb) {
    request(`SELECT facebookId, deviceId, timezone, userName FROM ${util_1.DATABASE_NAMES.USERS}`, [], (err, rowCount, rows) => {
        if (err) {
            cb(err);
            return;
        }
        for (const row of rows) {
            if (!row.hasOwnProperty('facebookId') ||
                !row.hasOwnProperty('deviceId') ||
                !row.hasOwnProperty('timezone') ||
                !row.hasOwnProperty('userName')) {
                cb(new Error(`Received result without facebookId, deviceId, userName, or timezone property`));
                return;
            }
            userInfoCache[row.facebookId.value] = {
                userId: row.facebookId.value,
                userName: row.userName.value,
                deviceId: row.deviceId.value,
                timezone: row.timezone.value
            };
        }
        cb(undefined);
    });
}
exports.init = init;
function request(query, parameters, cb) {
    const connection = new tedious_1.Connection({
        userName: util_1.getEnvironmentVariable('AZURE_SQL_USERNAME'),
        password: util_1.getEnvironmentVariable('AZURE_SQL_PASSWORD'),
        server: util_1.getEnvironmentVariable('AZURE_SQL_SERVER'),
        options: {
            encrypt: true,
            rowCollectionOnRequestCompletion: true,
            useColumnNames: true,
            database: util_1.getEnvironmentVariable('AZURE_SQL_DATABASE'),
            requestTimeout: 0
        }
    });
    connection.on('connect', (err) => {
        if (err) {
            cb(err, 0, []);
            return;
        }
        const req = new tedious_1.Request(query, cb);
        for (const parameter of parameters) {
            req.addParameter(parameter.name, parameter.type, parameter.value);
        }
        connection.execSql(req);
    });
}
function isUserRegistered(userId) {
    return !!userInfoCache[userId];
}
exports.isUserRegistered = isUserRegistered;
function getState(deviceId, cb) {
    request(`SELECT * FROM ${util_1.DATABASE_NAMES.STATE} WHERE deviceId=@deviceId`, [{
            name: 'deviceId',
            type: tedious_1.TYPES.VarChar,
            value: deviceId
        }], (err, rowCount, rows) => {
        if (err) {
            cb(err, undefined);
        }
        else if (rowCount === 0) {
            cb(undefined, undefined);
        }
        else if (rowCount === 1) {
            const state = {
                deviceId,
                currentTime: parseInt(rows[0].currentTime.value, 10),
                currentTemperature: rows[0].currentTemperature.value,
                currentState: rows[0].currentState.value,
                currentMode: rows[0].currentMode.value,
                nextTransitionTime: parseInt(rows[0].nextTransitionTime.value, 10),
                nextTransitionState: rows[0].nextTransitionState.value
            };
            cb(undefined, state);
        }
        else {
            cb(new Error(`Internal Error: more than one state entry returned.`), undefined);
        }
    });
}
exports.getState = getState;
function updateState(newState, cb) {
    console.log(`Updating state for ${newState.deviceId}`);
    request(`IF NOT EXISTS(SELECT * FROM current_state WHERE deviceId=@deviceId)
BEGIN
  INSERT INTO ${util_1.DATABASE_NAMES.STATE}(
    deviceId,
    currentTime,
    currentTemperature,
    currentState,
    currentMode,
    nextTransitionTime,
    nextTransitionState
  )
  VALUES(
    @deviceId,
    ${newState.currentTime},
    ${newState.currentTemperature},
    '${newState.currentState}',
    '${newState.currentMode}',
    ${newState.nextTransitionTime},
    '${newState.nextTransitionState}'
  )
END
ELSE
BEGIN
  UPDATE ${util_1.DATABASE_NAMES.STATE} SET
    currentTime=${newState.currentTime},
    currentTemperature=${newState.currentTemperature},
    currentState='${newState.currentState}',
    currentMode='${newState.currentMode}',
    nextTransitionTime=${newState.nextTransitionTime},
    nextTransitionState='${newState.nextTransitionState}'
  WHERE deviceId=@deviceId
END`, [{
            name: 'deviceId',
            type: tedious_1.TYPES.VarChar,
            value: newState.deviceId
        }], (stateErr) => {
        if (stateErr) {
            if (cb) {
                cb(stateErr);
            }
            return;
        }
        const userId = getUserIdForDeviceId(newState.deviceId);
        if (!userId) {
            throw new Error(`Internal Error: unknown user ID ${userId}`);
        }
        const startOfToday = util_1.getStartOfToday(getUser(userId).timezone);
        const monthBegin = startOfToday - MONTH_IN_MS;
        const dailyCache = dailyTemperatureCache[newState.deviceId];
        // Skip updating if possible
        if (dailyCache &&
            dailyCache.time === startOfToday &&
            dailyCache.low < newState.currentTemperature &&
            dailyCache.high > newState.currentTemperature) {
            if (cb) {
                cb(stateErr);
            }
            return;
        }
        async_1.waterfall([
            // Fetch the data from the DB
            (next) => request(`SELECT * FROM ${util_1.DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId ORDER BY time DESC`, [{
                    name: 'deviceId',
                    type: tedious_1.TYPES.VarChar,
                    value: newState.deviceId
                }], (err, rowCount, rows) => {
                if (err) {
                    next(err, undefined);
                    return;
                }
                const temperatureHistory = rows.map((row) => ({
                    time: parseInt(row.time.value, 10),
                    high: parseFloat(row.high.value),
                    low: parseFloat(row.low.value)
                }));
                next(undefined, temperatureHistory);
            }),
            // Update the data in the DB
            (data, next) => {
                const latestEntry = data[0];
                // Check if we need to create a new entry
                if (latestEntry.time !== startOfToday) {
                    dailyTemperatureCache[newState.deviceId] = {
                        time: startOfToday,
                        low: newState.currentTemperature,
                        high: newState.currentTemperature
                    };
                    async_1.waterfall([
                        (deleteNext) => request(`DELETE FROM ${util_1.DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId AND time <= ${monthBegin}`, [{
                                name: 'deviceId',
                                type: tedious_1.TYPES.VarChar,
                                value: newState.deviceId
                            }], (err, rowCount, rows) => deleteNext(err)),
                        (insertNext) => request(`INSERT INTO ${util_1.DATABASE_NAMES.TEMPERATURE} (deviceId, time, low, high) ` +
                            `VALUES (@deviceId, ${startOfToday}, ${newState.currentTemperature}, ${newState.currentTemperature})`, [{
                                name: 'deviceId',
                                type: tedious_1.TYPES.VarChar,
                                value: newState.deviceId
                            }], (err, rowCount, rows) => insertNext(err))
                    ], next);
                    // Create the new entry
                    // Else check if we need to update the high temperature
                }
                else if (latestEntry.high < newState.currentTemperature) {
                    if (!dailyTemperatureCache[newState.deviceId]) {
                        dailyTemperatureCache[newState.deviceId] = {
                            time: startOfToday,
                            low: newState.currentTemperature,
                            high: newState.currentTemperature
                        };
                    }
                    dailyTemperatureCache[newState.deviceId].high = newState.currentTemperature;
                    request(`UPDATE ${util_1.DATABASE_NAMES.TEMPERATURE} ` +
                        `SET high=${newState.currentTemperature} ` +
                        `WHERE deviceId=@deviceId AND time=${startOfToday}`, [{
                            name: 'deviceId',
                            type: tedious_1.TYPES.VarChar,
                            value: newState.deviceId
                        }], (updateErr) => next(updateErr));
                    // Else check if we need to update the low temperature
                }
                else if (latestEntry.low > newState.currentTemperature) {
                    if (!dailyTemperatureCache[newState.deviceId]) {
                        dailyTemperatureCache[newState.deviceId] = {
                            time: startOfToday,
                            low: newState.currentTemperature,
                            high: newState.currentTemperature
                        };
                    }
                    dailyTemperatureCache[newState.deviceId].low = newState.currentTemperature;
                    request(`UPDATE ${util_1.DATABASE_NAMES.TEMPERATURE} ` +
                        `SET low=${newState.currentTemperature} ` +
                        `WHERE deviceId=@deviceId AND time=${startOfToday}`, [{
                            name: 'deviceId',
                            type: tedious_1.TYPES.VarChar,
                            value: newState.deviceId
                        }], (updateErr) => next(updateErr));
                }
                else {
                    next(undefined);
                }
            }
        ], cb);
    });
}
exports.updateState = updateState;
function getTemperatureHistory(userId, cb) {
    const user = getUser(userId);
    request(`SELECT * FROM ${util_1.DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId ORDER BY time`, [{
            name: 'deviceId',
            type: tedious_1.TYPES.VarChar,
            value: user.deviceId
        }], (err, rowCount, rows) => {
        if (err) {
            cb(err, undefined);
            return;
        }
        cb(undefined, rows.map((row) => ({
            deviceId: row.deviceId.value,
            time: parseInt(row.time.value, 10),
            high: parseFloat(row.high.value),
            low: parseFloat(row.low.value)
        })));
    });
}
exports.getTemperatureHistory = getTemperatureHistory;
//# sourceMappingURL=db.js.map