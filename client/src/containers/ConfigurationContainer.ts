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

import { connect } from 'react-redux';
import { IAppState } from '../util/IAppState';
import { IConfig } from '../common/common';
import { request } from '../util/api';
import { IAction, configRequestUpdate, configUpdateFailed, configUpdateSucceeded } from '../actions/actions';
import { Configuration, IConfigurationProps, IConfigurationDispatch } from '../components/Configuration';
import * as clone from 'clone';

function mapStateToProps(state: IAppState): IConfigurationProps {
  return {
    config: clone(state.aquariumConfig)
  };
}

function mapDispatchToProps(dispatch: (action: IAction) => any): IConfigurationDispatch {
  return {
    requestConfigUpdate: (newConfig: IConfig) => {
      dispatch(configRequestUpdate(newConfig));
      request({
        endpoint: 'config',
        method: 'POST',
        body: newConfig
      }, (err, result) => {
        if (err) {
          dispatch(configUpdateFailed());
        } else {
          dispatch(configUpdateSucceeded(newConfig));
        }
      });
    }
  };
}

export const ConfigurationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Configuration);
