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
    const appDirExists = await util_1.promisify(fs_1.exists)(exports.APP_DIR);
    if (!appDirExists) {
        console.log(`Application directory does not exist, creating it at ${exports.APP_DIR}`);
        await util_1.promisify(mkdirp)(exports.APP_DIR);
    }
    const configExists = await util_1.promisify(fs_1.exists)(CONFIG_PATH);
    if (!configExists) {
        console.log(`Application configuration does not exist, creating default configuration at ${CONFIG_PATH}.` +
            ` Please review this to make sure the information is correct. The app may not function correctly until you do`);
        const defaultConfig = {
            timezone: 'America/Los_Angeles',
            dayPin: 'GPIO27',
            nightPin: 'GPIO17',
            latitude: 37.546267,
            longitude: -121.97113
        };
        await util_1.promisify(fs_1.writeFile)(CONFIG_PATH, JSON.stringify(defaultConfig));
    }
}
exports.init = init;
function getServerConfig() {
    if (!config) {
        throw new Error('Internal Error: getServerConfig before config was initialized');
    }
    return config;
}
exports.getServerConfig = getServerConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLDJCQUF1QztBQUN2QywrQkFBaUM7QUFDakMsK0JBQTRCO0FBQzVCLGlDQUFpQztBQVVwQixRQUFBLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztBQUNwRCxNQUFNLFdBQVcsR0FBRyxXQUFJLENBQUMsZUFBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBRWpELElBQUksTUFBaUMsQ0FBQztBQUUvQixLQUFLLFVBQVUsSUFBSTtJQUN4QixNQUFNLFlBQVksR0FBRyxNQUFNLGdCQUFTLENBQUMsV0FBTSxDQUFDLENBQUMsZUFBTyxDQUFDLENBQUM7SUFDdEQsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHdEQUF3RCxlQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLE1BQU0sZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFPLENBQUMsQ0FBQztLQUNsQztJQUVELE1BQU0sWUFBWSxHQUFHLE1BQU0sZ0JBQVMsQ0FBQyxXQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxRCxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0VBQStFLFdBQVcsR0FBRztZQUN2Ryw4R0FBOEcsQ0FBQyxDQUFDO1FBQ2xILE1BQU0sYUFBYSxHQUFrQjtZQUNuQyxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRSxDQUFDLFNBQVM7U0FDdEIsQ0FBQztRQUNGLE1BQU0sZ0JBQVMsQ0FBQyxjQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0tBQ3hFO0FBQ0gsQ0FBQztBQXBCRCxvQkFvQkM7QUFFRCxTQUFnQixlQUFlO0lBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7S0FDbEY7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBTEQsMENBS0MifQ==