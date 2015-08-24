define(['exports', 'module', 'views/override', 'views/program', 'views/status', 'actions/schedule'], function (exports, module, _viewsOverride, _viewsProgram, _viewsStatus, _actionsSchedule) {
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

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Override = _interopRequireDefault(_viewsOverride);

  var _Program = _interopRequireDefault(_viewsProgram);

  var _Status = _interopRequireDefault(_viewsStatus);

  module.exports = React.createClass({
    displayName: 'app',

    onModeClicked: function onModeClicked(e) {
      var mode = e.target.innerText.toLowerCase();
      if (mode != this.props.schedule.mode) {
        (0, _actionsSchedule.createModeChangedAction)(mode);
      }
    },
    render: function render() {
      var mode = this.props.schedule.mode;
      var ConfView = mode == 'program' ? _Program['default'] : _Override['default'];
      var classNames = ['btn', 'btn-default', 'btn-lg', 'active', 'app_mode_button'];
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'app_header' },
          React.createElement(
            'h2',
            null,
            'Aquarium Control'
          )
        ),
        React.createElement(
          'div',
          { className: 'panel panel-default app_section' },
          React.createElement(
            'div',
            { className: 'panel-heading' },
            React.createElement(
              'div',
              { className: 'panel-title' },
              React.createElement(
                'h3',
                null,
                'Status'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'panel-body' },
            React.createElement(_Status['default'], this.props.status)
          )
        ),
        React.createElement(
          'div',
          { className: 'panel panel-default app_section' },
          React.createElement(
            'div',
            { className: 'panel-heading' },
            React.createElement(
              'div',
              { className: 'panel-title' },
              React.createElement(
                'h3',
                null,
                'Configuration'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'panel-body' },
            React.createElement(
              'div',
              { className: 'btn-group', role: 'group' },
              React.createElement(
                'button',
                {
                  type: 'button',
                  className: classname(classNames, { active: mode == 'program' }),
                  onClick: this.onModeClicked },
                'Program'
              ),
              React.createElement(
                'button',
                {
                  type: 'button',
                  className: classname(classNames, { active: mode == 'override' }),
                  onClick: this.onModeClicked },
                'Override'
              )
            ),
            React.createElement(ConfView, this.props.schedule)
          )
        )
      );
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQXdCZSxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDL0IsaUJBQWEsRUFBQSx1QkFBQyxDQUFDLEVBQUU7QUFDZixVQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM5QyxVQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDcEMsNkJBTkcsdUJBQXVCLEVBTUYsSUFBSSxDQUFDLENBQUM7T0FDL0I7S0FDRjtBQUNELFVBQU0sRUFBQSxrQkFBRztBQUNQLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztBQUN0QyxVQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksU0FBUyw2Q0FBcUIsQ0FBQztBQUN4RCxVQUFNLFVBQVUsR0FBRyxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2pGLGFBQ0U7OztRQUNFOztZQUFLLFNBQVMsRUFBQyxZQUFZO1VBQ3pCOzs7O1dBQXlCO1NBQ3JCO1FBQ047O1lBQUssU0FBUyxFQUFDLGlDQUFpQztVQUM5Qzs7Y0FBSyxTQUFTLEVBQUMsZUFBZTtZQUM1Qjs7Z0JBQUssU0FBUyxFQUFDLGFBQWE7Y0FBQzs7OztlQUFlO2FBQU07V0FDOUM7VUFDTjs7Y0FBSyxTQUFTLEVBQUMsWUFBWTtZQUN6Qix3Q0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBSTtXQUM3QjtTQUNGO1FBQ047O1lBQUssU0FBUyxFQUFDLGlDQUFpQztVQUM5Qzs7Y0FBSyxTQUFTLEVBQUMsZUFBZTtZQUM1Qjs7Z0JBQUssU0FBUyxFQUFDLGFBQWE7Y0FBQzs7OztlQUFzQjthQUFNO1dBQ3JEO1VBQ047O2NBQUssU0FBUyxFQUFDLFlBQVk7WUFDekI7O2dCQUFLLFNBQVMsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLE9BQU87Y0FDckM7OztBQUNJLHNCQUFJLEVBQUMsUUFBUTtBQUNiLDJCQUFTLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLElBQUksU0FBUyxFQUFFLENBQUMsQUFBQztBQUNoRSx5QkFBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEFBQUM7O2VBRXZCO2NBQ1Q7OztBQUNJLHNCQUFJLEVBQUMsUUFBUTtBQUNiLDJCQUFTLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLElBQUksVUFBVSxFQUFFLENBQUMsQUFBQztBQUNqRSx5QkFBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEFBQUM7O2VBRXZCO2FBQ0w7WUFDTixvQkFBQyxRQUFRLEVBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUk7V0FDakM7U0FDRjtPQUNGLENBQ047S0FDSDtHQUNGLENBQUMiLCJmaWxlIjoidmlld3MvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IChDKSAyMDE1ICBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuICBUaGlzIGZpbGUgaXMgcGFydCBvZiBBcXVhcml1bSBDb250cm9sLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gIGFsb25nIHdpdGggQXF1YXJpdW0gQ29udHJvbC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgT3ZlcnJpZGUgZnJvbSAndmlld3Mvb3ZlcnJpZGUnO1xuaW1wb3J0IFByb2dyYW0gZnJvbSAndmlld3MvcHJvZ3JhbSc7XG5pbXBvcnQgU3RhdHVzIGZyb20gJ3ZpZXdzL3N0YXR1cyc7XG5pbXBvcnQgeyBjcmVhdGVNb2RlQ2hhbmdlZEFjdGlvbiB9IGZyb20gJ2FjdGlvbnMvc2NoZWR1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG9uTW9kZUNsaWNrZWQoZSkge1xuICAgIGNvbnN0IG1vZGUgPSBlLnRhcmdldC5pbm5lclRleHQudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobW9kZSAhPSB0aGlzLnByb3BzLnNjaGVkdWxlLm1vZGUpIHtcbiAgICAgIGNyZWF0ZU1vZGVDaGFuZ2VkQWN0aW9uKG1vZGUpO1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG1vZGUgPSB0aGlzLnByb3BzLnNjaGVkdWxlLm1vZGU7XG4gICAgY29uc3QgQ29uZlZpZXcgPSBtb2RlID09ICdwcm9ncmFtJyA/IFByb2dyYW0gOiBPdmVycmlkZTtcbiAgICBjb25zdCBjbGFzc05hbWVzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnLCAnYnRuLWxnJywgJ2FjdGl2ZScsICdhcHBfbW9kZV9idXR0b24nXTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2FwcF9oZWFkZXInPlxuICAgICAgICAgIDxoMj5BcXVhcml1bSBDb250cm9sPC9oMj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbCBwYW5lbC1kZWZhdWx0IGFwcF9zZWN0aW9uJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtaGVhZGluZyc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtdGl0bGUnPjxoMz5TdGF0dXM8L2gzPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1ib2R5Jz5cbiAgICAgICAgICAgIDxTdGF0dXMgey4uLnRoaXMucHJvcHMuc3RhdHVzfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsIHBhbmVsLWRlZmF1bHQgYXBwX3NlY3Rpb24nPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1oZWFkaW5nJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC10aXRsZSc+PGgzPkNvbmZpZ3VyYXRpb248L2gzPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1ib2R5Jz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdidG4tZ3JvdXAnIHJvbGU9J2dyb3VwJz5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWUoY2xhc3NOYW1lcywgeyBhY3RpdmU6IG1vZGUgPT0gJ3Byb2dyYW0nIH0pfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbk1vZGVDbGlja2VkfT5cbiAgICAgICAgICAgICAgICBQcm9ncmFtXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPSdidXR0b24nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZShjbGFzc05hbWVzLCB7IGFjdGl2ZTogbW9kZSA9PSAnb3ZlcnJpZGUnIH0pfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbk1vZGVDbGlja2VkfT5cbiAgICAgICAgICAgICAgICBPdmVycmlkZVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPENvbmZWaWV3IHsuLi50aGlzLnByb3BzLnNjaGVkdWxlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9