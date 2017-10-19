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
const endpoints_1 = require("./endpoints");
const db_1 = require("./db");
const async_1 = require("async");
function run() {
    async_1.series([
        db_1.init,
        endpoints_1.init
    ], (err) => {
        if (err) {
            console.error(err.message || err);
            process.exit(-1);
        }
        console.log('Aquarium Control API running');
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map