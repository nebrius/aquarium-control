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

var path = require('path'),
	fs = require('fs'),
	http = require('http'),
	url = require('url'),

	logger = require('./logger');

logger.info('Configuration started');

process.send({
	destination: 'broadcast',
	type: 'configuration.set',
	data: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings', 'usersettings.json')))
});

http.createServer(function(request, response) {
	var uri = url.parse(request.url),
		pathname = uri.pathname;
	if (request.method === 'GET') {
		if (['/', '/index.html'].indexOf(pathname) !== -1) {
			logger.info('Serving configuration page');
			response.writeHead(200, {
				type: 'text/html'
			});
			response.write(fs.readFileSync(path.join('..', 'templates', 'index.html')));
			response.end();
		} else {
			pathname = path.resolve(path.join('..', 'templates', pathname));
			if (fs.existsSync(pathname)) {
				logger.info('Serving file "' + pathname + '"');
				response.writeHead(200, {
					type: 'text/html'
				});
				response.write(fs.readFileSync(pathname));
				response.end();
			} else {
				response.writeHead(404, {
					type: 'text/html'
				});
				response.write('Page not found');
				response.end();
			}
		}
	} else if (request.method === 'POST') {

	}
}).listen(8080);