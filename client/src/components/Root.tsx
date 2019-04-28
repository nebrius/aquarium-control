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
import { HeaderContainer } from '../containers/HeaderContainer';
import { ConfigurationContainer } from '../containers/ConfigurationContainer';
import { StateContainer} from '../containers/StateContainer';
import { TemperatureContainer } from '../containers/TemperatureContainer';
import { TestingContainer } from '../containers/TestingContainer';
import { CleaningContainer } from '../containers/CleaningContainer';
import { ButtonBar } from './ButtonBar';

type Tab = 'state' | 'schedule' | 'cleaning' | 'testing';

interface IRootState {
  selectedTab: Tab;
}

export class Root extends React.Component<{}, IRootState> {

  public state: IRootState = {
    selectedTab: 'state'
  };

  public render() {
    return (
      <div className="root-container">
        <HeaderContainer />
        <div className="navBar">
          <ButtonBar
              items={[
                { displayName: 'State', valueName: 'state' },
                { displayName: 'Schedule', valueName: 'schedule' },
                { displayName: 'Cleaning', valueName: 'cleaning' },
                { displayName: 'Testing', valueName: 'testing' }
              ]}
              onItemSelected={this._handleTabSelect}
              defaultValueName={this.state.selectedTab}
            />
        </div>
        {this.state.selectedTab === 'state' && <StateContainer />}
        {this.state.selectedTab === 'state' && <TemperatureContainer />}

        {this.state.selectedTab === 'schedule' && <ConfigurationContainer />}

        {this.state.selectedTab === 'testing' && <TestingContainer />}

        {this.state.selectedTab === 'cleaning' && <CleaningContainer />}
      </div>
    );
  }

  private _handleTabSelect = (newTab: string) => {
    this.setState((previousState) => {
      return {
        ...previousState,
        selectedTab: newTab as Tab
      };
    });
  }
}
