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
  exports.createRequestDeleteAction = createRequestDeleteAction;
  exports.createDeleteConfirmedAction = createDeleteConfirmedAction;
  exports.createDeleteCancelledAction = createDeleteCancelledAction;
  exports.createRequestEditAction = createRequestEditAction;
  exports.createEditSavedAction = createEditSavedAction;
  exports.createEditCancelledAction = createEditCancelledAction;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _dispatcher2 = _interopRequireDefault(_dispatcher);

  var _actions2 = _interopRequireDefault(_actions);

  function createRequestDeleteAction(entryId) {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].REQUEST_DELETE,
      entryId: entryId
    });
  }

  function createDeleteConfirmedAction() {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].CONFIRM_DELETE
    });
  }

  function createDeleteCancelledAction() {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].CANCEL_DELETE
    });
  }

  function createRequestEditAction(entryId) {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].REQUEST_EDIT,
      entryId: entryId
    });
  }

  function createEditSavedAction(entryId) {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].SAVE_EDIT,
      entryId: entryId
    });
  }

  function createEditCancelledAction(entryId) {
    _dispatcher2['default'].dispatch({
      actionType: _actions2['default'].CANCEL_EDIT,
      entryId: entryId
    });
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMvZW50cnlfc3RhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQk8sV0FBUyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUU7QUFDakQsNEJBQVcsUUFBUSxDQUFDO0FBQ2xCLGdCQUFVLEVBQUUscUJBQVEsY0FBYztBQUNsQyxhQUFPLEVBQVAsT0FBTztLQUNSLENBQUMsQ0FBQztHQUNKOztBQUVNLFdBQVMsMkJBQTJCLEdBQUc7QUFDNUMsNEJBQVcsUUFBUSxDQUFDO0FBQ2xCLGdCQUFVLEVBQUUscUJBQVEsY0FBYztLQUNuQyxDQUFDLENBQUM7R0FDSjs7QUFFTSxXQUFTLDJCQUEyQixHQUFHO0FBQzVDLDRCQUFXLFFBQVEsQ0FBQztBQUNsQixnQkFBVSxFQUFFLHFCQUFRLGFBQWE7S0FDbEMsQ0FBQyxDQUFDO0dBQ0o7O0FBRU0sV0FBUyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUU7QUFDL0MsNEJBQVcsUUFBUSxDQUFDO0FBQ2xCLGdCQUFVLEVBQUUscUJBQVEsWUFBWTtBQUNoQyxhQUFPLEVBQVAsT0FBTztLQUNSLENBQUMsQ0FBQztHQUNKOztBQUVNLFdBQVMscUJBQXFCLENBQUMsT0FBTyxFQUFFO0FBQzdDLDRCQUFXLFFBQVEsQ0FBQztBQUNsQixnQkFBVSxFQUFFLHFCQUFRLFNBQVM7QUFDN0IsYUFBTyxFQUFQLE9BQU87S0FDUixDQUFDLENBQUM7R0FDSjs7QUFFTSxXQUFTLHlCQUF5QixDQUFDLE9BQU8sRUFBRTtBQUNqRCw0QkFBVyxRQUFRLENBQUM7QUFDbEIsZ0JBQVUsRUFBRSxxQkFBUSxXQUFXO0FBQy9CLGFBQU8sRUFBUCxPQUFPO0tBQ1IsQ0FBQyxDQUFDO0dBQ0oiLCJmaWxlIjoiYWN0aW9ucy9lbnRyeV9zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IGRpc3BhdGNoZXIgZnJvbSAnZGlzcGF0Y2hlcic7XG5pbXBvcnQgYWN0aW9ucyBmcm9tICdhY3Rpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3REZWxldGVBY3Rpb24oZW50cnlJZCkge1xuICBkaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAgICBhY3Rpb25UeXBlOiBhY3Rpb25zLlJFUVVFU1RfREVMRVRFLFxuICAgIGVudHJ5SWRcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEZWxldGVDb25maXJtZWRBY3Rpb24oKSB7XG4gIGRpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgIGFjdGlvblR5cGU6IGFjdGlvbnMuQ09ORklSTV9ERUxFVEVcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEZWxldGVDYW5jZWxsZWRBY3Rpb24oKSB7XG4gIGRpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgIGFjdGlvblR5cGU6IGFjdGlvbnMuQ0FOQ0VMX0RFTEVURVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3RFZGl0QWN0aW9uKGVudHJ5SWQpIHtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgYWN0aW9uVHlwZTogYWN0aW9ucy5SRVFVRVNUX0VESVQsXG4gICAgZW50cnlJZFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVkaXRTYXZlZEFjdGlvbihlbnRyeUlkKSB7XG4gIGRpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgIGFjdGlvblR5cGU6IGFjdGlvbnMuU0FWRV9FRElULFxuICAgIGVudHJ5SWRcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFZGl0Q2FuY2VsbGVkQWN0aW9uKGVudHJ5SWQpIHtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgYWN0aW9uVHlwZTogYWN0aW9ucy5DQU5DRUxfRURJVCxcbiAgICBlbnRyeUlkXG4gIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9