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
import { ACTIONS, IAction, ITestingHistoryFetchSucceededAction } from '../actions/actions';
import { IAquariumTesting, SaveStatusState } from '../util/IAppState';

export const aquariumTestingReducer: Reducer<IAquariumTesting> =
  (state: IAquariumTesting | undefined, action: IAction) => {
  if (!state) {
    state = {
      testing: undefined,
      saveStatus: SaveStatusState.None
    };
  }
  switch (action.type) {
    case ACTIONS.TESTING_REQUEST_NEW_RECORD: {
      const newState: IAquariumTesting = {
        ...state,
        saveStatus: SaveStatusState.Pending
      };
      return newState;
    }

    case ACTIONS.TESTING_NEW_RECORD_FAILED: {
      const newState: IAquariumTesting = {
        ...state,
        saveStatus: SaveStatusState.Failed
      };
      return newState;
    }

    case ACTIONS.TESTING_NEW_RECORD_SUCEEDED: {
      const newState: IAquariumTesting = {
        ...state,
        saveStatus: SaveStatusState.Succeeded,
        testing: (action as ITestingHistoryFetchSucceededAction).aquariumTesting
      };
      return newState;
    }

    case ACTIONS.TESTING_FETCH_FAILED: {
      const newState: IAquariumTesting = {
        ...state,
        testing: undefined
      };
      return newState;
    }

    case ACTIONS.TESTING_FETCH_SUCCEEDED: {
      const newState: IAquariumTesting = {
        ...state,
        testing: (action as ITestingHistoryFetchSucceededAction).aquariumTesting
      };
      return newState;
    }

    default: {
      return state;
    }
  }
};
