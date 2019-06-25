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

import { IState, ITemperatureEntry, ICleaningEntry, ITestingEntry, IConfig } from './common/common';
import { getStartOfToday } from './util';
import { APP_DIR, getServerConfig } from './config';
import { verbose, Database } from 'sqlite3';
import { exists } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

enum Table {
  STATE = 'state',
  TEMPERATURE = 'temperature_history',
  CLEANING = 'cleaning',
  TESTING = 'testing',
  CONFIG = 'config'
}

interface ITemperatureCacheEntry {
  time: number;
  high: number;
  low: number;
}
let dailyTemperatureCache: ITemperatureCacheEntry | undefined;

const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;

const SQLITE_DATABASE_PATH = join(APP_DIR, 'db.sqlite');

const CONFIG_ID = 1;

let db: Database | undefined;

async function createDB(): Promise<void> {
  console.debug('Database does not currently exist, creating...');
  if (!db) {
    throw new Error('Internal Error: query called without being initialized');
  }
  const run = promisify(db.run.bind(db));

  await run(
`CREATE TABLE ${Table.CONFIG} (
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
  await (run as any)(`INSERT INTO ${Table.CONFIG} (id, config) VALUES (?, ?)`, [ CONFIG_ID, config ]);

  await run(
`CREATE TABLE ${Table.STATE} (
  currentTime bigint not null,
  currentTemperature float not null,
  currentState varchar(255) not null,
  currentMode varchar(255) not null,
  nextTransitionTime bigint not null,
  nextTransitionState varchar(255) not null
)`);

await run(
`CREATE TABLE ${Table.TEMPERATURE} (
  time bigint not null,
  low float not null,
  high float not null
)`);

await run(
`CREATE TABLE ${Table.CLEANING} (
  time bigint not null,
  bioFilterReplaced bit not null,
  mechanicalFilterReplaced bit not null,
  spongeReplaced bit not null
)`);

await run(
`CREATE TABLE ${Table.TESTING} (
  time bigint not null,
  ph float not null,
  ammonia int not null,
  nitrites int not null,
  nitrates int not null
)`);
}

export async function init(): Promise<void> {
  console.debug('Initializing database module');
  const dbExists = await promisify(exists)(SQLITE_DATABASE_PATH);
  return new Promise(async (resolve, reject) => {
    db = new (verbose().Database)(SQLITE_DATABASE_PATH, async (err) => {
      if (err) {
        reject(err);
      } else {
        if (!dbExists) {
          await createDB();
        }
        console.debug('Database module initalized');
        resolve();
      }
    });
  });
}

async function selectAll(table: Table, orderBy?: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    if (!db) {
      throw new Error('Internal Error: query called without being initialized');
    }
    let query = `SELECT * FROM ${table}`;
    if (orderBy) {
      query += ` ORDER BY ${orderBy}`
    }
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  });
}

async function updateEntry(table: Table, values: { [ key: string ]: any }, where?: string): Promise<void> {
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
    const query =
`REPLACE INTO ${table}(
  ${arrayValues.map((entry) => entry.key).join(',\n  ')}
)
VALUES(
  ${arrayValues.map(() => '?').join(',\n  ')}
)`;
    db.run(query, arrayValues.map((entry) => entry.value), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}

async function insertEntry(table: Table, values: { [ key: string ]: any }): Promise<void> {
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
    const query =
`INSERT INTO ${table}(
    ${arrayValues.map((entry) => entry.key).join(',\n    ')}
  )
  VALUES(
    ${arrayValues.map(() => '?').join(',\n    ')}
  )`;
    db.run(query, arrayValues.map((entry) => entry.value), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}

async function deleteEntry(table: Table, where?: string): Promise<void> {
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
      } else {
        resolve();
      }
    })
  });
}

export async function getState(): Promise<IState | undefined> {
  console.log(`Getting state`);
  const res = await selectAll(Table.STATE);
  if (res.length === 0) {
    return undefined;
  } else if (res.length > 1) {
    throw new Error(`Internal Error: more than one state entry returned`);
  }
  return res[0];
}

export async function updateState(newState: IState): Promise<void> {
  console.log(`Updating state`);
  await updateEntry(Table.STATE, newState);

  const startOfToday = getStartOfToday(getServerConfig().timezone);
  const monthBegin = startOfToday - MONTH_IN_MS;

  // Skip updating if possible
  if (dailyTemperatureCache &&
    dailyTemperatureCache.time === startOfToday &&
    dailyTemperatureCache.low < newState.currentTemperature &&
    dailyTemperatureCache.high > newState.currentTemperature
  ) {
    return;
  }

  const temperatureHistory: ITemperatureCacheEntry[] = await selectAll(Table.TEMPERATURE, 'time DESC');

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
    })

  // Else check if we need to update the high temperature
  } else if (latestEntry.high < newState.currentTemperature) {
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
  } else if (latestEntry.low > newState.currentTemperature) {
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

export async function getConfig(): Promise<IConfig | undefined> {
  const rows = await selectAll(Table.CONFIG);
  if (rows.length === 0) {
    return undefined;
  } else if (rows.length === 1) {
    return JSON.parse(rows[0].config);
  } else {
    throw new Error(`Internal Error: more than one config entry returned.`);
  }
}

export async function updateConfig(config: IConfig): Promise<void> {
  await updateEntry(Table.CONFIG, {
    id: CONFIG_ID, // We use this so that REPLACE will always replace the old entry with this use
    config: JSON.stringify(config)
  });
}

export async function getTemperatureHistory(): Promise<ITemperatureEntry[]> {
  return await selectAll(Table.TEMPERATURE, 'time');
}

export async function getCleaningHistory(): Promise<ICleaningEntry[]> {
  return await selectAll(Table.CLEANING, 'time');
}

export async function createCleaningEntry(cleaningEntry: ICleaningEntry): Promise<void> {
  await insertEntry(Table.CLEANING, {
    time: cleaningEntry.time,
    bioFilterReplaced: cleaningEntry.bioFilterReplaced ? 1 : 0,
    mechanicalFilterReplaced: cleaningEntry.mechanicalFilterReplaced ? 1 : 0,
    spongeReplaced: cleaningEntry.spongeReplaced ? 1 : 0
  });
}

export async function getTestingHistory(): Promise<ITestingEntry[]> {
  return await selectAll(Table.TESTING, 'time');
}

export async function createTestingEntry(cleaningEntry: ITestingEntry): Promise<void> {
  await insertEntry(Table.TESTING, cleaningEntry);
}
