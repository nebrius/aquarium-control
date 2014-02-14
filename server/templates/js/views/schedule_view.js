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

window.ScheduleView = Backbone.View.extend({

  tagName: 'li',

  template: _.template($('#schedule_template').html()),

  events: {
    'click #edit_button': 'onClickEdit',
    'click #delete_button': 'onClickDelete',
    'click .move_up_button': 'onClickMoveUp',
    'click .move_down_button': 'onClickMoveDown'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  onClickEdit: function () {
    $('body').append(new window.EditView({
      model: this.model
    }).render().el);
  },

  onClickDelete: function () {
    this.model.destroy();
  },

  onClickMoveUp: function () {
    var collection = window.scheduleCollection,
        index = collection.models.indexOf(this.model),
        model = this.model,
        neighbor = collection.models[index - 1];
    if (index < 1) {
      return;
    }
    model.set('id', model.get('id') - 1);
    neighbor.set('id', neighbor.get('id') + 1);
    collection.sort();
    model.save();
    neighbor.save();
  },

  onClickMoveDown: function () {
    var collection = window.scheduleCollection,
        index = collection.models.indexOf(this.model),
        model = this.model,
        neighbor = collection.models[index + 1];
    if (index == -1 || index == collection.models.length - 1) {
      return;
    }
    model.set('id', model.get('id') + 1);
    neighbor.set('id', neighbor.get('id') - 1);
    collection.sort();
    model.save();
    neighbor.save();
  }
});
