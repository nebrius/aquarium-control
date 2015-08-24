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
      case _actions2['default'].CANCEL_DELETE:
        state.showingDeleteConfirm = false;
        trigger();
        break;
      case _actions2['default'].CONFIRM_DELETE:
        state.showingDeleteConfirm = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3Jlcy9lbnRyeV9zdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLEtBQUssR0FBRztBQUNaLGVBQVcsRUFBRSxLQUFLO0FBQ2xCLHdCQUFvQixFQUFFLEtBQUs7R0FDNUIsQ0FBQzs7QUFFSyxXQUFTLGdCQUFnQixDQUFDLEVBQUUsRUFBRTtBQUNuQyxhQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0dBQ3BCOztBQUVNLFdBQVMsT0FBTyxHQUFHO0FBQ3hCLFdBQU8sS0FBSyxDQUFDO0dBQ2Q7O0FBRUQsMEJBQVcsUUFBUSxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQy9CLGFBQVMsT0FBTyxHQUFHO0FBQ2pCLGVBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFO2VBQUssRUFBRSxFQUFFO09BQUEsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0QsWUFBUSxPQUFPLENBQUMsVUFBVTtBQUN4QixXQUFLLHFCQUFRLGNBQWM7QUFDekIsYUFBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDekIsZUFBTyxFQUFFLENBQUM7QUFDVixjQUFNO0FBQUEsQUFDUixXQUFLLHFCQUFRLGFBQWE7QUFDeEIsYUFBSyxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztBQUNuQyxlQUFPLEVBQUUsQ0FBQztBQUNWLGNBQU07QUFBQSxBQUNSLFdBQUsscUJBQVEsY0FBYztBQUN6QixhQUFLLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0FBQ25DLGVBQU8sRUFBRSxDQUFDO0FBQ1YsY0FBTTtBQUFBLEFBQ1IsV0FBSyxxQkFBUSxZQUFZO0FBQ3ZCLGFBQUssQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7QUFDbEMsZUFBTyxFQUFFLENBQUM7QUFDVixjQUFNO0FBQUEsQUFDUjtBQUNFLGNBQU07QUFBQSxLQUNUO0dBQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6InN0b3Jlcy9lbnRyeV9zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IGRpc3BhdGNoZXIgZnJvbSAnZGlzcGF0Y2hlcic7XG5pbXBvcnQgYWN0aW9ucyBmcm9tICdhY3Rpb25zJztcblxuY29uc3QgY2FsbGJhY2tzID0gW107XG5jb25zdCBzdGF0ZSA9IHtcbiAgc2hvd2luZ0VkaXQ6IGZhbHNlLFxuICBzaG93aW5nRGVsZXRlQ29uZmlybTogZmFsc2Vcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNhbGxiYWNrKGNiKSB7XG4gIGNhbGxiYWNrcy5wdXNoKGNiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuZGlzcGF0Y2hlci5yZWdpc3RlcigocGF5bG9hZCkgPT4ge1xuICBmdW5jdGlvbiB0cmlnZ2VyKCkge1xuICAgIGNhbGxiYWNrcy5mb3JFYWNoKChjYikgPT4gY2IoKSk7XG4gIH1cbiAgc3dpdGNoIChwYXlsb2FkLmFjdGlvblR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9ERUxFVEU6XG4gICAgICBzdGF0ZS5zaG93aW5nRWRpdCA9IHRydWU7XG4gICAgICB0cmlnZ2VyKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGFjdGlvbnMuQ0FOQ0VMX0RFTEVURTpcbiAgICAgIHN0YXRlLnNob3dpbmdEZWxldGVDb25maXJtID0gZmFsc2U7XG4gICAgICB0cmlnZ2VyKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGFjdGlvbnMuQ09ORklSTV9ERUxFVEU6XG4gICAgICBzdGF0ZS5zaG93aW5nRGVsZXRlQ29uZmlybSA9IGZhbHNlO1xuICAgICAgdHJpZ2dlcigpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfRURJVDpcbiAgICAgIHN0YXRlLnNob3dpbmdEZWxldGVDb25maXJtID0gdHJ1ZTtcbiAgICAgIHRyaWdnZXIoKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=