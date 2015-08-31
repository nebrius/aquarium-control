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

import { createRequestDeleteAction, createRequestEditAction } from 'actions/entry_state';

export default React.createClass({
  onEditClicked() {
    createRequestEditAction(this.props.entryId);
  },
  onDeleteClicked() {
    createRequestDeleteAction(this.props.entryId);
  },
  render() {
    let entry;
    if (this.props.type == 'dynamic') {
      entry = (
        <div className='schedule_entry_group'>
          <div className='schedule_entry_label'>Event:</div>
          <div>{this.props.event}</div>
        </div>
      );
    } else {
      let hour = this.props.time.hour.toString();
      let minute = this.props.time.minute.toString();
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
        </div>
      </div>
    );
  }
});
