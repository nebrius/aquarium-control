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
                { type: 'button',
                  className: classname('btn', 'btn-default', 'btn-lg', this.props.schedule.mode == 'program' ? 'active' : undefined) },
                'Program'
              ),
              React.createElement(
                'button',
                { type: 'button',
                  className: classname('btn', 'btn-default', 'btn-lg', this.props.schedule.mode == 'override' ? 'active' : undefined) },
                'Override'
              )
            )
          )
        )
      );
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQXVCZSxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDL0IsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsYUFDRTs7O1FBQ0U7O1lBQUssU0FBUyxFQUFDLFlBQVk7VUFDekI7Ozs7V0FBeUI7U0FDckI7UUFDTjs7WUFBSyxTQUFTLEVBQUMsaUNBQWlDO1VBQzlDOztjQUFLLFNBQVMsRUFBQyxlQUFlO1lBQzVCOztnQkFBSyxTQUFTLEVBQUMsYUFBYTs7YUFBYTtXQUNyQztVQUNOOztjQUFLLFNBQVMsRUFBQyxZQUFZO1lBQ3pCLHdDQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFJO1dBQzdCO1NBQ0Y7UUFDTjs7WUFBSyxTQUFTLEVBQUMsaUNBQWlDO1VBQzlDOztjQUFLLFNBQVMsRUFBQyxlQUFlO1lBQzVCOztnQkFBSyxTQUFTLEVBQUMsYUFBYTs7YUFBb0I7V0FDNUM7VUFDTjs7Y0FBSyxTQUFTLEVBQUMsWUFBWTtZQUN6Qjs7Z0JBQUssU0FBUyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsT0FBTztjQUNyQzs7a0JBQVEsSUFBSSxFQUFDLFFBQVE7QUFDYiwyQkFBUyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksU0FBUyxHQUFHLFFBQVEsR0FBRyxTQUFTLENBQUMsQUFBQzs7ZUFDekc7Y0FDbEI7O2tCQUFRLElBQUksRUFBQyxRQUFRO0FBQ2IsMkJBQVMsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFVBQVUsR0FBRyxRQUFRLEdBQUcsU0FBUyxDQUFDLEFBQUM7O2VBQ3pHO2FBQ2Y7V0FDRjtTQUNGO09BQ0YsQ0FDTjtLQUNIO0dBQ0YsQ0FBQyIsImZpbGUiOiJ2aWV3cy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBPdmVycmlkZSBmcm9tICd2aWV3cy9vdmVycmlkZSc7XG5pbXBvcnQgUHJvZ3JhbSBmcm9tICd2aWV3cy9wcm9ncmFtJztcbmltcG9ydCBTdGF0dXMgZnJvbSAndmlld3Mvc3RhdHVzJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhcHBfaGVhZGVyJz5cbiAgICAgICAgICA8aDI+QXF1YXJpdW0gQ29udHJvbDwvaDI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwgcGFuZWwtZGVmYXVsdCBhcHBfc2VjdGlvbic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWhlYWRpbmcnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLXRpdGxlJz5TdGF0dXM8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtYm9keSc+XG4gICAgICAgICAgICA8U3RhdHVzIHsuLi50aGlzLnByb3BzLnN0YXR1c30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbCBwYW5lbC1kZWZhdWx0IGFwcF9zZWN0aW9uJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtaGVhZGluZyc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtdGl0bGUnPkNvbmZpZ3VyYXRpb248L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtYm9keSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnRuLWdyb3VwJyByb2xlPSdncm91cCc+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lKCdidG4nLCAnYnRuLWRlZmF1bHQnLCAnYnRuLWxnJywgdGhpcy5wcm9wcy5zY2hlZHVsZS5tb2RlID09ICdwcm9ncmFtJyA/ICdhY3RpdmUnIDogdW5kZWZpbmVkKX0+XG4gICAgICAgICAgICAgICAgUHJvZ3JhbTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZSgnYnRuJywgJ2J0bi1kZWZhdWx0JywgJ2J0bi1sZycsIHRoaXMucHJvcHMuc2NoZWR1bGUubW9kZSA9PSAnb3ZlcnJpZGUnID8gJ2FjdGl2ZScgOiB1bmRlZmluZWQpfT5cbiAgICAgICAgICAgICAgICBPdmVycmlkZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9