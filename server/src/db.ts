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

import { IState, ITemperatureSample, ICleaningEntry, ITestingEntry, IConfig } from './common/common';
import { getEnvironmentVariable, getStartOfToday, DATABASE_NAMES } from './util';
import { Connection, Request } from 'tedious';
import { waterfall } from 'async';

interface ITemperatureCacheEntry {
  time: number;
  high: number;
  low: number;
}
let dailyTemperatureCache: ITemperatureCacheEntry | undefined;

type CB = (err: Error | undefined) => void;
type CBWithValue<T> = (err: Error | undefined, value: T | undefined) => void;

const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;

const SQL_SERVER = getEnvironmentVariable('SQL_SERVER');
const SQL_USERNAME = getEnvironmentVariable('SQL_USERNAME');
const SQL_PASSWORD = getEnvironmentVariable('SQL_PASSWORD');
const SQL_DATABASE = getEnvironmentVariable('SQL_DATABASE');
const SQL_PORT = parseInt(getEnvironmentVariable('SQL_PORT'), 10);
const TIMEZONE = getEnvironmentVariable('TIMEZONE');

export function init(cb: (err: Error | undefined) => void): void {
  console.debug('Initializing database module');
  cb(undefined);
}

interface IRequestQueueEntry {
  query: string;
  cb: (err: Error, rowCount: number, rows: any[]) => void;
}
const requestQueue: Array<IRequestQueueEntry> = [];
let requestProcessing = false;

function request(
  query: string,
  cb: (err: Error, rowCount: number, rows: any[]) => void
): void {
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
  const { query, cb } = requestQueue.shift() as IRequestQueueEntry;
  console.debug(`Connecting to database`);
  requestProcessing = true;
  const connection = new Connection({
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
  } as any); // Note: the signature for tedious Request changed recently, but they haven't updated the docs yet apparently
  connection.on('connect', (err) => {
    if (err) {
      cb(err, 0, []);
      return;
    }
    console.debug(`Connected...executing query`);
    const req = new Request(query, (err: Error, rowCount: number, rows: any[]) => {
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

export function getState(cb: (err: Error | undefined, state: IState | undefined) => void): void {
  request(
    `SELECT * FROM ${DATABASE_NAMES.STATE}`,
    (err, rowCount, rows) => {
      if (err) {
        cb(err, undefined);
      } else if (rowCount === 0) {
        cb(undefined, undefined);
      } else if (rowCount === 1) {
        const state: IState = {
          currentTime: parseInt(rows[0].currentTime.value, 10),
          currentTemperature: rows[0].currentTemperature.value, // in Celcius
          currentState: rows[0].currentState.value,
          currentMode: rows[0].currentMode.value,
          nextTransitionTime: parseInt(rows[0].nextTransitionTime.value, 10), // UNIX timestamp, e.g. Date.now()
          nextTransitionState: rows[0].nextTransitionState.value
        };
        cb(undefined, state);
      } else {
        cb(new Error(`Internal Error: more than one state entry returned.`), undefined);
      }
    }
  );
}

export function updateState(newState: IState, cb?: (err: Error | undefined) => void): void {
  console.log(`Updating state`);
  request(
`IF NOT EXISTS(SELECT * FROM current_state)
BEGIN
  INSERT INTO ${DATABASE_NAMES.STATE}(
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
  UPDATE ${DATABASE_NAMES.STATE} SET
    currentTime=${newState.currentTime},
    currentTemperature=${newState.currentTemperature},
    currentState='${newState.currentState}',
    currentMode='${newState.currentMode}',
    nextTransitionTime=${newState.nextTransitionTime},
    nextTransitionState='${newState.nextTransitionState}'
END`,
    (stateErr) => {
      if (stateErr) {
        if (cb) {
          cb(stateErr);
        }
        return;
      }
      const startOfToday = getStartOfToday(TIMEZONE);
      const monthBegin = startOfToday - MONTH_IN_MS;

      // Skip updating if possible
      if (dailyTemperatureCache &&
        dailyTemperatureCache.time === startOfToday &&
        dailyTemperatureCache.low < newState.currentTemperature &&
        dailyTemperatureCache.high > newState.currentTemperature
      ) {
        if (cb) {
          cb(stateErr);
        }
        return;
      }

      waterfall([
        // Fetch the data from the DB
        (next: CBWithValue<ITemperatureCacheEntry[]>) => request(
          `SELECT * FROM ${DATABASE_NAMES.TEMPERATURE} ORDER BY time DESC`,
          (err, rowCount, rows) => {
            if (err) {
              next(err, undefined);
              return;
            }
            const temperatureHistory: ITemperatureCacheEntry[] = rows.map((row) => ({
              time: parseInt(row.time.value, 10),
              high: parseFloat(row.high.value),
              low: parseFloat(row.low.value)
            }));
            next(undefined, temperatureHistory);
          }
        ),

        // Update the data in the DB
        (data: ITemperatureCacheEntry[], next: CB) => {
          const latestEntry = data[0];

          // Check if we need to create a new entry
          if (latestEntry.time !== startOfToday) {
            dailyTemperatureCache = {
              time: startOfToday,
              low: newState.currentTemperature,
              high: newState.currentTemperature
            };
            waterfall([
              (deleteNext: CB) => request(
                `DELETE FROM ${DATABASE_NAMES.TEMPERATURE} WHERE time <= ${monthBegin}`,
                (err, rowCount, rows) => deleteNext(err)
              ),
              (insertNext: CB) => request(
                `INSERT INTO ${DATABASE_NAMES.TEMPERATURE} (time, low, high) ` +
                  `VALUES (${startOfToday}, ${newState.currentTemperature}, ${newState.currentTemperature})`,
                (err, rowCount, rows) => insertNext(err)
              )
            ], next as any);
            // Create the new entry

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
            request(
              `UPDATE ${DATABASE_NAMES.TEMPERATURE} ` +
              `SET high=${newState.currentTemperature} ` +
              `WHERE time=${startOfToday}`,
              (updateErr) => next(updateErr)
            );

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
            request(
              `UPDATE ${DATABASE_NAMES.TEMPERATURE} ` +
              `SET low=${newState.currentTemperature} ` +
              `WHERE time=${startOfToday}`,
              (updateErr) => next(updateErr)
            );
          } else {
            next(undefined);
          }
        }

      ], cb as any);
    }
  );
}

export function getConfig(
  cb: (err: Error | undefined, config: IConfig | undefined) => void
): void {
  request(
    `SELECT * FROM ${DATABASE_NAMES.CONFIG}`,
    (err, rowCount, rows) => {
      if (err) {
        cb(err, undefined);
        return;
      } else if (rowCount === 0) {
        cb(undefined, undefined);
      } else if (rowCount === 1) {
        let config: IConfig;
        try {
          config = JSON.parse(rows[0].config);
          cb(undefined, config);
        } catch (e) {
          cb(e, undefined);
        }
      } else {
        cb(new Error(`Internal Error: more than one config entry returned.`), undefined);
      }
    }
  );
}

export function updateConfig(config: IConfig, cb: (err: Error | undefined) => void): void {
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

export function getTemperatureHistory(
  userId: string,
  cb: (err: Error | undefined, history: ITemperatureSample[] | undefined) => void
): void {
  request(
    `SELECT * FROM ${DATABASE_NAMES.TEMPERATURE} ORDER BY time`,
    (err, rowCount, rows) => {
      if (err) {
        cb(err, undefined);
        return;
      }
      cb(undefined, rows.map((row) => ({
        time: parseInt(row.time.value, 10),
        high: parseFloat(row.high.value),
        low: parseFloat(row.low.value)
      })));
    }
  );
}

export function getCleaningHistory(
  userId: string,
  cb: (err: Error | undefined, history: ICleaningEntry[] | undefined) => void
): void {
  request(
    `SELECT * FROM ${DATABASE_NAMES.CLEANING} ORDER BY time`,
    (err, rowCount, rows) => {
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
    }
  );
}

export function createCleaningEntry(
  userId: string,
  cleaningEntry: ICleaningEntry,
  cb: (err: Error | undefined) => void
) {
  request(
`INSERT INTO ${DATABASE_NAMES.CLEANING} (
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
)`,
    (err) => cb(err)
  );
}

export function getTestingHistory(
  userId: string,
  cb: (err: Error | undefined, history: ITestingEntry[] | undefined) => void
): void {
  request(
    `SELECT * FROM ${DATABASE_NAMES.TESTING} ORDER BY time`,
    (err, rowCount, rows) => {
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
    }
  );
}

export function createTestingEntry(
  userId: string,
  cleaningEntry: ITestingEntry,
  cb: (err: Error | undefined) => void
) {
  request(
`INSERT INTO ${DATABASE_NAMES.TESTING} (
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
)`,
    (err) => cb(err)
  );
}
