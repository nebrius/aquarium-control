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

export const DAY_PIN = 'GPIO27';
export const NIGHT_PIN = 'GPIO17';
export const TEMPERATURE_UPDATE_RATE = 10000;
export const TEMPERATURE_SAMPLE_SIZE = (5 * 60 * 1000) / TEMPERATURE_UPDATE_RATE;
export const CONFIG_FILE_PATH = '/var/local/aquarium-control/config.json';
export const LATITUDE = 37.546267;
export const LONGITUDE = -121.971132;
