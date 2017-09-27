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

import { IConfig } from './common/IConfig';
import { IState } from './common/IState';
import { Connection } from 'tedious';

let connection: Connection;
let isConnected = false;

export function init(cb: (err: Error | undefined) => void): void {

  function getEnvironmentVariable(variable: string): string {
    const value = process.env[variable];
    if (typeof value !== 'string') {
      throw new Error(`Environment variable ${variable} is not defined`);
    }
    return value;
  }

  console.log('Connecting to Azure SQL');
  connection = new Connection({
    userName: getEnvironmentVariable('AZURE_SQL_USERNAME'),
    password: getEnvironmentVariable('AZURE_SQL_PASSWORD'),
    server: getEnvironmentVariable('AZURE_SQL_SERVER'),
    options: {
      encrypt: true
    }
  });

  connection.on('connect', (err) => {
    if (err) {
      cb(err);
      return;
    }
    console.log('Connected to Azure SQL');
    isConnected = true;
    cb(undefined);
  });
}

export function saveConfig(deviceId: string, config: IConfig, cb: (err: Error | undefined) => void): void {
  if (!isConnected) {
    throw new Error('Tried to save config while not connected to the database');
  }
}

export function getConfig(deviceId: string, cb: (err: Error | undefined, config: IConfig | undefined) => void): void {
  if (!isConnected) {
    throw new Error('Tried to get config while not connected to the database');
  }
}

export function getState(deviceId: string, cb: (err: Error | undefined, state: IState | undefined) => void): void {
  if (!isConnected) {
    throw new Error('Tried to get state while not connected to the database');
  }
}
