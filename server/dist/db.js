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
let dailyTemperatureCache;
const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;
const SQL_SERVER = util_1.getEnvironmentVariable('SQL_SERVER');
const SQL_USERNAME = util_1.getEnvironmentVariable('SQL_USERNAME');
const SQL_PASSWORD = util_1.getEnvironmentVariable('SQL_PASSWORD');
const SQL_DATABASE = util_1.getEnvironmentVariable('SQL_DATABASE');
const SQL_PORT = parseInt(util_1.getEnvironmentVariable('SQL_PORT'), 10);
const TIMEZONE = util_1.getEnvironmentVariable('TIMEZONE');
function init(cb) {
    console.debug('Initializing database module');
    cb(undefined);
}
exports.init = init;
const requestQueue = [];
let requestProcessing = false;
function request(query, cb) {
    requestQueue.push({
        query,
        cb
    });
    requestPump();
}
function requestPump() {
    if (requestProcessing || !requestQueue.length) {
        return;
    }
    const { query, cb } = requestQueue.shift();
    console.debug(`Connecting to database`);
    requestProcessing = true;
    const connection = new tedious_1.Connection({
        server: SQL_SERVER,
        authentication: {
            type: 'default',
            options: {
                userName: SQL_USERNAME,
                password: SQL_PASSWORD
            }
        },
        options: {
            encrypt: true,
            rowCollectionOnRequestCompletion: true,
            useColumnNames: true,
            database: SQL_DATABASE,
            requestTimeout: 0,
            port: SQL_PORT
        }
    }); // Note: the signature for tedious Request changed recently, but they haven't updated the docs yet apparently
    connection.on('connect', (err) => {
        if (err) {
            cb(err, 0, []);
            return;
        }
        console.debug(`Connected...executing query`);
        const req = new tedious_1.Request(query, (err, rowCount, rows) => {
            console.debug(`Closing conenction`);
            connection.close();
            cb(err, rowCount, rows);
            requestProcessing = false;
            setImmediate(requestPump);
        });
        connection.execSql(req);
    });
    connection.on('error', (err) => {
        console.error(err);
    });
}
function getState(cb) {
    request(`SELECT * FROM ${util_1.DATABASE_NAMES.STATE}`, (err, rowCount, rows) => {
        if (err) {
            cb(err, undefined);
        }
        else if (rowCount === 0) {
            cb(undefined, undefined);
        }
        else if (rowCount === 1) {
            const state = {
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
    console.log(`Updating state`);
    request(`IF NOT EXISTS(SELECT * FROM current_state)
BEGIN
  INSERT INTO ${util_1.DATABASE_NAMES.STATE}(
    currentTime,
    currentTemperature,
    currentState,
    currentMode,
    nextTransitionTime,
    nextTransitionState
  )
  VALUES(
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
END`, (stateErr) => {
        if (stateErr) {
            if (cb) {
                cb(stateErr);
            }
            return;
        }
        const startOfToday = util_1.getStartOfToday(TIMEZONE);
        const monthBegin = startOfToday - MONTH_IN_MS;
        // Skip updating if possible
        if (dailyTemperatureCache &&
            dailyTemperatureCache.time === startOfToday &&
            dailyTemperatureCache.low < newState.currentTemperature &&
            dailyTemperatureCache.high > newState.currentTemperature) {
            if (cb) {
                cb(stateErr);
            }
            return;
        }
        async_1.waterfall([
            // Fetch the data from the DB
            (next) => request(`SELECT * FROM ${util_1.DATABASE_NAMES.TEMPERATURE} ORDER BY time DESC`, (err, rowCount, rows) => {
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
                    dailyTemperatureCache = {
                        time: startOfToday,
                        low: newState.currentTemperature,
                        high: newState.currentTemperature
                    };
                    async_1.waterfall([
                        (deleteNext) => request(`DELETE FROM ${util_1.DATABASE_NAMES.TEMPERATURE} WHERE time <= ${monthBegin}`, (err, rowCount, rows) => deleteNext(err)),
                        (insertNext) => request(`INSERT INTO ${util_1.DATABASE_NAMES.TEMPERATURE} (time, low, high) ` +
                            `VALUES (${startOfToday}, ${newState.currentTemperature}, ${newState.currentTemperature})`, (err, rowCount, rows) => insertNext(err))
                    ], next);
                    // Create the new entry
                    // Else check if we need to update the high temperature
                }
                else if (latestEntry.high < newState.currentTemperature) {
                    if (!dailyTemperatureCache) {
                        dailyTemperatureCache = {
                            time: startOfToday,
                            low: newState.currentTemperature,
                            high: newState.currentTemperature
                        };
                    }
                    dailyTemperatureCache.high = newState.currentTemperature;
                    request(`UPDATE ${util_1.DATABASE_NAMES.TEMPERATURE} ` +
                        `SET high=${newState.currentTemperature} ` +
                        `WHERE time=${startOfToday}`, (updateErr) => next(updateErr));
                    // Else check if we need to update the low temperature
                }
                else if (latestEntry.low > newState.currentTemperature) {
                    if (!dailyTemperatureCache) {
                        dailyTemperatureCache = {
                            time: startOfToday,
                            low: newState.currentTemperature,
                            high: newState.currentTemperature
                        };
                    }
                    dailyTemperatureCache.low = newState.currentTemperature;
                    request(`UPDATE ${util_1.DATABASE_NAMES.TEMPERATURE} ` +
                        `SET low=${newState.currentTemperature} ` +
                        `WHERE time=${startOfToday}`, (updateErr) => next(updateErr));
                }
                else {
                    next(undefined);
                }
            }
        ], cb);
    });
}
exports.updateState = updateState;
function getConfig(cb) {
    request(`SELECT * FROM ${util_1.DATABASE_NAMES.CONFIG}`, (err, rowCount, rows) => {
        if (err) {
            cb(err, undefined);
            return;
        }
        else if (rowCount === 0) {
            cb(undefined, undefined);
        }
        else if (rowCount === 1) {
            let config;
            try {
                config = JSON.parse(rows[0].config);
                cb(undefined, config);
            }
            catch (e) {
                cb(e, undefined);
            }
        }
        else {
            cb(new Error(`Internal Error: more than one config entry returned.`), undefined);
        }
    });
}
exports.getConfig = getConfig;
function updateConfig(config, cb) {
    // const patch = {
    //   properties: {
    //     desired: {
    //       config: JSON.stringify(config)
    //     }
    //   }
    // };
    // registry.updateTwin(deviceId, patch, '*', cb);
    // TODO
    cb(new Error('Not implemented'));
}
exports.updateConfig = updateConfig;
function getTemperatureHistory(userId, cb) {
    request(`SELECT * FROM ${util_1.DATABASE_NAMES.TEMPERATURE} ORDER BY time`, (err, rowCount, rows) => {
        if (err) {
            cb(err, undefined);
            return;
        }
        cb(undefined, rows.map((row) => ({
            time: parseInt(row.time.value, 10),
            high: parseFloat(row.high.value),
            low: parseFloat(row.low.value)
        })));
    });
}
exports.getTemperatureHistory = getTemperatureHistory;
function getCleaningHistory(userId, cb) {
    request(`SELECT * FROM ${util_1.DATABASE_NAMES.CLEANING} ORDER BY time`, (err, rowCount, rows) => {
        if (err) {
            cb(err, undefined);
            return;
        }
        cb(undefined, rows.map((row) => ({
            time: parseInt(row.time.value, 10),
            bioFilterReplaced: row.bioFilterReplaced.value,
            mechanicalFilterReplaced: row.mechanicalFilterReplaced.value,
            spongeReplaced: row.spongeReplaced.value
        })));
    });
}
exports.getCleaningHistory = getCleaningHistory;
function createCleaningEntry(userId, cleaningEntry, cb) {
    request(`INSERT INTO ${util_1.DATABASE_NAMES.CLEANING} (
  time,
  bioFilterReplaced,
  mechanicalFilterReplaced,
  spongeReplaced
)
VALUES (
  ${cleaningEntry.time},
  ${cleaningEntry.bioFilterReplaced ? 1 : 0},
  ${cleaningEntry.mechanicalFilterReplaced ? 1 : 0},
  ${cleaningEntry.spongeReplaced ? 1 : 0}
)`, (err) => cb(err));
}
exports.createCleaningEntry = createCleaningEntry;
function getTestingHistory(userId, cb) {
    request(`SELECT * FROM ${util_1.DATABASE_NAMES.TESTING} ORDER BY time`, (err, rowCount, rows) => {
        if (err) {
            cb(err, undefined);
            return;
        }
        cb(undefined, rows.map((row) => ({
            time: parseInt(row.time.value, 10),
            ph: row.ph.value,
            ammonia: row.ammonia.value,
            nitrites: row.nitrites.value,
            nitrates: row.nitrates.value
        })));
    });
}
exports.getTestingHistory = getTestingHistory;
function createTestingEntry(userId, cleaningEntry, cb) {
    request(`INSERT INTO ${util_1.DATABASE_NAMES.TESTING} (
  time,
  ph,
  ammonia,
  nitrites,
  nitrates
)
VALUES (
  ${cleaningEntry.time},
  ${cleaningEntry.ph},
  ${cleaningEntry.ammonia},
  ${cleaningEntry.nitrites},
  ${cleaningEntry.nitrates}
)`, (err) => cb(err));
}
exports.createTestingEntry = createTestingEntry;
//# sourceMappingURL=db.js.map