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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMvZW50cnlfc3RhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQk8sV0FBUyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUU7QUFDakQsNEJBQVcsUUFBUSxDQUFDO0FBQ2xCLGdCQUFVLEVBQUUscUJBQVEsY0FBYztBQUNsQyxhQUFPLEVBQVAsT0FBTztLQUNSLENBQUMsQ0FBQztHQUNKOztBQUVNLFdBQVMsMkJBQTJCLEdBQUc7QUFDNUMsNEJBQVcsUUFBUSxDQUFDO0FBQ2xCLGdCQUFVLEVBQUUscUJBQVEsY0FBYztLQUNuQyxDQUFDLENBQUM7R0FDSjs7QUFFTSxXQUFTLDJCQUEyQixHQUFHO0FBQzVDLDRCQUFXLFFBQVEsQ0FBQztBQUNsQixnQkFBVSxFQUFFLHFCQUFRLGFBQWE7S0FDbEMsQ0FBQyxDQUFDO0dBQ0o7O0FBRU0sV0FBUyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUU7QUFDL0MsNEJBQVcsUUFBUSxDQUFDO0FBQ2xCLGdCQUFVLEVBQUUscUJBQVEsWUFBWTtBQUNoQyxhQUFPLEVBQVAsT0FBTztLQUNSLENBQUMsQ0FBQztHQUNKOztBQUVNLFdBQVMscUJBQXFCLENBQUMsT0FBTyxFQUFFO0FBQzdDLDRCQUFXLFFBQVEsQ0FBQztBQUNsQixnQkFBVSxFQUFFLHFCQUFRLFNBQVM7QUFDN0IsYUFBTyxFQUFQLE9BQU87S0FDUixDQUFDLENBQUM7R0FDSjs7QUFFTSxXQUFTLHlCQUF5QixDQUFDLE9BQU8sRUFBRTtBQUNqRCw0QkFBVyxRQUFRLENBQUM7QUFDbEIsZ0JBQVUsRUFBRSxxQkFBUSxXQUFXO0FBQy9CLGFBQU8sRUFBUCxPQUFPO0tBQ1IsQ0FBQyxDQUFDO0dBQ0oiLCJmaWxlIjoiYWN0aW9ucy9lbnRyeV9zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxMy0yMDE1ICBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuICBUaGlzIGZpbGUgaXMgcGFydCBvZiBBcXVhcml1bSBDb250cm9sLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gIGFsb25nIHdpdGggQXF1YXJpdW0gQ29udHJvbC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgZGlzcGF0Y2hlciBmcm9tICdkaXNwYXRjaGVyJztcbmltcG9ydCBhY3Rpb25zIGZyb20gJ2FjdGlvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVxdWVzdERlbGV0ZUFjdGlvbihlbnRyeUlkKSB7XG4gIGRpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgIGFjdGlvblR5cGU6IGFjdGlvbnMuUkVRVUVTVF9ERUxFVEUsXG4gICAgZW50cnlJZFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURlbGV0ZUNvbmZpcm1lZEFjdGlvbigpIHtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgYWN0aW9uVHlwZTogYWN0aW9ucy5DT05GSVJNX0RFTEVURVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURlbGV0ZUNhbmNlbGxlZEFjdGlvbigpIHtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgYWN0aW9uVHlwZTogYWN0aW9ucy5DQU5DRUxfREVMRVRFXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVxdWVzdEVkaXRBY3Rpb24oZW50cnlJZCkge1xuICBkaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAgICBhY3Rpb25UeXBlOiBhY3Rpb25zLlJFUVVFU1RfRURJVCxcbiAgICBlbnRyeUlkXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWRpdFNhdmVkQWN0aW9uKGVudHJ5SWQpIHtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgYWN0aW9uVHlwZTogYWN0aW9ucy5TQVZFX0VESVQsXG4gICAgZW50cnlJZFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVkaXRDYW5jZWxsZWRBY3Rpb24oZW50cnlJZCkge1xuICBkaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAgICBhY3Rpb25UeXBlOiBhY3Rpb25zLkNBTkNFTF9FRElULFxuICAgIGVudHJ5SWRcbiAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=