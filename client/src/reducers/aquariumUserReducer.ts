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
import { ACTIONS, IAction, IUserFetchSeucceededAction } from '../actions/actions';
import { IAquariumUser } from '../util/IAppState';

export const aquariumUserReducer: Reducer<IAquariumUser> = (state: IAquariumUser | undefined, action: IAction) => {
  switch (action.type) {
    case ACTIONS.USER_FETCH_FAILED: {
      const newState: IAquariumUser = {
        user: undefined
      };
      return newState;
    }

    case ACTIONS.USER_FETCH_SUCCEEDED: {
      const newState: IAquariumUser = {
        user: (action as IUserFetchSeucceededAction).userInfo
      };
      return newState;
    }

    default: {
      if (state) {
        return state;
      }
      const newState: IAquariumUser = {
        user: undefined
      };
      return newState;
    }
  }
};
