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
const config_1 = require("./config");
const endpoints_1 = require("./endpoints");
const db_1 = require("./db");
const device_1 = require("./device");
const scheduler_1 = require("./scheduler");
async function run() {
    console.log('Starting Aquarium Control server');
    await config_1.init();
    await db_1.init();
    await endpoints_1.init();
    await device_1.init();
    await scheduler_1.init();
    console.log('Aquarium Control server running');
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7QUFFRixxQ0FBOEM7QUFDOUMsMkNBQW9EO0FBQ3BELDZCQUFzQztBQUN0QyxxQ0FBOEM7QUFDOUMsMkNBQW9EO0FBRXBELEtBQUssVUFBVSxHQUFHO0lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUNoRCxNQUFNLGFBQVUsRUFBRSxDQUFDO0lBQ25CLE1BQU0sU0FBTSxFQUFFLENBQUM7SUFDZixNQUFNLGdCQUFhLEVBQUUsQ0FBQztJQUN0QixNQUFNLGFBQVUsRUFBRSxDQUFDO0lBQ25CLE1BQU0sZ0JBQWEsRUFBRSxDQUFDO0lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBQ0QsR0FBRyxFQUFFLENBQUMifQ==