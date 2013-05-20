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

/*
Message Format incoming
{
	destination: <worker name, master, broadcast>
	data: {<message data>}
}
Message Format outgoing
{
	source: <worker name, master>
	data: {<message data>}
}
 */

var cluster = require('cluster');

if (cluster.isMaster) {
	(function () {
		var fs = require('fs'),
			path = require('path'),
			Logger = require('transport-logger'),
			logger,
			appSettings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings', 'appsettings.json'))),
			sources = ['scheduler', 'configuration', 'controller'],
			i, len,
			workers = {};

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
					logger[message.level](message.message);
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
				appSettings: appSettings
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

		logger = new Logger({
			destination: appSettings['log-file'],
			minLevel: appSettings['log-min-level'],
			timestamp: true,
			colorize: true,
			prependLevel: true
		});
		logger.info('---------------------');
		logger.info('System start');

		for (i = 0, len = sources.length; i < len; i++) {
			loadWorker(sources[i]);
		}

		cluster.on('exit', function(worker, code, signal) {
			logger.warn('The ' + worker.source + ' worker died. Restarting');
			loadWorker(worker.source);
		});
	})();
} else if (cluster.isWorker) {
	require('./' + process.env.source);
}
