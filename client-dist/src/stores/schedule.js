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

  var schedule = {};
  var callbacks = [];

  function registerCallback(cb) {
    callbacks.push(cb);
  }

  function getData() {
    return schedule;
  }

  _dispatcher2['default'].register(function (payload) {
    switch (payload.actionType) {
      case _actions2['default'].SCHEDULE_UPDATED:
        schedule = payload.schedule;
        callbacks.forEach(function (cb) {
          return cb();
        });
        break;
      default:
        break;
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3Jlcy9zY2hlZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRWQsV0FBUyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsYUFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNwQjs7QUFFTSxXQUFTLE9BQU8sR0FBRztBQUN4QixXQUFPLFFBQVEsQ0FBQztHQUNqQjs7QUFFRCwwQkFBVyxRQUFRLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDL0IsWUFBUSxPQUFPLENBQUMsVUFBVTtBQUN4QixXQUFLLHFCQUFRLGdCQUFnQjtBQUMzQixnQkFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDNUIsaUJBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFO2lCQUFLLEVBQUUsRUFBRTtTQUFBLENBQUMsQ0FBQztBQUNoQyxjQUFNO0FBQUEsQUFDUjtBQUNFLGNBQU07QUFBQSxLQUNUO0dBQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6InN0b3Jlcy9zY2hlZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IGRpc3BhdGNoZXIgZnJvbSAnZGlzcGF0Y2hlcic7XG5pbXBvcnQgYWN0aW9ucyBmcm9tICdhY3Rpb25zJztcblxubGV0IHNjaGVkdWxlID0ge307XG5jb25zdCBjYWxsYmFja3MgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ2FsbGJhY2soY2IpIHtcbiAgY2FsbGJhY2tzLnB1c2goY2IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5kaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gIHN3aXRjaCAocGF5bG9hZC5hY3Rpb25UeXBlKSB7XG4gICAgY2FzZSBhY3Rpb25zLlNDSEVEVUxFX1VQREFURUQ6XG4gICAgICBzY2hlZHVsZSA9IHBheWxvYWQuc2NoZWR1bGU7XG4gICAgICBjYWxsYmFja3MuZm9yRWFjaCgoY2IpID0+IGNiKCkpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==