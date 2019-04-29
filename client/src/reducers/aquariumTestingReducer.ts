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
import { IAction } from '../actions/actions';
import { IAquariumTesting, SaveStatusState } from '../util/IAppState';

export const aquariumTestingReducer: Reducer<IAquariumTesting> =
  (state: IAquariumTesting | undefined, action: IAction) => {
  if (!state) {
    state = {
      testing: undefined,
      saveStatus: SaveStatusState.None
    };
  }
  // TODO:
  return state;
};
