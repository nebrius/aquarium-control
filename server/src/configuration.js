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

	mu = require('mu2'),

	DEFAULT_PORT = 8080,

	configuration,
	appConfiguration;

function log(level, message) {
	process.send({
	    destination: 'master',
    	type: 'log',
    	data: {
        	level: level,
        	message: message
    	}
	});
}

try {
	configuration = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings', 'usersettings.json')));
	appConfiguration = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings', 'appsettings.json')));
} catch(e) {
	log('warn', 'Configuration file is invalid, using defaults: ' + e);
	configuration = {
		mode: 'manual',
		dynamic: {
			sunriseOffset: {
				hour: 0,
				minute: 0
			},
			sunsetOffset: {
				hour: 0,
				minute: 0
			},
			nightOnAfterSunset: {
				hour: 2,
				minute: 0
			},
			nightOnBeforeSunrise: {
				hour: 1,
				minute: 0
			}
		},
		static: {
			sunrise: {
				hour: 6,
				minute: 0
			},
			sunset: {
				hour: 23,
				minute: 58
			},
			nightOnAfterSunset: {
				hour: 2,
				minute: 0
			},
			nightOnBeforeSunrise: {
				hour: 1,
				minute: 0
			}
		},
		manual: 'off'
	};
}

process.send({
	destination: 'broadcast',
	type: 'configuration.set',
	data: configuration
});

http.createServer(function(request, response) {
	var uri = url.parse(request.url),
		pathname = uri.pathname,
		renderStream,
		compiledData = '',
		mimeType,
		data;

	function write(code, mimeType, body) {
		response.writeHead(code, {
			'content-type': mimeType
		});
		response.write(body);
		response.end();
	}

	if (request.method === 'GET') {
		if (['/', '/index.html'].indexOf(pathname) !== -1) {
			pathname = path.join(__dirname, '..', 'templates');
			log('info', 'Serving generated file "' + path.join(pathname, 'index.html') + '"');

			mu.root = pathname;
			renderStream = mu.compileAndRender('index.html', {
				settings: JSON.stringify(configuration, false, '\t')
			});
			renderStream.on('data', function (data) {
				compiledData += data.toString();
			});
			renderStream.on('end', function() {
				write(200, 'text/html', compiledData);
			});

		} else {
			pathname = path.resolve(path.join(__dirname, '..', 'templates', pathname));
			if (fs.existsSync(pathname)) {
				if (/\.js$/.test(pathname)) {
					mimeType = 'application/javascript';
				} else if (/\.css$/.test(pathname)) {
					mimeType = 'text/css';
				} else if (/\.html$/.test(pathname)) {
					mimeType = 'text/html';
				} else {
					mimeType = 'text/plain';
				}
				log('info', 'Serving file "' + pathname + '"');
				write(200, mimeType, fs.readFileSync(pathname));
			} else {
				write(404, 'text/plain', 'Page not found');
			}
		}
	} else if (request.method === 'POST') {
		data = '';
		request.on('data', function (chunk) {
			data += chunk.toString();
		});
		request.on('end', function () {
			try {
				configuration = JSON.parse(data);
				write(200, 'text/plain', 'OK');
			} catch(e) {
				write(400, 'Invalid configuration data: ' + e);
			}
			fs.writeFileSync(path.join(__dirname, '..', 'settings', 'usersettings.json'), data);
			process.send({
				destination: 'broadcast',
				type: 'configuration.set',
				data: configuration
			});
		});
	}
}).listen(appConfiguration.port || DEFAULT_PORT);

process.send({
    destination: 'master',
    type: 'log',
    data: {
	    level: 'info',
        message: 'Configuration started on port ' + appConfiguration.port || DEFAULT_PORT
    }
});
