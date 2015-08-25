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
            'div',
            { className: 'popup_body' },
            React.createElement(
              'div',
              { className: 'dialog_buttons' },
              React.createElement(
                'button',
                { style: { marginRight: 20 }, className: 'btn btn-danger popup_button', onClick: this.onYesClicked },
                'Yes'
              ),
              React.createElement(
                'button',
                { className: 'btn btn-default popup_button', onClick: this.onCancelClicked },
                'Cancel'
              )
            )
          )
        )
      );
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2RlbGV0ZV9lbnRyeV9jb25maXJtYXRpb24uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBcUJlLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMvQixnQkFBWSxFQUFBLHdCQUFHO0FBQ2IsOEJBSmtDLDJCQUEyQixHQUloQyxDQUFDO0tBQy9CO0FBQ0QsbUJBQWUsRUFBQSwyQkFBRztBQUNoQiw4QkFQSywyQkFBMkIsR0FPSCxDQUFDO0tBQy9CO0FBQ0QsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsYUFDRTs7VUFBSyxTQUFTLEVBQUMsU0FBUztRQUN0Qjs7WUFBSyxTQUFTLEVBQUMsaUJBQWlCO1VBQzlCOztjQUFJLFNBQVMsRUFBQyxjQUFjOztXQUFtQjtVQUMvQzs7Y0FBSyxTQUFTLEVBQUMsWUFBWTtZQUN6Qjs7Z0JBQUssU0FBUyxFQUFDLGdCQUFnQjtjQUM3Qjs7a0JBQVEsS0FBSyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxBQUFDLEVBQUMsU0FBUyxFQUFDLDZCQUE2QixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxBQUFDOztlQUFhO2NBQ3BIOztrQkFBUSxTQUFTLEVBQUMsOEJBQThCLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLEFBQUM7O2VBQWdCO2FBQzNGO1dBQ0Y7U0FDRjtPQUNGLENBQ047S0FDSDtHQUNGLENBQUMiLCJmaWxlIjoidmlld3MvZGVsZXRlX2VudHJ5X2NvbmZpcm1hdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlRGVsZXRlQ2FuY2VsbGVkQWN0aW9uLCBjcmVhdGVEZWxldGVDb25maXJtZWRBY3Rpb24gfSBmcm9tICdhY3Rpb25zL2VudHJ5X3N0YXRlJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBvblllc0NsaWNrZWQoKSB7XG4gICAgY3JlYXRlRGVsZXRlQ29uZmlybWVkQWN0aW9uKCk7XG4gIH0sXG4gIG9uQ2FuY2VsQ2xpY2tlZCgpIHtcbiAgICBjcmVhdGVEZWxldGVDYW5jZWxsZWRBY3Rpb24oKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nb3ZlcmxheSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwb3B1cF9jb250YWluZXInPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9J3BvcHVwX2hlYWRlcic+QXJlIHlvdSBzdXJlPzwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BvcHVwX2JvZHknPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2RpYWxvZ19idXR0b25zJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyBtYXJnaW5SaWdodDogMjAgfX0gY2xhc3NOYW1lPSdidG4gYnRuLWRhbmdlciBwb3B1cF9idXR0b24nIG9uQ2xpY2s9e3RoaXMub25ZZXNDbGlja2VkfT5ZZXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J0biBidG4tZGVmYXVsdCBwb3B1cF9idXR0b24nIG9uQ2xpY2s9e3RoaXMub25DYW5jZWxDbGlja2VkfT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9