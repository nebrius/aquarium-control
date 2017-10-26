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
import { IConfig, IDynamicScheduleEntry, IManualScheduleEntry } from '../util/IAppState';
import { ButtonBar } from './ButtonBar';

import equals = require('deep-equal');

export interface IConfigurationDetailsProps {
  config: IConfig;
  saveStatus: 'pending' | 'failed' | 'succeeded' | 'none';
  requestConfigUpdate: (newConfig: IConfig) => void;
}

interface IConfigState {
  unsavedConfig: IConfig;
}

export class ConfigurationDetails extends React.Component<IConfigurationDetailsProps, IConfigState> {

  constructor(props: IConfigurationDetailsProps) {
    super(props);
    this.state = {
      unsavedConfig: props.config
    };

    this._handleModeSelect = this._handleModeSelect.bind(this);
    this._handleOverrideStateSelect = this._handleOverrideStateSelect.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  public render() {
    const props = this.props;
    const mode = this.state.unsavedConfig.mode;

    let banner: JSX.Element | undefined;
    switch (props.saveStatus) {
      case 'pending':
        banner = (
          <div className="alert alert-primary">Applying configuration</div>
        );
        break;
      case 'succeeded':
        banner = (
          <div className="alert alert-success">Configuration applied!</div>
        );
        break;
      case 'failed':
        banner = (
          <div className="alert alert-danger">Could not apply configuration!</div>
        );
        break;
      case 'none':
        break;
      default:
        throw new Error(`Internal Error: unknown save status ${props.saveStatus}`);
    }

    let detailedConfig: JSX.Element;
    switch (mode) {
      case 'program':
        const entries = this.props.config.schedule.map((entry, index) => {
          let details: JSX.Element;
          switch (entry.type) {
            case 'dynamic':
              details = (
                <div>
                  <div>{(entry.details as IDynamicScheduleEntry).event}</div>
                </div>
              );
              break;
            case 'manual':
              details = (
                <div>
                  <div>{(entry.details as IManualScheduleEntry).hour}</div>
                  <div>{(entry.details as IManualScheduleEntry).minute}</div>
                </div>
              );
              break;
            default:
              throw new Error(`Internal Error: unknown schedule type ${entry.type}`);
          }
          return (
            <div key={entry.name}>
              <div>Name: {entry.name}</div>
              <div>State: {entry.state}</div>
              <div>Type: <ButtonBar
                items={[
                  { displayName: 'Dynamic', valueName: 'dynamic' },
                  { displayName: 'Manual', valueName: 'manual' }
                ]}
                onItemSelected={(valueName) => this._handleScheduleEntryTypeChanged(index, valueName)}
                defaultValueName={entry.type}
              /></div>
              {details}
            </div>
          );
        });
        detailedConfig = (
          <div className="configuration-category">
            <h3>Schedule</h3>
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

    const hasUnsavedChanges = !equals(this.state.unsavedConfig, this.props.config);
    return (
      <div>
        <div><h1>Configuration</h1></div>
        {banner}
        <form onSubmit={this._handleSubmit}>
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

  private _handleModeSelect(newMode: string) {
    if (newMode !== 'program' && newMode !== 'override') {
      throw new Error(`Internal Error: Unknown mode ${newMode}`);
    }
    this.setState((previousState) => {
      const newState: IConfigState = {
        unsavedConfig: {
          ...previousState.unsavedConfig,
          mode: newMode
        }
      };
      return newState;
    });
  }

  private _handleScheduleEntryTypeChanged(index: number, type: string) {
    console.log(index, type);
  }

  private _handleOverrideStateSelect(newOverrideState: string) {
    if (newOverrideState !== 'day' && newOverrideState !== 'night' && newOverrideState !== 'off') {
      throw new Error(`Internal Error: Unknown override state ${newOverrideState}`);
    }
    this.setState((previousState) => {
      const newState: IConfigState = {
        unsavedConfig: {
          ...previousState.unsavedConfig,
          overrideState: newOverrideState
        }
      };
      return newState;
    });
  }

  private _handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.requestConfigUpdate(this.state.unsavedConfig);
  }
}
