/*
  Copyright (C) 2015  Bryan Hughes <bryan@theoreticalideations.com>

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

import { createRequestDeleteAction, createRequestEditAction } from 'actions/entry_state';

export default React.createClass({
  onEditClicked() {
    createRequestDeleteAction(this.props.entryId);
  },
  onDeleteClicked() {
    createRequestEditAction(this.props.entryId);
  },
  render() {
    let entry;
    if (this.props.type == 'dynamic') {
      entry = (
        <div className='schedule_entry_group'>
          <div className='schedule_entry_label'>Event:</div>
          <div>{this.props.dynamicEvent}</div>
        </div>
      );
    } else {
      let hour = this.props.manualTime.hour.toString();
      let minute = this.props.manualTime.minute.toString();
      if (minute.length == 1) {
        minute = '0' + minute;
      }
      entry = (
        <div className='schedule_entry_group'>
          <div className='schedule_entry_label'>Time:</div>
          <div>{hour + ':' + minute}</div>
        </div>
      );
    }
    return (
      <div className='panel panel-default app_section'>
        <div className='panel-heading'>
          <div className='panel-title'><h4>{this.props.name}</h4></div>
        </div>
        <div className='panel-body'>
          <div className='schedule_entry_group'>
            <div className='schedule_entry_label'>State:</div>
            <div>{this.props.state}</div>
          </div>
          <div className='schedule_entry_group'>
            <div className='schedule_entry_label'>Type:</div>
            <div>{this.props.type}</div>
          </div>
          {entry}
          <div className='schedule_entry_button_container'>
            <button className='btn btn-primary schedule_entry_button' onClick={this.onEditClicked}>Edit</button>
            <button className='btn btn-danger schedule_entry_button' onClick={this.onDeleteClicked}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
});
