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
const expressSession = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const passport_facebook_1 = require("passport-facebook");
const connect_ensure_login_1 = require("connect-ensure-login");
const db_1 = require("./db");
const util_1 = require("./util");
const db_2 = require("./db");
const DEFAULT_PORT = 3001;
function init(cb) {
    passport.use(new passport_facebook_1.Strategy({
        clientID: util_1.getEnvironmentVariable('FACEBOOK_APP_ID'),
        clientSecret: util_1.getEnvironmentVariable('FACEBOOK_APP_SECRET'),
        callbackURL: "http://localhost:3001/auth/facebook/callback"
    }, (accessToken, refreshToken, profile, done) => {
        db_1.isUserRegistered(profile.id, (err, isRegistered) => {
            if (err) {
                done(err);
            }
            else if (!isRegistered) {
                done(undefined, false, { message: 'User is not registered to use Aquarium Control.' });
            }
            else {
                done(null, profile);
            }
        });
    }));
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
    const app = express();
    app.use(body_parser_1.json());
    app.use(cookieParser());
    app.use(expressSession({
        secret: util_1.getEnvironmentVariable('EXPRESS_SESSION_SECRET'),
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    if (process.env.HOST_CLIENT === 'true') {
        app.use(express.static(path_1.join(__dirname, '..', '..', 'client', 'dist')));
    }
    app.set('view engine', 'pug');
    app.set('views', path_1.join(__dirname, '..', 'views'));
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
    app.get('/', connect_ensure_login_1.ensureLoggedIn(), (req, res) => {
        res.render('index', {});
    });
    app.get('/login', (req, res) => {
        res.render('login', {});
    });
    app.get('/api/state', connect_ensure_login_1.ensureLoggedIn(), (req, res) => {
        res.send({
            state: 'hi'
        });
        // TODO
    });
    app.get('/api/config', connect_ensure_login_1.ensureLoggedIn(), (req, res) => {
        res.send({
            state: 'hi'
        });
        // TODO
    });
    app.post('/api/config', connect_ensure_login_1.ensureLoggedIn(), (req, res) => {
        const body = req.body;
        console.log(body);
        res.send('ok');
    });
    app.get('/api/temperatures', connect_ensure_login_1.ensureLoggedIn(), (req, res) => {
        const period = req.query.period;
        if (period !== 'day' && period !== 'week') {
            res.sendStatus(400);
            return;
        }
        db_2.getTemperatureHistory('nebrius-rpi', period, (err, temperatures) => {
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