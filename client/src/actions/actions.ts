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

import {
  IConfig,
  IState,
  ITemperature,
  ICleaning,
  ICleaningEntry,
  ITesting,
  ITestingEntry
} from '../common/common';

export const ACTIONS = {
  STATE_FETCH_SUCCEEDED: 'STATE_FETCH_SUCCEEDED',
  STATE_FETCH_FAILED: 'STATE_FETCH_FAILED',

  CLEANING_FETCH_SUCCEEDED: 'CLEANING_FETCH_SUCCEEDED',
  CLEANING_FETCH_FAILED: 'CLEANING_FETCH_FAILED',
  CLEANING_REQUEST_NEW_RECORD: 'CLEANING_REQUEST_NEW_RECORD',
  CLEANING_NEW_RECORD_SUCEEDED: 'CLEANING_NEW_RECORD_SUCEEDED',
  CLEANING_NEW_RECORD_FAILED: 'CLEANING_NEW_RECORD_FAILED',

  TESTING_FETCH_SUCCEEDED: 'TESTING_FETCH_SUCCEEDED',
  TESTING_FETCH_FAILED: 'TESTING_FETCH_FAILED',
  TESTING_REQUEST_NEW_RECORD: 'TESTING_REQUEST_NEW_RECORD',
  TESTING_NEW_RECORD_SUCEEDED: 'TESTING_NEW_RECORD_SUCEEDED',
  TESTING_NEW_RECORD_FAILED: 'TESTING_NEW_RECORD_FAILED',

  CONFIG_FETCH_SUCCEEDED: 'CONFIG_FETCH_SUCCEEDED',
  CONFIG_FETCH_FAILED: 'CONFIG_FETCH_FAILED',
  CONFIG_REQUEST_UPDATE: 'CONFIG_REQUEST_UPDATE',
  CONFIG_UPDATE_SUCCEEDED: 'CONFIG_UPDATE_SUCCEEDED',
  CONFIG_UPDATE_FAILED: 'CONFIG_UPDATE_FAILED',

  TEMPERATURE_FETCH_SUCCEEDED: 'TEMPERATURE_FETCH_SUCCEEDED',
  TEMPERATURE_FETCH_FAILED: 'TEMPERATURE_FETCH_FAILED'
};

// TODO: change interfaces so the `type` entry is explicitly specified
// e.g. "CLEANING_FETCH_SUCCEEDED", as opposed to just "string"
export interface IAction {
  type: string;
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

// Temperature Actions

export interface ITemperatureFetchSucceededAction extends IAction {
  temperature: ITemperature;
}

export function temperatureFetchSuceeded(temperature: ITemperature): ITemperatureFetchSucceededAction {
  return {
    type: ACTIONS.TEMPERATURE_FETCH_SUCCEEDED,
    temperature
  };
}

export function temperatureFetchFailed(): IAction {
  return {
    type: ACTIONS.TEMPERATURE_FETCH_FAILED
  };
}

// Cleaning Actions

export interface ICleaningHistoryFetchSucceededAction extends IAction {
  aquariumCleaning: ICleaning;
}

export function cleaningHistoryFetchSucceeded(aquariumCleaning: ICleaning): ICleaningHistoryFetchSucceededAction {
  return {
    type: ACTIONS.CLEANING_FETCH_SUCCEEDED,
    aquariumCleaning
  };
}

export function cleaningHistoryFetchFailed(): IAction {
  return {
    type: ACTIONS.CLEANING_FETCH_FAILED
  };
}

export interface ICleaningRequestCreateRecordAction extends IAction {
  newRecord: ICleaningEntry;
}

export function cleaningRequestCreateRecord(newRecord: ICleaningEntry): ICleaningRequestCreateRecordAction {
  return {
    type: ACTIONS.CLEANING_REQUEST_NEW_RECORD,
    newRecord
  };
}

export interface ICleaningCreateRecordSucceededAction extends IAction {
  aquariumCleaning: ICleaning;
}

export function cleaningCreateRecordSucceeded(aquariumCleaning: ICleaning): ICleaningCreateRecordSucceededAction {
  return {
    type: ACTIONS.CLEANING_NEW_RECORD_SUCEEDED,
    aquariumCleaning
  };
}

export function cleaningCreateRecordFailed(): IAction {
  return {
    type: ACTIONS.CLEANING_NEW_RECORD_FAILED
  };
}

// Testing Actions

export interface ITestingHistoryFetchSucceededAction extends IAction {
  aquariumTesting: ITesting;
}

export function testingHistoryFetchSucceeded(aquariumTesting: ITesting): ITestingHistoryFetchSucceededAction {
  return {
    type: ACTIONS.TESTING_FETCH_SUCCEEDED,
    aquariumTesting
  };
}

export function testingHistoryFetchFailed(): IAction {
  return {
    type: ACTIONS.TESTING_FETCH_FAILED
  };
}

export interface ITestingRequestCreateRecordAction extends IAction {
  newRecord: ITestingEntry;
}

export function testingRequestCreateRecord(newRecord: ITestingEntry): ITestingRequestCreateRecordAction {
  return {
    type: ACTIONS.TESTING_REQUEST_NEW_RECORD,
    newRecord
  };
}

export interface ITestingCreateRecordSucceededAction extends IAction {
  aquariumTesting: ITesting;
}

export function testingCreateRecordSucceeded(aquariumTesting: ITesting): ITestingCreateRecordSucceededAction {
  return {
    type: ACTIONS.TESTING_NEW_RECORD_SUCEEDED,
    aquariumTesting
  };
}

export function testingCreateRecordFailed(): IAction {
  return {
    type: ACTIONS.TESTING_NEW_RECORD_FAILED
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
