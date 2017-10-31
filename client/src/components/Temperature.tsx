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
import { IAquariumTemperature } from '../util/IAppState';

export interface ITemperatureProps {
  temperature: IAquariumTemperature;
}

export function Temperature(props: ITemperatureProps): JSX.Element {
  if (!props.temperature || !props.temperature.temperature) {
    return (
      <div>
        <div><h2>Temperature History</h2></div>
        <div className="alert alert-danger">Current temperature history not available</div>
      </div>
    );
  }
  return (
    <div>
      <div><h2>Temperature History</h2></div>
      <div className="temperature-content">
        <div className="temperature-section-container">
          <div><h3>Daily Temperature History</h3></div>
          <div>Daily History</div>
        </div>
        <div className="temperature-section-container">
          <div><h3>Monthly Temperature History</h3></div>
          <div>Monthly History</div>
        </div>
      </div>
    </div>
  );
}
