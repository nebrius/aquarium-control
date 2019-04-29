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
import { Provider } from 'react-redux';
import { Root } from './components/Root';
import { store } from './util/store';
import { request } from './util/api';
import {
  stateFetchFailed,
  stateFetchSucceeded,
  userFetchFailed,
  userFetchSucceeded,
  configFetchFailed,
  configFetchSucceeded,
  cleaningHistoryFetchFailed,
  cleaningHistoryFetchSucceeded,
  temperatureFetchFailed,
  temperatureFetchSuceeded
} from './actions/actions';

const STATE_UPDATE_RATE = 60 * 1000;
const TEMPERATURE_UPDATE_RATE = 60 * 1000;

function updateState() {
  request({
    endpoint: 'state',
    method: 'GET',
  }, (err, result) => {
    if (err) {
      store.dispatch(stateFetchFailed());
    } else {
      store.dispatch(stateFetchSucceeded(result));
    }
    setTimeout(updateState, STATE_UPDATE_RATE);
  });
}
updateState();

request({
  endpoint: 'user',
  method: 'GET'
}, (err, result) => {
  if (err) {
    store.dispatch(userFetchFailed());
  } else {
    store.dispatch(userFetchSucceeded(result));
  }
});

request({
  endpoint: 'config',
  method: 'GET'
}, (err, result) => {
  if (err) {
    store.dispatch(configFetchFailed());
  } else {
    store.dispatch(configFetchSucceeded(result.config));
  }
});

request({
  endpoint: 'cleaning',
  method: 'GET'
}, (err, result) => {
  if (err) {
    store.dispatch(cleaningHistoryFetchFailed());
  } else {
    store.dispatch(cleaningHistoryFetchSucceeded(result.cleaning));
  }
});

function updateTemperature() {
  request({
    endpoint: 'temperatures',
    method: 'GET'
  }, (err, result) => {
    if (err) {
      store.dispatch(temperatureFetchFailed());
    } else {
      store.dispatch(temperatureFetchSuceeded(result));
    }
    setTimeout(updateTemperature, TEMPERATURE_UPDATE_RATE);
  });
}
updateTemperature();

render(
  (
    <Provider store={store}>
      <Root />
    </Provider>
  ),
  document.getElementById('root')
);
