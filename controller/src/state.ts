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
import { EventEmitter } from 'events';

class State extends EventEmitter {

  private _state: IState = {
    get currentTime() {
      return (new Date()).toString();
    },
    currentTemperature: 0,
    currentState: 'off',
    nextTransitionTime: (new Date()).toString(),
    nextTransitionState: 'off'
  }

  public getState(): IState {
    return this._state;
  }

  public setCurrentState(newState: 'day' | 'night' | 'off'): void {
    this._state.currentState = newState;
    this.emit('change', this._state);
  }

  public setNextTransitionTime(date: Date): void {
    this._state.nextTransitionTime = date.toString();
    this.emit('change', this._state);
  }

  public setNextTransitionState(newTransitionState: 'day' | 'night' | 'off'): void {
    this._state.nextTransitionState = newTransitionState;
    this.emit('change', this._state);
  }
}

export const state = new State();
