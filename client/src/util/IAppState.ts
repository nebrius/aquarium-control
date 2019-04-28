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

import { IUser } from '../common/IUser';
import { IState } from '../common/IState';
import { IConfig } from '../common/IConfig';
import { ITemperature } from '../common/ITemperature';

export { IState } from '../common/IState';
export { IConfig, IScheduleEntry, IDynamicScheduleEntry, IManualScheduleEntry } from '../common/IConfig';
export { IUser } from '../common/IUser';
export { ITemperature } from '../common/ITemperature';

export interface IAquariumState {
  state: IState | undefined;
  currentStateStale: boolean;
}

export interface IAquariumConfig {
  config: IConfig | undefined;
  saveStatus: 'pending' | 'failed' | 'succeeded' | 'none';
}

export interface IAquariumUser {
  user: IUser | undefined;
}

export interface IAquariumTemperature {
  temperature: ITemperature | undefined;
}

export interface IAppState {
  aquariumState: IAquariumState;
  aquariumConfig: IAquariumConfig;
  aquariumUser: IAquariumUser;
  aquariumTemperature: IAquariumTemperature;
}
