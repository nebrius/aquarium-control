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
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = require("path");
const mkdirp = require("mkdirp");
exports.APP_DIR = '/home/pi/.aquarium-control';
const CONFIG_PATH = path_1.join(exports.APP_DIR, 'config.json');
let config;
async function init() {
    console.debug('[Config]: initializing config module');
    const appDirExists = await util_1.promisify(fs_1.exists)(exports.APP_DIR);
    if (!appDirExists) {
        console.log(`[Config]: application directory does not exist, creating it at ${exports.APP_DIR}`);
        await util_1.promisify(mkdirp)(exports.APP_DIR);
    }
    const configExists = await util_1.promisify(fs_1.exists)(CONFIG_PATH);
    if (!configExists) {
        console.log(`[Config]: application configuration does not exist, creating default configuration at ${CONFIG_PATH}.` +
            ` Please review this to make sure the information is correct. The app may not function correctly until you do`);
        const defaultConfig = {
            timezone: 'America/Los_Angeles',
            dayPin: 'GPIO27',
            nightPin: 'GPIO17',
            latitude: 37.546267,
            longitude: -121.97113
        };
        await util_1.promisify(fs_1.writeFile)(CONFIG_PATH, JSON.stringify(defaultConfig, null, '  '));
    }
    config = JSON.parse((await util_1.promisify(fs_1.readFile)(CONFIG_PATH)).toString());
    console.debug('[Config]: config module initalized');
}
exports.init = init;
function getServerConfig() {
    if (!config) {
        throw new Error('Internal Error: getServerConfig before config was initialized');
    }
    return config;
}
exports.getServerConfig = getServerConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLDJCQUFpRDtBQUNqRCwrQkFBaUM7QUFDakMsK0JBQTRCO0FBQzVCLGlDQUFpQztBQVVwQixRQUFBLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztBQUNwRCxNQUFNLFdBQVcsR0FBRyxXQUFJLENBQUMsZUFBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBRWpELElBQUksTUFBaUMsQ0FBQztBQUUvQixLQUFLLFVBQVUsSUFBSTtJQUN4QixPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFDdEQsTUFBTSxZQUFZLEdBQUcsTUFBTSxnQkFBUyxDQUFDLFdBQU0sQ0FBQyxDQUFDLGVBQU8sQ0FBQyxDQUFDO0lBQ3RELElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrRUFBa0UsZUFBTyxFQUFFLENBQUMsQ0FBQztRQUN6RixNQUFNLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBTyxDQUFDLENBQUM7S0FDbEM7SUFFRCxNQUFNLFlBQVksR0FBRyxNQUFNLGdCQUFTLENBQUMsV0FBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUQsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHlGQUF5RixXQUFXLEdBQUc7WUFDakgsOEdBQThHLENBQUMsQ0FBQztRQUNsSCxNQUFNLGFBQWEsR0FBa0I7WUFDbkMsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixNQUFNLEVBQUUsUUFBUTtZQUNoQixRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsU0FBUztZQUNuQixTQUFTLEVBQUUsQ0FBQyxTQUFTO1NBQ3RCLENBQUM7UUFDRixNQUFNLGdCQUFTLENBQUMsY0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3BGO0lBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLGdCQUFTLENBQUMsYUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBdkJELG9CQXVCQztBQUVELFNBQWdCLGVBQWU7SUFDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztLQUNsRjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFMRCwwQ0FLQyJ9