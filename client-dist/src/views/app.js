define(['exports', 'module', 'views/override', 'views/program'], function (exports, module, _viewsOverride, _viewsProgram) {
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
            'Status'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFzQmUsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQy9CLFVBQU0sRUFBQSxrQkFBRztBQUNQLGFBQ0U7OztRQUNFOztZQUFLLFNBQVMsRUFBQyxZQUFZO1VBQ3pCOzs7O1dBQXlCO1NBQ3JCO1FBQ047O1lBQUssU0FBUyxFQUFDLGlDQUFpQztVQUM5Qzs7Y0FBSyxTQUFTLEVBQUMsZUFBZTtZQUM1Qjs7Z0JBQUssU0FBUyxFQUFDLGFBQWE7O2FBQWE7V0FDckM7VUFDTjs7Y0FBSyxTQUFTLEVBQUMsWUFBWTs7V0FFckI7U0FDRjtRQUNOOztZQUFLLFNBQVMsRUFBQyxpQ0FBaUM7VUFDOUM7O2NBQUssU0FBUyxFQUFDLGVBQWU7WUFDNUI7O2dCQUFLLFNBQVMsRUFBQyxhQUFhOzthQUFvQjtXQUM1QztVQUNOOztjQUFLLFNBQVMsRUFBQyxZQUFZO1lBQ3pCOztnQkFBSyxTQUFTLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxPQUFPO2NBQ3JDOztrQkFBUSxJQUFJLEVBQUMsUUFBUTtBQUNiLDJCQUFTLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxTQUFTLEdBQUcsUUFBUSxHQUFHLFNBQVMsQ0FBQyxBQUFDOztlQUN6RztjQUNsQjs7a0JBQVEsSUFBSSxFQUFDLFFBQVE7QUFDYiwyQkFBUyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksVUFBVSxHQUFHLFFBQVEsR0FBRyxTQUFTLENBQUMsQUFBQzs7ZUFDekc7YUFDZjtXQUNGO1NBQ0Y7T0FDRixDQUNOO0tBQ0g7R0FDRixDQUFDIiwiZmlsZSI6InZpZXdzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IE92ZXJyaWRlIGZyb20gJ3ZpZXdzL292ZXJyaWRlJztcbmltcG9ydCBQcm9ncmFtIGZyb20gJ3ZpZXdzL3Byb2dyYW0nO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2FwcF9oZWFkZXInPlxuICAgICAgICAgIDxoMj5BcXVhcml1bSBDb250cm9sPC9oMj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbCBwYW5lbC1kZWZhdWx0IGFwcF9zZWN0aW9uJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtaGVhZGluZyc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtdGl0bGUnPlN0YXR1czwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1ib2R5Jz5cbiAgICAgICAgICAgIFN0YXR1c1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsIHBhbmVsLWRlZmF1bHQgYXBwX3NlY3Rpb24nPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1oZWFkaW5nJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC10aXRsZSc+Q29uZmlndXJhdGlvbjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1ib2R5Jz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdidG4tZ3JvdXAnIHJvbGU9J2dyb3VwJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSdidXR0b24nXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWUoJ2J0bicsICdidG4tZGVmYXVsdCcsICdidG4tbGcnLCB0aGlzLnByb3BzLnNjaGVkdWxlLm1vZGUgPT0gJ3Byb2dyYW0nID8gJ2FjdGl2ZScgOiB1bmRlZmluZWQpfT5cbiAgICAgICAgICAgICAgICBQcm9ncmFtPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lKCdidG4nLCAnYnRuLWRlZmF1bHQnLCAnYnRuLWxnJywgdGhpcy5wcm9wcy5zY2hlZHVsZS5tb2RlID09ICdvdmVycmlkZScgPyAnYWN0aXZlJyA6IHVuZGVmaW5lZCl9PlxuICAgICAgICAgICAgICAgIE92ZXJyaWRlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=