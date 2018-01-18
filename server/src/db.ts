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

import { IState } from './common/IState';
import { IUser } from './common/IUser';
import { IDailyTemperatureSample, IMonthlyTemperatureSample } from './common/ITemperature';
import { getEnvironmentVariable, toStringWithPadding, DATABASE_NAMES } from './util';
import { Connection, Request, TYPES, TediousType } from 'tedious';
import * as moment from 'moment-timezone';
import { waterfall } from 'async';

const userInfoCache: { [ userId: string ]: IUser } = {};

const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;

const TEMPERATURE_UPDATE_RATE = HOUR_IN_MS;

export function getUsernameForUserId(userId: string): string {
  return userInfoCache[userId].userName;
}

export function getDeviceForUserId(userId: string): string {
  return userInfoCache[userId].deviceId;
}

export function getTimezoneForUserId(userId: string): string {
  return userInfoCache[userId].timezone;
}

export function getUser(userId: string): IUser {
  return userInfoCache[userId];
}

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

export function init(cb: (err: Error | undefined) => void): void {
  request(
    `SELECT facebookId, deviceId, timezone, userName FROM ${DATABASE_NAMES.USERS}`,
    [],
    (err, rowCount, rows) => {
      if (err) {
        cb(err);
        return;
      }

      for (const row of rows) {
        if (!row.hasOwnProperty('facebookId') ||
          !row.hasOwnProperty('deviceId') ||
          !row.hasOwnProperty('timezone') ||
          !row.hasOwnProperty('userName')
        ) {
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
    }
  );
}

interface IQueryParameter {
  name: string;
  value: string;
  type: TediousType;
}

function request(
  query: string,
  parameters: IQueryParameter[],
  cb: (err: Error, rowCount: number, rows: any[]) => void
): void {
  const connection = new Connection({
    userName: getEnvironmentVariable('AZURE_SQL_USERNAME'),
    password: getEnvironmentVariable('AZURE_SQL_PASSWORD'),
    server: getEnvironmentVariable('AZURE_SQL_SERVER'),
    options: {
      encrypt: true,
      rowCollectionOnRequestCompletion: true,
      useColumnNames: true,
      database: getEnvironmentVariable('AZURE_SQL_DATABASE'),
      requestTimeout: 0
    }
  });
  connection.on('connect', (err) => {
    if (err) {
      cb(err, 0, []);
      return;
    }
    const req = new Request(query, cb);
    for (const parameter of parameters) {
      req.addParameter(parameter.name, parameter.type, parameter.value);
    }
    connection.execSql(req);
  });
}

export function isUserRegistered(userId: string): boolean {
  return !!userInfoCache[userId];
}

export function getState(deviceId: string, cb: (err: Error | undefined, state: IState | undefined) => void): void {
  request(
    `SELECT TOP(1) * FROM ${DATABASE_NAMES.STATE} WHERE deviceId=@deviceId ORDER BY currentTime DESC`,
    [{
      name: 'deviceId',
      type: TYPES.VarChar,
      value: deviceId
    }],
    (err, rowCount, rows) => {
      if (err) {
        cb(err, undefined);
      } else if (rowCount === 0) {
        cb(undefined, undefined);
      } else if (rowCount === 1) {
        const state: IState = {
          deviceId,
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

export function getDailyTemperatureHistory(
  deviceId: string,
  cb: (err: Error | undefined, history: IDailyTemperatureSample[] | undefined) => void
): void {
  request(
    `SELECT currentTime, currentTemperature FROM ${DATABASE_NAMES.STATE} WHERE deviceId=@deviceId ORDER BY currentTime`,
    [{
      name: 'deviceId',
      type: TYPES.VarChar,
      value: deviceId
    }],
    (err, rowCount, rows) => {
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
    }
  );
}

export function getMonthlyTemperatureHistory(
  userId: string,
  cb: (err: Error | undefined, history: IMonthlyTemperatureSample[] | undefined) => void
): void {

  const user = getUser(userId);
  const now = moment().tz(user.timezone);
  const startOfDay = moment.tz(
    `${toStringWithPadding(now.year(), 4)
    }-${toStringWithPadding(now.month() + 1, 2)
    }-${toStringWithPadding(now.date(), 2)}`, user.timezone);
  const monthEnd = startOfDay.unix() * 1000;
  const monthBegin = monthEnd - MONTH_IN_MS;

  waterfall([

    // Delete stale monthly samples
    (next: (err: Error | undefined, ...args: any[]) => void) => {
      request(
        `DELETE FROM ${DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId AND time <= ${monthBegin}`,
        [{
          name: 'deviceId',
          type: TYPES.VarChar,
          value: user.deviceId
        }],
        (err, rowCount, rows) => {
          next(err);
        }
      );
    },

    // Calculate the up-to-date monthly samples
    (next: (err: Error | undefined, ...args: any[]) => void) => {
      request(
        `SELECT currentTemperature, currentTime FROM ${DATABASE_NAMES.STATE} ` +
        `WHERE deviceId=@deviceId AND currentTime <= ${monthEnd} AND currentTime > ${monthBegin} ` +
        `ORDER BY currentTime`,
        [{
          name: 'deviceId',
          type: TYPES.VarChar,
          value: user.deviceId
        }],
        (err, rowCount, rows) => {
          if (err) {
            next(err);
            return;
          } else if (!rowCount) {
            next(undefined, []);
            return;
          }

          let dayBucketTimestamp = monthEnd - DAY_IN_MS;
          const dayBuckets: Array<{
            timestamp: number,
            samples: number[]
          }> = [{
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

          const samples: IMonthlyTemperatureSample[] = dayBuckets
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
        }
      );
    },

    // Save the updated monthly samples
    (samples: IMonthlyTemperatureSample[], next: (err: Error | undefined, ...args: any[]) => void) => {
      if (!samples.length) {
        next(undefined, false);
        return;
      }
      const values = samples.map((sample) => {
        return `('${sample.deviceId}', ${sample.time}, ${sample.low}, ${sample.high})`;
      }).join(', ');
      request(
        `INSERT INTO ${DATABASE_NAMES.TEMPERATURE} (deviceId, time, low, high) VALUES ${values}`,
        [],
        (err, rowCount, rows) => {
          next(err, !err);
        }
      );
    },

    // Delete the old state samples
    (needsDelete: boolean, next: (err: Error | undefined, ...args: any[]) => void) => {
      if (!needsDelete) {
        next(undefined);
        return;
      }
      request(
        `DELETE FROM ${DATABASE_NAMES.STATE} WHERE deviceId=@deviceId AND currentTime <= ${monthEnd}`,
        [{
          name: 'deviceId',
          type: TYPES.VarChar,
          value: user.deviceId
        }],
        (err, rowCount, rows) => {
          next(err);
        }
      );
    },

    // Fetch all monthly samples
    (next: (err: Error | undefined, ...args: any[]) => void) => {
      request(
        `SELECT * FROM ${DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId ORDER BY time`,
        [{
          name: 'deviceId',
          type: TYPES.VarChar,
          value: user.deviceId
        }],
        (err, rowCount, rows) => {
          next(err, rows.map((row) => {
            return {
              deviceId: row.deviceId.value,
              time: parseInt(row.time.value, 10),
              high: parseFloat(row.high.value),
              low: parseFloat(row.low.value)
            };
          }));
        }
      );
    }

  ], cb);
}
