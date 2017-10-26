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

import { IConfig, IState, IUser } from '../util/IAppState';

export const ACTIONS = {
  USER_FETCH_SUCCEEDED: 'USER_FETCH_SUCCEEDED',
  USER_FETCH_FAILED: 'USER_FETCH_FAILED',
  STATE_FETCH_SUCCEEDED: 'STATE_FETCH_SUCCEEDED',
  STATE_FETCH_FAILED: 'STATE_FETCH_FAILED',
  CONFIG_FETCH_SUCCEEDED: 'CONFIG_FETCH_SUCCEEDED',
  CONFIG_FETCH_FAILED: 'CONFIG_FETCH_FAILED',
  CONFIG_REQUEST_UPDATE: 'CONFIG_REQUEST_UPDATE',
  CONFIG_UPDATE_SUCCEEDED: 'CONFIG_UPDATE_SUCCEEDED',
  CONFIG_UPDATE_FAILED: 'CONFIG_UPDATE_FAILED'
};

export interface IAction {
  type: string;
}

// User Actions

export interface IUserFetchSeucceededAction extends IAction {
  userInfo: IUser;
}

export function userFetchSucceeded(userInfo: IUser): IUserFetchSeucceededAction {
  return {
    type: ACTIONS.USER_FETCH_SUCCEEDED,
    userInfo
  };
}

export function userFetchFailed(): IAction {
  return {
    type: ACTIONS.USER_FETCH_FAILED
  };
}

// State Actions

export interface IStateFetchSucceededAction extends IAction {
  aquariumState: IState;
}

export function stateFetchSucceeded(aquariumState: IState): IStateFetchSucceededAction {
  return {
    type: ACTIONS.STATE_FETCH_SUCCEEDED,
    aquariumState
  };
}

export function stateFetchFailed(): IAction {
  return {
    type: ACTIONS.STATE_FETCH_FAILED
  };
}

// Config Actions

export interface IConfigFetchSucceededAction extends IAction {
  aquariumConfig: IConfig;
}

export function configFetchSucceeded(aquariumConfig: IConfig): IConfigFetchSucceededAction {
  return {
    type: ACTIONS.CONFIG_FETCH_SUCCEEDED,
    aquariumConfig
  };
}

export function configFetchFailed(): IAction {
  return {
    type: ACTIONS.CONFIG_FETCH_FAILED
  };
}

export interface IConfigRequestUpdateAction extends IAction {
  aquariumConfig: IConfig;
}

export function configRequestUpdate(aquariumConfig: IConfig): IConfigRequestUpdateAction {
  return {
    type: ACTIONS.CONFIG_REQUEST_UPDATE,
    aquariumConfig
  };
}

export interface IConfigUpdateSucceededAction extends IAction {
  aquariumConfig: IConfig;
}

export function configUpdateSucceeded(aquariumConfig: IConfig): IConfigUpdateSucceededAction {
  return {
    type: ACTIONS.CONFIG_UPDATE_SUCCEEDED,
    aquariumConfig
  };
}

export function configUpdateFailed(): IAction {
  return {
    type: ACTIONS.CONFIG_UPDATE_FAILED
  };
}
