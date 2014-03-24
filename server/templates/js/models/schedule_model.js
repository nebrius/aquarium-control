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
/*jshint browser: true*/
/*global Backbone*/

window.ScheduleModel = Backbone.Model.extend({

  defaults: {

    // Descriptive name for this model
    name: '',

    // The type of schedule entry, either "dynamic" (based on sunrise/sunset)
    // or "manual" (a specific time)
    type: 'dynamic',

    // The soure of the time (used for automatic), in the form
    // "<morning|evening>.<sunrise|sunset|civil|nautical|astronomical>".
    // See http://www.earthtools.org/webservices.htm#sun for more info
    source: {
      set: 'morning',
      event: 'sunrise'
    },

    // The time of the entry (used for manual), in 24 hour time
    time: '0000T00:00Z',

    // The lighting state, on of <day|night|off>
    state: 'off'
  },

  validate: function (attributes) {

    // Validate the name
    if (typeof attributes.name != 'string') {
      throw new Error('ScheduleEntryModel validation error: name must be a string');
    }

    // Validate the type
    if (attributes.type != 'dynamic' && attributes.type != 'manual') {
      throw new Error('ScheduleEntryModel validation error: type must be "dynamic" or "manual"');
    }

    // Validate the source
    if (typeof attributes.source != 'object') {
      throw new Error('ScheduleEntryModel validation error: source must be an object');
    }
    if (attributes.source.set != 'morning' && attributes.source.set != 'evening') {
      throw new Error('ScheduleEntryModel validation error: source.set must be "morning" or "evening"');
    }
    if (attributes.type == 'automatic' &&
        attributes.source.event != 'civil' &&
        attributes.source.event != 'nautical' &&
        attributes.source.event != 'astronomical' &&
        (attributes.source.set != 'morning' || attributes.source.event != 'sunrise') &&
        (attributes.source.set != 'evening' || attributes.source.event != 'sunset')) {
      throw new Error('ScheduleEntryModel validation error: invalid source.event value ' +
        attributes.source.event);
    }

    // Validate the time
    if (typeof attributes.time != 'object') {
      throw new Error('ScheduleEntryModel validation error: time must be an object');
    }
    if (isNaN(attributes.time.hours) || attributes.time.hours < 0 || attributes.time.hours > 23) {
      throw new Error('ScheduleEntryModel validation error: time.hours must be a number between 0 and 23');
    }
  }

});
