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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBRUYsMENBQTBDO0FBRTFDLFNBQWdCLHNCQUFzQixDQUFDLFFBQWdCO0lBQ3JELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsUUFBUSxpQkFBaUIsQ0FBQyxDQUFDO0tBQ3BFO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBTkQsd0RBTUM7QUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxLQUFhLEVBQUUsTUFBYztJQUMvRCxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkMsT0FBTyxlQUFlLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtRQUN0QyxlQUFlLEdBQUcsR0FBRyxHQUFHLGVBQWUsQ0FBQztLQUN6QztJQUNELE9BQU8sZUFBZSxDQUFDO0FBQ3pCLENBQUM7QUFORCxrREFNQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxRQUFnQjtJQUM5QyxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FDMUIsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUNwQyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUMxQyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztBQUNsQyxDQUFDO0FBUEQsMENBT0MifQ==