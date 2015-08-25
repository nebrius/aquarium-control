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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3Jlcy9lbnRyeV9zdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLEtBQUssR0FBRztBQUNaLGVBQVcsRUFBRSxLQUFLO0FBQ2xCLHdCQUFvQixFQUFFLEtBQUs7QUFDM0IsZUFBVyxFQUFFLENBQUMsQ0FBQztHQUNoQixDQUFDOztBQUVLLFdBQVMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFO0FBQ25DLGFBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7R0FDcEI7O0FBRU0sV0FBUyxPQUFPLEdBQUc7QUFDeEIsV0FBTyxLQUFLLENBQUM7R0FDZDs7QUFFRCwwQkFBVyxRQUFRLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDL0IsYUFBUyxPQUFPLEdBQUc7QUFDakIsZUFBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQUU7ZUFBSyxFQUFFLEVBQUU7T0FBQSxDQUFDLENBQUM7S0FDakM7QUFDRCxZQUFRLE9BQU8sQ0FBQyxVQUFVO0FBQ3hCLFdBQUsscUJBQVEsWUFBWTtBQUN2QixhQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUN6QixhQUFLLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDcEMsZUFBTyxFQUFFLENBQUM7QUFDVixjQUFNO0FBQUEsQUFDUixXQUFLLHFCQUFRLFNBQVM7QUFDcEIsYUFBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDMUIsZUFBTyxFQUFFLENBQUM7QUFDVixjQUFNO0FBQUEsQUFDUixXQUFLLHFCQUFRLFdBQVc7QUFDdEIsYUFBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDMUIsZUFBTyxFQUFFLENBQUM7QUFDVixjQUFNO0FBQUEsQUFDUixXQUFLLHFCQUFRLGNBQWM7QUFDekIsYUFBSyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztBQUNsQyxlQUFPLEVBQUUsQ0FBQztBQUNWLGNBQU07QUFBQSxBQUNSLFdBQUsscUJBQVEsY0FBYztBQUN6QixhQUFLLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0FBQ25DLGVBQU8sRUFBRSxDQUFDO0FBQ1YsY0FBTTtBQUFBLEFBQ1IsV0FBSyxxQkFBUSxhQUFhO0FBQ3hCLGFBQUssQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7QUFDbkMsZUFBTyxFQUFFLENBQUM7QUFDVixjQUFNO0FBQUEsQUFDUjtBQUNFLGNBQU07QUFBQSxLQUNUO0dBQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6InN0b3Jlcy9lbnRyeV9zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IGRpc3BhdGNoZXIgZnJvbSAnZGlzcGF0Y2hlcic7XG5pbXBvcnQgYWN0aW9ucyBmcm9tICdhY3Rpb25zJztcblxuY29uc3QgY2FsbGJhY2tzID0gW107XG5jb25zdCBzdGF0ZSA9IHtcbiAgc2hvd2luZ0VkaXQ6IGZhbHNlLFxuICBzaG93aW5nRGVsZXRlQ29uZmlybTogZmFsc2UsXG4gIGVkaXRFbnRyeUlkOiAtMVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ2FsbGJhY2soY2IpIHtcbiAgY2FsbGJhY2tzLnB1c2goY2IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5kaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gIGZ1bmN0aW9uIHRyaWdnZXIoKSB7XG4gICAgY2FsbGJhY2tzLmZvckVhY2goKGNiKSA9PiBjYigpKTtcbiAgfVxuICBzd2l0Y2ggKHBheWxvYWQuYWN0aW9uVHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0VESVQ6XG4gICAgICBzdGF0ZS5zaG93aW5nRWRpdCA9IHRydWU7XG4gICAgICBzdGF0ZS5lZGl0RW50cnlJZCA9IHBheWxvYWQuZW50cnlJZDtcbiAgICAgIHRyaWdnZXIoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgYWN0aW9ucy5TQVZFX0VESVQ6XG4gICAgICBzdGF0ZS5zaG93aW5nRWRpdCA9IGZhbHNlO1xuICAgICAgdHJpZ2dlcigpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBhY3Rpb25zLkNBTkNFTF9FRElUOlxuICAgICAgc3RhdGUuc2hvd2luZ0VkaXQgPSBmYWxzZTtcbiAgICAgIHRyaWdnZXIoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0RFTEVURTpcbiAgICAgIHN0YXRlLnNob3dpbmdEZWxldGVDb25maXJtID0gdHJ1ZTtcbiAgICAgIHRyaWdnZXIoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgYWN0aW9ucy5DT05GSVJNX0RFTEVURTpcbiAgICAgIHN0YXRlLnNob3dpbmdEZWxldGVDb25maXJtID0gZmFsc2U7XG4gICAgICB0cmlnZ2VyKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGFjdGlvbnMuQ0FOQ0VMX0RFTEVURTpcbiAgICAgIHN0YXRlLnNob3dpbmdEZWxldGVDb25maXJtID0gZmFsc2U7XG4gICAgICB0cmlnZ2VyKCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9