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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBRUYsMENBQTBDO0FBRTFDLFNBQWdCLG1CQUFtQixDQUFDLEtBQWEsRUFBRSxNQUFjO0lBQy9ELElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN2QyxPQUFPLGVBQWUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1FBQ3RDLGVBQWUsR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFDO0tBQ3pDO0lBQ0QsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQztBQU5ELGtEQU1DO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLFFBQWdCO0lBQzlDLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUMxQixHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQ3BDLElBQUksbUJBQW1CLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQzFDLElBQUksbUJBQW1CLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEQsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLENBQUM7QUFQRCwwQ0FPQyJ9