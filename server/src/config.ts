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

import { exists, writeFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import * as mkdirp from 'mkdirp';

export interface IServerConfig {
  latitude: number;
  longitude: number;
  timezone: string;
  dayPin: number | string;
  nightPin: number | string;
}

export const APP_DIR = '/home/pi/.aquarium-control';
const CONFIG_PATH = join(APP_DIR, 'config.json');

let config: IServerConfig | undefined;

export async function init() {
  const appDirExists = await promisify(exists)(APP_DIR);
  if (!appDirExists) {
    console.log(`Application directory does not exist, creating it at ${APP_DIR}`);
    await promisify(mkdirp)(APP_DIR);
  }

  const configExists = await promisify(exists)(CONFIG_PATH);
  if (!configExists) {
    console.log(`Application configuration does not exist, creating default configuration at ${CONFIG_PATH}.` +
      ` Please review this to make sure the information is correct. The app may not function correctly until you do`);
    const defaultConfig: IServerConfig = {
      timezone: 'America/Los_Angeles',
      dayPin: 'GPIO27',
      nightPin: 'GPIO17',
      latitude: 37.546267,
      longitude: -121.97113
    };
    await promisify(writeFile)(CONFIG_PATH, JSON.stringify(defaultConfig, null, '  '));
  }
}

export function getServerConfig(): IServerConfig {
  if (!config) {
    throw new Error('Internal Error: getServerConfig before config was initialized');
  }
  return config;
}
