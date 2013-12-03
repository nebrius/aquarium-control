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
/*global $, Backbone, StatusView, StatusModel, SetupView, ScheduleEntryCollection*/

var Router = Backbone.Router.extend({

	routes: {
		'setup': 'showSetup',
		'*default': 'showStatus'
	},

	initialize: function () {
		this.container = $('#container');
		this.statusModel = new StatusModel();
		this.statusModel.fetch();
		this.ScheduleEntryCollection = new ScheduleEntryCollection();
		this.ScheduleEntryCollection.fetch();
	},

	showStatus: function () {
		console.debug('Showing status page');
		if (this.state == 'status') {
			return;
		}
		if (this.state == 'setup') {
			this.container.empty();
		}
		if (!this.statusView) {
			this.statusView = new StatusView({
				model: this.statusModel,
				collection: this.ScheduleEntryCollection
			});
		}
		this.state = 'status';
		$('#status_nav_link').addClass('active');
		$('#setup_nav_link').removeClass('active');
		this.container.append(this.statusView.render().el);
	},

	showSetup: function () {
		console.debug('Showing setup page');
		if (this.state == 'setup') {
			return;
		}
		if (this.state == 'status') {
			this.container.empty();
		}
		if (!this.setupView) {
			this.setupView = new SetupView({
				model: this.statusModel,
				collection: this.ScheduleEntryCollection
			});
		}
		this.state = 'setup';
		$('#status_nav_link').removeClass('active');
		$('#setup_nav_link').addClass('active');
		this.container.append(this.setupView.render().el);
	}
});
