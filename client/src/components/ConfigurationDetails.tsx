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
import { IConfig, IScheduleEntry } from '../common/common';
import { ButtonBar } from './ButtonBar';
import { ScheduleEntry } from './ScheduleEntry';
import { SaveStatus } from './SaveStatus';
import * as clone from 'clone';
import { v4 } from 'uuid';
import equals = require('deep-equal');

export interface IConfigurationDetailsProps {
  config: IConfig;
  saveStatus: SaveStatusState;
  requestConfigUpdate: (newConfig: IConfig) => void;
}

interface IConfigState {
  unsavedConfig: IConfig;
}

export class ConfigurationDetails extends React.Component<IConfigurationDetailsProps, IConfigState> {

  constructor(props: IConfigurationDetailsProps) {
    super(props);
    this.state = {
      unsavedConfig: clone(props.config)
    };
  }

  public render() {
    const props = this.props;
    const mode = this.state.unsavedConfig.mode;

    let detailedConfig: JSX.Element;
    switch (mode) {
      case 'program':
        const entries = this.state.unsavedConfig.schedule.map((entry, index) => (
          <ScheduleEntry
            key={entry.id}
            index={index}
            entry={entry}
            onEntryChanged={this._handleScheduleEntryUpdated}
            onEntryDeleted={this._handleScheduleEntryDeleted}
            onEntryMovedUp={this._handleScheduleEntryMovedUp}
            onEntryMovedDown={this._handleScheduleEntryMovedDown}
          />
        ));
        detailedConfig = (
          <div className="configuration-category">
            <h3>Schedule</h3>
            <button
              type="button"
              className="btn btn-info"
              onClick={this._handleNewScheduleEntryRequested}
            >Add new entry</button>
            {entries}
          </div>
        );
        break;
      case 'override':
        detailedConfig = (
          <div className="configuration-category">
            <h3>Override State</h3>
            <ButtonBar
              items={[
                { displayName: 'Day', valueName: 'day' },
                { displayName: 'Night', valueName: 'night' },
                { displayName: 'Off', valueName: 'off' }
              ]}
              onItemSelected={this._handleOverrideStateSelect}
              defaultValueName={this.state.unsavedConfig.overrideState}
            />
          </div>
        );
        break;
      default:
        throw new Error(`Internal Error: Unknown mode ${mode}`);
    }

    const hasUnsavedChanges = !equals(this.state.unsavedConfig, props.config);
    return (
      <div>
        <div><h2>Configuration</h2></div>
        <SaveStatus saveStatus={this.props.saveStatus} labels={{
          pending: 'Applying configuration',
          suceeded: 'Configuration applied!',
          failed: 'Could not apply configuration!'
        }} />
        <form onSubmit={this._handleSubmit} className="configuration-contents">
          <div className="configuration-category">
            <h3>Mode</h3>
            <ButtonBar
              items={[
                { displayName: 'Program', valueName: 'program' },
                { displayName: 'Override', valueName: 'override' }
              ]}
              onItemSelected={this._handleModeSelect}
              defaultValueName={this.state.unsavedConfig.mode}
            />
          </div>
          {detailedConfig}
          <input className="btn btn-primary" type="submit" value="Apply" disabled={!hasUnsavedChanges} />
        </form>
      </div>
    );
  }

  private _handleModeSelect = (newMode: string) => {
    if (newMode !== 'program' && newMode !== 'override') {
      throw new Error(`Internal Error: Unknown mode ${newMode}`);
    }
    this.setState((previousState) => {
      const newState = clone(previousState);
      newState.unsavedConfig.mode = newMode;
      return newState;
    });
  }

  private _handleNewScheduleEntryRequested = () => {
    this.setState((previousState) => {
      const newState = clone(previousState);
      newState.unsavedConfig.schedule.push({
        id: v4(),
        name: '',
        type: 'dynamic',
        state: 'off',
        details: {
          event: 'sunrise'
        }
      });
      return newState;
    });
  }

  private _handleScheduleEntryUpdated = (index: number, newData: IScheduleEntry) => {
    this.setState((previousState) => {
      const newState = clone(previousState);
      newState.unsavedConfig.schedule[index] = clone(newData);
      return newState;
    });
  }

  private _handleScheduleEntryDeleted = (index: number) => {
    this.setState((previousState) => {
      const newState = clone(previousState);
      newState.unsavedConfig.schedule.splice(index, 1);
      return newState;
    });
  }

  private _handleScheduleEntryMovedUp = (index: number) => {
    if (index < 1) {
      return;
    }
    this.setState((previousState) => {
      const newState = clone(previousState);
      const entryToMove = newState.unsavedConfig.schedule[index];
      newState.unsavedConfig.schedule.splice(index, 1);
      newState.unsavedConfig.schedule.splice(index - 1, 0, entryToMove);
      return newState;
    });
  }

  private _handleScheduleEntryMovedDown = (index: number) => {
    if (index > this.state.unsavedConfig.schedule.length - 2) {
      return;
    }
    this.setState((previousState) => {
      const newState = clone(previousState);
      const entryToMove = newState.unsavedConfig.schedule[index];
      newState.unsavedConfig.schedule.splice(index, 1);
      newState.unsavedConfig.schedule.splice(index + 1, 0, entryToMove);
      return newState;
    });
  }

  private _handleOverrideStateSelect = (newOverrideState: string) => {
    if (newOverrideState !== 'day' && newOverrideState !== 'night' && newOverrideState !== 'off') {
      throw new Error(`Internal Error: Unknown override state ${newOverrideState}`);
    }
    this.setState((previousState) => {
      const newState = clone(previousState);
      newState.unsavedConfig.overrideState = newOverrideState;
      return newState;
    });
  }

  private _handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.requestConfigUpdate(this.state.unsavedConfig);
  }
}
