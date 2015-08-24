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
      debugger;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQXdCZSxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDL0IsaUJBQWEsRUFBQSx1QkFBQyxDQUFDLEVBQUU7QUFDZixVQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM5QyxVQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDcEMsNkJBTkcsdUJBQXVCLEVBTUYsSUFBSSxDQUFDLENBQUM7T0FDL0I7S0FDRjtBQUNELFVBQU0sRUFBQSxrQkFBRztBQUNQLGVBQVM7QUFDVCxVQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDdEMsVUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLFNBQVMsNkNBQXFCLENBQUM7QUFDeEQsVUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUNqRixhQUNFOzs7UUFDRTs7WUFBSyxTQUFTLEVBQUMsWUFBWTtVQUN6Qjs7OztXQUF5QjtTQUNyQjtRQUNOOztZQUFLLFNBQVMsRUFBQyxpQ0FBaUM7VUFDOUM7O2NBQUssU0FBUyxFQUFDLGVBQWU7WUFDNUI7O2dCQUFLLFNBQVMsRUFBQyxhQUFhO2NBQUM7Ozs7ZUFBZTthQUFNO1dBQzlDO1VBQ047O2NBQUssU0FBUyxFQUFDLFlBQVk7WUFDekIsd0NBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUk7V0FDN0I7U0FDRjtRQUNOOztZQUFLLFNBQVMsRUFBQyxpQ0FBaUM7VUFDOUM7O2NBQUssU0FBUyxFQUFDLGVBQWU7WUFDNUI7O2dCQUFLLFNBQVMsRUFBQyxhQUFhO2NBQUM7Ozs7ZUFBc0I7YUFBTTtXQUNyRDtVQUNOOztjQUFLLFNBQVMsRUFBQyxZQUFZO1lBQ3pCOztnQkFBSyxTQUFTLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxPQUFPO2NBQ3JDOzs7QUFDSSxzQkFBSSxFQUFDLFFBQVE7QUFDYiwyQkFBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxJQUFJLFNBQVMsRUFBRSxDQUFDLEFBQUM7QUFDaEUseUJBQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxBQUFDOztlQUV2QjtjQUNUOzs7QUFDSSxzQkFBSSxFQUFDLFFBQVE7QUFDYiwyQkFBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxJQUFJLFVBQVUsRUFBRSxDQUFDLEFBQUM7QUFDakUseUJBQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxBQUFDOztlQUV2QjthQUNMO1lBQ04sb0JBQUMsUUFBUSxFQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFJO1dBQ2pDO1NBQ0Y7T0FDRixDQUNOO0tBQ0g7R0FDRixDQUFDIiwiZmlsZSI6InZpZXdzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IE92ZXJyaWRlIGZyb20gJ3ZpZXdzL292ZXJyaWRlJztcbmltcG9ydCBQcm9ncmFtIGZyb20gJ3ZpZXdzL3Byb2dyYW0nO1xuaW1wb3J0IFN0YXR1cyBmcm9tICd2aWV3cy9zdGF0dXMnO1xuaW1wb3J0IHsgY3JlYXRlTW9kZUNoYW5nZWRBY3Rpb24gfSBmcm9tICdhY3Rpb25zL3NjaGVkdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBvbk1vZGVDbGlja2VkKGUpIHtcbiAgICBjb25zdCBtb2RlID0gZS50YXJnZXQuaW5uZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG1vZGUgIT0gdGhpcy5wcm9wcy5zY2hlZHVsZS5tb2RlKSB7XG4gICAgICBjcmVhdGVNb2RlQ2hhbmdlZEFjdGlvbihtb2RlKTtcbiAgICB9XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBkZWJ1Z2dlcjtcbiAgICBjb25zdCBtb2RlID0gdGhpcy5wcm9wcy5zY2hlZHVsZS5tb2RlO1xuICAgIGNvbnN0IENvbmZWaWV3ID0gbW9kZSA9PSAncHJvZ3JhbScgPyBQcm9ncmFtIDogT3ZlcnJpZGU7XG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IFsnYnRuJywgJ2J0bi1kZWZhdWx0JywgJ2J0bi1sZycsICdhY3RpdmUnLCAnYXBwX21vZGVfYnV0dG9uJ107XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhcHBfaGVhZGVyJz5cbiAgICAgICAgICA8aDI+QXF1YXJpdW0gQ29udHJvbDwvaDI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwgcGFuZWwtZGVmYXVsdCBhcHBfc2VjdGlvbic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWhlYWRpbmcnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLXRpdGxlJz48aDM+U3RhdHVzPC9oMz48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtYm9keSc+XG4gICAgICAgICAgICA8U3RhdHVzIHsuLi50aGlzLnByb3BzLnN0YXR1c30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbCBwYW5lbC1kZWZhdWx0IGFwcF9zZWN0aW9uJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtaGVhZGluZyc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtdGl0bGUnPjxoMz5Db25maWd1cmF0aW9uPC9oMz48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtYm9keSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnRuLWdyb3VwJyByb2xlPSdncm91cCc+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lKGNsYXNzTmFtZXMsIHsgYWN0aXZlOiBtb2RlID09ICdwcm9ncmFtJyB9KX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25Nb2RlQ2xpY2tlZH0+XG4gICAgICAgICAgICAgICAgUHJvZ3JhbVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWUoY2xhc3NOYW1lcywgeyBhY3RpdmU6IG1vZGUgPT0gJ292ZXJyaWRlJyB9KX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25Nb2RlQ2xpY2tlZH0+XG4gICAgICAgICAgICAgICAgT3ZlcnJpZGVcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxDb25mVmlldyB7Li4udGhpcy5wcm9wcy5zY2hlZHVsZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==