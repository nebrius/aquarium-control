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
import { Line, ChartData as ReactChartData } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import * as moment from 'moment-timezone';

export interface ISample {
  time: number;
  value: number;
}

export interface ISampleSet {
  label: string;
  color: string;
  samples: ISample[];
}

export interface IGraphOptions {
  dataSets: ISampleSet[];
  yAxisLabel: string;
  timezone: string;
  dateType: 'time' | 'day';
  width: number;
  height: number;
  suggestedMin: number;
  suggestedMax: number;
}

export function Graph(props: IGraphOptions): JSX.Element {

  // We only use the first dataset, since the sets always come from unified sources
  const labels = props.dataSets[0].samples.map(
    (sample) => moment.tz(sample.time, props.timezone).format(props.dateType === 'time' ? 'h:mm a' : 'MM-DD'));

  // Create the datasets
  const datasets = props.dataSets.map((dataset) => {
    const formattedDataset: Chart.ChartDataSets = {
      backgroundColor: dataset.color,
      borderColor: dataset.color,
      data: dataset.samples.map((sample) => sample.value),
      fill: false,
      label: dataset.label
    };
    return formattedDataset;
  });

  const dailyChartData: ReactChartData<ChartData> = {
    labels,
    datasets
  };
  const dailyChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: props.yAxisLabel
        },
        ticks: {
          suggestedMin: props.suggestedMin,
          suggestedMax: props.suggestedMax
        } as any
      }]
    }
  };
  return (
    <Line data={dailyChartData} options={dailyChartOptions} width={props.width} height={props.height} />
  );
}
