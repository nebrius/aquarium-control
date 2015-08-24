define(['exports', 'module', 'views/override', 'views/program', 'views/status', 'views/edit_schedule_entry', 'views/delete_entry_confirmation', 'actions/schedule'], function (exports, module, _viewsOverride, _viewsProgram, _viewsStatus, _viewsEdit_schedule_entry, _viewsDelete_entry_confirmation, _actionsSchedule) {
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

  var _EditScheduleEntry = _interopRequireDefault(_viewsEdit_schedule_entry);

  var _DeleteEntryConfirmation = _interopRequireDefault(_viewsDelete_entry_confirmation);

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
      var overlay = undefined;
      if (this.props.entryState.showingEdit) {
        overlay = React.createElement(_EditScheduleEntry['default'], null);
      } else if (this.props.entryState.showingDeleteConfirm) {
        overlay = React.createElement(_DeleteEntryConfirmation['default'], null);
      }
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
        ),
        overlay
      );
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkEwQmUsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQy9CLGlCQUFhLEVBQUEsdUJBQUMsQ0FBQyxFQUFFO0FBQ2YsVUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDOUMsVUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO0FBQ3BDLDZCQU5HLHVCQUF1QixFQU1GLElBQUksQ0FBQyxDQUFDO09BQy9CO0tBQ0Y7QUFDRCxVQUFNLEVBQUEsa0JBQUc7QUFDUCxVQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDdEMsVUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLFNBQVMsNkNBQXFCLENBQUM7QUFDeEQsVUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUNqRixVQUFJLE9BQU8sWUFBQSxDQUFDO0FBQ1osVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7QUFDckMsZUFBTyxHQUFHLHdEQUFxQixDQUFDO09BQ2pDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRTtBQUNyRCxlQUFPLEdBQUcsOERBQTJCLENBQUM7T0FDdkM7QUFDRCxhQUNFOzs7UUFDRTs7WUFBSyxTQUFTLEVBQUMsWUFBWTtVQUN6Qjs7OztXQUF5QjtTQUNyQjtRQUNOOztZQUFLLFNBQVMsRUFBQyxpQ0FBaUM7VUFDOUM7O2NBQUssU0FBUyxFQUFDLGVBQWU7WUFDNUI7O2dCQUFLLFNBQVMsRUFBQyxhQUFhO2NBQUM7Ozs7ZUFBZTthQUFNO1dBQzlDO1VBQ047O2NBQUssU0FBUyxFQUFDLFlBQVk7WUFDekIsd0NBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUk7V0FDN0I7U0FDRjtRQUNOOztZQUFLLFNBQVMsRUFBQyxpQ0FBaUM7VUFDOUM7O2NBQUssU0FBUyxFQUFDLGVBQWU7WUFDNUI7O2dCQUFLLFNBQVMsRUFBQyxhQUFhO2NBQUM7Ozs7ZUFBc0I7YUFBTTtXQUNyRDtVQUNOOztjQUFLLFNBQVMsRUFBQyxZQUFZO1lBQ3pCOztnQkFBSyxTQUFTLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxPQUFPO2NBQ3JDOzs7QUFDSSxzQkFBSSxFQUFDLFFBQVE7QUFDYiwyQkFBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxJQUFJLFNBQVMsRUFBRSxDQUFDLEFBQUM7QUFDaEUseUJBQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxBQUFDOztlQUV2QjtjQUNUOzs7QUFDSSxzQkFBSSxFQUFDLFFBQVE7QUFDYiwyQkFBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxJQUFJLFVBQVUsRUFBRSxDQUFDLEFBQUM7QUFDakUseUJBQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxBQUFDOztlQUV2QjthQUNMO1lBQ04sb0JBQUMsUUFBUSxFQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFJO1dBQ2pDO1NBQ0Y7UUFDTCxPQUFPO09BQ0osQ0FDTjtLQUNIO0dBQ0YsQ0FBQyIsImZpbGUiOiJ2aWV3cy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBPdmVycmlkZSBmcm9tICd2aWV3cy9vdmVycmlkZSc7XG5pbXBvcnQgUHJvZ3JhbSBmcm9tICd2aWV3cy9wcm9ncmFtJztcbmltcG9ydCBTdGF0dXMgZnJvbSAndmlld3Mvc3RhdHVzJztcbmltcG9ydCBFZGl0U2NoZWR1bGVFbnRyeSBmcm9tICd2aWV3cy9lZGl0X3NjaGVkdWxlX2VudHJ5JztcbmltcG9ydCBEZWxldGVFbnRyeUNvbmZpcm1hdGlvbiBmcm9tICd2aWV3cy9kZWxldGVfZW50cnlfY29uZmlybWF0aW9uJztcbmltcG9ydCB7IGNyZWF0ZU1vZGVDaGFuZ2VkQWN0aW9uIH0gZnJvbSAnYWN0aW9ucy9zY2hlZHVsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgb25Nb2RlQ2xpY2tlZChlKSB7XG4gICAgY29uc3QgbW9kZSA9IGUudGFyZ2V0LmlubmVyVGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChtb2RlICE9IHRoaXMucHJvcHMuc2NoZWR1bGUubW9kZSkge1xuICAgICAgY3JlYXRlTW9kZUNoYW5nZWRBY3Rpb24obW9kZSk7XG4gICAgfVxuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbW9kZSA9IHRoaXMucHJvcHMuc2NoZWR1bGUubW9kZTtcbiAgICBjb25zdCBDb25mVmlldyA9IG1vZGUgPT0gJ3Byb2dyYW0nID8gUHJvZ3JhbSA6IE92ZXJyaWRlO1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBbJ2J0bicsICdidG4tZGVmYXVsdCcsICdidG4tbGcnLCAnYWN0aXZlJywgJ2FwcF9tb2RlX2J1dHRvbiddO1xuICAgIGxldCBvdmVybGF5O1xuICAgIGlmICh0aGlzLnByb3BzLmVudHJ5U3RhdGUuc2hvd2luZ0VkaXQpIHtcbiAgICAgIG92ZXJsYXkgPSA8RWRpdFNjaGVkdWxlRW50cnkgLz47XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmVudHJ5U3RhdGUuc2hvd2luZ0RlbGV0ZUNvbmZpcm0pIHtcbiAgICAgIG92ZXJsYXkgPSA8RGVsZXRlRW50cnlDb25maXJtYXRpb24gLz47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXBwX2hlYWRlcic+XG4gICAgICAgICAgPGgyPkFxdWFyaXVtIENvbnRyb2w8L2gyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsIHBhbmVsLWRlZmF1bHQgYXBwX3NlY3Rpb24nPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1oZWFkaW5nJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC10aXRsZSc+PGgzPlN0YXR1czwvaDM+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWJvZHknPlxuICAgICAgICAgICAgPFN0YXR1cyB7Li4udGhpcy5wcm9wcy5zdGF0dXN9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwgcGFuZWwtZGVmYXVsdCBhcHBfc2VjdGlvbic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWhlYWRpbmcnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLXRpdGxlJz48aDM+Q29uZmlndXJhdGlvbjwvaDM+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWJvZHknPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J0bi1ncm91cCcgcm9sZT0nZ3JvdXAnPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPSdidXR0b24nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZShjbGFzc05hbWVzLCB7IGFjdGl2ZTogbW9kZSA9PSAncHJvZ3JhbScgfSl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uTW9kZUNsaWNrZWR9PlxuICAgICAgICAgICAgICAgIFByb2dyYW1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lKGNsYXNzTmFtZXMsIHsgYWN0aXZlOiBtb2RlID09ICdvdmVycmlkZScgfSl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uTW9kZUNsaWNrZWR9PlxuICAgICAgICAgICAgICAgIE92ZXJyaWRlXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Q29uZlZpZXcgey4uLnRoaXMucHJvcHMuc2NoZWR1bGV9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7b3ZlcmxheX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9