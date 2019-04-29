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
import { ICleaningEntry } from '../common/ICleaning';
import { SaveStatus } from './SaveStatus';
import { SaveStatusState } from '../util/IAppState';

export interface IRecordCleaningProps {
  saveStatus: SaveStatusState;
}

export interface IRecordCleaningDispatch {
  requestCreateCleaningRecord: (newRecord: ICleaningEntry) => void;
}

export class RecordCleaning extends
  React.Component<IRecordCleaningProps & IRecordCleaningDispatch, {}> {

  public render() {
    return (
      <div>
        <div><h2>Record Cleaning</h2></div>
        <SaveStatus saveStatus={this.props.saveStatus} labels={{
          pending: 'Creating cleaning record',
          suceeded: 'Cleaning record created!',
          failed: 'Could not create cleaning record!'
        }} />
        <form onSubmit={this._handleSubmit} className="record-cleaning-form">
          <div className="record-cleaning-form-details">
            <div className="record-cleaning-form-detail">
              <input type="checkbox" id="request-cleaning-form-bioFilter" />
              <label htmlFor="request-cleaning-form-bioFilter">Bio filter replaced</label>
            </div>
            <div className="record-cleaning-form-detail">
              <input type="checkbox" id="request-cleaning-form-mechanicalFilter" />
              <label htmlFor="request-cleaning-form-mechanicalFilter">Mechanical filter replaced</label>
            </div>
            <div className="record-cleaning-form-detail">
              <input type="checkbox" id="request-cleaning-form-sponge" />
              <label htmlFor="request-cleaning-form-sponge">Sponge replaced</label>
            </div>
          </div>
          <div className="record-cleaning-form-submit">
            <input className="btn btn-primary" type="submit" value="Create New Record" disabled={false} />
          </div>
        </form>
      </div>
    );
  }

  private _handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.requestCreateCleaningRecord({
      time: Date.now(),
      bioFilterReplaced: false,
      mechanicalFilterReplaced: false,
      spongeReplaced: false
    });
  }
}
