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
const async_1 = require("async");
const common_1 = require("./common/common");
const db_1 = require("./db");
const DEFAULT_PORT = 3001;
function init(cb) {
    console.debug('Initializing endpoint module');
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
        db_1.getState((err, state) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            }
            else {
                res.send(state);
            }
        });
    });
    app.get('/api/config', (req, res) => {
        db_1.getConfig((err, config) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            }
            else {
                res.send({
                    config
                });
            }
        });
    });
    app.post('/api/config', (req, res) => {
        if (!revalidator_1.validate(req.body, common_1.configValidationSchema).valid) {
            res.sendStatus(400);
            return;
        }
        db_1.updateConfig(req.body, (err) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            }
            else {
                res.send({ result: 'ok' });
            }
        });
    });
    app.get('/api/temperatures', (req, res) => {
        async_1.series([
            (done) => db_1.getTemperatureHistory(req.userId, done),
        ], (err, results) => {
            if (err || !results) {
                res.sendStatus(500);
            }
            else {
                const history = {
                    temperatures: results[0]
                };
                res.send(history);
            }
        });
    });
    app.get('/api/cleaning', (req, res) => {
        db_1.getCleaningHistory(req.userId, (err, history) => {
            if (err || !history) {
                res.sendStatus(500);
            }
            else {
                res.send({
                    cleaning: { history }
                });
            }
        });
    });
    app.post('/api/cleaning', (req, res) => {
        if (!revalidator_1.validate(req.body, common_1.cleaningValidationSchema).valid) {
            res.sendStatus(400);
            return;
        }
        db_1.createCleaningEntry(req.userId, req.body, (err) => {
            if (err) {
                res.sendStatus(500);
            }
            db_1.getCleaningHistory(req.userId, (err, history) => {
                if (err || !history) {
                    res.sendStatus(500);
                }
                else {
                    res.send({
                        cleaning: { history }
                    });
                }
            });
        });
    });
    app.get('/api/testing', (req, res) => {
        db_1.getTestingHistory(req.userId, (err, history) => {
            if (err || !history) {
                res.sendStatus(500);
            }
            else {
                res.send({
                    testing: { history }
                });
            }
        });
    });
    app.post('/api/testing', (req, res) => {
        if (!revalidator_1.validate(req.body, common_1.testingValidationSchema).valid) {
            res.sendStatus(400);
            return;
        }
        db_1.createTestingEntry(req.userId, req.body, (err) => {
            if (err) {
                res.sendStatus(500);
            }
            db_1.getTestingHistory(req.userId, (err, history) => {
                if (err || !history) {
                    res.sendStatus(500);
                }
                else {
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
    const server = http_1.createServer();
    server.on('request', app);
    server.listen(port, () => {
        const address = server.address();
        if (!address) {
            throw new Error(`server address is unexpectedly null`);
        }
        if (typeof address === 'string') {
            console.log(`API server listening on ${address}.`);
        }
        else {
            console.log(`API server listening on ${address.address}:${address.port}.`);
        }
        cb(undefined);
    });
}
exports.init = init;
//# sourceMappingURL=endpoints.js.map