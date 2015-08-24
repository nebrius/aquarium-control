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

import { createOverrideStateChangedAction } from 'actions/schedule';

export default React.createClass({
  onClicked(e) {
    const state = e.target.innerText.toLowerCase();
    if (state != this.props.overrideState) {
      createOverrideStateChangedAction(state);
    }
  },

  render() {
    const state = this.props.overrideState;
    const classNames = ['override_button', 'btn', 'btn-default', 'btn-lg', 'active'];
    return (
      <div className='override_container'>
        <div className='btn-group' role='group'>
          <button
              type='button'
              className={classname(classNames, { active: state == 'day' })}
              onClick={this.onClicked}>
            Day
          </button>
          <button
              type='button'
              className={classname(classNames, { active: state == 'night' })}
              onClick={this.onClicked}>
            Night
          </button>
          <button
              type='button'
              className={classname(classNames, { active: state == 'off' })}
              onClick={this.onClicked}>
            Off
          </button>
        </div>
      </div>
    );
  }
});
