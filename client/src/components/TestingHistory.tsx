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
import { ITestingEntry } from '../common/common';
import { Graph, ISampleSet } from './Graph';

export interface ITestingHistoryProps {
  testingHistory: ITestingEntry[] | undefined;
  timezone: string;
}

export function TestingHistory(props: ITestingHistoryProps): JSX.Element {
  if (!props.testingHistory) {
    return (
      <div>
        <div><h2>Testing History</h2></div>
        <div className="alert alert-danger">Current testing history is not available</div>
      </div>
    );
  }

  const phData: ISampleSet[] = [{
    label: 'pH',
    color: 'rgb(54, 162, 235)',
    samples: props.testingHistory.map((sample) => {
      return {
        time: sample.time,
        value: sample.ph
      };
    }),
  }];

  const ammoniaData: ISampleSet[] = [{
    label: 'pH',
    color: 'rgb(54, 162, 235)',
    samples: props.testingHistory.map((sample) => {
      return {
        time: sample.time,
        value: sample.ammonia
      };
    }),
  }];

  const nitritesData: ISampleSet[] = [{
    label: 'pH',
    color: 'rgb(54, 162, 235)',
    samples: props.testingHistory.map((sample) => {
      return {
        time: sample.time,
        value: sample.nitrites
      };
    }),
  }];

  const nitratesData: ISampleSet[] = [{
    label: 'pH',
    color: 'rgb(54, 162, 235)',
    samples: props.testingHistory.map((sample) => {
      return {
        time: sample.time,
        value: sample.nitrates
      };
    }),
  }];

  const width = Math.max(window.innerWidth - 100);
  const height = window.innerHeight / 4;
  return (
    <div>
      <div><h2>Testing History</h2></div>

      <div className="testing-content">
        <div><h3>pH</h3></div>
        <div className="testing-section-container">
          <Graph
            dataSets={phData}
            yAxisLabel="pH"
            timezone={props.timezone}
            dateType="day"
            width={width}
            height={height}
            suggestedMin={6}
            suggestedMax={9}
          />
        </div>
      </div>

      <div className="testing-content">
        <div><h3>Ammonia</h3></div>
        <div className="testing-section-container">
          <Graph
            dataSets={ammoniaData}
            yAxisLabel="Ammonia (ppm)"
            timezone={props.timezone}
            dateType="day"
            width={width}
            height={height}
            suggestedMin={0}
            suggestedMax={8}
          />
        </div>
      </div>

      <div className="testing-content">
        <div><h3>Nitrites</h3></div>
        <div className="testing-section-container">
          <Graph
            dataSets={nitritesData}
            yAxisLabel="Nitrites (ppm)"
            timezone={props.timezone}
            dateType="day"
            width={width}
            height={height}
            suggestedMin={0}
            suggestedMax={5}
          />
        </div>
      </div>

      <div className="testing-content">
        <div><h3>Nitrates</h3></div>
        <div className="testing-section-container">
          <Graph
            dataSets={nitratesData}
            yAxisLabel="Nitrates"
            timezone={props.timezone}
            dateType="day"
            width={width}
            height={height}
            suggestedMin={0}
            suggestedMax={160}
          />
        </div>
      </div>
    </div>
  );
}
