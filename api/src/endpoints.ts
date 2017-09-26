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

import { json } from 'body-parser';
import * as express from 'express';
import { IConfig } from './common/IConfig';

const DEFAULT_PORT = 3000;

export function init(cb: (err: Error | undefined) => void): void {
  const app = express();

  app.use(json);

  app.get('/api/state', (req, res) => {
    // TODO
  });

  app.get('/api/config', (req, res) => {
    // TODO
  });

  app.post('/api/config', (req, res) => {
    const body: IConfig = req.body;
    console.log(body);
    res.send('ok');
  });

  const server = app.listen(process.env.PORT || DEFAULT_PORT, () => {
    console.log(`API server listening on port ${server.address().port}!`);
    cb(undefined);
  });
}
