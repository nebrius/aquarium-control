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