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

import { EventEmitter } from 'events';
import { exists, readFile, writeFile, writeFileSync } from 'fs';
import { dirname } from 'path';
import * as makeDir from 'make-dir';
import { IState } from './common/IState';
import { IConfig } from './common/IConfig';
import { TEMPERATURE_SAMPLE_SIZE, CONFIG_FILE_PATH } from './config';

class State extends EventEmitter {

  private _config: IConfig = {
    mode: 'override',
    overrideState: 'off',
    schedule: []
  }

  private _state: IState = {
    deviceId: 'nebrius-rpi', // TODO: get from connection string/env variable
    get currentTime() {
      return (new Date()).toString();
    },
    currentTemperature: 0,
    currentState: 'off',
    nextTransitionTime: (new Date()).toString(),
    nextTransitionState: 'off'
  }

  private _temperatureSamples: number[] = [];

  private _hasReportedFirstTemperature = false;

  public init(cb: (err: Error | undefined) => void): void {
    exists(CONFIG_FILE_PATH, (exists) => {
      if (exists) {
        console.log(`Reading config file from ${CONFIG_FILE_PATH}`);
        readFile(CONFIG_FILE_PATH, (err, data) => {
          if (err) {
            cb(err);
            return;
          }
          try {
            this._config = JSON.parse(data.toString());
            cb(undefined);
          } catch(e) {
            cb(e);
          }
        });
        return;
      }
      console.log(`Configuration file not found, creating a default configuration file at ${CONFIG_FILE_PATH}`);
      makeDir(dirname(CONFIG_FILE_PATH)).then(() => {
        writeFile(CONFIG_FILE_PATH, JSON.stringify(state.getConfig(), null, '  '), (err) => {
          if (err) {
            cb(err);
            return;
          }
          cb(undefined);
        })
      }).catch(cb);
    });
  }

  public getState(): IState {
    return this._state;
  }

  public getConfig(): IConfig {
    return this._config;
  }

  public setConfig(newConfig: IConfig): void {
    this._config = newConfig;

    // We use the synchronous method to avoid a possible race condition where `setConfig`
    // could be called before a previous call finished writing the file.
    writeFileSync(CONFIG_FILE_PATH, JSON.stringify(state.getConfig(), null, '  '));
    if (this._hasReportedFirstTemperature) {
      this.emit('change-config', this._state);
    }
  }

  public setCurrentTemperature(newTemperature: number) {
    this._temperatureSamples.push(newTemperature);
    if (!this._hasReportedFirstTemperature) {
      this._state.currentTemperature = newTemperature;
      this._hasReportedFirstTemperature = true;
      this.emit('change-state', this._state);
      return;
    }
    if (this._temperatureSamples.length === TEMPERATURE_SAMPLE_SIZE) {
      // Take the median temperature and throw the rest away.
      this._temperatureSamples.sort();
      this._state.currentTemperature = this._temperatureSamples[Math.floor(TEMPERATURE_SAMPLE_SIZE / 2)];
      this._temperatureSamples = [];
      this.emit('change-state', this._state);
    }
  }

  public setCurrentState(newState: 'day' | 'night' | 'off'): void {
    this._state.currentState = newState;
    if (this._hasReportedFirstTemperature) {
      this.emit('change-state', this._state);
    }
  }

  public setNextTransitionTime(date: Date): void {
    this._state.nextTransitionTime = date.toString();
    if (this._hasReportedFirstTemperature) {
      this.emit('change-state', this._state);
    }
  }

  public setNextTransitionState(newTransitionState: 'day' | 'night' | 'off'): void {
    this._state.nextTransitionState = newTransitionState;
    if (this._hasReportedFirstTemperature) {
      this.emit('change-state', this._state);
    }
  }
}

export const state = new State();

export function init(cb: (err: Error | undefined) => void): void {
  state.init(cb);
}
