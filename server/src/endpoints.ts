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
import * as express from 'express';
import { initialize, session, authenticate, use } from 'passport';
import { Strategy as FacebookStrategy} from 'passport-facebook';
import { IConfig } from './common/IConfig';
import { getTemperatureHistory } from './db';

const DEFAULT_PORT = 3001;

export function init(cb: (err: Error | undefined) => void): void {

  function getEnvironmentVariable(variable: string): string {
    const value = process.env[variable];
    if (typeof value !== 'string') {
      throw new Error(`Environment variable ${variable} is not defined`);
    }
    return value;
  }

  const app = express();

  app.use(json());
  app.use(initialize());
  app.use(session());

  use(new FacebookStrategy({
    clientID: getEnvironmentVariable('FACEBOOK_APP_ID'),
    clientSecret: getEnvironmentVariable('FACEBOOK_APP_SECRET'),
    callbackURL: "http://www.example.com/auth/facebook/callback"
  }, (accessToken, refreshToken, profile, done) => {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    console.log(accessToken);
  }));

  if (process.env.HOST_CLIENT === 'true') {
    app.use(express.static(join(__dirname, '..', '..', 'client', 'dist')));
  }

  app.get('/api/state', authenticate('oauth-bearer', { session: false }), (req, res) => {
    // TODO
  });

  app.get('/api/config', authenticate('oauth-bearer', { session: false }), (req, res) => {
    // TODO
  });

  app.post('/api/config', authenticate('oauth-bearer', { session: false }), (req, res) => {
    const body: IConfig = req.body;
    console.log(body);
    res.send('ok');
  });

  app.get('/api/temperatures', (req, res, next) => { next(); }, authenticate('oauth-bearer', { session: false }), (req, res) => {
    const period = req.query.period;
    if (period !== 'day' && period !== 'week') {
      res.sendStatus(400);
      return;
    }
    getTemperatureHistory('nebrius-rpi', period, (err, temperatures) => {
      if (err) {
        console.error(err);
        return;
      }
      res.send(temperatures);
    });
  });

  const server = createServer();

  server.on('request', app);

  server.listen(process.env.PORT || DEFAULT_PORT, () => {
    console.log(`API server listening on ${server.address().address}:${server.address().port}.`);
    cb(undefined);
  });
}
