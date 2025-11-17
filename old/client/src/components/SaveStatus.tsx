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
import { SaveStatusState } from '../util/IAppState';

export interface ISaveStatusProps {
  saveStatus: SaveStatusState;
  labels: {
    pending: string;
    failed: string;
    suceeded: string;
  };
}

export function SaveStatus(props: ISaveStatusProps): JSX.Element {
  switch (props.saveStatus) {
    case SaveStatusState.Pending:
      return (
        <div className="alert alert-primary">{props.labels.pending}</div>
      );
    case SaveStatusState.Succeeded:
      return (
        <div className="alert alert-success">{props.labels.suceeded}</div>
      );
    case SaveStatusState.Failed:
      return (
        <div className="alert alert-danger">{props.labels.failed}</div>
      );
    case SaveStatusState.None:
      return (<span></span>);
    default:
      throw new Error(`Internal Error: unknown save status ${props.saveStatus}`);
  }
}
