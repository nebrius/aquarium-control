"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const path_1 = require("path");
const body_parser_1 = require("body-parser");
const revalidator_1 = require("revalidator");
const express = require("express");
const cookieParser = require("cookie-parser");
const common_1 = require("./common/common");
const DEFAULT_PORT = 3001;
const port = process.env.PORT || DEFAULT_PORT;
const app = express();
app.use(body_parser_1.json());
app.use(cookieParser());
if (process.env.HOST_CLIENT === 'true') {
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path_1.join(__dirname, '..', 'client')));
    }
    else {
        app.use(express.static(path_1.join(__dirname, '..', '..', 'client', 'dist')));
    }
}
app.set('view engine', 'pug');
app.set('views', path_1.join(__dirname, '..', 'views'));
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/api/state', (req, res) => {
    const state = {
        currentTime: Date.now(),
        currentTemperature: 26,
        currentState: 'day',
        currentMode: 'program',
        nextTransitionTime: Date.now() + 60 * 60 * 1000,
        nextTransitionState: 'night'
    };
    res.send(state);
});
let aquariumConfig = {
    mode: 'program',
    overrideState: 'off',
    schedule: [{
            name: 'Sunrise',
            type: 'dynamic',
            state: 'day',
            details: {
                event: 'sunrise'
            }
        }, {
            name: 'Sunset',
            type: 'dynamic',
            state: 'night',
            details: {
                event: 'sunset'
            }
        }, {
            name: 'Bedtime',
            type: 'manual',
            state: 'off',
            details: {
                hour: 23,
                minute: 0
            }
        }]
};
app.get('/api/config', (req, res) => {
    const isConfigUpToDate = true;
    res.send({
        config: aquariumConfig,
        isConfigUpToDate
    });
});
app.post('/api/config', (req, res) => {
    if (!revalidator_1.validate(req.body, common_1.configValidationSchema).valid) {
        res.sendStatus(400);
        return;
    }
    aquariumConfig = req.body;
    setTimeout(() => res.send({ result: 'ok' }), 1000);
});
app.get('/api/temperatures', (req, res) => {
    const history = {
        history: [{
                low: 25,
                high: 26,
                time: (new Date(2019, 4, 28, 0, 0, 0, 0)).getTime()
            }]
    };
    res.send(history);
});
app.get('/api/ping', (req, res) => {
    res.send('ok');
});
const cleaning = {
    history: [{
            time: Date.now(),
            bioFilterReplaced: false,
            mechanicalFilterReplaced: true,
            spongeReplaced: false
        }]
};
app.get('/api/cleaning', (req, res) => {
    res.send({
        cleaning
    });
});
app.post('/api/cleaning', (req, res) => {
    if (!revalidator_1.validate(req.body, common_1.cleaningValidationSchema).valid) {
        res.sendStatus(400);
        return;
    }
    cleaning.history.unshift(req.body);
    setTimeout(() => res.send({
        cleaning
    }), 1000);
});
// NEW ENDPOINTS
const testing = {
    history: [{
            time: Date.now(),
            ph: 8.2,
            ammonia: 16,
            nitrites: 0,
            nitrates: 120
        }]
};
app.get('/api/testing', (req, res) => {
    res.send({
        testing
    });
});
app.post('/api/testing', (req, res) => {
    if (!revalidator_1.validate(req.body, common_1.testingValidationSchema).valid) {
        res.sendStatus(400);
        return;
    }
    testing.history.unshift(req.body);
    setTimeout(() => res.send({
        testing
    }), 1000);
});
// END NEW ENDPOINTS
const server = http_1.createServer();
server.on('request', app);
server.listen(port, () => {
    const address = server.address();
    if (!address) {
        throw new Error(`server address is unexpectedly null`);
    }
    if (typeof address === 'string') {
        console.log(`API simulation server listening on ${address}.`);
    }
    else {
        console.log(`API simulation server listening on ${address.address}:${address.port}.`);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXNpbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXItc2ltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBRUYsK0JBQW9DO0FBQ3BDLCtCQUE0QjtBQUM1Qiw2Q0FBbUM7QUFDbkMsNkNBQXVDO0FBQ3ZDLG1DQUFtQztBQUNuQyw4Q0FBOEM7QUFDOUMsNENBU3lCO0FBRXpCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQztBQUUxQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxZQUFZLENBQUM7QUFFOUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7QUFFeEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsS0FBSyxNQUFNLEVBQUU7SUFDdEMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7UUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRDtTQUFNO1FBQ0wsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hFO0NBQ0Y7QUFFRCxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxXQUFJLENBQUMsU0FBUyxFQUFFLElB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