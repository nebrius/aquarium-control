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
const sqlite3_1 = require("sqlite3");
const fs_1 = require("fs");
const util_2 = require("util");
const path_1 = require("path");
const mkdirp = require("mkdirp");
var Table;
(function (Table) {
    Table["STATE"] = "state";
    Table["TEMPERATURE"] = "temperature_history";
    Table["CLEANING"] = "cleaning";
    Table["TESTING"] = "testing";
    Table["CONFIG"] = "config";
})(Table || (Table = {}));
let dailyTemperatureCache;
const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;
const TIMEZONE = util_1.getEnvironmentVariable('TIMEZONE');
const SQLITE_DATABASE_PATH = util_1.getEnvironmentVariable('SQLITE_DATABASE_PATH');
let db;
async function createDB() {
    console.debug('Database does not currently exist, creating...');
    if (!db) {
        throw new Error('Internal Error: query called without being initialized');
    }
    const run = util_2.promisify(db.run.bind(db));
    await run(`CREATE TABLE ${Table.CONFIG} (
  config varchar(2048) not null
)`);
    const config = JSON.stringify({
        mode: 'program',
        overrideState: 'off',
        schedule: [{
                name: 'Sunrise',
                type: 'dynamic',
                state: 'day',
                details: {
                    event: 'sunrise'
                },
                id: 'c6b32451-5c4f-4a45-9577-aab3c10915d1'
            }, {
                name: 'Sunset',
                type: 'dynamic',
                state: 'night',
                details: {
                    event: 'sunset'
                },
                id: '8abb6bab-fc7b-49da-97fc-a494d79801fd'
            }, {
                name: 'Night',
                type: 'manual',
                state: 'off',
                details: {
                    hour: 23,
                    minute: 0
                },
                id: '75e4c852-bae1-4112-84c9-aac6df44964c'
            }]
    });
    await run(`INSERT INTO ${Table.CONFIG} (config) VALUES (?)`, [config]);
    await run(`CREATE TABLE ${Table.STATE} (
  currentTime bigint not null,
  currentTemperature float not null,
  currentState varchar(255) not null,
  currentMode varchar(255) not null,
  nextTransitionTime bigint not null,
  nextTransitionState varchar(255) not null
)`);
    await run(`CREATE TABLE ${Table.TEMPERATURE} (
  time bigint not null,
  low float not null,
  high float not null
)`);
    await run(`CREATE TABLE ${Table.CLEANING} (
  time bigint not null,
  bioFilterReplaced bit not null,
  mechanicalFilterReplaced bit not null,
  spongeReplaced bit not null
)`);
    await run(`CREATE TABLE ${Table.TESTING} (
  time bigint not null,
  ph float not null,
  ammonia int not null,
  nitrites int not null,
  nitrate int not null
)`);
}
async function init() {
    console.debug('Initializing database module');
    const dbExists = await util_2.promisify(fs_1.exists)(SQLITE_DATABASE_PATH);
    return new Promise(async (resolve, reject) => {
        if (!dbExists) {
            await util_2.promisify(mkdirp)(path_1.dirname(SQLITE_DATABASE_PATH));
        }
        db = new (sqlite3_1.verbose().Database)(SQLITE_DATABASE_PATH, async (err) => {
            if (err) {
                reject(err);
            }
            else {
                if (!dbExists) {
                    await createDB();
                }
                console.debug('Database module initalized');
                resolve();
            }
        });
    });
}
exports.init = init;
async function selectAll(table, orderBy) {
    return new Promise((resolve, reject) => {
        if (!db) {
            throw new Error('Internal Error: query called without being initialized');
        }
        let query = `SELECT * FROM ${table}`;
        if (orderBy) {
            query += ` ORDER BY ${orderBy}`;
        }
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}
async function updateEntry(table, values, where) {
    return new Promise((resolve, reject) => {
        if (!db) {
            throw new Error('Internal Error: query called without being initialized');
        }
        const arrayValues = [];
        for (const key in values) {
            arrayValues.push({
                key,
                value: values[key]
            });
        }
        const query = `IF NOT EXISTS(SELECT * FROM ${table} ${where ? `WHERE ${where}` : ''})
BEGIN
  INSERT INTO ${table}(
    ${arrayValues.map((entry) => entry.key).join(',\n    ')}
  )
  VALUES(
    ${arrayValues.map(() => '?').join(',\n    ')}
  )
END
ELSE
BEGIN
  UPDATE ${table} SET
    ${arrayValues.map((entry) => `${entry.key} = ?`).join(',\n    ')}
  ${where ? `WHERE ${where}` : ''}
END`;
        db.run(query, arrayValues.map((entry) => entry.value), (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
async function insertEntry(table, values) {
    return new Promise((resolve, reject) => {
        if (!db) {
            throw new Error('Internal Error: query called without being initialized');
        }
        const arrayValues = [];
        for (const key in values) {
            arrayValues.push({
                key,
                value: values[key]
            });
        }
        const query = `INSERT INTO ${table}(
    ${arrayValues.map((entry) => entry.key).join(',\n    ')}
  )
  VALUES(
    ${arrayValues.map(() => '?').join(',\n    ')}
  )`;
        db.run(query, arrayValues.map((entry) => entry.value), (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
async function deleteEntry(table, where) {
    return new Promise((resolve, reject) => {
        if (!db) {
            throw new Error('Internal Error: query called without being initialized');
        }
        let query = `DELETE FROM ${table}`;
        if (where) {
            query += ` WHERE ${where}`;
        }
        db.run(query, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
async function getState() {
    console.log(`Getting state`);
    const res = await selectAll(Table.STATE);
    if (res.length === 0) {
        return undefined;
    }
    else if (res.length > 1) {
        throw new Error(`Internal Error: more than one state entry returned`);
    }
    return res[0];
}
exports.getState = getState;
async function updateState(newState) {
    console.log(`Updating state`);
    await updateEntry(Table.STATE, newState);
    const startOfToday = util_1.getStartOfToday(TIMEZONE);
    const monthBegin = startOfToday - MONTH_IN_MS;
    // Skip updating if possible
    if (dailyTemperatureCache &&
        dailyTemperatureCache.time === startOfToday &&
        dailyTemperatureCache.low < newState.currentTemperature &&
        dailyTemperatureCache.high > newState.currentTemperature) {
        return;
    }
    const temperatureHistory = await selectAll(Table.TEMPERATURE, 'time DESC');
    // Check if we need to create a new entry
    const latestEntry = temperatureHistory[0];
    if (latestEntry.time !== startOfToday) {
        dailyTemperatureCache = {
            time: startOfToday,
            low: newState.currentTemperature,
            high: newState.currentTemperature
        };
        await deleteEntry(Table.TEMPERATURE, `time <= ${monthBegin}`);
        await insertEntry(Table.TEMPERATURE, {
            time: startOfToday,
            low: newState.currentTemperature,
            high: newState.currentTemperature
        });
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
        await updateEntry(Table.TEMPERATURE, {
            high: newState.currentTemperature
        }, `time=${startOfToday}`);
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
        await updateEntry(Table.TEMPERATURE, {
            high: newState.currentTemperature
        }, `time=${startOfToday}`);
    }
}
exports.updateState = updateState;
async function getConfig() {
    const rows = await selectAll(Table.CONFIG);
    if (rows.length === 0) {
        return undefined;
    }
    else if (rows.length === 1) {
        return JSON.parse(rows[0].config);
    }
    else {
        throw new Error(`Internal Error: more than one config entry returned.`);
    }
}
exports.getConfig = getConfig;
async function updateConfig(config) {
    await updateEntry(Table.CONFIG, {
        config: JSON.stringify(config)
    });
}
exports.updateConfig = updateConfig;
async function getTemperatureHistory() {
    return await selectAll(Table.TEMPERATURE, 'time');
}
exports.getTemperatureHistory = getTemperatureHistory;
async function getCleaningHistory() {
    return await selectAll(Table.CLEANING, 'time');
}
exports.getCleaningHistory = getCleaningHistory;
async function createCleaningEntry(cleaningEntry) {
    await insertEntry(Table.CLEANING, {
        time: cleaningEntry.time,
        bioFilterReplaced: cleaningEntry.bioFilterReplaced ? 1 : 0,
        mechanicalFilterReplaced: cleaningEntry.mechanicalFilterReplaced ? 1 : 0,
        spongeReplaced: cleaningEntry.spongeReplaced ? 1 : 0
    });
}
exports.createCleaningEntry = createCleaningEntry;
async function getTestingHistory() {
    return await selectAll(Table.TESTING, 'time');
}
exports.getTestingHistory = getTestingHistory;
async function createTestingEntry(cleaningEntry) {
    await insertEntry(Table.TESTING, cleaningEntry);
}
exports.createTestingEntry = createTestingEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7QUFHRixpQ0FBaUU7QUFDakUscUNBQTRDO0FBQzVDLDJCQUE0QjtBQUM1QiwrQkFBaUM7QUFDakMsK0JBQStCO0FBQy9CLGlDQUFpQztBQUVqQyxJQUFLLEtBTUo7QUFORCxXQUFLLEtBQUs7SUFDUix3QkFBZSxDQUFBO0lBQ2YsNENBQW1DLENBQUE7SUFDbkMsOEJBQXFCLENBQUE7SUFDckIsNEJBQW1CLENBQUE7SUFDbkIsMEJBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQU5JLEtBQUssS0FBTCxLQUFLLFFBTVQ7QUFPRCxJQUFJLHFCQUF5RCxDQUFDO0FBRTlELE1BQU0sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLE1BQU0sU0FBUyxHQUFHLEVBQUUsR0FBRyxVQUFVLENBQUM7QUFDbEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztBQUVuQyxNQUFNLFFBQVEsR0FBRyw2QkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwRCxNQUFNLG9CQUFvQixHQUFHLDZCQUFzQixDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFNUUsSUFBSSxFQUF3QixDQUFDO0FBRTdCLEtBQUssVUFBVSxRQUFRO0lBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztJQUNoRSxJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO0tBQzNFO0lBQ0QsTUFBTSxHQUFHLEdBQUcsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXZDLE1BQU0sR0FBRyxDQUNYLGdCQUFnQixLQUFLLENBQUMsTUFBTTs7RUFFMUIsQ0FB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