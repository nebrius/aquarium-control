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
import {
  getTemperatureHistory,
  getState,
  getConfig,
  updateConfig,
  getCleaningHistory,
  createCleaningEntry,
  getTestingHistory,
  createTestingEntry
} from './db';

const DEFAULT_PORT = 3001;

interface IRequest extends express.Request {
  userId: string;
}

export function init(cb: (err: Error | undefined) => void): void {
  console.debug('Initializing endpoint module');

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

  app.get('/api/state', (req, res) => {
    getState((err, state) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(state);
      }
    });
  });

  app.get('/api/config', (req, res) => {
    getConfig((err, config) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send({
          config
        });
      }
    });
  });

  app.post('/api/config', (req, res) => {
    if (!validate(req.body, configValidationSchema).valid) {
      res.sendStatus(400);
      return;
    }
    updateConfig((req.body as IConfig), (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send({ result: 'ok' });
      }
    });
  });

  app.get('/api/temperatures', (req, res) => {
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

  app.get('/api/cleaning', (req, res) => {
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

  app.post('/api/cleaning', (req, res) => {
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
