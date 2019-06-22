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
const db_1 = require("./db");
const DEFAULT_PORT = 3001;
async function init() {
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
    app.get('/api/state', async (req, res) => {
        try {
            const state = await db_1.getState();
            res.send({ result: state });
        }
        catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });
    app.get('/api/config', async (req, res) => {
        try {
            const config = await db_1.getConfig();
            res.send({ result: config });
        }
        catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });
    app.post('/api/config', async (req, res) => {
        if (!revalidator_1.validate(req.body, common_1.configValidationSchema).valid) {
            res.sendStatus(400);
            return;
        }
        try {
            await db_1.updateConfig(req.body);
            res.send({ result: 'ok' });
        }
        catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });
    app.get('/api/temperatures', async (req, res) => {
        try {
            const temperatures = {
                history: await db_1.getTemperatureHistory()
            };
            res.send({ result: temperatures });
        }
        catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });
    app.get('/api/cleaning', async (req, res) => {
        try {
            const cleaning = {
                history: await db_1.getCleaningHistory()
            };
            res.send({ result: cleaning });
        }
        catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });
    app.post('/api/cleaning', async (req, res) => {
        if (!revalidator_1.validate(req.body, common_1.cleaningValidationSchema).valid) {
            res.sendStatus(400);
            return;
        }
        try {
            await db_1.createCleaningEntry(req.body);
            const cleaning = {
                history: await db_1.getCleaningHistory()
            };
            res.send({ result: cleaning });
        }
        catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });
    app.get('/api/testing', async (req, res) => {
        try {
            const testing = {
                history: await db_1.getTestingHistory()
            };
            res.send({ result: testing });
        }
        catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });
    app.post('/api/testing', async (req, res) => {
        if (!revalidator_1.validate(req.body, common_1.testingValidationSchema).valid) {
            res.sendStatus(400);
            return;
        }
        try {
            await db_1.createTestingEntry(req.body);
            const testing = {
                history: await db_1.getTestingHistory()
            };
            res.send({ result: testing });
        }
        catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });
    const server = http_1.createServer();
    server.on('request', app);
    return new Promise((resolve) => {
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
            resolve();
        });
    });
}
exports.init = init;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kcG9pbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VuZHBvaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLCtCQUFvQztBQUNwQywrQkFBNEI7QUFDNUIsNkNBQW1DO0FBQ25DLDZDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsOENBQThDO0FBQzlDLDRDQVN5QjtBQUN6Qiw2QkFTYztBQUVkLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQztBQUVuQixLQUFLLFVBQVUsSUFBSTtJQUN4QixPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFFOUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksWUFBWSxDQUFDO0lBRTlDLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0lBRXRCLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQUksRUFBRSxDQUFDLENBQUM7SUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBRXhCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEtBQUssTUFBTSxFQUFFO1FBQ3RDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7YUFBTTtZQUNMLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4RTtLQUNGO0lBRUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUs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