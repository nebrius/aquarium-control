define(['exports', 'dispatcher', 'actions'], function (exports, _dispatcher, _actions) {
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

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.createScheduleUpdatedAction = createScheduleUpdatedAction;
  exports.createModeChangedAction = createModeChangedAction;
  exports.createOverrideStateChangedAction = createOverrideStateChangedAction;
  exports.createEntryStateChangedAction = createEntryStateChangedAction;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _dispatcher2 = _interopRequireDefault(_dispatcher);

  var _actions2 = _interopRequireDefault(_actions);

  function createScheduleUpdatedAction(schedule) {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].SCHEDULE_UPDATED,
      schedule: schedule
    });
  }

  function createModeChangedAction(mode) {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].MODE_CHANGED,
      mode: mode
    });
  }

  function createOverrideStateChangedAction(state) {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].OVERRIDE_STATE_CHANGED,
      state: state
    });
  }

  function createEntryStateChangedAction(state, entryId) {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].MODE_CHANGED,
      mode: mode
    });
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMvc2NoZWR1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JPLFdBQVMsMkJBQTJCLENBQUMsUUFBUSxFQUFFO0FBQ3BELDRCQUFXLFFBQVEsQ0FBQztBQUNsQixnQkFBVSxFQUFFLHFCQUFRLGdCQUFnQjtBQUNwQyxjQUFRLEVBQVIsUUFBUTtLQUNULENBQUMsQ0FBQztHQUNKOztBQUVNLFdBQVMsdUJBQXVCLENBQUMsSUFBSSxFQUFFO0FBQzVDLDRCQUFXLFFBQVEsQ0FBQztBQUNsQixnQkFBVSxFQUFFLHFCQUFRLFlBQVk7QUFDaEMsVUFBSSxFQUFKLElBQUk7S0FDTCxDQUFDLENBQUM7R0FDSjs7QUFFTSxXQUFTLGdDQUFnQyxDQUFDLEtBQUssRUFBRTtBQUN0RCw0QkFBVyxRQUFRLENBQUM7QUFDbEIsZ0JBQVUsRUFBRSxxQkFBUSxzQkFBc0I7QUFDMUMsV0FBSyxFQUFMLEtBQUs7S0FDTixDQUFDLENBQUM7R0FDSjs7QUFFTSxXQUFTLDZCQUE2QixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7QUFDNUQsNEJBQVcsUUFBUSxDQUFDO0FBQ2xCLGdCQUFVLEVBQUUscUJBQVEsWUFBWTtBQUNoQyxVQUFJLEVBQUosSUFBSTtLQUNMLENBQUMsQ0FBQztHQUNKIiwiZmlsZSI6ImFjdGlvbnMvc2NoZWR1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTMtMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IGRpc3BhdGNoZXIgZnJvbSAnZGlzcGF0Y2hlcic7XG5pbXBvcnQgYWN0aW9ucyBmcm9tICdhY3Rpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNjaGVkdWxlVXBkYXRlZEFjdGlvbihzY2hlZHVsZSkge1xuICBkaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAgICBhY3Rpb25UeXBlOiBhY3Rpb25zLlNDSEVEVUxFX1VQREFURUQsXG4gICAgc2NoZWR1bGVcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNb2RlQ2hhbmdlZEFjdGlvbihtb2RlKSB7XG4gIGRpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgIGFjdGlvblR5cGU6IGFjdGlvbnMuTU9ERV9DSEFOR0VELFxuICAgIG1vZGVcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPdmVycmlkZVN0YXRlQ2hhbmdlZEFjdGlvbihzdGF0ZSkge1xuICBkaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAgICBhY3Rpb25UeXBlOiBhY3Rpb25zLk9WRVJSSURFX1NUQVRFX0NIQU5HRUQsXG4gICAgc3RhdGVcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbnRyeVN0YXRlQ2hhbmdlZEFjdGlvbihzdGF0ZSwgZW50cnlJZCkge1xuICBkaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAgICBhY3Rpb25UeXBlOiBhY3Rpb25zLk1PREVfQ0hBTkdFRCxcbiAgICBtb2RlXG4gIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9