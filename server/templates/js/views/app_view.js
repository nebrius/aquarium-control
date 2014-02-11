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
/*global _, $, Backbone, ScheduleView*/

window.AppView = Backbone.View.extend({

  el: '#container',

  template: _.template($('#app_template').html()),

  initialize: function() {
    var boundRender = this.render.bind(this);
    this.model.on('change', boundRender);
    this.collection.on('add', boundRender);
    this.collection.on('reset', boundRender);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    var listContainer = this.$el.children('#scheduled_list');
    this.collection.each(function (model) {
      var scheduleView = new ScheduleView({ model: model }).render().el;
      $(scheduleView).addClass('list-group-item');
      listContainer.append(scheduleView);
    });
    return this;
  }

});