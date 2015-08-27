define(['exports', 'dispatcher', 'actions', 'api'], function (exports, _dispatcher, _actions, _api) {
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

  var schedule = {};
  var callbacks = [];

  function registerCallback(cb) {
    callbacks.push(cb);
  }

  function getData() {
    return schedule;
  }

  _dispatcher2['default'].register(function (payload) {
    function save() {
      callbacks.forEach(function (cb) {
        return cb();
      });
      (0, _api.saveSchedule)(schedule, function () {
        callbacks.forEach(function (cb) {
          return cb();
        });
      });
    }
    switch (payload.actionType) {
      case _actions2['default'].SCHEDULE_UPDATED:
        schedule = payload.schedule;
        break;
      case _actions2['default'].OVERRIDE_STATE_CHANGED:
        schedule.overrideState = payload.state;
        save();
        break;
      case _actions2['default'].CONFIRM_DELETE:
        schedule.schedule.splice(payload.entryId, 1);
        save();
        break;
      case _actions2['default'].MODE_CHANGED:
        schedule.mode = payload.mode;
        save();
        break;
      default:
        break;
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3Jlcy9zY2hlZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRWQsV0FBUyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsYUFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNwQjs7QUFFTSxXQUFTLE9BQU8sR0FBRztBQUN4QixXQUFPLFFBQVEsQ0FBQztHQUNqQjs7QUFFRCwwQkFBVyxRQUFRLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDL0IsYUFBUyxJQUFJLEdBQUc7QUFDZCxlQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBRTtlQUFLLEVBQUUsRUFBRTtPQUFBLENBQUMsQ0FBQztBQUNoQyxlQWhCSyxZQUFZLEVBZ0JKLFFBQVEsRUFBRSxZQUFNO0FBQzNCLGlCQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBRTtpQkFBSyxFQUFFLEVBQUU7U0FBQSxDQUFDLENBQUM7T0FDakMsQ0FBQyxDQUFDO0tBQ0o7QUFDRCxZQUFRLE9BQU8sQ0FBQyxVQUFVO0FBQ3hCLFdBQUsscUJBQVEsZ0JBQWdCO0FBQzNCLGdCQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUM1QixjQUFNO0FBQUEsQUFDUixXQUFLLHFCQUFRLHNCQUFzQjtBQUNqQyxnQkFBUSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3ZDLFlBQUksRUFBRSxDQUFDO0FBQ1AsY0FBTTtBQUFBLEFBQ1IsV0FBSyxxQkFBUSxjQUFjO0FBQ3pCLGdCQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdDLFlBQUksRUFBRSxDQUFDO0FBQ1AsY0FBTTtBQUFBLEFBQ1IsV0FBSyxxQkFBUSxZQUFZO0FBQ3ZCLGdCQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDN0IsWUFBSSxFQUFFLENBQUM7QUFDUCxjQUFNO0FBQUEsQUFDUjtBQUNFLGNBQU07QUFBQSxLQUNUO0dBQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6InN0b3Jlcy9zY2hlZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxMy0yMDE1ICBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuICBUaGlzIGZpbGUgaXMgcGFydCBvZiBBcXVhcml1bSBDb250cm9sLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gIGFsb25nIHdpdGggQXF1YXJpdW0gQ29udHJvbC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgZGlzcGF0Y2hlciBmcm9tICdkaXNwYXRjaGVyJztcbmltcG9ydCBhY3Rpb25zIGZyb20gJ2FjdGlvbnMnO1xuaW1wb3J0IHsgc2F2ZVNjaGVkdWxlIH0gZnJvbSAnYXBpJztcblxubGV0IHNjaGVkdWxlID0ge307XG5jb25zdCBjYWxsYmFja3MgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ2FsbGJhY2soY2IpIHtcbiAgY2FsbGJhY2tzLnB1c2goY2IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5kaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gIGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgY2FsbGJhY2tzLmZvckVhY2goKGNiKSA9PiBjYigpKTtcbiAgICBzYXZlU2NoZWR1bGUoc2NoZWR1bGUsICgpID0+IHtcbiAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKChjYikgPT4gY2IoKSk7XG4gICAgfSk7XG4gIH1cbiAgc3dpdGNoIChwYXlsb2FkLmFjdGlvblR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuU0NIRURVTEVfVVBEQVRFRDpcbiAgICAgIHNjaGVkdWxlID0gcGF5bG9hZC5zY2hlZHVsZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgYWN0aW9ucy5PVkVSUklERV9TVEFURV9DSEFOR0VEOlxuICAgICAgc2NoZWR1bGUub3ZlcnJpZGVTdGF0ZSA9IHBheWxvYWQuc3RhdGU7XG4gICAgICBzYXZlKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGFjdGlvbnMuQ09ORklSTV9ERUxFVEU6XG4gICAgICBzY2hlZHVsZS5zY2hlZHVsZS5zcGxpY2UocGF5bG9hZC5lbnRyeUlkLCAxKTtcbiAgICAgIHNhdmUoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgYWN0aW9ucy5NT0RFX0NIQU5HRUQ6XG4gICAgICBzY2hlZHVsZS5tb2RlID0gcGF5bG9hZC5tb2RlO1xuICAgICAgc2F2ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==