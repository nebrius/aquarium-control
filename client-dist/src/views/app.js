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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkEwQmUsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQy9CLGlCQUFhLEVBQUEsdUJBQUMsQ0FBQyxFQUFFO0FBQ2YsVUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDOUMsVUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO0FBQ3BDLDZCQU5HLHVCQUF1QixFQU1GLElBQUksQ0FBQyxDQUFDO09BQy9CO0tBQ0Y7QUFDRCxVQUFNLEVBQUEsa0JBQUc7QUFDUCxVQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDdEMsVUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLFNBQVMsNkNBQXFCLENBQUM7QUFDeEQsVUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUNqRixVQUFJLE9BQU8sWUFBQSxDQUFDO0FBQ1osVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7QUFDckMsZUFBTyxHQUFHLG1EQUF1QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUcsQ0FBQztPQUNyRyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUU7QUFDckQsZUFBTyxHQUFHLDhEQUEyQixDQUFDO09BQ3ZDO0FBQ0QsYUFDRTs7O1FBQ0U7O1lBQUssU0FBUyxFQUFDLFlBQVk7VUFDekI7Ozs7V0FBeUI7U0FDckI7UUFDTjs7WUFBSyxTQUFTLEVBQUMsaUNBQWlDO1VBQzlDOztjQUFLLFNBQVMsRUFBQyxlQUFlO1lBQzVCOztnQkFBSyxTQUFTLEVBQUMsYUFBYTtjQUFDOzs7O2VBQWU7YUFBTTtXQUM5QztVQUNOOztjQUFLLFNBQVMsRUFBQyxZQUFZO1lBQ3pCLHdDQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFJO1dBQzdCO1NBQ0Y7UUFDTjs7WUFBSyxTQUFTLEVBQUMsaUNBQWlDO1VBQzlDOztjQUFLLFNBQVMsRUFBQyxlQUFlO1lBQzVCOztnQkFBSyxTQUFTLEVBQUMsYUFBYTtjQUFDOzs7O2VBQXNCO2FBQU07V0FDckQ7VUFDTjs7Y0FBSyxTQUFTLEVBQUMsWUFBWTtZQUN6Qjs7Z0JBQUssU0FBUyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsT0FBTztjQUNyQzs7O0FBQ0ksc0JBQUksRUFBQyxRQUFRO0FBQ2IsMkJBQVMsRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksSUFBSSxTQUFTLEVBQUUsQ0FBQyxBQUFDO0FBQ2hFLHlCQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQUFBQzs7ZUFFdkI7Y0FDVDs7O0FBQ0ksc0JBQUksRUFBQyxRQUFRO0FBQ2IsMkJBQVMsRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksSUFBSSxVQUFVLEVBQUUsQ0FBQyxBQUFDO0FBQ2pFLHlCQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQUFBQzs7ZUFFdkI7YUFDTDtZQUNOLG9CQUFDLFFBQVEsRUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBSTtXQUNqQztTQUNGO1FBQ0wsT0FBTztPQUNKLENBQ047S0FDSDtHQUNGLENBQUMiLCJmaWxlIjoidmlld3MvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IChDKSAyMDE1ICBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuICBUaGlzIGZpbGUgaXMgcGFydCBvZiBBcXVhcml1bSBDb250cm9sLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gIGFsb25nIHdpdGggQXF1YXJpdW0gQ29udHJvbC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgT3ZlcnJpZGUgZnJvbSAndmlld3Mvb3ZlcnJpZGUnO1xuaW1wb3J0IFByb2dyYW0gZnJvbSAndmlld3MvcHJvZ3JhbSc7XG5pbXBvcnQgU3RhdHVzIGZyb20gJ3ZpZXdzL3N0YXR1cyc7XG5pbXBvcnQgRWRpdFNjaGVkdWxlRW50cnkgZnJvbSAndmlld3MvZWRpdF9zY2hlZHVsZV9lbnRyeSc7XG5pbXBvcnQgRGVsZXRlRW50cnlDb25maXJtYXRpb24gZnJvbSAndmlld3MvZGVsZXRlX2VudHJ5X2NvbmZpcm1hdGlvbic7XG5pbXBvcnQgeyBjcmVhdGVNb2RlQ2hhbmdlZEFjdGlvbiB9IGZyb20gJ2FjdGlvbnMvc2NoZWR1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG9uTW9kZUNsaWNrZWQoZSkge1xuICAgIGNvbnN0IG1vZGUgPSBlLnRhcmdldC5pbm5lclRleHQudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobW9kZSAhPSB0aGlzLnByb3BzLnNjaGVkdWxlLm1vZGUpIHtcbiAgICAgIGNyZWF0ZU1vZGVDaGFuZ2VkQWN0aW9uKG1vZGUpO1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG1vZGUgPSB0aGlzLnByb3BzLnNjaGVkdWxlLm1vZGU7XG4gICAgY29uc3QgQ29uZlZpZXcgPSBtb2RlID09ICdwcm9ncmFtJyA/IFByb2dyYW0gOiBPdmVycmlkZTtcbiAgICBjb25zdCBjbGFzc05hbWVzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnLCAnYnRuLWxnJywgJ2FjdGl2ZScsICdhcHBfbW9kZV9idXR0b24nXTtcbiAgICBsZXQgb3ZlcmxheTtcbiAgICBpZiAodGhpcy5wcm9wcy5lbnRyeVN0YXRlLnNob3dpbmdFZGl0KSB7XG4gICAgICBvdmVybGF5ID0gPEVkaXRTY2hlZHVsZUVudHJ5IHsuLi50aGlzLnByb3BzLnNjaGVkdWxlLnNjaGVkdWxlW3RoaXMucHJvcHMuZW50cnlTdGF0ZS5lZGl0RW50cnlJZF19Lz47XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmVudHJ5U3RhdGUuc2hvd2luZ0RlbGV0ZUNvbmZpcm0pIHtcbiAgICAgIG92ZXJsYXkgPSA8RGVsZXRlRW50cnlDb25maXJtYXRpb24gLz47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXBwX2hlYWRlcic+XG4gICAgICAgICAgPGgyPkFxdWFyaXVtIENvbnRyb2w8L2gyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsIHBhbmVsLWRlZmF1bHQgYXBwX3NlY3Rpb24nPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1oZWFkaW5nJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC10aXRsZSc+PGgzPlN0YXR1czwvaDM+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWJvZHknPlxuICAgICAgICAgICAgPFN0YXR1cyB7Li4udGhpcy5wcm9wcy5zdGF0dXN9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwgcGFuZWwtZGVmYXVsdCBhcHBfc2VjdGlvbic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWhlYWRpbmcnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLXRpdGxlJz48aDM+Q29uZmlndXJhdGlvbjwvaDM+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWJvZHknPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J0bi1ncm91cCcgcm9sZT0nZ3JvdXAnPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPSdidXR0b24nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZShjbGFzc05hbWVzLCB7IGFjdGl2ZTogbW9kZSA9PSAncHJvZ3JhbScgfSl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uTW9kZUNsaWNrZWR9PlxuICAgICAgICAgICAgICAgIFByb2dyYW1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lKGNsYXNzTmFtZXMsIHsgYWN0aXZlOiBtb2RlID09ICdvdmVycmlkZScgfSl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uTW9kZUNsaWNrZWR9PlxuICAgICAgICAgICAgICAgIE92ZXJyaWRlXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Q29uZlZpZXcgey4uLnRoaXMucHJvcHMuc2NoZWR1bGV9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7b3ZlcmxheX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9