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

import { createServer } from 'http';
import { join } from 'path';
import { json } from 'body-parser';
import { validate } from 'revalidator';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import {
  configValidationSchema,
  cleaningValidationSchema,
  IConfig,
  ITemperature,
  IState,
  IUser,
  ICleaning
} from './common/common';

const DEFAULT_PORT = 3001;
const USER_ID = '129897358';
const USER_NAME = 'nebrius';
const USER_TIMEZONE = 'America/Los_Angeles';
const DEVICE_ID = 'nebrius-rpi';

const port = process.env.PORT || DEFAULT_PORT;

const app = express();

app.use(json());
app.use(cookieParser());

if (process.env.HOST_CLIENT === 'true') {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '..', 'client')));
  } else {
    app.use(express.static(join(__dirname, '..', '..', 'client', 'dist')));
  }
}

app.set('view engine', 'pug');
app.set('views', join(__dirname, '..', 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/user', (req, res) => {
  const userInfo: IUser = {
    userId: USER_ID,
    userName: USER_NAME,
    deviceId: DEVICE_ID,
    timezone: USER_TIMEZONE
  };
  res.send(userInfo);
});

app.get('/api/state', (req, res) => {
  const state: IState = {
    deviceId: DEVICE_ID,
    currentTime: Date.now(),
    currentTemperature: 26,
    currentState: 'day',
    currentMode: 'program',
    nextTransitionTime: Date.now() + 60 * 60 * 1000,
    nextTransitionState: 'night'
  };
  res.send(state);
});

let aquariumConfig: IConfig = {
  mode: 'program',
  overrideState: 'off',
  schedule: [{
    name: 'Sunrise',
    type: 'dynamic',
    state: 'day',
    details: {
      event: 'sunrise'
    }
  }, {
    name: 'Sunset',
    type: 'dynamic',
    state: 'night',
    details: {
      event: 'sunset'
    }
  }, {
    name: 'Bedtime',
    type: 'manual',
    state: 'off',
    details: {
      hour: 23,
      minute: 0
    }
  }]
};

app.get('/api/config', (req, res) => {
  const isConfigUpToDate = true;
  res.send({
    config: aquariumConfig,
    isConfigUpToDate
  });
});

app.post('/api/config', (req, res) => {
  if (!validate(req.body, configValidationSchema).valid) {
    res.sendStatus(400);
    return;
  }
  aquariumConfig = req.body;
  setTimeout(() => res.send({ result: 'ok' }), 1000);
});

app.get('/api/temperatures', (req, res) => {
  const history: ITemperature = {
    temperatures: [{
      deviceId: DEVICE_ID,
      low: 25,
      high: 26,
      time: (new Date(2019, 4, 28, 0, 0, 0, 0)).getTime()
    }]
  };
  res.send(history);
});

app.get('/api/ping', (req, res) => {
  res.send('ok');
});

// NEW ENDPOINTS

const cleaning: ICleaning = {
  history: [{
    time: Date.now(),
    bioFilterReplaced: false,
    mechanicalFilterReplaced: true,
    spongeReplaced: false
  }]
};
app.get('/api/cleaning', (req, res) => {
  res.send({
    cleaning
  });
});

app.post('/api/cleaning', (req, res) => {
  if (!validate(req.body, cleaningValidationSchema).valid) {
    res.sendStatus(400);
    return;
  }
  cleaning.history.unshift(req.body);
  setTimeout(() => res.send({
    cleaning
  }), 1000);
});

// END NEW ENDPOINTS

const server = createServer();

server.on('request', app);

server.listen(port, () => {
  const address = server.address();
  if (!address) {
    throw new Error(`server address is unexpectedly null`);
  }
  if (typeof address === 'string') {
    console.log(`API simulation server listening on ${address}.`);
  } else {
    console.log(`API simulation server listening on ${address.address}:${address.port}.`);
  }
});
