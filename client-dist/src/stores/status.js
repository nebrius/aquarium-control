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

  var status = {};
  var callbacks = [];

  function registerCallback(cb) {
    callbacks.push(cb);
  }

  function getData() {
    return status;
  }

  _dispatcher2['default'].register(function (payload) {
    switch (payload.actionType) {
      case _actions2['default'].STATUS_UPDATED:
        status = payload.status;
        callbacks.forEach(function (cb) {
          return cb();
        });
        break;
      default:
        break;
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3Jlcy9zdGF0dXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDOztBQUVkLFdBQVMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFO0FBQ25DLGFBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7R0FDcEI7O0FBRU0sV0FBUyxPQUFPLEdBQUc7QUFDeEIsV0FBTyxNQUFNLENBQUM7R0FDZjs7QUFFRCwwQkFBVyxRQUFRLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDL0IsWUFBUSxPQUFPLENBQUMsVUFBVTtBQUN4QixXQUFLLHFCQUFRLGNBQWM7QUFDekIsY0FBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDeEIsaUJBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFO2lCQUFLLEVBQUUsRUFBRTtTQUFBLENBQUMsQ0FBQztBQUNoQyxjQUFNO0FBQUEsQUFDUjtBQUNFLGNBQU07QUFBQSxLQUNUO0dBQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6InN0b3Jlcy9zdGF0dXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBkaXNwYXRjaGVyIGZyb20gJ2Rpc3BhdGNoZXInO1xuaW1wb3J0IGFjdGlvbnMgZnJvbSAnYWN0aW9ucyc7XG5cbmxldCBzdGF0dXMgPSB7fTtcbmNvbnN0IGNhbGxiYWNrcyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDYWxsYmFjayhjYikge1xuICBjYWxsYmFja3MucHVzaChjYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhKCkge1xuICByZXR1cm4gc3RhdHVzO1xufVxuXG5kaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gIHN3aXRjaCAocGF5bG9hZC5hY3Rpb25UeXBlKSB7XG4gICAgY2FzZSBhY3Rpb25zLlNUQVRVU19VUERBVEVEOlxuICAgICAgc3RhdHVzID0gcGF5bG9hZC5zdGF0dXM7XG4gICAgICBjYWxsYmFja3MuZm9yRWFjaCgoY2IpID0+IGNiKCkpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=