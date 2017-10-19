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
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { RootContainer } from './containers/RootContainer';
import { store } from './util/store';
import { request } from './util/api';
import { stateUpdateFailed, stateUpdateSucceeded } from './actions/actions';

const STATE_UPDATE_RATE = 1000;

setInterval(() => request({
  endpoint: 'state',
  method: 'GET',
}, (err, result) => {
  if (err) {
    stateUpdateFailed();
  } else {
    stateUpdateSucceeded(result);
  }
}), STATE_UPDATE_RATE);

render(
  (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  ),
  document.getElementById('root')
);
