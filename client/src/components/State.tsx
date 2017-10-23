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
import { IAquariumState } from '../util/IAppState';
import { StateEntry } from './StateEntry';
import * as moment from 'moment';

function formatDate(timestamp: number): string {
  return moment(timestamp).format('MMM D YYYY h:mm a');
}

function capitalizeFirstLetter(value: string): string {
  return value[0].toUpperCase() + value.substr(1);
}

export function State(props: IAquariumState): JSX.Element {
  if (!props.currentStateValid || !props.state) {
    return (
      <div>
        <div><h1>Current State</h1></div>
        <div className="alert alert-danger">Current state not available</div>
      </div>
    );
  }
  let banner: JSX.Element | undefined;
  if (props.currentStateStale) {
    banner = (
      <div className="alert alert-warning">Current state information is outdated. Is the Raspberry Pi offline?</div>
    );
  }
  return (
    <div>
      <div><h1>Current State</h1></div>
      {banner}
      <div className="state-current-container">
        <div className="state-current-group-container">
          <StateEntry label="Current Mode" value={capitalizeFirstLetter(props.state.currentMode)} />
          <StateEntry label="Current Time" value={formatDate(props.state.currentTime)} />
          <StateEntry label="Current State" value={capitalizeFirstLetter(props.state.currentState)} />
        </div>
        <div className="state-current-group-container">
          <StateEntry label="Next Transition Time" value={formatDate(props.state.nextTransitionTime)} />
          <StateEntry label="Next Transitition State" value={capitalizeFirstLetter(props.state.nextTransitionState)} />
        </div>
        <div className="state-current-group-container">
          <StateEntry label="Current Temperature" value={props.state.currentTemperature + ' C'} />
        </div>
      </div>
    </div>
  );
}
