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
  exports.registerCallback = registerCallback;
  exports.getData = getData;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _dispatcher2 = _interopRequireDefault(_dispatcher);

  var _actions2 = _interopRequireDefault(_actions);

  var callbacks = [];
  var state = {
    showingEdit: false,
    showingDeleteConfirm: false,
    editEntryId: -1
  };

  function registerCallback(cb) {
    callbacks.push(cb);
  }

  function getData() {
    return state;
  }

  _dispatcher2['default'].register(function (payload) {
    function trigger() {
      callbacks.forEach(function (cb) {
        return cb();
      });
    }
    switch (payload.actionType) {
      case _actions2['default'].REQUEST_EDIT:
        state.showingEdit = true;
        state.editEntryId = payload.entryId;
        trigger();
        break;
      case _actions2['default'].SAVE_EDIT:
        state.showingEdit = false;
        trigger();
        break;
      case _actions2['default'].CANCEL_EDIT:
        state.showingEdit = false;
        trigger();
        break;
      case _actions2['default'].REQUEST_DELETE:
        state.showingDeleteConfirm = true;
        trigger();
        break;
      case _actions2['default'].CONFIRM_DELETE:
        state.showingDeleteConfirm = false;
        trigger();
        break;
      case _actions2['default'].CANCEL_DELETE:
        state.showingDeleteConfirm = false;
        trigger();
        break;
      default:
        break;
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3Jlcy9lbnRyeV9zdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLEtBQUssR0FBRztBQUNaLGVBQVcsRUFBRSxLQUFLO0FBQ2xCLHdCQUFvQixFQUFFLEtBQUs7QUFDM0IsZUFBVyxFQUFFLENBQUMsQ0FBQztHQUNoQixDQUFDOztBQUVLLFdBQVMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFO0FBQ25DLGFBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7R0FDcEI7O0FBRU0sV0FBUyxPQUFPLEdBQUc7QUFDeEIsV0FBTyxLQUFLLENBQUM7R0FDZDs7QUFFRCwwQkFBVyxRQUFRLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDL0IsYUFBUyxPQUFPLEdBQUc7QUFDakIsZUFBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQUU7ZUFBSyxFQUFFLEVBQUU7T0FBQSxDQUFDLENBQUM7S0FDakM7QUFDRCxZQUFRLE9BQU8sQ0FBQyxVQUFVO0FBQ3hCLFdBQUsscUJBQVEsWUFBWTtBQUN2QixhQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUN6QixhQUFLLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDcEMsZUFBTyxFQUFFLENBQUM7QUFDVixjQUFNO0FBQUEsQUFDUixXQUFLLHFCQUFRLFNBQVM7QUFDcEIsYUFBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDMUIsZUFBTyxFQUFFLENBQUM7QUFDVixjQUFNO0FBQUEsQUFDUixXQUFLLHFCQUFRLFdBQVc7QUFDdEIsYUFBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDMUIsZUFBTyxFQUFFLENBQUM7QUFDVixjQUFNO0FBQUEsQUFDUixXQUFLLHFCQUFRLGNBQWM7QUFDekIsYUFBSyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztBQUNsQyxlQUFPLEVBQUUsQ0FBQztBQUNWLGNBQU07QUFBQSxBQUNSLFdBQUsscUJBQVEsY0FBYztBQUN6QixhQUFLLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0FBQ25DLGVBQU8sRUFBRSxDQUFDO0FBQ1YsY0FBTTtBQUFBLEFBQ1IsV0FBSyxxQkFBUSxhQUFhO0FBQ3hCLGFBQUssQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7QUFDbkMsZUFBTyxFQUFFLENBQUM7QUFDVixjQUFNO0FBQUEsQUFDUjtBQUNFLGNBQU07QUFBQSxLQUNUO0dBQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6InN0b3Jlcy9lbnRyeV9zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxMy0yMDE1ICBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuICBUaGlzIGZpbGUgaXMgcGFydCBvZiBBcXVhcml1bSBDb250cm9sLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gIGFsb25nIHdpdGggQXF1YXJpdW0gQ29udHJvbC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgZGlzcGF0Y2hlciBmcm9tICdkaXNwYXRjaGVyJztcbmltcG9ydCBhY3Rpb25zIGZyb20gJ2FjdGlvbnMnO1xuXG5jb25zdCBjYWxsYmFja3MgPSBbXTtcbmNvbnN0IHN0YXRlID0ge1xuICBzaG93aW5nRWRpdDogZmFsc2UsXG4gIHNob3dpbmdEZWxldGVDb25maXJtOiBmYWxzZSxcbiAgZWRpdEVudHJ5SWQ6IC0xXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDYWxsYmFjayhjYikge1xuICBjYWxsYmFja3MucHVzaChjYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhKCkge1xuICByZXR1cm4gc3RhdGU7XG59XG5cbmRpc3BhdGNoZXIucmVnaXN0ZXIoKHBheWxvYWQpID0+IHtcbiAgZnVuY3Rpb24gdHJpZ2dlcigpIHtcbiAgICBjYWxsYmFja3MuZm9yRWFjaCgoY2IpID0+IGNiKCkpO1xuICB9XG4gIHN3aXRjaCAocGF5bG9hZC5hY3Rpb25UeXBlKSB7XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfRURJVDpcbiAgICAgIHN0YXRlLnNob3dpbmdFZGl0ID0gdHJ1ZTtcbiAgICAgIHN0YXRlLmVkaXRFbnRyeUlkID0gcGF5bG9hZC5lbnRyeUlkO1xuICAgICAgdHJpZ2dlcigpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBhY3Rpb25zLlNBVkVfRURJVDpcbiAgICAgIHN0YXRlLnNob3dpbmdFZGl0ID0gZmFsc2U7XG4gICAgICB0cmlnZ2VyKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGFjdGlvbnMuQ0FOQ0VMX0VESVQ6XG4gICAgICBzdGF0ZS5zaG93aW5nRWRpdCA9IGZhbHNlO1xuICAgICAgdHJpZ2dlcigpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfREVMRVRFOlxuICAgICAgc3RhdGUuc2hvd2luZ0RlbGV0ZUNvbmZpcm0gPSB0cnVlO1xuICAgICAgdHJpZ2dlcigpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBhY3Rpb25zLkNPTkZJUk1fREVMRVRFOlxuICAgICAgc3RhdGUuc2hvd2luZ0RlbGV0ZUNvbmZpcm0gPSBmYWxzZTtcbiAgICAgIHRyaWdnZXIoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgYWN0aW9ucy5DQU5DRUxfREVMRVRFOlxuICAgICAgc3RhdGUuc2hvd2luZ0RlbGV0ZUNvbmZpcm0gPSBmYWxzZTtcbiAgICAgIHRyaWdnZXIoKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=