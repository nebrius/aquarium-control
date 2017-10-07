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
import { createStore } from 'redux';
import { RootContainer } from './containers/RootContainer';
import { reducers } from './reducers/reducers';
import { IAppState } from './IAppState';

const preloadedState: IAppState = {
  loginState: {
    currentState: 'unknown',
    accessToken: ''
  }
};
const store = createStore(reducers, preloadedState);

render(
  (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  ),
  document.getElementById('root')
);
