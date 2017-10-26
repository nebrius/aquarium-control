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

import { Reducer } from 'redux';
import { ACTIONS, IAction, IStateFetchSucceededAction } from '../actions/actions';
import { IAquariumState } from '../util/IAppState';

const STALE_DURATION = 20 * 60 * 1000;

export const aquariumStateReducer: Reducer<IAquariumState> = (state: IAquariumState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.STATE_FETCH_FAILED:
      return {
        state: undefined,
        currentStateValid: false,
        currentStateStale: false
      };
    case ACTIONS.STATE_FETCH_SUCCEEDED:
      const aquariumState = (action as IStateFetchSucceededAction).aquariumState;
      return {
        state: aquariumState,
        currentStateValid: true,
        currentStateStale: Date.now() - aquariumState.currentTime > STALE_DURATION
      };
    default:
      if (state) {
        return state;
      }
      return {
        state: undefined,
        currentStateValid: false,
        currentStateStale: false
      };
  }
};
