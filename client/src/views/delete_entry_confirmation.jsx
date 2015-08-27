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

import { createDeleteCancelledAction, createDeleteConfirmedAction } from 'actions/entry_state';

export default React.createClass({
  onYesClicked() {
    createDeleteConfirmedAction();
  },
  onCancelClicked() {
    createDeleteCancelledAction();
  },
  render() {
    return (
      <div className='overlay'>
        <div className='popup_container'>
          <h2 className='popup_header'>Are you sure?</h2>
          <div className='popup_body'>
            <div className='dialog_buttons'>
              <button style={{ marginRight: 20 }} className='btn btn-danger popup_button' onClick={this.onYesClicked}>Yes</button>
              <button className='btn btn-default popup_button' onClick={this.onCancelClicked}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
