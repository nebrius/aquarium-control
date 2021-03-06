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
import { ACTIONS, IAction, ICleaningHistoryFetchSucceededAction } from '../actions/actions';
import { IAquariumCleaning, SaveStatusState } from '../util/IAppState';

export const aquariumCleaningReducer: Reducer<IAquariumCleaning> =
  (state: IAquariumCleaning | undefined, action: IAction) => {
  if (!state) {
    state = {
      cleaning: undefined,
      saveStatus: SaveStatusState.None
    };
  }
  switch (action.type) {
    case ACTIONS.CLEANING_REQUEST_NEW_RECORD: {
      const newState: IAquariumCleaning = {
        ...state,
        saveStatus: SaveStatusState.Pending
      };
      return newState;
    }

    case ACTIONS.CLEANING_NEW_RECORD_FAILED: {
      const newState: IAquariumCleaning = {
        ...state,
        saveStatus: SaveStatusState.Failed
      };
      return newState;
    }

    case ACTIONS.CLEANING_NEW_RECORD_SUCEEDED: {
      const newState: IAquariumCleaning = {
        ...state,
        saveStatus: SaveStatusState.Succeeded,
        cleaning: (action as ICleaningHistoryFetchSucceededAction).aquariumCleaning
      };
      return newState;
    }

    case ACTIONS.CLEANING_FETCH_FAILED: {
      const newState: IAquariumCleaning = {
        ...state,
        cleaning: undefined
      };
      return newState;
    }

    case ACTIONS.CLEANING_FETCH_SUCCEEDED: {
      const newState: IAquariumCleaning = {
        ...state,
        cleaning: (action as ICleaningHistoryFetchSucceededAction).aquariumCleaning
      };
      return newState;
    }

    default: {
      return state;
    }
  }
};
