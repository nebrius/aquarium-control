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

import Override from 'views/override';
import Program from 'views/program';
import Status from 'views/status';

export default React.createClass({
  render() {
    return (
      <div>
        <div className='app_header'>
          <h2>Aquarium Control</h2>
        </div>
        <div className='panel panel-default app_section'>
          <div className='panel-heading'>
            <div className='panel-title'>Status</div>
          </div>
          <div className='panel-body'>
            <Status {...this.props.status} />
          </div>
        </div>
        <div className='panel panel-default app_section'>
          <div className='panel-heading'>
            <div className='panel-title'>Configuration</div>
          </div>
          <div className='panel-body'>
            <div className='btn-group' role='group'>
              <button type='button'
                      className={classname('btn', 'btn-default', 'btn-lg', this.props.schedule.mode == 'program' ? 'active' : undefined)}>
                Program</button>
              <button type='button'
                      className={classname('btn', 'btn-default', 'btn-lg', this.props.schedule.mode == 'override' ? 'active' : undefined)}>
                Override</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});