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
  configFetchFailed,
  configFetchSucceeded,
  cleaningHistoryFetchFailed,
  cleaningHistoryFetchSucceeded,
  testingHistoryFetchFailed,
  testingHistoryFetchSucceeded,
  temperatureFetchFailed,
  temperatureFetchSuceeded
} from './actions/actions';

const STATE_UPDATE_RATE = 60 * 1000;
const TEMPERATURE_UPDATE_RATE = 60 * 1000;

async function run() {
  async function updateState() {
    try {
      const { result } = await request({
        endpoint: 'state',
        method: 'GET',
      });
      store.dispatch(stateFetchSucceeded(result));
    } catch {
      store.dispatch(stateFetchFailed());
    }
    setTimeout(updateState, STATE_UPDATE_RATE);
  }
  updateState();

  try {
    const { result } = await request({
      endpoint: 'config',
      method: 'GET'
    });
    store.dispatch(configFetchSucceeded(result));
  } catch {
    store.dispatch(configFetchFailed());
  }

  try {
    const { result } = await request({
      endpoint: 'cleaning',
      method: 'GET'
    });
    store.dispatch(cleaningHistoryFetchSucceeded(result));
  } catch {
    store.dispatch(cleaningHistoryFetchFailed());
  }

  try {
    const { result } = await request({
      endpoint: 'testing',
      method: 'GET'
    });
    store.dispatch(testingHistoryFetchSucceeded(result));
  } catch {
    store.dispatch(testingHistoryFetchFailed());
  }

  async function updateTemperature() {
    try {
      const { result } = await request({
        endpoint: 'temperatures',
        method: 'GET'
      });
      store.dispatch(temperatureFetchSuceeded(result));
    } catch {
      store.dispatch(temperatureFetchFailed());
    }
    setTimeout(updateTemperature, TEMPERATURE_UPDATE_RATE);
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
}
run();
