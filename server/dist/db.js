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
const config_1 = require("./config");
const sqlite3_1 = require("sqlite3");
const fs_1 = require("fs");
const util_2 = require("util");
const path_1 = require("path");
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
const SQLITE_DATABASE_PATH = path_1.join(config_1.APP_DIR, 'db.sqlite');
const CONFIG_ID = 1;
const STATE_ID = 1;
let db;
async function createDB() {
    console.debug('[Database]: database does not currently exist, creating...');
    if (!db) {
        throw new Error('Internal Error: query called without being initialized');
    }
    const run = util_2.promisify(db.run.bind(db));
    await run(`CREATE TABLE ${Table.CONFIG} (
  id smallint primary key,
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
    // We use this ID so that REPLACE will always replace the old entry with new ones, instead of adding new rows
    await run(`INSERT INTO ${Table.CONFIG} (id, config) VALUES (?, ?)`, [CONFIG_ID, config]);
    await run(`CREATE TABLE ${Table.STATE} (
  id smallint primary key,
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
  nitrates int not null
)`);
}
async function init() {
    console.debug('[Database]: initializing module');
    const dbExists = await util_2.promisify(fs_1.exists)(SQLITE_DATABASE_PATH);
    return new Promise(async (resolve, reject) => {
        db = new (sqlite3_1.verbose().Database)(SQLITE_DATABASE_PATH, async (err) => {
            if (err) {
                reject(err);
            }
            else {
                if (!dbExists) {
                    await createDB();
                }
                console.debug('[Database]: module initalized');
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
        const query = `REPLACE INTO ${table}(
  ${arrayValues.map((entry) => entry.key).join(',\n  ')}
)
VALUES(
  ${arrayValues.map(() => '?').join(',\n  ')}
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
    console.debug('[Database]: getting state');
    const res = await selectAll(Table.STATE);
    if (res.length === 0) {
        const state = {
            currentTime: Date.now(),
            currentTemperature: 25,
            currentState: 'off',
            currentMode: 'override',
            nextTransitionState: 'off',
            nextTransitionTime: Date.now() + 1000
        };
        await updateState(state);
        return state;
    }
    else if (res.length > 1) {
        throw new Error(`Internal Error: more than one state entry returned`);
    }
    return res[0];
}
exports.getState = getState;
async function updateState(newState) {
    console.debug('[Database]: updating state');
    await updateEntry(Table.STATE, {
        id: STATE_ID,
        ...newState
    });
    const startOfToday = util_1.getStartOfToday(config_1.getServerConfig().timezone);
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
    if (!latestEntry || latestEntry.time !== startOfToday) {
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
    console.debug('[Database]: getting config');
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
    console.debug('[Database]: updating config');
    await updateEntry(Table.CONFIG, {
        id: CONFIG_ID,
        config: JSON.stringify(config)
    });
}
exports.updateConfig = updateConfig;
async function getTemperatureHistory() {
    console.debug('[Database]: getting temperature history');
    return await selectAll(Table.TEMPERATURE, 'time');
}
exports.getTemperatureHistory = getTemperatureHistory;
async function getCleaningHistory() {
    console.debug('[Database]: getting history');
    return await selectAll(Table.CLEANING, 'time');
}
exports.getCleaningHistory = getCleaningHistory;
async function createCleaningEntry(cleaningEntry) {
    console.debug('[Database]: creating cleaning entry');
    await insertEntry(Table.CLEANING, {
        time: cleaningEntry.time,
        bioFilterReplaced: cleaningEntry.bioFilterReplaced ? 1 : 0,
        mechanicalFilterReplaced: cleaningEntry.mechanicalFilterReplaced ? 1 : 0,
        spongeReplaced: cleaningEntry.spongeReplaced ? 1 : 0
    });
}
exports.createCleaningEntry = createCleaningEntry;
async function getTestingHistory() {
    console.debug('[Database]: getting testing history');
    return await selectAll(Table.TESTING, 'time');
}
exports.getTestingHistory = getTestingHistory;
async function createTestingEntry(cleaningEntry) {
    console.debug('[Database]: creating testing entry');
    await insertEntry(Table.TESTING, cleaningEntry);
}
exports.createTestingEntry = createTestingEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7QUFHRixpQ0FBeUM7QUFDekMscUNBQW9EO0FBQ3BELHFDQUE0QztBQUM1QywyQkFBNEI7QUFDNUIsK0JBQWlDO0FBQ2pDLCtCQUE0QjtBQUU1QixJQUFLLEtBTUo7QUFORCxXQUFLLEtBQUs7SUFDUix3QkFBZSxDQUFBO0lBQ2YsNENBQW1DLENBQUE7SUFDbkMsOEJBQXFCLENBQUE7SUFDckIsNEJBQW1CLENBQUE7SUFDbkIsMEJBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQU5JLEtBQUssS0FBTCxLQUFLLFFBTVQ7QUFPRCxJQUFJLHFCQUF5RCxDQUFDO0FBRTlELE1BQU0sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLE1BQU0sU0FBUyxHQUFHLEVBQUUsR0FBRyxVQUFVLENBQUM7QUFDbEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztBQUVuQyxNQUFNLG9CQUFvQixHQUFHLFdBQUksQ0FBQyxnQkFBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRXhELE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFFbkIsSUFBSSxFQUF3QixDQUFDO0FBRTdCLEtBQUssVUFBVSxRQUFRO0lBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQztJQUM1RSxJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO0tBQzNFO0lBQ0QsTUFBTSxHQUFHLEdBQUcsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXZDLE1BQU0sR0FBRyxDQUNYLGdCQUFnQixLQUFL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