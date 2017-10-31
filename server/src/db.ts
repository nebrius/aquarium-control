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
import { Connection, Request, TYPES } from 'tedious';
import * as moment from 'moment-timezone';
import { waterfall } from 'async';

let connection: Connection;
let isConnected = false;
const userInfoCache: { [ userId: string ]: IUser } = {};

const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;

const TEMPERATURE_UPDATE_RATE = 4 * HOUR_IN_MS;

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

function connect(cb: (err: Error | undefined) => void): void {
  connection = new Connection({
    userName: getEnvironmentVariable('AZURE_SQL_USERNAME'),
    password: getEnvironmentVariable('AZURE_SQL_PASSWORD'),
    server: getEnvironmentVariable('AZURE_SQL_SERVER'),
    options: {
      encrypt: true,
      rowCollectionOnRequestCompletion: true,
      useColumnNames: true,
      database: getEnvironmentVariable('AZURE_SQL_DATABASE')
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

  connection.on('end', (err) => {
    process.stdout.write('Disconnected from Azure SQL, reconnecting...');
    connect((err) => {
      if (err) {
        console.error(err);
      } else {
        process.stdout.write('connected\n');
      }
    });
  });
}

export function init(cb: (err: Error | undefined) => void): void {
  console.log('Connecting to Azure SQL');
  connect((err) => {
    if (err) {
      console.error(err);
      cb(err);
    } else {
      console.log('Connected to Azure SQL');
      cb(undefined);
    }

    setInterval(() => {
      for (const userId in userInfoCache) {
        if (!userInfoCache.hasOwnProperty(userId)) {
          continue;
        }
        getMonthlyTemperatureHistory(userId, (err, samples) => {});
      }
    }, TEMPERATURE_UPDATE_RATE);

  });
}

interface IQueryRequest {
  (cb: () => void): void;
}
let isQueryRequestPending = false;
const queryRequests: IQueryRequest[] = [];
function pump(): void {
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

function queueRequest(operation: IQueryRequest): void {
  queryRequests.push(operation);
  pump();
}

export function isUserRegistered(userId: string, cb: (err: Error | undefined, isRegistered: boolean | undefined) => void): void {
  if (!isConnected) {
    throw new Error('Tried to see if user is registered while not connected to the database');
  }
  if (userInfoCache[userId]) {
    setImmediate(() => cb(undefined, true));
    return;
  }
  queueRequest((done) => {
    const query = `SELECT deviceId, timezone, userName FROM ${DATABASE_NAMES.USERS} WHERE facebookId=@userId`;
    const request = new Request(query, (err, rowCount, rows) => {
      done();
      if (err) {
        cb(err, undefined);
      } else if (rowCount === 0) {
        cb(undefined, false);
      } else if (rowCount === 1) {
        if (!rows[0].hasOwnProperty('deviceId') || !rows[0].hasOwnProperty('timezone') || !rows[0].hasOwnProperty('userName')) {
          cb(new Error(`Received result without deviceId, userName, or timezone property`), undefined);
        } else {
          userInfoCache[userId] = {
            userId,
            userName: rows[0].userName.value,
            deviceId: rows[0].deviceId.value,
            timezone: rows[0].timezone.value
          };
          cb(undefined, true);
        }
      } else {
        cb(new Error(`More than one user found for user ID ${userId}`), undefined);
      }
    });
    request.addParameter('userId', TYPES.VarChar, userId);
    connection.execSql(request);
  });
}

export function getState(deviceId: string, cb: (err: Error | undefined, state: IState | undefined) => void): void {
  if (!isConnected) {
    throw new Error('Tried to get state while not connected to the database');
  }
  queueRequest((done) => {
    const query = `SELECT TOP(1) * FROM ${DATABASE_NAMES.STATE} WHERE deviceId=@deviceId ORDER BY currentTime DESC`;
    const request = new Request(query, (err, rowCount, rows) => {
      done();
      if (err) {
        cb(err, undefined);
      } else if (rowCount === 0) {
        cb(undefined, undefined);
      } else if (rowCount === 1) {
        const state: IState = {
          deviceId,
          currentTime: parseInt(rows[0].currentTime.value),
          currentTemperature: rows[0].currentTemperature.value, // in Celcius
          currentState: rows[0].currentState.value,
          currentMode: rows[0].currentMode.value,
          nextTransitionTime: parseInt(rows[0].nextTransitionTime.value), // UNIX timestamp, e.g. Date.now()
          nextTransitionState: rows[0].nextTransitionState.value
        };
        cb(undefined, state);
      } else {
        cb(new Error(`Internal Error: more than one state entry returned.`), undefined);
      }
    });
    request.addParameter('deviceId', TYPES.VarChar, deviceId);
    connection.execSql(request);
  });
}

export function getDailyTemperatureHistory(
  deviceId: string,
  cb: (err: Error | undefined, history: IDailyTemperatureSample[] | undefined) => void
): void {
  queueRequest((done) => {
    const query = `SELECT currentTime, currentTemperature FROM ${DATABASE_NAMES.STATE} WHERE deviceId=@deviceId`;
    const request = new Request(query, (err, rowCount, rows) => {
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
        }
      }));
    });
    request.addParameter('deviceId', TYPES.VarChar, deviceId);
    connection.execSql(request);
  });
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

    // Calculate the up-to-date monthly samples
    (next: (err: Error | undefined, ...args: any[]) => void) => {
      queueRequest((done) => {
        const query =
          `SELECT currentTemperature, currentTime FROM ${DATABASE_NAMES.STATE} ` +
          `WHERE deviceId=@deviceId AND currentTime <= ${monthEnd} AND currentTime > ${monthBegin} ` +
          `ORDER BY currentTime`;
        const request = new Request(query, (err, rowCount, rows) => {
          done();
          if (err) {
            next(err);
            return;
          } else if (!rowCount) {
            next(undefined, []);
            return;
          }

          let dayBucketTimestamp = monthEnd - DAY_IN_MS;
          const dayBuckets: {
            timestamp: number,
            samples: number[]
          }[] = [{
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

          const samples: IMonthlyTemperatureSample[] = dayBuckets.filter((dayBucket) => !!dayBucket.samples.length).map((dayBucket) => {
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
        request.addParameter('deviceId', TYPES.VarChar, user.deviceId);
        connection.execSql(request);
      });
    },

    // Save the updated monthly samples
    (samples: IMonthlyTemperatureSample[], next: (err: Error | undefined, ...args: any[]) => void) => {
      if (!samples.length) {
        next(undefined, false);
        return;
      }
      queueRequest((done) => {
        const values = samples.map((sample) => {
          return `('${sample.deviceId}', ${sample.time}, ${sample.low}, ${sample.high})`
        }).join(', ');
        const query = `INSERT INTO ${DATABASE_NAMES.TEMPERATUE} (deviceId, time, low, high) VALUES ${values}`;
        const request = new Request(query, (err, rowCount, rows) => {
          done();
          next(err, !err);
        });
        connection.execSql(request);
      });
    },

    // Delete the old state samples
    (needsDelete: boolean, next: (err: Error | undefined, ...args: any[]) => void) => {
      if (!needsDelete) {
        next(undefined);
        return;
      }
      queueRequest((done) => {
        const query = `DELETE FROM ${DATABASE_NAMES.STATE} WHERE deviceId=@deviceId AND currentTime <= ${monthEnd}`;
        const request = new Request(query, (err, rowCount, rows) => {
          done();
          next(err);
        });
        request.addParameter('deviceId', TYPES.VarChar, user.deviceId);
        connection.execSql(request);
      });
    },

    // Delete stale monthly samples
    (next: (err: Error | undefined, ...args: any[]) => void) => {
      queueRequest((done) => {
        const query = `DELETE FROM ${DATABASE_NAMES.TEMPERATUE} WHERE deviceId=@deviceId AND time <= ${monthBegin}`;
        const request = new Request(query, (err, rowCount, rows) => {
          done();
          next(err);
        });
        request.addParameter('deviceId', TYPES.VarChar, user.deviceId);
        connection.execSql(request);
      });
    },

    // Fetch all monthly samples
    (next: (err: Error | undefined, ...args: any[]) => void) => {
      queueRequest((done) => {
        const query = `SELECT * FROM ${DATABASE_NAMES.TEMPERATUE} WHERE deviceId=@deviceId`;
        const request = new Request(query, (err, rowCount, rows) => {
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
        request.addParameter('deviceId', TYPES.VarChar, user.deviceId);
        connection.execSql(request);
      });
    }

  ], cb);
}
