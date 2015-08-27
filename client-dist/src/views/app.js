define(['exports', 'module', 'views/override', 'views/program', 'views/status', 'views/edit_schedule_entry', 'views/delete_entry_confirmation', 'actions/schedule'], function (exports, module, _viewsOverride, _viewsProgram, _viewsStatus, _viewsEdit_schedule_entry, _viewsDelete_entry_confirmation, _actionsSchedule) {
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
        overlay = React.createElement(_EditScheduleEntry['default'], this.props.schedule.schedule[this.props.entryState.editEntryId]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkEwQmUsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQy9CLGlCQUFhLEVBQUEsdUJBQUMsQ0FBQyxFQUFFO0FBQ2YsVUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDOUMsVUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO0FBQ3BDLDZCQU5HLHVCQUF1QixFQU1GLElBQUksQ0FBQyxDQUFDO09BQy9CO0tBQ0Y7QUFDRCxVQUFNLEVBQUEsa0JBQUc7QUFDUCxVQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDdEMsVUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLFNBQVMsNkNBQXFCLENBQUM7QUFDeEQsVUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUNqRixVQUFJLE9BQU8sWUFBQSxDQUFDO0FBQ1osVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7QUFDckMsZUFBTyxHQUFHLG1EQUF1QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUcsQ0FBQztPQUNyRyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUU7QUFDckQsZUFBTyxHQUFHLDhEQUEyQixDQUFDO09BQ3ZDO0FBQ0QsYUFDRTs7O1FBQ0U7O1lBQUssU0FBUyxFQUFDLFlBQVk7VUFDekI7Ozs7V0FBeUI7U0FDckI7UUFDTjs7WUFBSyxTQUFTLEVBQUMsaUNBQWlDO1VBQzlDOztjQUFLLFNBQVMsRUFBQyxlQUFlO1lBQzVCOztnQkFBSyxTQUFTLEVBQUMsYUFBYTtjQUFDOzs7O2VBQWU7YUFBTTtXQUM5QztVQUNOOztjQUFLLFNBQVMsRUFBQyxZQUFZO1lBQ3pCLHdDQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFJO1dBQzdCO1NBQ0Y7UUFDTjs7WUFBSyxTQUFTLEVBQUMsaUNBQWlDO1VBQzlDOztjQUFLLFNBQVMsRUFBQyxlQUFlO1lBQzVCOztnQkFBSyxTQUFTLEVBQUMsYUFBYTtjQUFDOzs7O2VBQXNCO2FBQU07V0FDckQ7VUFDTjs7Y0FBSyxTQUFTLEVBQUMsWUFBWTtZQUN6Qjs7Z0JBQUssU0FBUyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsT0FBTztjQUNyQzs7O0FBQ0ksc0JBQUksRUFBQyxRQUFRO0FBQ2IsMkJBQVMsRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksSUFBSSxTQUFTLEVBQUUsQ0FBQyxBQUFDO0FBQ2hFLHlCQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQUFBQzs7ZUFFdkI7Y0FDVDs7O0FBQ0ksc0JBQUksRUFBQyxRQUFRO0FBQ2IsMkJBQVMsRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksSUFBSSxVQUFVLEVBQUUsQ0FBQyxBQUFDO0FBQ2pFLHlCQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQUFBQzs7ZUFFdkI7YUFDTDtZQUNOLG9CQUFDLFFBQVEsRUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBSTtXQUNqQztTQUNGO1FBQ0wsT0FBTztPQUNKLENBQ047S0FDSDtHQUNGLENBQUMiLCJmaWxlIjoidmlld3MvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IChDKSAyMDEzLTIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBPdmVycmlkZSBmcm9tICd2aWV3cy9vdmVycmlkZSc7XG5pbXBvcnQgUHJvZ3JhbSBmcm9tICd2aWV3cy9wcm9ncmFtJztcbmltcG9ydCBTdGF0dXMgZnJvbSAndmlld3Mvc3RhdHVzJztcbmltcG9ydCBFZGl0U2NoZWR1bGVFbnRyeSBmcm9tICd2aWV3cy9lZGl0X3NjaGVkdWxlX2VudHJ5JztcbmltcG9ydCBEZWxldGVFbnRyeUNvbmZpcm1hdGlvbiBmcm9tICd2aWV3cy9kZWxldGVfZW50cnlfY29uZmlybWF0aW9uJztcbmltcG9ydCB7IGNyZWF0ZU1vZGVDaGFuZ2VkQWN0aW9uIH0gZnJvbSAnYWN0aW9ucy9zY2hlZHVsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgb25Nb2RlQ2xpY2tlZChlKSB7XG4gICAgY29uc3QgbW9kZSA9IGUudGFyZ2V0LmlubmVyVGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChtb2RlICE9IHRoaXMucHJvcHMuc2NoZWR1bGUubW9kZSkge1xuICAgICAgY3JlYXRlTW9kZUNoYW5nZWRBY3Rpb24obW9kZSk7XG4gICAgfVxuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbW9kZSA9IHRoaXMucHJvcHMuc2NoZWR1bGUubW9kZTtcbiAgICBjb25zdCBDb25mVmlldyA9IG1vZGUgPT0gJ3Byb2dyYW0nID8gUHJvZ3JhbSA6IE92ZXJyaWRlO1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBbJ2J0bicsICdidG4tZGVmYXVsdCcsICdidG4tbGcnLCAnYWN0aXZlJywgJ2FwcF9tb2RlX2J1dHRvbiddO1xuICAgIGxldCBvdmVybGF5O1xuICAgIGlmICh0aGlzLnByb3BzLmVudHJ5U3RhdGUuc2hvd2luZ0VkaXQpIHtcbiAgICAgIG92ZXJsYXkgPSA8RWRpdFNjaGVkdWxlRW50cnkgey4uLnRoaXMucHJvcHMuc2NoZWR1bGUuc2NoZWR1bGVbdGhpcy5wcm9wcy5lbnRyeVN0YXRlLmVkaXRFbnRyeUlkXX0vPjtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZW50cnlTdGF0ZS5zaG93aW5nRGVsZXRlQ29uZmlybSkge1xuICAgICAgb3ZlcmxheSA9IDxEZWxldGVFbnRyeUNvbmZpcm1hdGlvbiAvPjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhcHBfaGVhZGVyJz5cbiAgICAgICAgICA8aDI+QXF1YXJpdW0gQ29udHJvbDwvaDI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwgcGFuZWwtZGVmYXVsdCBhcHBfc2VjdGlvbic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWhlYWRpbmcnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLXRpdGxlJz48aDM+U3RhdHVzPC9oMz48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtYm9keSc+XG4gICAgICAgICAgICA8U3RhdHVzIHsuLi50aGlzLnByb3BzLnN0YXR1c30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbCBwYW5lbC1kZWZhdWx0IGFwcF9zZWN0aW9uJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtaGVhZGluZyc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtdGl0bGUnPjxoMz5Db25maWd1cmF0aW9uPC9oMz48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtYm9keSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnRuLWdyb3VwJyByb2xlPSdncm91cCc+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lKGNsYXNzTmFtZXMsIHsgYWN0aXZlOiBtb2RlID09ICdwcm9ncmFtJyB9KX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25Nb2RlQ2xpY2tlZH0+XG4gICAgICAgICAgICAgICAgUHJvZ3JhbVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWUoY2xhc3NOYW1lcywgeyBhY3RpdmU6IG1vZGUgPT0gJ292ZXJyaWRlJyB9KX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25Nb2RlQ2xpY2tlZH0+XG4gICAgICAgICAgICAgICAgT3ZlcnJpZGVcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxDb25mVmlldyB7Li4udGhpcy5wcm9wcy5zY2hlZHVsZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtvdmVybGF5fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=