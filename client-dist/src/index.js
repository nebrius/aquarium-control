define(['exports', 'api', 'actions/schedule', 'actions/status_updated', 'views/app', 'stores/schedule', 'stores/status', 'stores/entry_state'], function (exports, _api, _actionsSchedule, _actionsStatus_updated, _viewsApp, _storesSchedule, _storesStatus, _storesEntry_state) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9DQSxhQUFXLENBQUM7V0FBTSxTQWpCSSxTQUFTLHlCQUV0Qix5QkFBeUIsQ0Flb0I7R0FBQSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlELFdBbEJTLFdBQVcsbUJBQ1gsMkJBQTJCLENBaUJJLENBQUM7O0FBRXpDLFdBQVMsTUFBTSxHQUFHO0FBQ2hCLFFBQU0sS0FBSyxHQUFHO0FBQ1osY0FBUSxFQUFFLG9CQWhCWixPQUFPLEdBZ0JzQjtBQUMzQixZQUFNLEVBQUUsa0JBYlYsT0FBTyxHQWFrQjtBQUN2QixnQkFBVSxFQUFFLHVCQVZkLE9BQU8sR0FVMEI7S0FDaEMsQ0FBQztBQUNGLFNBQUssQ0FBQyxNQUFNLENBQ1YscUNBQVMsS0FBSyxDQUFJLEVBQ2xCLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQ25DLENBQUM7R0FDSDs7QUFFRCxzQkEzQkUsZ0JBQWdCLEVBMkJPLE1BQU0sQ0FBQyxDQUFDO0FBQ2pDLG9CQXhCRSxnQkFBZ0IsRUF3QkssTUFBTSxDQUFDLENBQUM7QUFDL0IseUJBckJFLGdCQUFnQixFQXFCUyxNQUFNLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHsgZ2V0U2NoZWR1bGUsIGdldFN0YXR1cywgc2F2ZVNjaGVkdWxlIH0gZnJvbSAnYXBpJztcbmltcG9ydCB7IGNyZWF0ZVNjaGVkdWxlVXBkYXRlZEFjdGlvbiB9IGZyb20gJ2FjdGlvbnMvc2NoZWR1bGUnO1xuaW1wb3J0IHsgY3JlYXRlU3RhdHVzVXBkYXRlZEFjdGlvbiB9IGZyb20gJ2FjdGlvbnMvc3RhdHVzX3VwZGF0ZWQnO1xuaW1wb3J0IEFwcCBmcm9tICd2aWV3cy9hcHAnO1xuaW1wb3J0IHtcbiAgcmVnaXN0ZXJDYWxsYmFjayBhcyByZWdpc3RlclNjaGVkdWxlQ2FsbGJhY2ssXG4gIGdldERhdGEgYXMgZ2V0U2NoZWR1bGVEYXRhXG59IGZyb20gJ3N0b3Jlcy9zY2hlZHVsZSc7XG5pbXBvcnQge1xuICByZWdpc3RlckNhbGxiYWNrIGFzIHJlZ2lzdGVyU3RhdHVzQ2FsbGJhY2ssXG4gIGdldERhdGEgYXMgZ2V0U3RhdHVzRGF0YVxufSBmcm9tICdzdG9yZXMvc3RhdHVzJztcbmltcG9ydCB7XG4gIHJlZ2lzdGVyQ2FsbGJhY2sgYXMgcmVnaXN0ZXJFbnRyeVN0YXRlQ2FsbGJhY2ssXG4gIGdldERhdGEgYXMgZ2V0RW50cnlTdGF0ZURhdGFcbn0gZnJvbSAnc3RvcmVzL2VudHJ5X3N0YXRlJztcblxuc2V0SW50ZXJ2YWwoKCkgPT4gZ2V0U3RhdHVzKGNyZWF0ZVN0YXR1c1VwZGF0ZWRBY3Rpb24pLCAxMDAwKTtcbmdldFNjaGVkdWxlKGNyZWF0ZVNjaGVkdWxlVXBkYXRlZEFjdGlvbik7XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgc2NoZWR1bGU6IGdldFNjaGVkdWxlRGF0YSgpLFxuICAgIHN0YXR1czogZ2V0U3RhdHVzRGF0YSgpLFxuICAgIGVudHJ5U3RhdGU6IGdldEVudHJ5U3RhdGVEYXRhKClcbiAgfTtcbiAgUmVhY3QucmVuZGVyKFxuICAgIDxBcHAgey4uLnByb3BzfSAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXG4gICk7XG59XG5cbnJlZ2lzdGVyU2NoZWR1bGVDYWxsYmFjayhyZW5kZXIpO1xucmVnaXN0ZXJTdGF0dXNDYWxsYmFjayhyZW5kZXIpO1xucmVnaXN0ZXJFbnRyeVN0YXRlQ2FsbGJhY2socmVuZGVyKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==