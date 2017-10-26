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
import { IScheduleEntry, IDynamicScheduleEntry, IManualScheduleEntry } from '../util/IAppState';

export interface IScheduleEntryProps {
  entry: IScheduleEntry;
  entryUpdated: (newEntry: IScheduleEntry) => void;
  entryMovedUp: () => void;
  entryMovedDown: () => void;
}

export function ScheduleEntry(props: IScheduleEntryProps): JSX.Element {
  let details: JSX.Element;
  switch (props.entry.type) {
    case 'dynamic':
      details = (
        <div>
          <div>{(props.entry.details as IDynamicScheduleEntry).event}</div>
        </div>
      );
      break;
    case 'manual':
      details = (
        <div>
          <div>{(props.entry.details as IManualScheduleEntry).hour}</div>
          <div>{(props.entry.details as IManualScheduleEntry).minute}</div>
        </div>
      );
      break;
    default:
      throw new Error(`Internal Error: unknown schedule type ${props.entry.type}`);
  }
  return (
    <div key={props.entry.name}>
      <div>{props.entry.name}</div>
      <div>{props.entry.state}</div>
      <div>{props.entry.type}</div>
      {details}
    </div>
  );
}
