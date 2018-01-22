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
import * as cookieParser from 'cookie-parser';
import { series } from 'async';
import { IConfig, configValidationSchema } from './common/IConfig';
import { ITemperature, ITemperatureSample } from './common/ITemperature';
import { isUserRegistered } from './db';
import { getConfig, setConfig } from './messaging';
import { getEnvironmentVariable } from './util';
import { getTemperatureHistory, getDeviceForUserId, getUser, getState } from './db';

const DEFAULT_PORT = 3001;

interface IRequest extends express.Request {
  userId: string;
}

export function init(cb: (err: Error | undefined) => void): void {

  const port = process.env.PORT || DEFAULT_PORT;

  const app = express();

  app.use(json());
  app.use(cookieParser());

  if (process.env.HOST_CLIENT === 'true') {
    app.use(express.static(join(__dirname, '..', 'client')));
  }

  app.set('view engine', 'pug');
  app.set('views', join(__dirname, '..', 'views'));

  function ensureAuthentication(redirect: boolean): express.RequestHandler {
    return (req, res, next) => {

      function handleUnauthorized() {
        if (redirect) {
          res.redirect('/login');
        } else {
          res.sendStatus(401);
        }
      }

      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        handleUnauthorized();
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
            handleUnauthorized();
          } else {
            if (!isUserRegistered(parsedBody.user_id)) {
              handleUnauthorized();
            } else {
              (req as IRequest).userId = parsedBody.user_id;
              next();
            }
          }
        } catch (e) {
          res.sendStatus(500);
        }
      });
    };
  }

  function getRedirectUri(): string {
    return process.env.NODE_ENV === 'production'
      ? `${getEnvironmentVariable('SERVER_HOST')}/login-success/`
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
        } catch (e) {
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

  app.get('/', ensureAuthentication(true), (req, res) => {
    res.render('index');
  });

  app.get('/api/user', ensureAuthentication(false), (req, res) => {
    res.send(getUser((req as IRequest).userId));
  });

  app.get('/api/state', ensureAuthentication(false), (req, res) => {
    getState(getDeviceForUserId((req as IRequest).userId), (err, state) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(state);
      }
    });
  });

  app.get('/api/config', ensureAuthentication(false), (req, res) => {
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

  app.post('/api/config', ensureAuthentication(false), (req, res) => {
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

  app.get('/api/temperatures', ensureAuthentication(false), (req, res) => {
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

  const server = createServer();

  server.on('request', app);

  server.listen(port, () => {
    console.log(`API server listening on ${server.address().address}:${server.address().port}.`);
    cb(undefined);
  });
}
