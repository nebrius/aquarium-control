/*
  Copyright (C) 2013  Bryan Hughes <bryan@theoreticalideations.com>

  This file is part of Aquarium Control.

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

var cluster = require('cluster');

if (cluster.isMaster) {
  var fs = require('fs');
  var path = require('path');
  var Logger = require('transport-logger');
  var logger;
  var appSettings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings', 'appsettings.json')));
  var sources = ['scheduler', 'configuration', 'controller'];
  var workers = {};

  function processMessage(source, message) {
    var destination = message.destination,
        outgoingMessage = {
          source: source,
          type: message.type,
          data: message.data
        },
        worker;
    if (destination === 'master') {
      if (message.type === 'log') {
        if (!logger[message.data.level]) {
          logger.info(message.data.message);
        } else {
          logger[message.data.level](message.data.message);
        }
      }
    } else if (destination === 'broadcast') {
      for (worker in workers) {
        workers[worker].send(outgoingMessage);
      }
    } else {
      workers[destination].send(outgoingMessage);
    }
  }

  function loadWorker(source) {
    logger.info('Starting worker ' + source);
    workers[source] = cluster.fork({
      source: source,
      appSettings: JSON.stringify(appSettings, null, '  ')
    });
    workers[source].source = source;
    workers[source].on('message', function(message) {
      processMessage(source, message);
    });
  }

  if (!appSettings['log-file']) {
    throw new Error('"log-file" must be specified in app settings');
  }
  if (!appSettings['log-min-level']) {
    throw new Error('"log-min-level" must be specified in app settings');
  }

  logger = new Logger([{
      minLevel: appSettings['log-min-level'],
      colorize: true,
      prependLevel: true
    }, {
      destination: appSettings['log-file'],
      minLevel: appSettings['log-min-level'],
      timestamp: true,
      prependLevel: true,
      maxLines: 1000
    }]);
  logger.info('---------------------');
  logger.info('System start');

  for (var i = 0, len = sources.length; i < len; i++) {
    loadWorker(sources[i]);
  }

  cluster.on('exit', function(worker) {
    logger.warn('The ' + worker.source + ' worker died. Restarting');
    loadWorker(worker.source);
  });
} else if (cluster.isWorker) {
  require('./' + process.env.source);
}
