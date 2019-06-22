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
  IConfig,
  configValidationSchema,
  cleaningValidationSchema,
  testingValidationSchema,
  ITemperature,
  ICleaning,
  IState,
  ITesting
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

export async function init(): Promise<void> {
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

  app.get('/api/state', async (req, res) => {
    try {
      const state: IState | undefined = await getState();
      res.send({ result: state });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  app.get('/api/config', async (req, res) => {
    try {
      const config: IConfig | undefined = await getConfig();
      res.send({ result: config });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  app.post('/api/config', async (req, res) => {
    if (!validate(req.body, configValidationSchema).valid) {
      res.sendStatus(400);
      return;
    }
    try {
      await updateConfig(req.body as IConfig);
      res.send({ result: 'ok' });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  app.get('/api/temperatures', async (req, res) => {
    try {
      const temperatures: ITemperature = {
        history: await getTemperatureHistory()
      };
      res.send({ result: temperatures });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  app.get('/api/cleaning', async (req, res) => {
    try {
      const cleaning: ICleaning = {
        history: await getCleaningHistory()
      };
      res.send({ result: cleaning });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  app.post('/api/cleaning', async (req, res) => {
    if (!validate(req.body, cleaningValidationSchema).valid) {
      res.sendStatus(400);
      return;
    }
    try {
      await createCleaningEntry(req.body);
      const cleaning: ICleaning = {
        history: await getCleaningHistory()
      };
      res.send({ result: cleaning });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  app.get('/api/testing', async (req, res) => {
    try {
      const testing: ITesting = {
        history: await getTestingHistory()
      };
      res.send({ result: testing });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  app.post('/api/testing', async (req, res) => {
    if (!validate(req.body, testingValidationSchema).valid) {
      res.sendStatus(400);
      return;
    }
    try {
      await createTestingEntry(req.body);
      const testing: ITesting = {
        history: await getTestingHistory()
      };
      res.send({ result: testing });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  const server = createServer();

  server.on('request', app);

  return new Promise((resolve) => {
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
      resolve();
    });
  });

}
