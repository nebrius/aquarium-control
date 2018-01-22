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
const moment = require("moment-timezone");
exports.DATABASE_NAMES = {
    STATE: 'current_state',
    USERS: 'aquarium_users',
    TEMPERATURE: 'monthly_temperature'
};
function getEnvironmentVariable(variable) {
    const value = process.env[variable];
    if (typeof value !== 'string') {
        throw new Error(`Environment variable ${variable} is not defined`);
    }
    return value;
}
exports.getEnvironmentVariable = getEnvironmentVariable;
function toStringWithPadding(value, digits) {
    let convertedString = value.toString();
    while (convertedString.length < digits) {
        convertedString = '0' + convertedString;
    }
    return convertedString;
}
exports.toStringWithPadding = toStringWithPadding;
function getStartOfToday(timezone) {
    const now = moment().tz(timezone);
    const startOfDay = moment.tz(`${toStringWithPadding(now.year(), 4)}-${toStringWithPadding(now.month() + 1, 2)}-${toStringWithPadding(now.date(), 2)}`, timezone);
    return startOfDay.unix() * 1000;
}
exports.getStartOfToday = getStartOfToday;
//# sourceMappingURL=util.js.map