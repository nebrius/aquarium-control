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
const moment = require("moment-timezone");
const async_1 = require("async");
const userInfoCache = {};
const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;
const TEMPERATURE_UPDATE_RATE = HOUR_IN_MS;
function getUsernameForUserId(userId) {
    return userInfoCache[userId].userName;
}
exports.getUsernameForUserId = getUsernameForUserId;
function getDeviceForUserId(userId) {
    return userInfoCache[userId].deviceId;
}
exports.getDeviceForUserId = getDeviceForUserId;
function getTimezoneForUserId(userId) {
    return userInfoCache[userId].timezone;
}
exports.getTimezoneForUserId = getTimezoneForUserId;
function getUser(userId) {
    return userInfoCache[userId];
}
exports.getUser = getUser;
function cleanup() {
    for (const userId in userInfoCache) {
        if (!userInfoCache.hasOwnProperty(userId)) {
            continue;
        }
        getMonthlyTemperatureHistory(userId, (err, samples) => {
            if (err) {
                console.error(err);
            }
        });
    }
}
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
        setInterval(cleanup, TEMPERATURE_UPDATE_RATE);
        cleanup();
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
    request(`SELECT TOP(1) * FROM ${util_1.DATABASE_NAMES.STATE} WHERE deviceId=@deviceId ORDER BY currentTime DESC`, [{
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
function getDailyTemperatureHistory(deviceId, cb) {
    request(`SELECT currentTime, currentTemperature FROM ${util_1.DATABASE_NAMES.STATE} WHERE deviceId=@deviceId ORDER BY currentTime`, [{
            name: 'deviceId',
            type: tedious_1.TYPES.VarChar,
            value: deviceId
        }], (err, rowCount, rows) => {
        if (err) {
            cb(err, undefined);
            return;
        }
        cb(undefined, rows.map((row) => {
            return {
                deviceId,
                temperature: parseFloat(row.currentTemperature.value),
                time: parseInt(row.currentTime.value, 10)
            };
        }));
    });
}
exports.getDailyTemperatureHistory = getDailyTemperatureHistory;
function getMonthlyTemperatureHistory(userId, cb) {
    const user = getUser(userId);
    const now = moment().tz(user.timezone);
    const startOfDay = moment.tz(`${util_1.toStringWithPadding(now.year(), 4)}-${util_1.toStringWithPadding(now.month() + 1, 2)}-${util_1.toStringWithPadding(now.date(), 2)}`, user.timezone);
    const monthEnd = startOfDay.unix() * 1000;
    const monthBegin = monthEnd - MONTH_IN_MS;
    async_1.waterfall([
        // Delete stale monthly samples
        (next) => {
            request(`DELETE FROM ${util_1.DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId AND time <= ${monthBegin}`, [{
                    name: 'deviceId',
                    type: tedious_1.TYPES.VarChar,
                    value: user.deviceId
                }], (err, rowCount, rows) => {
                next(err);
            });
        },
        // Calculate the up-to-date monthly samples
        (next) => {
            request(`SELECT currentTemperature, currentTime FROM ${util_1.DATABASE_NAMES.STATE} ` +
                `WHERE deviceId=@deviceId AND currentTime <= ${monthEnd} AND currentTime > ${monthBegin} ` +
                `ORDER BY currentTime`, [{
                    name: 'deviceId',
                    type: tedious_1.TYPES.VarChar,
                    value: user.deviceId
                }], (err, rowCount, rows) => {
                if (err) {
                    next(err);
                    return;
                }
                else if (!rowCount) {
                    next(undefined, []);
                    return;
                }
                let dayBucketTimestamp = monthEnd - DAY_IN_MS;
                const dayBuckets = [{
                        timestamp: dayBucketTimestamp,
                        samples: []
                    }];
                for (let i = rowCount - 1; i >= 0; i--) {
                    if (parseInt(rows[i].currentTime.value, 0) < dayBucketTimestamp) {
                        dayBucketTimestamp -= DAY_IN_MS;
                        if (dayBucketTimestamp < monthBegin) {
                            break;
                        }
                        dayBuckets.push({
                            timestamp: dayBucketTimestamp,
                            samples: []
                        });
                    }
                    dayBuckets[dayBuckets.length - 1].samples.push(parseFloat(rows[i].currentTemperature.value));
                }
                const samples = dayBuckets
                    .filter((dayBucket) => !!dayBucket.samples.length)
                    .map((dayBucket) => {
                    let low = Infinity;
                    let high = -Infinity;
                    for (const sample of dayBucket.samples) {
                        if (sample < low) {
                            low = sample;
                        }
                        if (sample > high) {
                            high = sample;
                        }
                    }
                    return { deviceId: user.deviceId, time: dayBucket.timestamp, low, high };
                });
                next(undefined, samples);
            });
        },
        // Save the updated monthly samples
        (samples, next) => {
            if (!samples.length) {
                next(undefined, false);
                return;
            }
            const values = samples.map((sample) => {
                return `('${sample.deviceId}', ${sample.time}, ${sample.low}, ${sample.high})`;
            }).join(', ');
            request(`INSERT INTO ${util_1.DATABASE_NAMES.TEMPERATURE} (deviceId, time, low, high) VALUES ${values}`, [], (err, rowCount, rows) => {
                next(err, !err);
            });
        },
        // Delete the old state samples
        (needsDelete, next) => {
            if (!needsDelete) {
                next(undefined);
                return;
            }
            request(`DELETE FROM ${util_1.DATABASE_NAMES.STATE} WHERE deviceId=@deviceId AND currentTime <= ${monthEnd}`, [{
                    name: 'deviceId',
                    type: tedious_1.TYPES.VarChar,
                    value: user.deviceId
                }], (err, rowCount, rows) => {
                next(err);
            });
        },
        // Fetch all monthly samples
        (next) => {
            request(`SELECT * FROM ${util_1.DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId ORDER BY time`, [{
                    name: 'deviceId',
                    type: tedious_1.TYPES.VarChar,
                    value: user.deviceId
                }], (err, rowCount, rows) => {
                next(err, rows.map((row) => {
                    return {
                        deviceId: row.deviceId.value,
                        time: parseInt(row.time.value, 10),
                        high: parseFloat(row.high.value),
                        low: parseFloat(row.low.value)
                    };
                }));
            });
        }
    ], cb);
}
exports.getMonthlyTemperatureHistory = getMonthlyTemperatureHistory;
//# sourceMappingURL=db.js.map