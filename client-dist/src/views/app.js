define(['exports', 'module', 'views/override', 'views/program', 'views/status'], function (exports, module, _viewsOverride, _viewsProgram, _viewsStatus) {
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
              'Status'
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
              'Configuration'
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
                { type: 'button', className: classname(classNames, { active: mode == 'program' }) },
                'Program'
              ),
              React.createElement(
                'button',
                { type: 'button', className: classname(classNames, { active: mode == 'override' }) },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQXVCZSxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDL0IsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ3RDLFVBQU0sUUFBUSxHQUFHLElBQUksSUFBSSxTQUFTLDZDQUFxQixDQUFDO0FBQ3hELFVBQU0sVUFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDakYsYUFDRTs7O1FBQ0U7O1lBQUssU0FBUyxFQUFDLFlBQVk7VUFDekI7Ozs7V0FBeUI7U0FDckI7UUFDTjs7WUFBSyxTQUFTLEVBQUMsaUNBQWlDO1VBQzlDOztjQUFLLFNBQVMsRUFBQyxlQUFlO1lBQzVCOztnQkFBSyxTQUFTLEVBQUMsYUFBYTs7YUFBYTtXQUNyQztVQUNOOztjQUFLLFNBQVMsRUFBQyxZQUFZO1lBQ3pCLHdDQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFJO1dBQzdCO1NBQ0Y7UUFDTjs7WUFBSyxTQUFTLEVBQUMsaUNBQWlDO1VBQzlDOztjQUFLLFNBQVMsRUFBQyxlQUFlO1lBQzVCOztnQkFBSyxTQUFTLEVBQUMsYUFBYTs7YUFBb0I7V0FDNUM7VUFDTjs7Y0FBSyxTQUFTLEVBQUMsWUFBWTtZQUN6Qjs7Z0JBQUssU0FBUyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsT0FBTztjQUNyQzs7a0JBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLElBQUksU0FBUyxFQUFFLENBQUMsQUFBQzs7ZUFFN0U7Y0FDVDs7a0JBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLElBQUksVUFBVSxFQUFFLENBQUMsQUFBQzs7ZUFFOUU7YUFDTDtZQUNOLG9CQUFDLFFBQVEsRUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBSTtXQUNqQztTQUNGO09BQ0YsQ0FDTjtLQUNIO0dBQ0YsQ0FBQyIsImZpbGUiOiJ2aWV3cy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBPdmVycmlkZSBmcm9tICd2aWV3cy9vdmVycmlkZSc7XG5pbXBvcnQgUHJvZ3JhbSBmcm9tICd2aWV3cy9wcm9ncmFtJztcbmltcG9ydCBTdGF0dXMgZnJvbSAndmlld3Mvc3RhdHVzJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbW9kZSA9IHRoaXMucHJvcHMuc2NoZWR1bGUubW9kZTtcbiAgICBjb25zdCBDb25mVmlldyA9IG1vZGUgPT0gJ3Byb2dyYW0nID8gUHJvZ3JhbSA6IE92ZXJyaWRlO1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBbJ2J0bicsICdidG4tZGVmYXVsdCcsICdidG4tbGcnLCAnYWN0aXZlJywgJ2FwcF9tb2RlX2J1dHRvbiddO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXBwX2hlYWRlcic+XG4gICAgICAgICAgPGgyPkFxdWFyaXVtIENvbnRyb2w8L2gyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsIHBhbmVsLWRlZmF1bHQgYXBwX3NlY3Rpb24nPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1oZWFkaW5nJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC10aXRsZSc+U3RhdHVzPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWJvZHknPlxuICAgICAgICAgICAgPFN0YXR1cyB7Li4udGhpcy5wcm9wcy5zdGF0dXN9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwgcGFuZWwtZGVmYXVsdCBhcHBfc2VjdGlvbic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWhlYWRpbmcnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLXRpdGxlJz5Db25maWd1cmF0aW9uPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWJvZHknPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J0bi1ncm91cCcgcm9sZT0nZ3JvdXAnPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3NOYW1lPXtjbGFzc25hbWUoY2xhc3NOYW1lcywgeyBhY3RpdmU6IG1vZGUgPT0gJ3Byb2dyYW0nIH0pfT5cbiAgICAgICAgICAgICAgICBQcm9ncmFtXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3NOYW1lPXtjbGFzc25hbWUoY2xhc3NOYW1lcywgeyBhY3RpdmU6IG1vZGUgPT0gJ292ZXJyaWRlJyB9KX0+XG4gICAgICAgICAgICAgICAgT3ZlcnJpZGVcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxDb25mVmlldyB7Li4udGhpcy5wcm9wcy5zY2hlZHVsZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=