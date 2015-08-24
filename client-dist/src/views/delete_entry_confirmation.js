define(['exports', 'module', 'actions/entry_state'], function (exports, module, _actionsEntry_state) {
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

  module.exports = React.createClass({
    displayName: 'delete_entry_confirmation',

    onYesClicked: function onYesClicked() {
      (0, _actionsEntry_state.createDeleteConfirmedAction)();
    },
    onCancelClicked: function onCancelClicked() {
      (0, _actionsEntry_state.createDeleteCancelledAction)();
    },
    render: function render() {
      return React.createElement(
        'div',
        { className: 'overlay' },
        React.createElement(
          'div',
          { className: 'popup_container' },
          React.createElement(
            'h2',
            { className: 'popup_header' },
            'Are you sure?'
          ),
          React.createElement(
            'button',
            { className: 'btn btn-danger popup_button', onClick: this.onYesClicked },
            'Yes'
          ),
          React.createElement(
            'button',
            { className: 'btn btn-default popup_button', onClick: this.onCancelClicked },
            'Cancel'
          )
        )
      );
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2RlbGV0ZV9lbnRyeV9jb25maXJtYXRpb24uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBcUJlLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMvQixnQkFBWSxFQUFBLHdCQUFHO0FBQ2IsOEJBSmtDLDJCQUEyQixHQUloQyxDQUFDO0tBQy9CO0FBQ0QsbUJBQWUsRUFBQSwyQkFBRztBQUNoQiw4QkFQSywyQkFBMkIsR0FPSCxDQUFDO0tBQy9CO0FBQ0QsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsYUFDRTs7VUFBSyxTQUFTLEVBQUMsU0FBUztRQUN0Qjs7WUFBSyxTQUFTLEVBQUMsaUJBQWlCO1VBQzlCOztjQUFJLFNBQVMsRUFBQyxjQUFjOztXQUFtQjtVQUMvQzs7Y0FBUSxTQUFTLEVBQUMsNkJBQTZCLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLEFBQUM7O1dBQWE7VUFDeEY7O2NBQVEsU0FBUyxFQUFDLDhCQUE4QixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZSxBQUFDOztXQUFnQjtTQUMzRjtPQUNGLENBQ047S0FDSDtHQUNGLENBQUMiLCJmaWxlIjoidmlld3MvZGVsZXRlX2VudHJ5X2NvbmZpcm1hdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlRGVsZXRlQ2FuY2VsbGVkQWN0aW9uLCBjcmVhdGVEZWxldGVDb25maXJtZWRBY3Rpb24gfSBmcm9tICdhY3Rpb25zL2VudHJ5X3N0YXRlJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBvblllc0NsaWNrZWQoKSB7XG4gICAgY3JlYXRlRGVsZXRlQ29uZmlybWVkQWN0aW9uKCk7XG4gIH0sXG4gIG9uQ2FuY2VsQ2xpY2tlZCgpIHtcbiAgICBjcmVhdGVEZWxldGVDYW5jZWxsZWRBY3Rpb24oKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nb3ZlcmxheSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwb3B1cF9jb250YWluZXInPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9J3BvcHVwX2hlYWRlcic+QXJlIHlvdSBzdXJlPzwvaDI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J0biBidG4tZGFuZ2VyIHBvcHVwX2J1dHRvbicgb25DbGljaz17dGhpcy5vblllc0NsaWNrZWR9PlllczwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidG4gYnRuLWRlZmF1bHQgcG9wdXBfYnV0dG9uJyBvbkNsaWNrPXt0aGlzLm9uQ2FuY2VsQ2xpY2tlZH0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=