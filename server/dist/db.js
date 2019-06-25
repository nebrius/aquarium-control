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
let db;
async function createDB() {
    console.debug('Database does not currently exist, creating...');
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
    console.debug('Initializing database module');
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
        id: CONFIG_ID,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7QUFHRixpQ0FBeUM7QUFDekMscUNBQW9EO0FBQ3BELHFDQUE0QztBQUM1QywyQkFBNEI7QUFDNUIsK0JBQWlDO0FBQ2pDLCtCQUE0QjtBQUU1QixJQUFLLEtBTUo7QUFORCxXQUFLLEtBQUs7SUFDUix3QkFBZSxDQUFBO0lBQ2YsNENBQW1DLENBQUE7SUFDbkMsOEJBQXFCLENBQUE7SUFDckIsNEJBQW1CLENBQUE7SUFDbkIsMEJBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQU5JLEtBQUssS0FBTCxLQUFLLFFBTVQ7QUFPRCxJQUFJLHFCQUF5RCxDQUFDO0FBRTlELE1BQU0sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLE1BQU0sU0FBUyxHQUFHLEVBQUUsR0FBRyxVQUFVLENBQUM7QUFDbEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztBQUVuQyxNQUFNLG9CQUFvQixHQUFHLFdBQUksQ0FBQyxnQkFBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRXhELE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztBQUVwQixJQUFJLEVBQXdCLENBQUM7QUFFN0IsS0FBSyxVQUFVLFFBQVE7SUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQ2hFLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7S0FDM0U7SUFDRCxNQUFNLEdBQUcsR0FBRyxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFdkMsTUFBTSxHQUFHLENBQ1gsZ0JBQWdCLEtBQUssQ0FBQyxNQUFNOzs7RUFHMUIsQ0FBQyxDQUFDO0lB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