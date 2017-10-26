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

import * as React from 'react';
import { IAquariumState, IAquariumUser } from '../util/IAppState';
import { formatDate, capitalizeFirstLetter } from '../util/format';
import { StateEntry } from './StateEntry';

export interface IStateProps {
  state: IAquariumState;
  user: IAquariumUser;
}

export function State(props: IStateProps): JSX.Element {
  if (!props.state || !props.state.state || !props.user || !props.user.user) {
    return (
      <div>
        <div><h1>Current State</h1></div>
        <div className="alert alert-danger">Current state not available</div>
      </div>
    );
  }
  let banner: JSX.Element | undefined;
  if (props.state.currentStateStale) {
    banner = (
      <div className="alert alert-warning">Current state information is outdated. Is the Raspberry Pi offline?</div>
    );
  }
  const state = props.state.state;
  const timezone = props.user.user.timezone;
  return (
    <div>
      <div><h1>Current State</h1></div>
      {banner}
      <div className="state-current-container">
        <div className="state-current-group-container">
          <StateEntry label="Current Mode" value={capitalizeFirstLetter(state.currentMode)} />
          <StateEntry label="Current Time" value={formatDate(state.currentTime, timezone)} />
          <StateEntry label="Current State" value={capitalizeFirstLetter(state.currentState)} />
        </div>
        <div className="state-current-group-container">
          <StateEntry label="Next Transition Time" value={formatDate(state.nextTransitionTime, timezone)} />
          <StateEntry label="Next Transitition State" value={capitalizeFirstLetter(state.nextTransitionState)} />
        </div>
        <div className="state-current-group-container">
          <StateEntry label="Current Temperature" value={state.currentTemperature + ' C'} />
        </div>
      </div>
    </div>
  );
}
