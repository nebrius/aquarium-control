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
import { series } from 'async';
import {
  IConfig,
  configValidationSchema,
  cleaningValidationSchema,
  testingValidationSchema,
  ITemperature,
  ITemperatureSample
} from './common/common';
import { getConfig, setConfig } from './messaging';
import { getEnvironmentVariable } from './util';
import {
  isUserRegistered,
  getTemperatureHistory,
  getDeviceForUserId,
  getUser,
  getState,
  getCleaningHistory,
  createCleaningEntry,
  getTestingHistory,
  createTestingEntry
} from './db';
import { Authenticator } from 'express-facebook-auth';

const DEFAULT_PORT = 3001;

interface IRequest extends express.Request {
  userId: string;
}

export function init(cb: (err: Error | undefined) => void): void {
  console.debug('Initializing endpoint module');

  const port = process.env.PORT || DEFAULT_PORT;

  function getRedirectUri(): string {
    return process.env.NODE_ENV === 'production'
      ? `${getEnvironmentVariable('SERVER_HOST')}/login-success/`
      : `http://localhost:${port}/login-success/`;
  }

  const app = express();

  const authenticator = new Authenticator({
    facebookAppId: getEnvironmentVariable('FACEBOOK_APP_ID'),
    facebookAppSecret: getEnvironmentVariable('FACEBOOK_APP_SECRET'),
    isUserRegistered,
    loginUri: '/login',
    redirectUri: getRedirectUri()
  });

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

  app.get('/login', (req, res) => {
    res.render('login', {
      facebookAppId: getEnvironmentVariable('FACEBOOK_APP_ID'),
      redirectUri: getRedirectUri()
    });
  });

  authenticator.createLoginSuccessEndpoint(app);

  app.get('/', authenticator.createMiddleware(true), (req, res) => {
    res.render('index');
  });

  app.get('/api/user', authenticator.createMiddleware(false), (req, res) => {
    res.send(getUser((req as IRequest).userId));
  });

  app.get('/api/state', authenticator.createMiddleware(false), (req, res) => {
    getState(getDeviceForUserId((req as IRequest).userId), (err, state) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(state);
      }
    });
  });

  app.get('/api/config', authenticator.createMiddleware(false), (req, res) => {
    getConfig(getDeviceForUserId((req as IRequest).userId), (err, config, isConfigUpToDate) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send({
          config,
          isConfigUpToDate
        });
      }
    });
  });

  app.post('/api/config', authenticator.createMiddleware(false), (req, res) => {
    if (!validate(req.body, configValidationSchema).valid) {
      res.sendStatus(400);
      return;
    }
    setConfig(getDeviceForUserId((req as IRequest).userId), (req.body as IConfig), (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send({ result: 'ok' });
      }
    });
  });

  app.get('/api/temperatures', authenticator.createMiddleware(false), (req, res) => {
    series([
      (done) => getTemperatureHistory((req as IRequest).userId, done),
    ], (err, results) => {
      if (err || !results) {
        res.sendStatus(500);
      } else {
        const history: ITemperature = {
          temperatures: results[0] as ITemperatureSample[]
        };
        res.send(history);
      }
    });
  });

  app.get('/api/cleaning', authenticator.createMiddleware(false), (req, res) => {
    getCleaningHistory((req as IRequest).userId, (err, history) => {
      if (err || !history) {
        res.sendStatus(500);
      } else {
        res.send({
          cleaning: { history }
        });
      }
    });
  });

  app.post('/api/cleaning', authenticator.createMiddleware(false), (req, res) => {
    if (!validate(req.body, cleaningValidationSchema).valid) {
      res.sendStatus(400);
      return;
    }
    createCleaningEntry((req as IRequest).userId, req.body, (err) => {
      if (err) {
        res.sendStatus(500);
      }
      getCleaningHistory((req as IRequest).userId, (err, history) => {
        if (err || !history) {
          res.sendStatus(500);
        } else {
          res.send({
            cleaning: { history }
          });
        }
      });
    });
  });

  app.get('/api/testing', (req, res) => {
    getTestingHistory((req as IRequest).userId, (err, history) => {
      if (err || !history) {
        res.sendStatus(500);
      } else {
        res.send({
          testing: { history }
        });
      }
    });
  });

  app.post('/api/testing', (req, res) => {
    if (!validate(req.body, testingValidationSchema).valid) {
      res.sendStatus(400);
      return;
    }
    createTestingEntry((req as IRequest).userId, req.body, (err) => {
      if (err) {
        res.sendStatus(500);
      }
      getTestingHistory((req as IRequest).userId, (err, history) => {
        if (err || !history) {
          res.sendStatus(500);
        } else {
          res.send({
            testing: { history }
          });
        }
      });
    });
  });

  app.get('/api/ping', (req, res) => {
    res.send('ok');
  });

  const server = createServer();

  server.on('request', app);

  server.listen(port, () => {
    const address = server.address();
    if (!address) {
      throw new Error(`server address is unexpectedly null`);
    }
    if (typeof address === 'string') {
      console.log(`API server listening on ${address}.`);
    } else {
      console.log(`API server listening on ${address.address}:${address.port}.`);
    }
    cb(undefined);
  });
}
