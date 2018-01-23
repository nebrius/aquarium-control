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
import { ITemperatureSample } from './common/ITemperature';
import { getEnvironmentVariable, getStartOfToday, DATABASE_NAMES } from './util';
import { Connection, Request, TYPES, TediousType } from 'tedious';
import { waterfall } from 'async';

const userInfoCache: { [ userId: string ]: IUser } = {};

interface ITemperatureCacheEntry {
  time: number;
  high: number;
  low: number;
}
const dailyTemperatureCache: { [ deviceId: string ]: ITemperatureCacheEntry } = {};

type CB = (err: Error | undefined) => void;
type CBWithValue<T> = (err: Error | undefined, value: T | undefined) => void;

const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;

export function getUsernameForUserId(userId: string): string {
  return userInfoCache[userId].userName;
}

export function getDeviceForUserId(userId: string): string {
  return userInfoCache[userId].deviceId;
}

export function getUserIdForDeviceId(deviceId: string): string | undefined {
  for (const userId in userInfoCache) {
    if (!userInfoCache.hasOwnProperty(userId)) {
      continue;
    }
    if (userInfoCache[userId].deviceId === deviceId) {
      return userId;
    }
  }
  return undefined; // User is missing for some reason
}

export function getTimezoneForUserId(userId: string): string {
  return userInfoCache[userId].timezone;
}

export function getUser(userId: string): IUser {
  return userInfoCache[userId];
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
    `SELECT * FROM ${DATABASE_NAMES.STATE} WHERE deviceId=@deviceId`,
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

export function updateState(newState: IState, cb?: (err: Error | undefined) => void): void {
  console.log(`Updating state for ${newState.deviceId}`);
  request(
`IF NOT EXISTS(SELECT * FROM current_state WHERE deviceId=@deviceId)
BEGIN
  INSERT INTO ${DATABASE_NAMES.STATE}(
    deviceId,
    currentTime,
    currentTemperature,
    currentState,
    currentMode,
    nextTransitionTime,
    nextTransitionState
  )
  VALUES(
    @deviceId,
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
    nextTransitionState='${newState.nextTransitionTime}'
  WHERE deviceId=@deviceId
END`,
    [{
      name: 'deviceId',
      type: TYPES.VarChar,
      value: newState.deviceId
    }],
    (stateErr) => {
      if (stateErr) {
        if (cb) {
          cb(stateErr);
        }
        return;
      }
      const userId = getUserIdForDeviceId(newState.deviceId);
      if (!userId) {
        throw new Error(`Internal Error: unknown user ID ${userId}`);
      }
      const startOfToday = getStartOfToday(getUser(userId).timezone);
      const monthBegin = startOfToday - MONTH_IN_MS;
      const dailyCache = dailyTemperatureCache[newState.deviceId];

      // Skip updating if possible
      if (dailyCache &&
        dailyCache.time === startOfToday &&
        dailyCache.low < newState.currentTemperature &&
        dailyCache.high > newState.currentTemperature
      ) {
        if (cb) {
          cb(stateErr);
        }
        return;
      }

      waterfall([
        // Fetch the data from the DB
        (next: CBWithValue<ITemperatureCacheEntry[]>) => request(
          `SELECT * FROM ${DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId ORDER BY time DESC`,
          [{
            name: 'deviceId',
            type: TYPES.VarChar,
            value: newState.deviceId
          }],
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
            dailyTemperatureCache[newState.deviceId] = {
              time: startOfToday,
              low: newState.currentTemperature,
              high: newState.currentTemperature
            };
            waterfall([
              (deleteNext: CB) => request(
                `DELETE FROM ${DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId AND time <= ${monthBegin}`,
                [{
                  name: 'deviceId',
                  type: TYPES.VarChar,
                  value: newState.deviceId
                }],
                (err, rowCount, rows) => deleteNext(err)
              ),
              (insertNext: CB) => request(
                `INSERT INTO ${DATABASE_NAMES.TEMPERATURE} (deviceId, time, low, high) ` +
                  `VALUES (@deviceId, ${startOfToday}, ${newState.currentTemperature}, ${newState.currentTemperature})`,
                [{
                  name: 'deviceId',
                  type: TYPES.VarChar,
                  value: newState.deviceId
                }],
                (err, rowCount, rows) => insertNext(err)
              )
            ], next);
            // Create the new entry

          // Else check if we need to update the high temperature
          } else if (latestEntry.high < newState.currentTemperature) {
            dailyTemperatureCache[newState.deviceId].high = newState.currentTemperature;
            request(
              `UPDATE ${DATABASE_NAMES.TEMPERATURE} ` +
              `SET high=${newState.currentTemperature} ` +
              `WHERE deviceId=@deviceId AND time=${startOfToday}`,
              [{
                name: 'deviceId',
                type: TYPES.VarChar,
                value: newState.deviceId
              }],
              (updateErr) => next(updateErr)
            );

          // Else check if we need to update the low temperature
          } else if (latestEntry.low > newState.currentTemperature) {
            dailyTemperatureCache[newState.deviceId].low = newState.currentTemperature;
            request(
              `UPDATE ${DATABASE_NAMES.TEMPERATURE} ` +
              `SET low=${newState.currentTemperature} ` +
              `WHERE deviceId=@deviceId AND time=${startOfToday}`,
              [{
                name: 'deviceId',
                type: TYPES.VarChar,
                value: newState.deviceId
              }],
              (updateErr) => next(updateErr)
            );
          } else {
            next(undefined);
          }
        }

      ], cb);
    }
  );
}

export function getTemperatureHistory(
  userId: string,
  cb: (err: Error | undefined, history: ITemperatureSample[] | undefined) => void
): void {
  const user = getUser(userId);
  request(
    `SELECT * FROM ${DATABASE_NAMES.TEMPERATURE} WHERE deviceId=@deviceId ORDER BY time`,
    [{
      name: 'deviceId',
      type: TYPES.VarChar,
      value: user.deviceId
    }],
    (err, rowCount, rows) => {
      if (err) {
        cb(err, undefined);
        return;
      }
      cb(undefined, rows.map((row) => ({
        deviceId: row.deviceId.value,
        time: parseInt(row.time.value, 10),
        high: parseFloat(row.high.value),
        low: parseFloat(row.low.value)
      })));
    }
  );
}
