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
const scheduler_1 = require("./scheduler");
const DEFAULT_PORT = 80;
async function init() {
    console.debug('[Endpoint]: initializing module');
    const port = process.env.PORT || DEFAULT_PORT;
    const app = express();
    app.use(body_parser_1.json());
    app.use(cookieParser());
    app.use(express.static(path_1.join(__dirname, '..', '..', 'client', 'dist')));
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
            console.error(`[Endpoint]: ${e}`);
            res.sendStatus(500);
        }
    });
    app.get('/api/config', async (req, res) => {
        try {
            const config = await db_1.getConfig();
            res.send({ result: config });
        }
        catch (e) {
            console.error(`[Endpoint]: ${e}`);
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
            await scheduler_1.updateSchedule();
            res.send({ result: 'ok' });
        }
        catch (e) {
            console.error(`[Endpoint]: ${e}`);
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
            console.error(`[Endpoint]: ${e}`);
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
            console.error(`[Endpoint]: ${e}`);
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
            console.error(`[Endpoint]: ${e}`);
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
            console.error(`[Endpoint]: ${e}`);
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
            console.error(`[Endpoint]: ${e}`);
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
                console.log(`[Endpoint]: API server listening on ${address}.`);
            }
            else {
                console.log(`[Endpoint]: API server listening on ${address.address}:${address.port}.`);
            }
            resolve();
        });
    });
}
exports.init = init;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kcG9pbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VuZHBvaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLCtCQUFvQztBQUNwQywrQkFBNEI7QUFDNUIsNkNBQW1DO0FBQ25DLDZDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsOENBQThDO0FBQzlDLDRDQVN5QjtBQUN6Qiw2QkFTYztBQUNkLDJDQUVxQjtBQUVyQixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFFakIsS0FBSyxVQUFVLElBQUk7SUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBRWpELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBQztJQUU5QyxNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztJQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdkUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsV0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUVqRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN4QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lB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