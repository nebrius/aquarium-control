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
import { IAction, ACTIONS, IConfigFetchSucceededAction, IConfigUpdateSucceededAction } from '../actions/actions';
import { IAquariumConfig, SaveStatusState } from '../util/IAppState';
import { v4 } from 'uuid';

export const aquariumConfigReducer: Reducer<IAquariumConfig> =
  (state: IAquariumConfig | undefined, action: IAction): IAquariumConfig => {
  if (!state) {
    state = {
      config: undefined,
      saveStatus: SaveStatusState.None
    };
  }
  switch (action.type) {
    case ACTIONS.CONFIG_FETCH_SUCCEEDED: {
      const aquariumConfig = (action as IConfigFetchSucceededAction).aquariumConfig;
      aquariumConfig.schedule.forEach((scheduleEntry) => {
        scheduleEntry.id = v4();
      });
      const newState: IAquariumConfig = {
        config: aquariumConfig,
        saveStatus: state.saveStatus
      };
      return newState;
    }

    case ACTIONS.CONFIG_FETCH_FAILED: {
      const newState: IAquariumConfig = {
        config: undefined,
        saveStatus: state.saveStatus
      };
      return newState;
    }

    case ACTIONS.CONFIG_REQUEST_UPDATE: {
      const newState: IAquariumConfig = {
        config: state.config,
        saveStatus: SaveStatusState.Pending
      };
      return newState;
    }

    case ACTIONS.CONFIG_UPDATE_SUCCEEDED: {
      const newState: IAquariumConfig = {
        config: (action as IConfigUpdateSucceededAction).aquariumConfig,
        saveStatus: SaveStatusState.Succeeded
      };
      return newState;
    }

    case ACTIONS.CONFIG_UPDATE_FAILED: {
      const newState: IAquariumConfig = {
        config: state.config,
        saveStatus: SaveStatusState.Failed
      };
      return newState;
    }

    default: {
      if (state) {
        return state;
      }
      const newState: IAquariumConfig = {
        config: undefined,
        saveStatus: SaveStatusState.None
      };
      return newState;
    }
  }
};
