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

import { createEditSavedAction, createEditCancelledAction } from 'actions/entry_state';

export default React.createClass({
  onSaveClicked() {
    createEditSavedAction();
  },
  onCancelClicked() {
    createEditCancelledAction();
  },
  onStateClicked(e) {
    const state = e.target.value;
    if (this.props.state !== state) {
      debugger;
    }
  },
  render() {
    const createStateRadioOptions = (label, checked) => {
      let input;
      if (checked) {
        input = <input type='radio' name='state_radios' onChange={this.onStateClicked} value={label.toLowerCase()} checked />;
      } else {
        input = <input type='radio' name='state_radios' onChange={this.onStateClicked} value={label.toLowerCase()} />;
      }
      return (
        <div className='radio'>
          <label>
            {input}
            {label}
          </label>
        </div>
      );
    };
    return (
      <div className='overlay'>
        <div className='popup_container'>
          <h2 className='popup_header'>Edit Schedule</h2>
          <div className='popup_body'>
            <div className='form-group'>
              <label>State</label>
              {createStateRadioOptions('Day', this.props.state === 'day')}
              {createStateRadioOptions('Night', this.props.state === 'night')}
              {createStateRadioOptions('Off', this.props.state === 'off')}
            </div>
            <div className='dialog_buttons'>
              <button style={{ marginRight: 20 }} className='btn btn-danger popup_button' onClick={this.onSaveClicked}>Save</button>
              <button className='btn btn-default popup_button' onClick={this.onCancelClicked}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});