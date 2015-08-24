define(['exports', 'dispatcher', 'actions'], function (exports, _dispatcher, _actions) {
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

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.createScheduleUpdatedAction = createScheduleUpdatedAction;
  exports.createOverrideStateChangedAction = createOverrideStateChangedAction;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _dispatcher2 = _interopRequireDefault(_dispatcher);

  var _actions2 = _interopRequireDefault(_actions);

  function createScheduleUpdatedAction(schedule) {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].SCHEDULE_UPDATED,
      schedule: schedule
    });
  }

  function createOverrideStateChangedAction(state) {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].OVERRIDE_STATE_CHANGED,
      state: state
    });
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMvc2NoZWR1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCTyxXQUFTLDJCQUEyQixDQUFDLFFBQVEsRUFBRTtBQUNwRCw0QkFBVyxRQUFRLENBQUM7QUFDbEIsZ0JBQVUsRUFBRSxxQkFBUSxnQkFBZ0I7QUFDcEMsY0FBUSxFQUFSLFFBQVE7S0FDVCxDQUFDLENBQUM7R0FDSjs7QUFFTSxXQUFTLGdDQUFnQyxDQUFDLEtBQUssRUFBRTtBQUN0RCw0QkFBVyxRQUFRLENBQUM7QUFDbEIsZ0JBQVUsRUFBRSxxQkFBUSxzQkFBc0I7QUFDMUMsV0FBSyxFQUFMLEtBQUs7S0FDTixDQUFDLENBQUM7R0FDSiIsImZpbGUiOiJhY3Rpb25zL3NjaGVkdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IChDKSAyMDE1ICBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuICBUaGlzIGZpbGUgaXMgcGFydCBvZiBBcXVhcml1bSBDb250cm9sLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gIGFsb25nIHdpdGggQXF1YXJpdW0gQ29udHJvbC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgZGlzcGF0Y2hlciBmcm9tICdkaXNwYXRjaGVyJztcbmltcG9ydCBhY3Rpb25zIGZyb20gJ2FjdGlvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2NoZWR1bGVVcGRhdGVkQWN0aW9uKHNjaGVkdWxlKSB7XG4gIGRpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgIGFjdGlvblR5cGU6IGFjdGlvbnMuU0NIRURVTEVfVVBEQVRFRCxcbiAgICBzY2hlZHVsZVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU92ZXJyaWRlU3RhdGVDaGFuZ2VkQWN0aW9uKHN0YXRlKSB7XG4gIGRpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgIGFjdGlvblR5cGU6IGFjdGlvbnMuT1ZFUlJJREVfU1RBVEVfQ0hBTkdFRCxcbiAgICBzdGF0ZVxuICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==