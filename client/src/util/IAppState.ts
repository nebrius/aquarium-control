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

import { IState } from '../common/IState';
import { IConfig } from '../common/IConfig';

export { IState } from '../common/IState';
export { IConfig } from '../common/IConfig';

export interface IAquariumState {
  state?: IState;
  currentStateValid: boolean;
}

export interface IAquariumConfig {
  config: IConfig;
}

export interface ILoginState {
  currentState: 'unknown' | 'not-authenticated' | 'authenticated';
  accessToken: string;
}

export interface IAppState {
  loginState: ILoginState;
  state?: IState;
  config?: IConfig;
}
