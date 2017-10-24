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

import { IState, IUser } from '../util/IAppState';

export const ACTIONS = {
  USER_UPDATE_SUCCEEDED: 'USER_UPDATE_SUCCEEDED',
  USER_UPDATE_FAILED: 'USER_UPDATE_FAILED',
  STATE_UPDATE_SUCCEEDED: 'STATE_UPDATE_SUCCEEDED',
  STATE_UPDATE_FAILED: 'STATE_UPDATE_FAILED',
};

export interface IAction {
  type: string;
}

// User Actions

export interface IUserUpdateSeucceededAction extends IAction {
  userInfo: IUser;
}

export function userUpdateSucceeded(userInfo: IUser): IUserUpdateSeucceededAction {
  return {
    type: ACTIONS.USER_UPDATE_SUCCEEDED,
    userInfo
  };
}

export function userUpdateFailed(): IAction {
  return {
    type: ACTIONS.USER_UPDATE_FAILED
  };
}

// State Actions

export interface IStateUpdateSucceededAction extends IAction {
  aquariumState: IState;
}

export function stateUpdateSucceeded(aquariumState: IState): IStateUpdateSucceededAction {
  return {
    type: ACTIONS.STATE_UPDATE_SUCCEEDED,
    aquariumState
  };
}

export function stateUpdateFailed(): IAction {
  return {
    type: ACTIONS.STATE_UPDATE_FAILED
  };
}
