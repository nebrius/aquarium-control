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

import { IState } from '../util/IAppState';

export const ACTIONS = {
  LOGIN_SUCCEEDED: 'LOGIN_SUCCEEDED',
  LOGIN_FAILED: 'LOGIN_FAILED',
  STATE_UPDATE_SUCCEEDED: 'STATE_UPDATE_SUCCEEDED',
  STATE_UPDATE_FAILED: 'STATE_UPDATE_FAILED',
};

export interface IAction {
  type: string;
}

export interface ILoginSucceededAction extends IAction {
  accessToken: string;
}

export function loginSucceeded(accessToken: string): ILoginSucceededAction {
  return {
    type: ACTIONS.LOGIN_SUCCEEDED,
    accessToken
  };
}

export function loginFailed(): IAction {
  return {
    type: ACTIONS.LOGIN_FAILED
  };
}

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
