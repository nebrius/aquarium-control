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
let connection;
let isConnected = false;
const userInfoCache = {};
const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;
const TEMPERATURE_UPDATE_RATE = 4 * HOUR_IN_MS;
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
function connect(cb) {
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
    isConnected = false;
    connection.on('connect', (err) => {
        if (err) {
            cb(err);
            return;
        }
        isConnected = true;
        cb(undefined);
    });
    connection.on('error', (err) => {
        console.log(`Error with connection to Azure SQL: ${err.toString()}`);
        connection.close();
    });
    connection.on('end', (err) => {
        process.stdout.write('Disconnected from Azure SQL, reconnecting...');
        connect((err) => {
            if (err) {
                console.error(err);
            }
            else {
                process.stdout.write('connected\n');
            }
        });
    });
}
function init(cb) {
    console.log('Connecting to Azure SQL');
    connect((err) => {
        if (err) {
            console.error(err);
            cb(err);
        }
        else {
            console.log('Connected to Azure SQL');
            cb(undefined);
        }
        setInterval(() => {
            for (const userId in userInfoCache) {
                if (!userInfoCache.hasOwnProperty(userId)) {
                    continue;
                }
                getMonthlyTemperatureHistory(userId, (err, samples) => { });
            }
        }, TEMPERATURE_UPDATE_RATE);
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
        const query = `SELECT deviceId, timezone, userName FROM ${util_1.DATABASE_NAMES.USERS} WHERE facebookId=@userId`;
        const request = new tedious_1.Request(query, (err, rowCount, rows) => {
            done();
            if (err) {
                cb(err, undefined);
            }
            else if (rowCount === 0) {
                cb(undefined, false);
            }
            else if (rowCount === 1) {
                if (!rows[0].hasOwnProperty('deviceId') || !rows[0].hasOwnProperty('timezone') || !rows[0].hasOwnProperty('userName')) {
                    cb(new Error(`Received result without deviceId, userName, or timezone property`), undefined);
                }
                else {
                    userInfoCache[userId] = {
                        userId,
                        userName: rows[0].userName.value,
                        deviceId: rows[0].deviceId.value,
                        timezone: rows[0].timezone.value
                    };
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
function getState(deviceId, cb) {
    if (!isConnected) {
        throw new Error('Tried to get state while not connected to the database');
    }
    queueRequest((done) => {
        const query = `SELECT TOP(1) * FROM ${util_1.DATABASE_NAMES.STATE} WHERE deviceId=@deviceId ORDER BY currentTime DESC`;
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
function getDailyTemperatureHistory(deviceId, cb) {
    queueRequest((done) => {
        const query = `SELECT currentTime, currentTemperature FROM ${util_1.DATABASE_NAMES.STATE} WHERE deviceId=@deviceId ORDER BY currentTime`;
        const request = new tedious_1.Request(query, (err, rowCount, rows) => {
            done();
            if (err) {
                cb(err, undefined);
                return;
            }
            cb(undefined, rows.map((row) => {
                return {
                    deviceId,
                    temperature: parseFloat(row.currentTemperature.value),
                    time: parseInt(row.currentTime.value)
                };
            }));
        });
        request.addParameter('deviceId', tedious_1.TYPES.VarChar, deviceId);
        connection.execSql(request);
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
        // Calculate the up-to-date monthly samples
        (next) => {
            queueRequest((done) => {
                const query = `SELECT currentTemperature, currentTime FROM ${util_1.DATABASE_NAMES.STATE} ` +
                    `WHERE deviceId=@deviceId AND currentTime <= ${monthEnd} AND currentTime > ${monthBegin} ` +
                    `ORDER BY currentTime`;
                const request = new tedious_1.Request(query, (err, rowCount, rows) => {
                    done();
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
                        if (parseInt(rows[i].currentTime.value) < dayBucketTimestamp) {
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
                    const samples = dayBuckets.filter((dayBucket) => !!dayBucket.samples.length).map((dayBucket) => {
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
                request.addParameter('deviceId', tedious_1.TYPES.VarChar, user.deviceId);
                connection.execSql(request);
            });
        },
        // Save the updated monthly samples
        (samples, next) => {
            if (!samples.length) {
                next(undefined, false);
                return;
            }
            queueRequest((done) => {
                const values = samples.map((sample) => {
                    return `('${sample.deviceId}', ${sample.time}, ${sample.low}, ${sample.high})`;
                }).join(', ');
                const query = `INSERT INTO ${util_1.DATABASE_NAMES.TEMPERATURE} (deviceId, time, low, high) VALUES ${values}`;
                const request = new tedious_1.Request(query, (err, rowCount, rows) => {
                    done();
                    next(err, !err);
                });
                connection.execSql(request);
            });
        },
        // Delete the old state samples
        (needsDelete, next) => {
            if (!needsDelete) {
                next(undefined);
                return;
            }
            queueRequest((done) => {
                const query = `DELETE FROM ${util_1.DATABASE_NAMES.STATE} WHERE deviceId=@deviceId AND currentTime <= ${monthEnd}`;
                const request = new tedious_1.Request(query, (err, rowCount, rows) => {
                    done();
                    next(err);
                });
                request.addParameter('deviceId', tedious_1.TYPES.VarChar, user.deviceId);
                connection.execSql(request);
            });
        },
        // Delete stale monthly samples
        (next) => {
            queueRequest((done) => {
                const query = `DELETE FROM ${util_1.DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId AND time <= ${monthBegin}`;
                const request = new tedious_1.Request(query, (err, rowCount, rows) => {
                    done();
                    next(err);
                });
                request.addParameter('deviceId', tedious_1.TYPES.VarChar, user.deviceId);
                connection.execSql(request);
            });
        },
        // Fetch all monthly samples
        (next) => {
            queueRequest((done) => {
                const query = `SELECT * FROM ${util_1.DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId ORDER BY time`;
                const request = new tedious_1.Request(query, (err, rowCount, rows) => {
                    done();
                    next(err, rows.map((row) => {
                        return {
                            deviceId: row.deviceId.value,
                            time: parseInt(row.time.value),
                            high: parseFloat(row.high.value),
                            low: parseFloat(row.low.value)
                        };
                    }));
                });
                request.addParameter('deviceId', tedious_1.TYPES.VarChar, user.deviceId);
                connection.execSql(request);
            });
        }
    ], cb);
}
exports.getMonthlyTemperatureHistory = getMonthlyTemperatureHistory;
//# sourceMappingURL=db.js.map