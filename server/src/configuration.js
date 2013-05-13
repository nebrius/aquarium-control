/*
	Copyright (C) 2013  Bryan Hughes <bryan@theoreticalideations.com>

	This file is part of Aquarium Control.

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

/*
endpoints:
configuration
web frontend
hardware
web services
 */

/*
Long-running services:
web server
scheduler
 */

/**
 * Sets the configuration
 *
 * @method
 * @param {Object} config The configuration to set
 * @param {String} config.mode The current mode, one of "auto", "manual", or "disabled"
 * @param {Object} config.auto The settings for automatically turning lights on and off
 * @param {Number} config.auto.sunriseOffset The offset from sunrise to turn on the daytime lights
 * @param {Number} config.auto.sunsetOffset The offset from sunset to turn on the nighttime lights
 * @param {Array} config.manual The settings manually turning lights on and off
 * @param {Number} config.manual.<entry>.time The time in minutes since midnight to enable the lighting configuration
 * @param {Boolean} config.manual.<entry>.daytimeLights Whether or not to turn on the daytime lights
 * @param {Boolean} config.manual.<entry>.nighttimeLights Whether or not to turn on the nighttime lights
 */
function setConfiguration(config) {
}

function getConfiguration() {
}

module.exports = {
	get configuration () {
		return getConfiguration();
	},
	set configuration (config) {
		return setConfiguration(config);
	}
};