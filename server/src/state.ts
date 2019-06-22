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
import { IState } from './common/common';
import { updateState, getState } from './db';

class State extends EventEmitter {

  private _state: IState | undefined;

  public async init() {
    this._state = await getState();
  }

  public getState(): IState {
    if (!this._state) {
      throw new Error('Internal Error: this._state is undefined');
    }
    return this._state;
  }

  public setCurrentState(newState: 'day' | 'night' | 'off'): void {
    if (!this._state) {
      throw new Error('Internal Error: this._state is undefined');
    }
    if (this._state.currentState === newState) {
      return;
    }
    this._state.currentState = newState;
    this._handleStateChange();
  }

  public setCurrentMode(newMode: 'program' | 'override'): void {
    if (!this._state) {
      throw new Error('Internal Error: this._state is undefined');
    }
    if (this._state.currentMode === newMode) {
      return;
    }
    this._state.currentMode = newMode;
    this._handleStateChange();
  }

  public setNextTransitionTime(date: Date): void {
    if (!this._state) {
      throw new Error('Internal Error: this._state is undefined');
    }
    this._state.nextTransitionTime = date.getTime();
    this._handleStateChange();
  }

  public setNextTransitionState(newTransitionState: 'day' | 'night' | 'off'): void {
    if (!this._state) {
      throw new Error('Internal Error: this._state is undefined');
    }
    this._state.nextTransitionState = newTransitionState;
    this._handleStateChange();
  }

  public setCurrentTemperature(newTemperature: number): void {
    if (!this._state) {
      throw new Error('Internal Error: this._state is undefined');
    }
    this._state.currentTemperature = newTemperature;
    this._handleStateChange();
  }

  private async _handleStateChange() {
    if (!this._state) {
      throw new Error('Internal Error: this._state is undefined');
    }
    await updateState(this._state);
    this.emit('change-state', this._state);
  }
}

export const state = new State();
