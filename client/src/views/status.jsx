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

export default React.createClass({
  render() {
    function formatDate(time) {
      return time ? (new Date(time)).toString() : '';
    }
    return (
      <div>
        <div className='status_container'>
          <div className='status_label'>Server Time:</div>
          <div className='status_value'>{formatDate(this.props.time)}</div>
        </div>
        <div className='status_container'>
          <div className='status_label'>Lighting State:</div>
          <div className='status_value'>{this.props.state}</div>
        </div>
        <div className='status_container'>
          <div className='status_label'>Next Transition At:</div>
          <div className='status_value'>{formatDate(this.props.nextTransitionTime)}</div>
        </div>
        <div className='status_container'>
          <div className='status_label'>Next Transition State:</div>
          <div className='status_value'>{this.props.nextTransitionState}</div>
        </div>
      </div>
    );
  }
});
