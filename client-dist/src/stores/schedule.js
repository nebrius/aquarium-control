define(['exports', 'dispatcher', 'actions', 'api'], function (exports, _dispatcher, _actions, _api) {
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
      default:
        break;
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3Jlcy9zY2hlZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRWQsV0FBUyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsYUFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNwQjs7QUFFTSxXQUFTLE9BQU8sR0FBRztBQUN4QixXQUFPLFFBQVEsQ0FBQztHQUNqQjs7QUFFRCwwQkFBVyxRQUFRLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDL0IsYUFBUyxJQUFJLEdBQUc7QUFDZCxlQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBRTtlQUFLLEVBQUUsRUFBRTtPQUFBLENBQUMsQ0FBQztBQUNoQyxlQWhCSyxZQUFZLEVBZ0JKLFFBQVEsRUFBRSxZQUFNO0FBQzNCLGlCQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBRTtpQkFBSyxFQUFFLEVBQUU7U0FBQSxDQUFDLENBQUM7T0FDakMsQ0FBQyxDQUFDO0tBQ0o7QUFDRCxZQUFRLE9BQU8sQ0FBQyxVQUFVO0FBQ3hCLFdBQUsscUJBQVEsZ0JBQWdCO0FBQzNCLGdCQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUM1QixjQUFNO0FBQUEsQUFDUixXQUFLLHFCQUFRLHNCQUFzQjtBQUNqQyxnQkFBUSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3ZDLFlBQUksRUFBRSxDQUFDO0FBQ1AsY0FBTTtBQUFBLEFBQ1I7QUFDRSxjQUFNO0FBQUEsS0FDVDtHQUNGLENBQUMsQ0FBQyIsImZpbGUiOiJzdG9yZXMvc2NoZWR1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBkaXNwYXRjaGVyIGZyb20gJ2Rpc3BhdGNoZXInO1xuaW1wb3J0IGFjdGlvbnMgZnJvbSAnYWN0aW9ucyc7XG5pbXBvcnQgeyBzYXZlU2NoZWR1bGUgfSBmcm9tICdhcGknO1xuXG5sZXQgc2NoZWR1bGUgPSB7fTtcbmNvbnN0IGNhbGxiYWNrcyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDYWxsYmFjayhjYikge1xuICBjYWxsYmFja3MucHVzaChjYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhKCkge1xuICByZXR1cm4gc2NoZWR1bGU7XG59XG5cbmRpc3BhdGNoZXIucmVnaXN0ZXIoKHBheWxvYWQpID0+IHtcbiAgZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICBjYWxsYmFja3MuZm9yRWFjaCgoY2IpID0+IGNiKCkpO1xuICAgIHNhdmVTY2hlZHVsZShzY2hlZHVsZSwgKCkgPT4ge1xuICAgICAgY2FsbGJhY2tzLmZvckVhY2goKGNiKSA9PiBjYigpKTtcbiAgICB9KTtcbiAgfVxuICBzd2l0Y2ggKHBheWxvYWQuYWN0aW9uVHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5TQ0hFRFVMRV9VUERBVEVEOlxuICAgICAgc2NoZWR1bGUgPSBwYXlsb2FkLnNjaGVkdWxlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBhY3Rpb25zLk9WRVJSSURFX1NUQVRFX0NIQU5HRUQ6XG4gICAgICBzY2hlZHVsZS5vdmVycmlkZVN0YXRlID0gcGF5bG9hZC5zdGF0ZTtcbiAgICAgIHNhdmUoKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=