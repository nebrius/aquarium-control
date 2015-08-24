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
  exports.registerCallback = registerCallback;
  exports.getData = getData;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _dispatcher2 = _interopRequireDefault(_dispatcher);

  var _actions2 = _interopRequireDefault(_actions);

  var callbacks = [];
  var state = {
    showingEdit: false,
    showingDeleteConfirm: false
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
      case _actions2['default'].REQUEST_DELETE:
        state.showingEdit = true;
        trigger();
        break;
      case _actions2['default'].REQUEST_EDIT:
        state.showingDeleteConfirm = true;
        trigger();
        break;
      default:
        break;
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3Jlcy9lbnRyeV9zdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLEtBQUssR0FBRztBQUNaLGVBQVcsRUFBRSxLQUFLO0FBQ2xCLHdCQUFvQixFQUFFLEtBQUs7R0FDNUIsQ0FBQzs7QUFFSyxXQUFTLGdCQUFnQixDQUFDLEVBQUUsRUFBRTtBQUNuQyxhQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0dBQ3BCOztBQUVNLFdBQVMsT0FBTyxHQUFHO0FBQ3hCLFdBQU8sS0FBSyxDQUFDO0dBQ2Q7O0FBRUQsMEJBQVcsUUFBUSxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQy9CLGFBQVMsT0FBTyxHQUFHO0FBQ2pCLGVBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFO2VBQUssRUFBRSxFQUFFO09BQUEsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0QsWUFBUSxPQUFPLENBQUMsVUFBVTtBQUN4QixXQUFLLHFCQUFRLGNBQWM7QUFDekIsYUFBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDekIsZUFBTyxFQUFFLENBQUM7QUFDVixjQUFNO0FBQUEsQUFDUixXQUFLLHFCQUFRLFlBQVk7QUFDdkIsYUFBSyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztBQUNsQyxlQUFPLEVBQUUsQ0FBQztBQUNWLGNBQU07QUFBQSxBQUNSO0FBQ0UsY0FBTTtBQUFBLEtBQ1Q7R0FDRixDQUFDLENBQUMiLCJmaWxlIjoic3RvcmVzL2VudHJ5X3N0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IChDKSAyMDE1ICBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuICBUaGlzIGZpbGUgaXMgcGFydCBvZiBBcXVhcml1bSBDb250cm9sLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gIGFsb25nIHdpdGggQXF1YXJpdW0gQ29udHJvbC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgZGlzcGF0Y2hlciBmcm9tICdkaXNwYXRjaGVyJztcbmltcG9ydCBhY3Rpb25zIGZyb20gJ2FjdGlvbnMnO1xuXG5jb25zdCBjYWxsYmFja3MgPSBbXTtcbmNvbnN0IHN0YXRlID0ge1xuICBzaG93aW5nRWRpdDogZmFsc2UsXG4gIHNob3dpbmdEZWxldGVDb25maXJtOiBmYWxzZVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ2FsbGJhY2soY2IpIHtcbiAgY2FsbGJhY2tzLnB1c2goY2IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5kaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gIGZ1bmN0aW9uIHRyaWdnZXIoKSB7XG4gICAgY2FsbGJhY2tzLmZvckVhY2goKGNiKSA9PiBjYigpKTtcbiAgfVxuICBzd2l0Y2ggKHBheWxvYWQuYWN0aW9uVHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0RFTEVURTpcbiAgICAgIHN0YXRlLnNob3dpbmdFZGl0ID0gdHJ1ZTtcbiAgICAgIHRyaWdnZXIoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0VESVQ6XG4gICAgICBzdGF0ZS5zaG93aW5nRGVsZXRlQ29uZmlybSA9IHRydWU7XG4gICAgICB0cmlnZ2VyKCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9