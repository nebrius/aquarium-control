/*
  Copyright (C) 2013-2015  Bryan Hughes <bryan@theoreticalideations.com>

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

import Override from 'views/override';
import Program from 'views/program';
import Status from 'views/status';
import EditScheduleEntry from 'views/edit_schedule_entry';
import DeleteEntryConfirmation from 'views/delete_entry_confirmation';
import { createModeChangedAction } from 'actions/schedule';

export default React.createClass({
  onModeClicked(e) {
    const mode = e.target.innerHTML.toLowerCase();
    if (mode != this.props.schedule.mode) {
      createModeChangedAction(mode);
    }
  },
  render() {
    const mode = this.props.schedule.mode;
    const ConfView = mode == 'program' ? Program : Override;
    const classNames = ['btn', 'btn-default', 'btn-lg', 'active', 'app_mode_button'];
    let overlay;
    if (this.props.entryState.showingEdit) {
      overlay = <EditScheduleEntry {...this.props.schedule.schedule[this.props.entryState.editEntryId]}/>;
    } else if (this.props.entryState.showingDeleteConfirm) {
      overlay = <DeleteEntryConfirmation />;
    }
    return (
      <div>
        <div className='app_header'>
          <h2>Aquarium Control</h2>
        </div>
        <div className='panel panel-default app_section'>
          <div className='panel-heading'>
            <div className='panel-title'><h3>Status</h3></div>
          </div>
          <div className='panel-body'>
            <Status {...this.props.status} />
          </div>
        </div>
        <div className='panel panel-default app_section'>
          <div className='panel-heading'>
            <div className='panel-title'><h3>Configuration</h3></div>
          </div>
          <div className='panel-body'>
            <div className='btn-group' role='group'>
              <button
                  type='button'
                  className={classname(classNames, { active: mode == 'program' })}
                  onClick={this.onModeClicked}>
                Program
              </button>
              <button
                  type='button'
                  className={classname(classNames, { active: mode == 'override' })}
                  onClick={this.onModeClicked}>
                Override
              </button>
            </div>
            <ConfView {...this.props.schedule} />
          </div>
        </div>
        {overlay}
      </div>
    );
  }
});
