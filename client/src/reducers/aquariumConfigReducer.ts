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
import { IAquariumConfig, IConfig } from '../util/IAppState';
import { v4 } from 'uuid';

export const aquariumConfigReducer: Reducer<IAquariumConfig> = (state: IAquariumConfig, action: IAction) => {
  let aquariumConfig: IConfig;
  switch (action.type) {
    case ACTIONS.CONFIG_FETCH_SUCCEEDED:
      aquariumConfig = (action as IConfigFetchSucceededAction).aquariumConfig;
      aquariumConfig.schedule.forEach((scheduleEntry) => {
        scheduleEntry.id = v4();
      });
      return {
        config: aquariumConfig,
        saveStatus: state.saveStatus
      };
    case ACTIONS.CONFIG_FETCH_FAILED:
      return {
        config: undefined,
        saveStatus: state.saveStatus
      };
    case ACTIONS.CONFIG_REQUEST_UPDATE:
      return {
        config: state.config,
        saveStatus: 'pending'
      };
    case ACTIONS.CONFIG_UPDATE_SUCCEEDED:
      aquariumConfig = (action as IConfigUpdateSucceededAction).aquariumConfig;
      return {
        config: aquariumConfig,
        saveStatus: 'succeeded'
      };
    case ACTIONS.CONFIG_UPDATE_FAILED:
      return {
        config: state.config,
        saveStatus: 'failed'
      };
    default:
      if (state) {
        return state;
      }
      return {
        config: undefined,
        saveStatus: 'none'
      };
  }
};
