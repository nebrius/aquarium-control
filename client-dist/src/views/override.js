define(['exports', 'module', 'actions/schedule'], function (exports, module, _actionsSchedule) {
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
    displayName: 'override',

    onClicked: function onClicked(e) {
      var state = e.target.innerHTML.toLowerCase();
      if (state != this.props.overrideState) {
        (0, _actionsSchedule.createOverrideStateChangedAction)(state);
      }
    },

    render: function render() {
      var state = this.props.overrideState;
      var classNames = ['override_button', 'btn', 'btn-default', 'btn-lg', 'active'];
      return React.createElement(
        'div',
        { className: 'override_container' },
        React.createElement(
          'div',
          { className: 'btn-group-vertical override_button_group', role: 'group' },
          React.createElement(
            'button',
            {
              type: 'button',
              className: classname(classNames, { active: state == 'day' }),
              onClick: this.onClicked },
            'Day'
          ),
          React.createElement(
            'button',
            {
              type: 'button',
              className: classname(classNames, { active: state == 'night' }),
              onClick: this.onClicked },
            'Night'
          ),
          React.createElement(
            'button',
            {
              type: 'button',
              className: classname(classNames, { active: state == 'off' }),
              onClick: this.onClicked },
            'Off'
          )
        )
      );
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL292ZXJyaWRlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQXFCZSxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDL0IsYUFBUyxFQUFBLG1CQUFDLENBQUMsRUFBRTtBQUNYLFVBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQy9DLFVBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQ3JDLDZCQU5HLGdDQUFnQyxFQU1GLEtBQUssQ0FBQyxDQUFDO09BQ3pDO0tBQ0Y7O0FBRUQsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsVUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7QUFDdkMsVUFBTSxVQUFVLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNqRixhQUNFOztVQUFLLFNBQVMsRUFBQyxvQkFBb0I7UUFDakM7O1lBQUssU0FBUyxFQUFDLDBDQUEwQyxFQUFDLElBQUksRUFBQyxPQUFPO1VBQ3BFOzs7QUFDSSxrQkFBSSxFQUFDLFFBQVE7QUFDYix1QkFBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxJQUFJLEtBQUssRUFBRSxDQUFDLEFBQUM7QUFDN0QscUJBQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxBQUFDOztXQUVuQjtVQUNUOzs7QUFDSSxrQkFBSSxFQUFDLFFBQVE7QUFDYix1QkFBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDLEFBQUM7QUFDL0QscUJBQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxBQUFDOztXQUVuQjtVQUNUOzs7QUFDSSxrQkFBSSxFQUFDLFFBQVE7QUFDYix1QkFBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxJQUFJLEtBQUssRUFBRSxDQUFDLEFBQUM7QUFDN0QscUJBQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxBQUFDOztXQUVuQjtTQUNMO09BQ0YsQ0FDTjtLQUNIO0dBQ0YsQ0FBQyIsImZpbGUiOiJ2aWV3cy9vdmVycmlkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxMy0yMDE1ICBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuICBUaGlzIGZpbGUgaXMgcGFydCBvZiBBcXVhcml1bSBDb250cm9sLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gIGFsb25nIHdpdGggQXF1YXJpdW0gQ29udHJvbC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVPdmVycmlkZVN0YXRlQ2hhbmdlZEFjdGlvbiB9IGZyb20gJ2FjdGlvbnMvc2NoZWR1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG9uQ2xpY2tlZChlKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBlLnRhcmdldC5pbm5lckhUTUwudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoc3RhdGUgIT0gdGhpcy5wcm9wcy5vdmVycmlkZVN0YXRlKSB7XG4gICAgICBjcmVhdGVPdmVycmlkZVN0YXRlQ2hhbmdlZEFjdGlvbihzdGF0ZSk7XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMucHJvcHMub3ZlcnJpZGVTdGF0ZTtcbiAgICBjb25zdCBjbGFzc05hbWVzID0gWydvdmVycmlkZV9idXR0b24nLCAnYnRuJywgJ2J0bi1kZWZhdWx0JywgJ2J0bi1sZycsICdhY3RpdmUnXTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J292ZXJyaWRlX2NvbnRhaW5lcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdidG4tZ3JvdXAtdmVydGljYWwgb3ZlcnJpZGVfYnV0dG9uX2dyb3VwJyByb2xlPSdncm91cCc+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPSdidXR0b24nXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lKGNsYXNzTmFtZXMsIHsgYWN0aXZlOiBzdGF0ZSA9PSAnZGF5JyB9KX1cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrZWR9PlxuICAgICAgICAgICAgRGF5XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPSdidXR0b24nXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lKGNsYXNzTmFtZXMsIHsgYWN0aXZlOiBzdGF0ZSA9PSAnbmlnaHQnIH0pfVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tlZH0+XG4gICAgICAgICAgICBOaWdodFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZShjbGFzc05hbWVzLCB7IGFjdGl2ZTogc3RhdGUgPT0gJ29mZicgfSl9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja2VkfT5cbiAgICAgICAgICAgIE9mZlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9