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
import * as expressSession from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { Strategy as FacebookStrategy} from 'passport-facebook';
import { ensureLoggedIn } from 'connect-ensure-login';
import { IConfig } from './common/IConfig';
import { isUserRegistered } from './db';
import { getEnvironmentVariable } from './util';
import { getTemperatureHistory } from './db';

const DEFAULT_PORT = 3001;

export function init(cb: (err: Error | undefined) => void): void {

  passport.use(new FacebookStrategy({
    clientID: getEnvironmentVariable('FACEBOOK_APP_ID'),
    clientSecret: getEnvironmentVariable('FACEBOOK_APP_SECRET'),
    callbackURL: "http://localhost:3001/auth/facebook/callback"
  }, (accessToken, refreshToken, profile, done) => {
    isUserRegistered(profile.id, (err, isRegistered) => {
      if (err) {
        done(err);
      } else if (!isRegistered) {
        done(undefined, false, { message: 'User is not registered to use Aquarium Control.' });
      } else {
        done(null, profile);
      }
    });
  }));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  const app = express();

  app.use(json());
  app.use(cookieParser());
  app.use(expressSession({
    secret: getEnvironmentVariable('EXPRESS_SESSION_SECRET'),
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  if (process.env.HOST_CLIENT === 'true') {
    app.use(express.static(join(__dirname, '..', '..', 'client', 'dist')));
  }

  app.set('view engine', 'pug');
  app.set('views', join(__dirname, '..', 'views'));

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.get('/', ensureLoggedIn(), (req, res) => {
    res.render('index', {});
  });

  app.get('/login', (req, res) => {
    res.render('login', {});
  });

  app.get('/api/state', ensureLoggedIn(), (req, res) => {
    res.send({
      state: 'hi'
    });
    // TODO
  });

  app.get('/api/config', ensureLoggedIn(), (req, res) => {
    res.send({
      state: 'hi'
    });
    // TODO
  });

  app.post('/api/config', ensureLoggedIn(), (req, res) => {
    const body: IConfig = req.body;
    console.log(body);
    res.send('ok');
  });

  app.get('/api/temperatures', ensureLoggedIn(), (req, res) => {
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
