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
import { SaveStatus } from './SaveStatus';
import { SaveStatusState } from '../util/IAppState';
import { ITestingEntry } from '../common/common';

export interface IRecordTestingProps {
  saveStatus: SaveStatusState;
}

export interface IRecordTestingDispatch {
  requestCreateTestingRecord: (newRecord: ITestingEntry) => void;
}

interface IRecordTestingState {
  ph: number;
  ammonia: number;
  nitrites: number;
  nitrates: number;
}

export class RecordTesting extends
  React.Component<IRecordTestingProps & IRecordTestingDispatch, IRecordTestingState> {

  public state = {
    ph: 0,
    ammonia: 0,
    nitrites: 0,
    nitrates: 0
  };

  public render() {
    return (
      <div>
        <div><h2>Record Testing</h2></div>
        <SaveStatus saveStatus={this.props.saveStatus} labels={{
          pending: 'Creating testing record',
          suceeded: 'Testing record created!',
          failed: 'Could not create testing record!'
        }} />
        <form onSubmit={this._handleSubmit} className="record-cleaning-form">
          <div className="record-cleaning-form-details">
            <div className="record-cleaning-form-detail">
              <label htmlFor="request-cleaning-form-bio">pH</label>
              <input type="number" id="request-cleaning-form-bio" onChange={this._handlePHChanged} />
            </div>
          </div>
        </form>
      </div>
    );
  }

  private _handlePHChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const ph = parseFloat(event.currentTarget.value);
    this.setState((previousState) => {
      const newState = {
        ...previousState,
        ph
      };
      return newState;
    });
  }

  private _handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
}
