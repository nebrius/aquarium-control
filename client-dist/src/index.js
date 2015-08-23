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

  function render() {
    var props = {
      schedule: (0, _storesSchedule.getData)(),
      status: (0, _storesStatus.getData)()
    };
    React.render(React.createElement(_App['default'], props), document.getElementById('content'));
  }

  (0, _storesSchedule.registerCallback)(render);
  (0, _storesStatus.registerCallback)(render);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDQSxhQUFXLENBQUM7V0FBTSxTQWJJLFNBQVMseUJBRXRCLHlCQUF5QixDQVdvQjtHQUFBLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUQsV0FkUyxXQUFXLDJCQUNYLDJCQUEyQixDQWFJLENBQUM7O0FBRXpDLFdBQVMsTUFBTSxHQUFHO0FBQ2hCLFFBQU0sS0FBSyxHQUFHO0FBQ1osY0FBUSxFQUFFLG9CQVpaLE9BQU8sR0FZc0I7QUFDM0IsWUFBTSxFQUFFLGtCQVRWLE9BQU8sR0FTa0I7S0FDeEIsQ0FBQztBQUNGLFNBQUssQ0FBQyxNQUFNLENBQ1YscUNBQVMsS0FBSyxDQUFJLEVBQ2xCLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQ25DLENBQUM7R0FDSDs7QUFFRCxzQkF0QkUsZ0JBQWdCLEVBc0JPLE1BQU0sQ0FBQyxDQUFDO0FBQ2pDLG9CQW5CRSxnQkFBZ0IsRUFtQkssTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7IGdldFNjaGVkdWxlLCBnZXRTdGF0dXMsIHNhdmVTY2hlZHVsZSB9IGZyb20gJ2FwaSc7XG5pbXBvcnQgeyBjcmVhdGVTY2hlZHVsZVVwZGF0ZWRBY3Rpb24gfSBmcm9tICdhY3Rpb25zL3NjaGVkdWxlX3VwZGF0ZWQnO1xuaW1wb3J0IHsgY3JlYXRlU3RhdHVzVXBkYXRlZEFjdGlvbiB9IGZyb20gJ2FjdGlvbnMvc3RhdHVzX3VwZGF0ZWQnO1xuaW1wb3J0IEFwcCBmcm9tICd2aWV3cy9hcHAnO1xuaW1wb3J0IHtcbiAgcmVnaXN0ZXJDYWxsYmFjayBhcyByZWdpc3RlclNjaGVkdWxlQ2FsbGJhY2ssXG4gIGdldERhdGEgYXMgZ2V0U2NoZWR1bGVEYXRhXG59IGZyb20gJ3N0b3Jlcy9zY2hlZHVsZSc7XG5pbXBvcnQge1xuICByZWdpc3RlckNhbGxiYWNrIGFzIHJlZ2lzdGVyU3RhdHVzQ2FsbGJhY2ssXG4gIGdldERhdGEgYXMgZ2V0U3RhdHVzRGF0YVxufSBmcm9tICdzdG9yZXMvc3RhdHVzJztcblxuc2V0SW50ZXJ2YWwoKCkgPT4gZ2V0U3RhdHVzKGNyZWF0ZVN0YXR1c1VwZGF0ZWRBY3Rpb24pLCAxMDAwKTtcbmdldFNjaGVkdWxlKGNyZWF0ZVNjaGVkdWxlVXBkYXRlZEFjdGlvbik7XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgc2NoZWR1bGU6IGdldFNjaGVkdWxlRGF0YSgpLFxuICAgIHN0YXR1czogZ2V0U3RhdHVzRGF0YSgpXG4gIH07XG4gIFJlYWN0LnJlbmRlcihcbiAgICA8QXBwIHsuLi5wcm9wc30gLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuICApO1xufVxuXG5yZWdpc3RlclNjaGVkdWxlQ2FsbGJhY2socmVuZGVyKTtcbnJlZ2lzdGVyU3RhdHVzQ2FsbGJhY2socmVuZGVyKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=