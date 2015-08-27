define(['exports', 'module', 'actions/entry_state'], function (exports, module, _actionsEntry_state) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2RlbGV0ZV9lbnRyeV9jb25maXJtYXRpb24uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBcUJlLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMvQixnQkFBWSxFQUFBLHdCQUFHO0FBQ2IsOEJBSmtDLDJCQUEyQixHQUloQyxDQUFDO0tBQy9CO0FBQ0QsbUJBQWUsRUFBQSwyQkFBRztBQUNoQiw4QkFQSywyQkFBMkIsR0FPSCxDQUFDO0tBQy9CO0FBQ0QsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsYUFDRTs7VUFBSyxTQUFTLEVBQUMsU0FBUztRQUN0Qjs7WUFBSyxTQUFTLEVBQUMsaUJBQWlCO1VBQzlCOztjQUFJLFNBQVMsRUFBQyxjQUFjOztXQUFtQjtVQUMvQzs7Y0FBSyxTQUFTLEVBQUMsWUFBWTtZQUN6Qjs7Z0JBQUssU0FBUyxFQUFDLGdCQUFnQjtjQUM3Qjs7a0JBQVEsS0FBSyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxBQUFDLEVBQUMsU0FBUyxFQUFDLDZCQUE2QixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxBQUFDOztlQUFhO2NBQ3BIOztrQkFBUSxTQUFTLEVBQUMsOEJBQThCLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLEFBQUM7O2VBQWdCO2FBQzNGO1dBQ0Y7U0FDRjtPQUNGLENBQ047S0FDSDtHQUNGLENBQUMiLCJmaWxlIjoidmlld3MvZGVsZXRlX2VudHJ5X2NvbmZpcm1hdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxMy0yMDE1ICBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuICBUaGlzIGZpbGUgaXMgcGFydCBvZiBBcXVhcml1bSBDb250cm9sLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gIGFsb25nIHdpdGggQXF1YXJpdW0gQ29udHJvbC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVEZWxldGVDYW5jZWxsZWRBY3Rpb24sIGNyZWF0ZURlbGV0ZUNvbmZpcm1lZEFjdGlvbiB9IGZyb20gJ2FjdGlvbnMvZW50cnlfc3RhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG9uWWVzQ2xpY2tlZCgpIHtcbiAgICBjcmVhdGVEZWxldGVDb25maXJtZWRBY3Rpb24oKTtcbiAgfSxcbiAgb25DYW5jZWxDbGlja2VkKCkge1xuICAgIGNyZWF0ZURlbGV0ZUNhbmNlbGxlZEFjdGlvbigpO1xuICB9LFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdvdmVybGF5Jz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BvcHVwX2NvbnRhaW5lcic+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT0ncG9wdXBfaGVhZGVyJz5BcmUgeW91IHN1cmU/PC9oMj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncG9wdXBfYm9keSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZGlhbG9nX2J1dHRvbnMnPlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAyMCB9fSBjbGFzc05hbWU9J2J0biBidG4tZGFuZ2VyIHBvcHVwX2J1dHRvbicgb25DbGljaz17dGhpcy5vblllc0NsaWNrZWR9PlllczwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnRuIGJ0bi1kZWZhdWx0IHBvcHVwX2J1dHRvbicgb25DbGljaz17dGhpcy5vbkNhbmNlbENsaWNrZWR9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=