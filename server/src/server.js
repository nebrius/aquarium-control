var request = require('request'),
	xml2js = require('xml2js'),
	fs = require('fs'),
	path = require('path'),
	date = new Date(),
	endpoint = 'http://www.earthtools.org/sun/';

request(endpoint + '37.546267/-121.971132/' + date.getDate() + '/' + (date.getMonth() + 1) + '/' +
		(-(new Date()).getTimezoneOffset() / 60) + '/0', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		xml2js.parseString(body, function (err, results) {
			var sunrise = results.sun.morning[0].sunrise[0],
				sunset = results.sun.evening[0].sunset[0],
				parseDate;
			switch (date.getDay()) {
				case 0: parseDate = 'Sun'; break;
				case 1: parseDate = 'Mon'; break;
				case 2: parseDate = 'Tue'; break;
				case 3: parseDate = 'Wed'; break;
				case 4: parseDate = 'Thu'; break;
				case 5: parseDate = 'Fri'; break;
				case 6: parseDate = 'Sat'; break;
			}
			parseDate += ', ' + date.getDate() + ' ';
			switch (date.getMonth()) {
				case 0: parseDate += 'Jan'; break;
				case 1: parseDate += 'Feb'; break;
				case 2: parseDate += 'Mar'; break;
				case 3: parseDate += 'Apr'; break;
				case 4: parseDate += 'May'; break;
				case 5: parseDate += 'Jun'; break;
				case 6: parseDate += 'Jul'; break;
				case 7: parseDate += 'Aug'; break;
				case 8: parseDate += 'Sep'; break;
				case 9: parseDate += 'Oct'; break;
				case 10: parseDate += 'Nov'; break;
				case 11: parseDate += 'Dec'; break;
			}
			parseDate += ' ' + date.getFullYear() + ' ';
			fs.writeFileSync(path.join(__dirname, '..', '..', 'config', 'timing.json'), JSON.stringify({
				sunrise: new Date(parseDate + sunrise),
				sunset: new Date(parseDate + sunset)
			}, false, '\t'));
		});
	}
});