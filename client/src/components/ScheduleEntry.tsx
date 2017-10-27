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
import * as clone from 'clone';

export interface IScheduleEntryProps {
  entry: IScheduleEntry;
  index: number;
  onEntryChanged(index: number, newData: IScheduleEntry): void;
  onEntryDeleted(index: number): void;
  onEntryMovedUp(index: number): void;
  onEntryMovedDown(index: number): void;
}

interface IScheduleEntryState {
  unsavedEntry: IScheduleEntry;
}

export class ScheduleEntry extends React.Component<IScheduleEntryProps, IScheduleEntryState> {

  constructor(props: IScheduleEntryProps) {
    super(props);

    this.state = {
      unsavedEntry: clone(props.entry)
    };

    this._handleNameChanged = this._handleNameChanged.bind(this);
    this._handleEventChanged = this._handleEventChanged.bind(this);
    this._handleStateChanged = this._handleStateChanged.bind(this);
    this._handleTypeChanged = this._handleTypeChanged.bind(this);
    this._handleHourChange = this._handleHourChange.bind(this);
    this._handleMinuteChange = this._handleMinuteChange.bind(this);
    this._handleDeletePressed = this._handleDeletePressed.bind(this);
    this._handleUpPressed = this._handleUpPressed.bind(this);
    this._handleDownPressed = this._handleDownPressed.bind(this);
  }

  public render() {
    const entry = this.state.unsavedEntry;
    let details: JSX.Element;
    switch (entry.type) {
      case 'dynamic':
        details = (
          <div>
            <span className="sechedule-entry-label">Event:</span>
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
            <span className="sechedule-entry-label">Hour:</span>
            <input
              type="number"
              value={(entry.details as IManualScheduleEntry).hour}
              min="0"
              max="23"
              onChange={this._handleHourChange}
            />
            <span className="sechedule-entry-label" style={{ marginLeft: '7px' }}>Minute:</span>
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
      <div className="schedule-entry-outer-container">
        <div className="schedule-entry-side-control">
          <button type="button" className="btn btn-info" onClick={this._handleUpPressed}>↑</button>
          <button type="button" className="btn btn-info" onClick={this._handleDownPressed}>↓</button>
        </div>
        <div className="sechedule-entry-container">
          <div className="sechedule-entry-column">
            <div>
              <span className="sechedule-entry-label">Name:</span>
              <input type="text" value={entry.name} onChange={this._handleNameChanged} />
            </div>
          </div>
          <div className="sechedule-entry-column">
            <div>
              <span className="sechedule-entry-label">State:</span>
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
          <div className="sechedule-entry-column">
            <div>
              <span className="sechedule-entry-label">Type:</span>
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
          <div className="sechedule-entry-column">
            {details}
          </div>
        </div>
        <div className="schedule-entry-side-control">
          <button type="button" className="btn btn-danger" onClick={this._handleDeletePressed}>X</button>
        </div>
      </div>
    );
  }

  private _handleDeletePressed() {
    this.props.onEntryDeleted(this.props.index);
  }

  private _handleUpPressed() {
    this.props.onEntryMovedUp(this.props.index);
  }

  private _handleDownPressed() {
    this.props.onEntryMovedDown(this.props.index);
  }

  private _handleNameChanged(event: React.FormEvent<HTMLInputElement>) {
    const newName = event.currentTarget.value;
    this.setState((previousState) => {
      const newState: IScheduleEntryState = {
        unsavedEntry: {
          ...previousState.unsavedEntry,
          name: newName
        }
      };
      this.props.onEntryChanged(this.props.index, newState.unsavedEntry);
      return newState;
    });
  }

  private _handleEventChanged(event: string) {
    if (event !== 'sunrise' && event !== 'sunset') {
      throw new Error(`Internal Error: Unknown event ${event}`);
    }
    this.setState((previousState) => {
      const newState = clone(previousState);
      (newState.unsavedEntry.details as IDynamicScheduleEntry).event = event;
      this.props.onEntryChanged(this.props.index, newState.unsavedEntry);
      return newState;
    });
  }

  private _handleStateChanged(state: string) {
    if (state !== 'day' && state !== 'night' && state !== 'off') {
      throw new Error(`Internal Error: Unknown state ${state}`);
    }
    this.setState((previousState) => {
      const newState = clone(previousState);
      newState.unsavedEntry.state = state;
      this.props.onEntryChanged(this.props.index, newState.unsavedEntry);
      return newState;
    });
  }

  private _handleTypeChanged(type: string) {
    if (type !== 'dynamic' && type !== 'manual') {
      throw new Error(`Internal Error: Unknown state ${type}`);
    }
    this.setState((previousState) => {
      const newState = clone(previousState);
      newState.unsavedEntry.type = type;
      this.props.onEntryChanged(this.props.index, newState.unsavedEntry);
      return newState;
    });
  }

  private _handleHourChange(event: React.FormEvent<HTMLInputElement>) {
    const newHour = parseInt(event.currentTarget.value, 10);
    this.setState((previousState) => {
      const newState = clone(previousState);
      (newState.unsavedEntry.details as IManualScheduleEntry).hour = newHour;
      this.props.onEntryChanged(this.props.index, newState.unsavedEntry);
      return newState;
    });
  }

  private _handleMinuteChange(event: React.FormEvent<HTMLInputElement>) {
    const newMinute = parseInt(event.currentTarget.value, 10);
    this.setState((previousState) => {
      const newState = clone(previousState);
      (newState.unsavedEntry.details as IManualScheduleEntry).minute = newMinute;
      this.props.onEntryChanged(this.props.index, newState.unsavedEntry);
      return newState;
    });
  }

}
