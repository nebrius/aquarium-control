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
const events_1 = require("events");
const fs_1 = require("fs");
const path_1 = require("path");
const makeDir = require("make-dir");
const config_1 = require("./config");
class State extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this._config = {
            mode: 'override',
            overrideState: 'off',
            schedule: []
        };
        this._state = {
            deviceId: 'nebrius-rpi',
            get currentTime() {
                return (new Date()).toString();
            },
            currentTemperature: 0,
            currentState: 'off',
            nextTransitionTime: (new Date()).toString(),
            nextTransitionState: 'off'
        };
        this._temperatureSamples = [];
        this._hasReportedFirstTemperature = false;
    }
    init(cb) {
        fs_1.exists(config_1.CONFIG_FILE_PATH, (exists) => {
            if (exists) {
                console.log(`Reading config file from ${config_1.CONFIG_FILE_PATH}`);
                fs_1.readFile(config_1.CONFIG_FILE_PATH, (err, data) => {
                    if (err) {
                        cb(err);
                        return;
                    }
                    try {
                        this._config = JSON.parse(data.toString());
                        cb(undefined);
                    }
                    catch (e) {
                        cb(e);
                    }
                });
                return;
            }
            console.log(`Configuration file not found, creating a default configuration file at ${config_1.CONFIG_FILE_PATH}`);
            makeDir(path_1.dirname(config_1.CONFIG_FILE_PATH)).then(() => {
                fs_1.writeFile(config_1.CONFIG_FILE_PATH, JSON.stringify(exports.state.getConfig(), null, '  '), (err) => {
                    if (err) {
                        cb(err);
                        return;
                    }
                    cb(undefined);
                });
            }).catch(cb);
        });
    }
    getState() {
        return this._state;
    }
    getConfig() {
        return this._config;
    }
    setConfig(newConfig) {
        this._config = newConfig;
        // We use the synchronous method to avoid a possible race condition where `setConfig`
        // could be called before a previous call finished writing the file.
        fs_1.writeFileSync(config_1.CONFIG_FILE_PATH, JSON.stringify(exports.state.getConfig(), null, '  '));
        if (this._hasReportedFirstTemperature) {
            this.emit('change-config', this._state);
        }
    }
    setCurrentTemperature(newTemperature) {
        this._temperatureSamples.push(newTemperature);
        if (!this._hasReportedFirstTemperature) {
            this._state.currentTemperature = newTemperature;
            this._hasReportedFirstTemperature = true;
            this.emit('change-state', this._state);
            return;
        }
        if (this._temperatureSamples.length === config_1.TEMPERATURE_SAMPLE_SIZE) {
            // Take the median temperature and throw the rest away.
            this._temperatureSamples.sort();
            this._state.currentTemperature = this._temperatureSamples[Math.floor(config_1.TEMPERATURE_SAMPLE_SIZE / 2)];
            this._temperatureSamples = [];
            this.emit('change-state', this._state);
        }
    }
    setCurrentState(newState) {
        this._state.currentState = newState;
        if (this._hasReportedFirstTemperature) {
            this.emit('change-state', this._state);
        }
    }
    setNextTransitionTime(date) {
        this._state.nextTransitionTime = date.toString();
        if (this._hasReportedFirstTemperature) {
            this.emit('change-state', this._state);
        }
    }
    setNextTransitionState(newTransitionState) {
        this._state.nextTransitionState = newTransitionState;
        if (this._hasReportedFirstTemperature) {
            this.emit('change-state', this._state);
        }
    }
}
exports.state = new State();
function init(cb) {
    exports.state.init(cb);
}
exports.init = init;
//# sourceMappingURL=state.js.map