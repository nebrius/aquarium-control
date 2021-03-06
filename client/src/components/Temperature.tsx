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
import { Graph, ISampleSet } from './Graph';

export interface ITemperatureProps {
  temperature: IAquariumTemperature;
  timezone: string;
}

export function Temperature(props: ITemperatureProps): JSX.Element {
  if (!props.temperature.temperature) {
    return (
      <div>
        <div><h2>Temperature History</h2></div>
        <div className="alert alert-danger">Current temperature history not available</div>
      </div>
    );
  }
  const temperatures = props.temperature.temperature.history;
  const monthlyTemperatureData: ISampleSet[] = [{
    label: 'Low',
    color: 'rgb(54, 162, 235)',
    samples: temperatures.map((sample) => {
      return {
        time: sample.time,
        value: sample.low
      };
    }),
  }, {
    label: 'High',
    color: 'rgb(255, 99, 132)',
    samples: temperatures.map((sample) => {
      return {
        time: sample.time,
        value: sample.high
      };
    })
  }];
  const width = Math.max(window.innerWidth - 100);
  const height = window.innerHeight / 4;
  return (
    <div>
      <div><h2>Temperature History</h2></div>
      <div className="temperature-content">
        <div className="temperature-section-container">
          <Graph
            dataSets={monthlyTemperatureData}
            yAxisLabel="Temperature (C)"
            timezone={props.timezone}
            dateType="day"
            width={width}
            height={height}
            suggestedMin={23}
            suggestedMax={27}
          />
        </div>
      </div>
    </div>
  );
}
