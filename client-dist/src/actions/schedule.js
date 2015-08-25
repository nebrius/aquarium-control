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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMvc2NoZWR1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JPLFdBQVMsMkJBQTJCLENBQUMsUUFBUSxFQUFFO0FBQ3BELDRCQUFXLFFBQVEsQ0FBQztBQUNsQixnQkFBVSxFQUFFLHFCQUFRLGdCQUFnQjtBQUNwQyxjQUFRLEVBQVIsUUFBUTtLQUNULENBQUMsQ0FBQztHQUNKOztBQUVNLFdBQVMsdUJBQXVCLENBQUMsSUFBSSxFQUFFO0FBQzVDLDRCQUFXLFFBQVEsQ0FBQztBQUNsQixnQkFBVSxFQUFFLHFCQUFRLFlBQVk7QUFDaEMsVUFBSSxFQUFKLElBQUk7S0FDTCxDQUFDLENBQUM7R0FDSjs7QUFFTSxXQUFTLGdDQUFnQyxDQUFDLEtBQUssRUFBRTtBQUN0RCw0QkFBVyxRQUFRLENBQUM7QUFDbEIsZ0JBQVUsRUFBRSxxQkFBUSxzQkFBc0I7QUFDMUMsV0FBSyxFQUFMLEtBQUs7S0FDTixDQUFDLENBQUM7R0FDSjs7QUFFTSxXQUFTLDZCQUE2QixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7QUFDNUQsNEJBQVcsUUFBUSxDQUFDO0FBQ2xCLGdCQUFVLEVBQUUscUJBQVEsWUFBWTtBQUNoQyxVQUFJLEVBQUosSUFBSTtLQUNMLENBQUMsQ0FBQztHQUNKIiwiZmlsZSI6ImFjdGlvbnMvc2NoZWR1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBkaXNwYXRjaGVyIGZyb20gJ2Rpc3BhdGNoZXInO1xuaW1wb3J0IGFjdGlvbnMgZnJvbSAnYWN0aW9ucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTY2hlZHVsZVVwZGF0ZWRBY3Rpb24oc2NoZWR1bGUpIHtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgYWN0aW9uVHlwZTogYWN0aW9ucy5TQ0hFRFVMRV9VUERBVEVELFxuICAgIHNjaGVkdWxlXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTW9kZUNoYW5nZWRBY3Rpb24obW9kZSkge1xuICBkaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAgICBhY3Rpb25UeXBlOiBhY3Rpb25zLk1PREVfQ0hBTkdFRCxcbiAgICBtb2RlXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3ZlcnJpZGVTdGF0ZUNoYW5nZWRBY3Rpb24oc3RhdGUpIHtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgYWN0aW9uVHlwZTogYWN0aW9ucy5PVkVSUklERV9TVEFURV9DSEFOR0VELFxuICAgIHN0YXRlXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRW50cnlTdGF0ZUNoYW5nZWRBY3Rpb24oc3RhdGUsIGVudHJ5SWQpIHtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgYWN0aW9uVHlwZTogYWN0aW9ucy5NT0RFX0NIQU5HRUQsXG4gICAgbW9kZVxuICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==