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
/*global _, $, Backbone*/

var morningRegex = /^morning(.*)$/,
    eveningRegex = /^evening(.*)$/;

window.EditView = Backbone.View.extend({

  template: _.template($('#edit_template').html()),

  events: {
    'click #save_button': 'onClickSave',
    'click #cancel_button': 'onClickCancel'
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.addClass('edit_popup');
    return this;
  },

  onClickCancel: function (e) {
    e.preventDefault();
    this.remove();
  },

  onClickSave: function (e) {

    function zeroPad(num) {
      return (num < 10 ? '0' : '') + num;
    }

    // Store the base attributes
    this.model.set('name', $('#editName').val());
    this.model.set('state', $('[name=editStateRadios]:checked').val());
    this.model.set('type', $('[name=editTypeRadios]:checked').val());

    // Parse the dynamic field
    var dynamic = $('#editDynamicEvent').val(),
        match = morningRegex.exec(dynamic);
    if (match) {
      this.model.set('source', {
        set: 'morning',
        event: match[1]
      });
    } else {
      match = eveningRegex.exec(dynamic);
      this.model.set('source', {
        set: 'evening',
        event: match[1]
      });
    }

    // Parse the manual time field and convert from local time to UTC
    var date = new Date(),
        time = $('#editTime').val().split(':');
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    this.model.set('time', {
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes()
    });

    // Save the model to the server
    this.model.save();

    // Hosuekeeping
    e.preventDefault();
    this.remove();
  }
});
