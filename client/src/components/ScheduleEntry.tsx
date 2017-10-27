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
import { ButtonBar } from './ButtonBar';

export interface IScheduleEntryProps {
  entry: IScheduleEntry;
  index: number;
  onEntryChanged(index: number, newData: IScheduleEntry): void;
}

interface IScheduleEntryState {
  editedEntry: IScheduleEntry;
}

export class ScheduleEntry extends React.Component<IScheduleEntryProps, IScheduleEntryState> {

  constructor(props: IScheduleEntryProps) {
    super(props);

    this.state = {
      editedEntry: { ...props.entry }
    };

    this._handleNameChanged = this._handleNameChanged.bind(this);
    this._handleEventChanged = this._handleEventChanged.bind(this);
    this._handleStateChanged = this._handleStateChanged.bind(this);
    this._handleTypeChanged = this._handleTypeChanged.bind(this);
    this._handleHourChange = this._handleHourChange.bind(this);
    this._handleMinuteChange = this._handleMinuteChange.bind(this);
  }

  public render() {
    const entry = this.props.entry;
    let details: JSX.Element;
    switch (entry.type) {
      case 'dynamic':
        details = (
          <div>
            <span className="configuration-sechedule-entry-label">Event:</span>
            <ButtonBar
              items={[
                { displayName: 'Sunrise', valueName: 'sunrise' },
                { displayName: 'Sunset', valueName: 'sunset' }
              ]}
              onItemSelected={this._handleEventChanged}
              defaultValueName={(entry.details as IDynamicScheduleEntry).event}
            />
          </div>
        );
        break;
      case 'manual':
        details = (
          <div>
            <span className="configuration-sechedule-entry-label">Hour:</span>
            <input
              type="number"
              value={(entry.details as IManualScheduleEntry).hour}
              min="0"
              max="23"
              onChange={this._handleHourChange}
            />
            <span className="configuration-sechedule-entry-label" style={{ marginLeft: '7px' }}>Minute:</span>
            <input
              type="number"
              value={(entry.details as IManualScheduleEntry).minute}
              min="0"
              max="59"
              onChange={this._handleMinuteChange}
            />
          </div>
        );
        break;
      default:
        throw new Error(`Internal Error: unknown schedule type ${entry.type}`);
    }
    return (
      <div className="configuration-sechedule-entry-container">
        <div className="configuration-sechedule-entry-column">
          <div>
            <span className="configuration-sechedule-entry-label">Name:</span>
            <input type="text" value={entry.name} onChange={this._handleNameChanged} />
          </div>
        </div>
        <div className="configuration-sechedule-entry-column">
          <div>
            <span className="configuration-sechedule-entry-label">State:</span>
            <ButtonBar
              items={[
                { displayName: 'Day', valueName: 'day' },
                { displayName: 'Night', valueName: 'night' },
                { displayName: 'Off', valueName: 'off' }
              ]}
              onItemSelected={this._handleStateChanged}
              defaultValueName={entry.state}
            />
          </div>
        </div>
        <div className="configuration-sechedule-entry-column">
          <div>
            <span className="configuration-sechedule-entry-label">Type:</span>
            <ButtonBar
              items={[
                { displayName: 'Dynamic', valueName: 'dynamic' },
                { displayName: 'Manual', valueName: 'manual' }
              ]}
              onItemSelected={this._handleTypeChanged}
              defaultValueName={entry.type}
            />
          </div>
        </div>
        <div className="configuration-sechedule-entry-column">
          {details}
        </div>
      </div>
    );
  }

  private _handleNameChanged(event: React.FormEvent<HTMLInputElement>) {
    console.log(event);
  }

  private _handleEventChanged(event: string) {
    console.log(event);
  }

  private _handleStateChanged(state: string) {
    console.log(state);
  }

  private _handleTypeChanged(type: string) {
    console.log(type);
  }

  private _handleHourChange(event: React.FormEvent<HTMLInputElement>) {
    console.log(event);
  }

  private _handleMinuteChange(event: React.FormEvent<HTMLInputElement>) {
    console.log(event);
  }

}
