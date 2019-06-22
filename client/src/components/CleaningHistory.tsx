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
import { ICleaningEntry } from '../common/common';
import { formatDate } from '../util/format';

export interface ICleaningHistoryProps {
  cleaningHistory: ICleaningEntry[] | undefined;
  timezone: string;
}

export function CleaningHistory(props: ICleaningHistoryProps): JSX.Element {
  if (!props.cleaningHistory) {
    return (
      <div>
        <div><h2>Cleaning History</h2></div>
        <div className="alert alert-danger">Current cleaning history is not available</div>
      </div>
    );
  }
  return (
    <div>
      <div><h2>Cleaning History</h2></div>
      <div className="cleaning-history-content">
        <table className="table cleaning-history-content-table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Bio Filter</th>
              <th scope="col">Mechanical Filter</th>
              <th scope="col">Sponge</th>
            </tr>
          </thead>
          <tbody>
            {props.cleaningHistory.map((entry) => (
              <tr key={entry.time}>
                <td>{formatDate(entry.time, props.timezone)}</td>
                <td>{entry.bioFilterReplaced ? '✔' : ''}</td>
                <td>{entry.mechanicalFilterReplaced ? '✔' : ''}</td>
                <td>{entry.spongeReplaced ? '✔' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
