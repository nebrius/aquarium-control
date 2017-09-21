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
import { IState } from './common/IState';
import { TEMPERATURE_SAMPLE_SIZE } from './config';

class State extends EventEmitter {

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

  public getState(): IState {
    return this._state;
  }

  public setCurrentTemperature(newTemperature: number) {
    this._temperatureSamples.push(newTemperature);
    if (!this._hasReportedFirstTemperature) {
      this._state.currentTemperature = newTemperature;
      this._hasReportedFirstTemperature = true;
      this.emit('change', this._state);
      return;
    }
    if (this._temperatureSamples.length === TEMPERATURE_SAMPLE_SIZE) {
      // Take the median temperature and throw the rest away.
      this._temperatureSamples.sort();
      this._state.currentTemperature = this._temperatureSamples[Math.floor(TEMPERATURE_SAMPLE_SIZE / 2)];
      this._temperatureSamples = [];
      this.emit('change', this._state);
    }
  }

  public setCurrentState(newState: 'day' | 'night' | 'off'): void {
    this._state.currentState = newState;
    if (this._hasReportedFirstTemperature) {
      this.emit('change', this._state);
    }
  }

  public setNextTransitionTime(date: Date): void {
    this._state.nextTransitionTime = date.toString();
    if (this._hasReportedFirstTemperature) {
      this.emit('change', this._state);
    }
  }

  public setNextTransitionState(newTransitionState: 'day' | 'night' | 'off'): void {
    this._state.nextTransitionState = newTransitionState;
    if (this._hasReportedFirstTemperature) {
      this.emit('change', this._state);
    }
  }
}

export const state = new State();
