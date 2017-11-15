#!/usr/bin/env node
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

const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');

const DESTINATION_DIR = path.join(__dirname, '..', 'aquarium-control-deploy');

console.log('Cleaning previous build...');
clean((error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('Building server and client...');
  build((error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Assembling image...');
    assemble((error) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log('Finished building');
    });
  });
});

function clean(cb) {
  function rmdir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === '.git') {
        continue;
      }
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        rmdir(filePath);
        fs.rmdirSync(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    }
  }
  rmdir(DESTINATION_DIR);
  setImmediate(cb);
}

function build(cb) {
  spawn('npm', [ 'run', 'build' ], {
    stdio: 'inherit',
    cwd: path.join(__dirname, 'server')
  }).on('close', (code) => {
    if (code) {
      cb(`Could not build server`);
      return;
    }
    spawn('npm', [ 'run', 'build' ], {
      stdio: 'inherit',
      cwd: path.join(__dirname, 'client')
    }).on('close', (code) => {
      if (code) {
        cb(`Could not build client`);
        return;
      }
      cb();
    });
  });
}

function assemble(cb) {
  const fileList = [
    `${__dirname}/server/bin`,
    `${__dirname}/server/dist`,
    `${__dirname}/server/views`,
    `${__dirname}/server/package.json`,
    `${__dirname}/server/package-lock.json`,
  ];
  spawn('cp', [ '-r',
    ...fileList,
    DESTINATION_DIR
  ], {
    stdio: 'inherit',
    cwd: __dirname
  }).on('close', (code) => {
    if (code) {
      cb('Could not assemble server');
      return;
    }
    spawn('cp', [ '-r', `${__dirname}/client/dist`, `${DESTINATION_DIR}/client` ], {
      stdio: 'inherit',
      cwd: __dirname
    }).on('close', (code) => {
      if (code) {
        cb('Could not assemble client');
        return;
      }
      cb();
    });
  });
  cb();
}
