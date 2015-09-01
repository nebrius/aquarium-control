# Aquarium Control

Automated lighting control software for an aquarium using a Raspberry Pi. Lighting can be run on a schedule, configurable by the user, that can change lights at a set time, or based on a solar event such as sunrise and sunset. A server is provided that displays a mobile web friendly status page and exposes the override controls.

Note: figuring out how to connect the Pi to the lighting hardware is left as an exercise for the reader since there are so many different lighting systems out there. 

## Installation

Install with NPM:

```npm install -g aquarium-control```

To get aquarium control to start on startup, you can use [PM2](http://npmjs.com/package/pm2) or a similar system.

**IMPORTANT**: your Raspberry Pi _must_ be set to local time, but by default it is set to UTC. To change it, run ```sudo dpkg-reconfigure tzdata``` and follow the prompts.

## Configuration

There are two files that need to be configured before you can use Aquarium Control: config.json and schedule.json

### config.json

This file contains the main configuration for Aquarium Control. An example configuration file looks like:

```json
{
  "location": {
    "latitude": 37.546267,
    "longitude": -121.971132
  },
  "port": 3000,
  "pins": {
    "day": "GPIO17",
    "night": "GPIO5"
  },
  "schedule": "./schedule.json",
  "logFile": "/var/log/aquarium-control"
}
```

The ```location``` option specifies the latitude and longitude of the server. You can use a site such as [latlong.net](http://www.latlong.net/) to find your location. These coordinates are used to calculate the sunrise and sunset times for your location.

The ```port``` option specifies the port that the status and override server listens on. This parameter is optional and defaults to 80.

The ```pins``` option is used to specify the two pins that control the day and night time lights. For more information on pin naming schemes, check out the [Raspi IO wiki](https://github.com/nebrius/raspi-io/wiki).

The ```schedule``` option specifies where to find the second configuration file. This path is relative to the config.json file.

The ```logFile``` option specifies the folder to store log files in. By default, log files are capped in size, and archived in files called log1, etc, which is why they are stored in a folder.

### schedule.json

This file contains all of the information about lighting state and it's schedule. An example schedule file looks like:

```json
{
  "mode": "program",
  "overrideState": "day",
  "schedule": [
    {
      "name": "Sunrise",
      "type": "dynamic",
      "event": "sunrise",
      "state": "day"
    },
    {
      "name": "Sunset",
      "type": "dynamic",
      "event": "sunset",
      "state": "night"
    },
    {
      "name": "Night",
      "type": "manual",
      "time": {
        "hour": 23,
        "minute": 0
      },
      "state": "off"
    }
  ]
}
```

The first entry, ```mode```, specifies whether we are in program mode or automatic mode. This is set automatically by the configuration server.

The next entry, ```overrideState`, specifies what lighting state the aquarium should be in when in override mode. This is also set automatically by the configuration server.

The third entry, ```schedule```, must be specified manually. This is the schedule the lights will follow when in program mode. Each entry in the array represents a state change.

Each entry comes in one of two forms: manual and dynamic. A manual entry takes in a specific time and always runs at that specific time. A dynamic entry, however, figures out the time for a specified solar event for each day, and will vary throughout the year.

The first part of each entry is the ```name``` property. This is used for display on the configuration website, and is not used for any other purpose.

The ```type``` property specifies whether the entry is a dynamic or manual entry, and must be either ```dynamic``` or ```manual```.

The ```state``` property specifies what the lighting state should be switched to, and must be ```day```, ```night```, or ```off```.

If the entry's mode is ```dynamic```, there must be an ```event``` property that specifies what event to use. This value must be one of the properties specified by [suncalc](https://github.com/mourner/suncalc#sunlight-times).

If the entry's mode is ```manual```, there must be a ```time``` property that specifies the ```hour``` (in 24 hour format) and the ```minute``` of the entry.

# License

All schematics, layouts, software, and other documentation for aquarium-control is released under the General Public License.

Copyright (C) 2013-2015  Bryan Hughes <bryan@theoreticalideations.com>

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
