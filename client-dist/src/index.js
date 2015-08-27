define(['exports', 'api', 'actions/schedule', 'actions/status_updated', 'views/app', 'stores/schedule', 'stores/status', 'stores/entry_state'], function (exports, _api, _actionsSchedule, _actionsStatus_updated, _viewsApp, _storesSchedule, _storesStatus, _storesEntry_state) {
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

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _App = _interopRequireDefault(_viewsApp);

  setInterval(function () {
    return (0, _api.getStatus)(_actionsStatus_updated.createStatusUpdatedAction);
  }, 1000);
  (0, _api.getSchedule)(_actionsSchedule.createScheduleUpdatedAction);

  function render() {
    var props = {
      schedule: (0, _storesSchedule.getData)(),
      status: (0, _storesStatus.getData)(),
      entryState: (0, _storesEntry_state.getData)()
    };
    React.render(React.createElement(_App['default'], props), document.getElementById('content'));
  }

  (0, _storesSchedule.registerCallback)(render);
  (0, _storesStatus.registerCallback)(render);
  (0, _storesEntry_state.registerCallback)(render);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9DQSxhQUFXLENBQUM7V0FBTSxTQWpCSSxTQUFTLHlCQUV0Qix5QkFBeUIsQ0Flb0I7R0FBQSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlELFdBbEJTLFdBQVcsbUJBQ1gsMkJBQTJCLENBaUJJLENBQUM7O0FBRXpDLFdBQVMsTUFBTSxHQUFHO0FBQ2hCLFFBQU0sS0FBSyxHQUFHO0FBQ1osY0FBUSxFQUFFLG9CQWhCWixPQUFPLEdBZ0JzQjtBQUMzQixZQUFNLEVBQUUsa0JBYlYsT0FBTyxHQWFrQjtBQUN2QixnQkFBVSxFQUFFLHVCQVZkLE9BQU8sR0FVMEI7S0FDaEMsQ0FBQztBQUNGLFNBQUssQ0FBQyxNQUFNLENBQ1YscUNBQVMsS0FBSyxDQUFJLEVBQ2xCLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQ25DLENBQUM7R0FDSDs7QUFFRCxzQkEzQkUsZ0JBQWdCLEVBMkJPLE1BQU0sQ0FBQyxDQUFDO0FBQ2pDLG9CQXhCRSxnQkFBZ0IsRUF3QkssTUFBTSxDQUFDLENBQUM7QUFDL0IseUJBckJFLGdCQUFnQixFQXFCUyxNQUFNLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxMy0yMDE1ICBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuICBUaGlzIGZpbGUgaXMgcGFydCBvZiBBcXVhcml1bSBDb250cm9sLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gIGFsb25nIHdpdGggQXF1YXJpdW0gQ29udHJvbC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgeyBnZXRTY2hlZHVsZSwgZ2V0U3RhdHVzLCBzYXZlU2NoZWR1bGUgfSBmcm9tICdhcGknO1xuaW1wb3J0IHsgY3JlYXRlU2NoZWR1bGVVcGRhdGVkQWN0aW9uIH0gZnJvbSAnYWN0aW9ucy9zY2hlZHVsZSc7XG5pbXBvcnQgeyBjcmVhdGVTdGF0dXNVcGRhdGVkQWN0aW9uIH0gZnJvbSAnYWN0aW9ucy9zdGF0dXNfdXBkYXRlZCc7XG5pbXBvcnQgQXBwIGZyb20gJ3ZpZXdzL2FwcCc7XG5pbXBvcnQge1xuICByZWdpc3RlckNhbGxiYWNrIGFzIHJlZ2lzdGVyU2NoZWR1bGVDYWxsYmFjayxcbiAgZ2V0RGF0YSBhcyBnZXRTY2hlZHVsZURhdGFcbn0gZnJvbSAnc3RvcmVzL3NjaGVkdWxlJztcbmltcG9ydCB7XG4gIHJlZ2lzdGVyQ2FsbGJhY2sgYXMgcmVnaXN0ZXJTdGF0dXNDYWxsYmFjayxcbiAgZ2V0RGF0YSBhcyBnZXRTdGF0dXNEYXRhXG59IGZyb20gJ3N0b3Jlcy9zdGF0dXMnO1xuaW1wb3J0IHtcbiAgcmVnaXN0ZXJDYWxsYmFjayBhcyByZWdpc3RlckVudHJ5U3RhdGVDYWxsYmFjayxcbiAgZ2V0RGF0YSBhcyBnZXRFbnRyeVN0YXRlRGF0YVxufSBmcm9tICdzdG9yZXMvZW50cnlfc3RhdGUnO1xuXG5zZXRJbnRlcnZhbCgoKSA9PiBnZXRTdGF0dXMoY3JlYXRlU3RhdHVzVXBkYXRlZEFjdGlvbiksIDEwMDApO1xuZ2V0U2NoZWR1bGUoY3JlYXRlU2NoZWR1bGVVcGRhdGVkQWN0aW9uKTtcblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBzY2hlZHVsZTogZ2V0U2NoZWR1bGVEYXRhKCksXG4gICAgc3RhdHVzOiBnZXRTdGF0dXNEYXRhKCksXG4gICAgZW50cnlTdGF0ZTogZ2V0RW50cnlTdGF0ZURhdGEoKVxuICB9O1xuICBSZWFjdC5yZW5kZXIoXG4gICAgPEFwcCB7Li4ucHJvcHN9IC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JylcbiAgKTtcbn1cblxucmVnaXN0ZXJTY2hlZHVsZUNhbGxiYWNrKHJlbmRlcik7XG5yZWdpc3RlclN0YXR1c0NhbGxiYWNrKHJlbmRlcik7XG5yZWdpc3RlckVudHJ5U3RhdGVDYWxsYmFjayhyZW5kZXIpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9