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
import { SaveStatus } from './SaveStatus';
import { SaveStatusState } from '../util/IAppState';

export interface IRecordCleaningProps {
  saveStatus: SaveStatusState;
}

export interface IRecordCleaningDispatch {
  requestCreateCleaningRecord: (newRecord: ICleaningEntry) => void;
}

interface IRecordCleaningState {
  isBioFilterChecked: boolean;
  isMechanicalFilterChecked: boolean;
  isSpongeChecked: boolean;
}

export class RecordCleaning extends
  React.Component<IRecordCleaningProps & IRecordCleaningDispatch, IRecordCleaningState> {

  public state: IRecordCleaningState = {
    isBioFilterChecked: false,
    isMechanicalFilterChecked: false,
    isSpongeChecked: false
  };

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
              <input type="checkbox" id="request-cleaning-form-bio" onChange={this._handleBioFilterChanged} />
              <label htmlFor="request-cleaning-form-bio">Bio filter replaced</label>
            </div>
            <div className="record-cleaning-form-detail">
              <input type="checkbox" id="request-cleaning-form-mechanical"
                onChange={this._handleMechanicalFilterChanged} />
              <label htmlFor="request-cleaning-form-mechanical">Mechanical filter replaced</label>
            </div>
            <div className="record-cleaning-form-detail">
              <input type="checkbox" id="request-cleaning-form-sponge" onChange={this._handleSpongeChanged} />
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

  private _handleBioFilterChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const isBioFilterChecked = event.currentTarget.checked;
    this.setState((previousState) => {
      const newState = {
        ...previousState,
        isBioFilterChecked
      };
      return newState;
    });
  }

  private _handleMechanicalFilterChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const isMechanicalFilterChecked = event.currentTarget.checked;
    this.setState((previousState) => {
      const newState = {
        ...previousState,
        isMechanicalFilterChecked
      };
      return newState;
    });
  }

  private _handleSpongeChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const isSpongeChecked = event.currentTarget.checked;
    this.setState((previousState) => {
      const newState = {
        ...previousState,
        isSpongeChecked
      };
      return newState;
    });
  }

  private _handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.requestCreateCleaningRecord({
      time: Date.now(),
      bioFilterReplaced: this.state.isBioFilterChecked,
      mechanicalFilterReplaced: this.state.isMechanicalFilterChecked,
      spongeReplaced: this.state.isSpongeChecked
    });
  }
}
