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
import * as request from 'request';
import { series } from 'async';
import { IConfig, configValidationSchema } from './common/IConfig';
import { ITemperature, IDailyTemperatureSample, IMonthlyTemperatureSample } from './common/ITemperature';
import { isUserRegistered } from './db';
import { getConfig, setConfig } from './messaging';
import { getEnvironmentVariable } from './util';
import { getDailyTemperatureHistory, getMonthlyTemperatureHistory, getDeviceForUserId, getUser, getState } from './db';

const DEFAULT_PORT = 3001;

interface IRequest extends express.Request {
  userId: string;
}

export function init(cb: (err: Error | undefined) => void): void {

  const port = process.env.PORT || DEFAULT_PORT;

  const app = express();

  app.use(json());

  if (process.env.HOST_CLIENT === 'true') {
    app.use(express.static(join(__dirname, '..', '..', 'client', 'dist')));
  }

  app.set('view engine', 'pug');
  app.set('views', join(__dirname, '..', 'views'));

  function ensureAuthentication(req: IRequest, res: express.Response, next: () => void): void {
    const accessToken = req.query.accessToken;
    if (!accessToken) {
      res.redirect('/login');
      return;
    }
    const connectionUrl =
      'https://graph.facebook.com/debug_token?' +
      `input_token=${accessToken}&` +
      `access_token=${getEnvironmentVariable('FACEBOOK_APP_ID')}|${getEnvironmentVariable('FACEBOOK_APP_SECRET')}`;
    request(connectionUrl, (err, verifyRes, body) => {
      try {
        const parsedBody = JSON.parse(body).data;
        if (!parsedBody.is_valid) {
          res.sendStatus(401);
        } else {
          isUserRegistered(parsedBody.user_id, (err, isRegistered) => {
            if (err) {
              res.sendStatus(500);
            } else if (!isRegistered) {
              res.sendStatus(401);
            } else {
              req.userId = parsedBody.user_id;
              next();
            }
          });
        }
      } catch(e) {
        res.sendStatus(500);
      }
    });
  }

  function getRedirectUri(): string {
    return process.env.NODE_ENV === 'production'
      ? 'https://aquarium.nebri.us/login-success/'
      : `http://localhost:${port}/login-success/`;
  }

  app.get('/login', (req, res) => {
    res.render('login', {
      facebookAppId: getEnvironmentVariable('FACEBOOK_APP_ID'),
      redirectUri: getRedirectUri()
    });
  });

  app.get('/login-success', (req, res) => {
    if (req.query.code) {
      const verifyUrl =
        `https://graph.facebook.com/v2.10/oauth/access_token?` +
        `client_id=${getEnvironmentVariable('FACEBOOK_APP_ID')}` +
        `&redirect_uri=${getRedirectUri()}` +
        `&client_secret=${getEnvironmentVariable('FACEBOOK_APP_SECRET')}` +
        `&code=${req.query.code}`;
      request(verifyUrl, (err, verifyRes, body) => {
        try {
          const parsedBody = JSON.parse(body);
          res.cookie('accessToken', parsedBody.access_token);
          res.redirect('/');
        } catch(e) {
          res.sendStatus(500);
        }
      });
    } else if (req.query.token) {
      res.cookie('accessToken', req.query.token);
      res.redirect('/');
    } else {
      res.redirect('/login');
    }

  });

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/api/user', ensureAuthentication, (req: IRequest, res) => {
    res.send(getUser(req.userId));
  });

  app.get('/api/state', ensureAuthentication, (req: IRequest, res) => {
    getState(getDeviceForUserId(req.userId), (err, state) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(state);
      }
    });
  });

  app.get('/api/config', ensureAuthentication, (req: IRequest, res) => {
    getConfig(getDeviceForUserId(req.userId), (err, config, isConfigUpToDate) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send({
          config,
          isConfigUpToDate
        });
      }
    });
  });

  app.post('/api/config', ensureAuthentication, (req: IRequest, res) => {
    if (!validate(req.body, configValidationSchema).valid) {
      res.sendStatus(400);
      return;
    }
    setConfig(getDeviceForUserId(req.userId), <IConfig>(req.body), (err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send({ result: 'ok' });
      }
    });
  });

  app.get('/api/temperatures', ensureAuthentication, (req: IRequest, res) => {
    series([
      (done) => getMonthlyTemperatureHistory(req.userId, done),
      (done) => getDailyTemperatureHistory(getDeviceForUserId(req.userId), done)
    ], (err, results) => {
      if (err || !results) {
        res.sendStatus(500);
      } else {
        const history: ITemperature = {
          monthly: <IMonthlyTemperatureSample[]>results[0],
          daily: <IDailyTemperatureSample[]>results[1]
        }
        res.send(history);
      }
    });
  });

  const server = createServer();

  server.on('request', app);

  server.listen(port, () => {
    console.log(`API server listening on ${server.address().address}:${server.address().port}.`);
    cb(undefined);
  });
}
