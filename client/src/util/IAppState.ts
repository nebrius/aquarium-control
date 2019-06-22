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

import { IState, IConfig, ITemperature, ICleaning, ITesting } from '../common/common';

export enum SaveStatusState {
  Pending,
  Failed,
  Succeeded,
  None
}

export interface IAquariumState {
  state: IState | undefined;
  currentStateStale: boolean;
}

export interface IAquariumConfig {
  config: IConfig | undefined;
  saveStatus: SaveStatusState;
}

export interface IAquariumTemperature {
  temperature: ITemperature | undefined;
}

export interface IAquariumCleaning {
  cleaning: ICleaning | undefined;
  saveStatus: SaveStatusState;
}

export interface IAquariumTesting {
  testing: ITesting | undefined;
  saveStatus: SaveStatusState;
}

export interface IAppState {
  aquariumState: IAquariumState;
  aquariumConfig: IAquariumConfig;
  aquariumTemperature: IAquariumTemperature;
  aquariumCleaning: IAquariumCleaning;
  aquariumTesting: IAquariumTesting;
}
