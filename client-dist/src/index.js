define(['exports', 'api', 'actions/schedule_updated', 'actions/status_updated', 'views/app', 'stores/schedule', 'stores/status'], function (exports, _api, _actionsSchedule_updated, _actionsStatus_updated, _viewsApp, _storesSchedule, _storesStatus) {
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

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _App = _interopRequireDefault(_viewsApp);

  setInterval(function () {
    return (0, _api.getStatus)(_actionsStatus_updated.createStatusUpdatedAction);
  }, 1000);
  (0, _api.getSchedule)(_actionsSchedule_updated.createScheduleUpdatedAction);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxhQUFXLENBQUM7V0FBTSxTQVBJLFNBQVMseUJBRXRCLHlCQUF5QixDQUtvQjtHQUFBLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUQsV0FSUyxXQUFXLDJCQUNYLDJCQUEyQixDQU9JLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7IGdldFNjaGVkdWxlLCBnZXRTdGF0dXMsIHNhdmVTY2hlZHVsZSB9IGZyb20gJ2FwaSc7XG5pbXBvcnQgeyBjcmVhdGVTY2hlZHVsZVVwZGF0ZWRBY3Rpb24gfSBmcm9tICdhY3Rpb25zL3NjaGVkdWxlX3VwZGF0ZWQnO1xuaW1wb3J0IHsgY3JlYXRlU3RhdHVzVXBkYXRlZEFjdGlvbiB9IGZyb20gJ2FjdGlvbnMvc3RhdHVzX3VwZGF0ZWQnO1xuaW1wb3J0IEFwcCBmcm9tICd2aWV3cy9hcHAnO1xuaW1wb3J0ICdzdG9yZXMvc2NoZWR1bGUnO1xuaW1wb3J0ICdzdG9yZXMvc3RhdHVzJztcblxuc2V0SW50ZXJ2YWwoKCkgPT4gZ2V0U3RhdHVzKGNyZWF0ZVN0YXR1c1VwZGF0ZWRBY3Rpb24pLCAxMDAwKTtcbmdldFNjaGVkdWxlKGNyZWF0ZVNjaGVkdWxlVXBkYXRlZEFjdGlvbik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=