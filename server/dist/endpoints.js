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
const express = require("express");
const passport_1 = require("passport");
const passport_facebook_1 = require("passport-facebook");
const db_1 = require("./db");
const DEFAULT_PORT = 3001;
function init(cb) {
    function getEnvironmentVariable(variable) {
        const value = process.env[variable];
        if (typeof value !== 'string') {
            throw new Error(`Environment variable ${variable} is not defined`);
        }
        return value;
    }
    const app = express();
    app.use(body_parser_1.json());
    app.use(passport_1.initialize());
    app.use(passport_1.session());
    passport_1.use(new passport_facebook_1.Strategy({
        clientID: getEnvironmentVariable('FACEBOOK_APP_ID'),
        clientSecret: getEnvironmentVariable('FACEBOOK_APP_SECRET'),
        callbackURL: "http://www.example.com/auth/facebook/callback"
    }, (accessToken, refreshToken, profile, done) => {
        // User.findOrCreate(..., function(err, user) {
        //   if (err) { return done(err); }
        //   done(null, user);
        // });
        console.log(accessToken);
    }));
    if (process.env.HOST_CLIENT === 'true') {
        app.use(express.static(path_1.join(__dirname, '..', '..', 'client', 'dist')));
    }
    app.get('/api/state', passport_1.authenticate('oauth-bearer', { session: false }), (req, res) => {
        // TODO
    });
    app.get('/api/config', passport_1.authenticate('oauth-bearer', { session: false }), (req, res) => {
        // TODO
    });
    app.post('/api/config', passport_1.authenticate('oauth-bearer', { session: false }), (req, res) => {
        const body = req.body;
        console.log(body);
        res.send('ok');
    });
    app.get('/api/temperatures', (req, res, next) => { next(); }, passport_1.authenticate('oauth-bearer', { session: false }), (req, res) => {
        const period = req.query.period;
        if (period !== 'day' && period !== 'week') {
            res.sendStatus(400);
            return;
        }
        db_1.getTemperatureHistory('nebrius-rpi', period, (err, temperatures) => {
            if (err) {
                console.error(err);
                return;
            }
            res.send(temperatures);
        });
    });
    const server = http_1.createServer();
    server.on('request', app);
    server.listen(process.env.PORT || DEFAULT_PORT, () => {
        console.log(`API server listening on ${server.address().address}:${server.address().port}.`);
        cb(undefined);
    });
}
exports.init = init;
//# sourceMappingURL=endpoints.js.map