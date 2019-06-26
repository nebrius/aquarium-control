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
        <form onSubmit={this._handleSubmit} className="record-testing-form">
          <div className="record-testing-form-details">
            <div className="record-testing-form-detail">
              <label htmlFor="request-testing-form-ph">pH</label>
              <input
                type="number"
                value={this.state.ph}
                id="request-testing-form-ph"
                onChange={this._handlePHChanged} />
            </div>
            <div className="record-testing-form-detail">
              <label htmlFor="request-testing-form-ammonia">Ammonia</label>
              <input
                type="number"
                value={this.state.ammonia}
                id="request-testing-form-ammonia"
                onChange={this._handleAmmoniaChanged} />
            </div>
            <div className="record-testing-form-detail">
              <label htmlFor="request-testing-form-nitrites">Nitrites</label>
              <input
                type="number"
                value={this.state.nitrites}
                id="request-testing-form-nitrites"
                onChange={this._handleNitritesChanged} />
            </div>
            <div className="record-testing-form-detail">
              <label htmlFor="request-testing-form-nitrates">Nitrates</label>
              <input
                type="number"
                value={this.state.nitrates}
                id="request-testing-form-nitrates"
                onChange={this._handleNitratesChanged} />
            </div>
          </div>
          <div className="record-testing-form-submit">
            <input className="btn btn-primary" type="submit" value="Create New Record" disabled={false} />
          </div>
        </form>
      </div>
    );
  }

  private _handlePHChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const ph = parseFloat(event.currentTarget.value);
    if (isNaN(ph)) {
      return;
    }
    this.setState((previousState) => {
      const newState = {
        ...previousState,
        ph
      };
      return newState;
    });
  }

  private _handleAmmoniaChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const ammonia = parseFloat(event.currentTarget.value);
    if (isNaN(ammonia)) {
      return;
    }
    this.setState((previousState) => {
      const newState = {
        ...previousState,
        ammonia
      };
      return newState;
    });
  }

  private _handleNitritesChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const nitrites = parseFloat(event.currentTarget.value);
    if (isNaN(nitrites)) {
      return;
    }
    this.setState((previousState) => {
      const newState = {
        ...previousState,
        nitrites
      };
      return newState;
    });
  }

  private _handleNitratesChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const nitrates = parseFloat(event.currentTarget.value);
    if (isNaN(nitrates)) {
      return;
    }
    this.setState((previousState) => {
      const newState = {
        ...previousState,
        nitrates
      };
      return newState;
    });
  }

  private _handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.requestCreateTestingRecord({
      time: Date.now(),
      ph: this.state.ph,
      ammonia: this.state.ammonia,
      nitrites: this.state.nitrites,
      nitrates: this.state.nitrates
    });
  }
}
