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
    displayName: 'schedule_entry',

    onEditClicked: function onEditClicked() {
      (0, _actionsEntry_state.createRequestEditAction)(this.props.entryId);
    },
    onDeleteClicked: function onDeleteClicked() {
      (0, _actionsEntry_state.createRequestDeleteAction)(this.props.entryId);
    },
    render: function render() {
      var entry = undefined;
      if (this.props.type == 'dynamic') {
        entry = React.createElement(
          'div',
          { className: 'schedule_entry_group' },
          React.createElement(
            'div',
            { className: 'schedule_entry_label' },
            'Event:'
          ),
          React.createElement(
            'div',
            null,
            this.props.event
          )
        );
      } else {
        var hour = this.props.time.hour.toString();
        var minute = this.props.time.minute.toString();
        if (minute.length == 1) {
          minute = '0' + minute;
        }
        entry = React.createElement(
          'div',
          { className: 'schedule_entry_group' },
          React.createElement(
            'div',
            { className: 'schedule_entry_label' },
            'Time:'
          ),
          React.createElement(
            'div',
            null,
            hour + ':' + minute
          )
        );
      }
      return React.createElement(
        'div',
        { className: 'panel panel-default app_section' },
        React.createElement(
          'div',
          { className: 'panel-heading' },
          React.createElement(
            'div',
            { className: 'panel-title' },
            React.createElement(
              'h4',
              null,
              this.props.name
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'panel-body' },
          React.createElement(
            'div',
            { className: 'schedule_entry_group' },
            React.createElement(
              'div',
              { className: 'schedule_entry_label' },
              'State:'
            ),
            React.createElement(
              'div',
              null,
              this.props.state
            )
          ),
          React.createElement(
            'div',
            { className: 'schedule_entry_group' },
            React.createElement(
              'div',
              { className: 'schedule_entry_label' },
              'Type:'
            ),
            React.createElement(
              'div',
              null,
              this.props.type
            )
          ),
          entry
        )
      );
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL3NjaGVkdWxlX2VudHJ5LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQXFCZSxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDL0IsaUJBQWEsRUFBQSx5QkFBRztBQUNkLDhCQUpnQyx1QkFBdUIsRUFJL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM3QztBQUNELG1CQUFlLEVBQUEsMkJBQUc7QUFDaEIsOEJBUEsseUJBQXlCLEVBT0osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMvQztBQUNELFVBQU0sRUFBQSxrQkFBRztBQUNQLFVBQUksS0FBSyxZQUFBLENBQUM7QUFDVixVQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBRTtBQUNoQyxhQUFLLEdBQ0g7O1lBQUssU0FBUyxFQUFDLHNCQUFzQjtVQUNuQzs7Y0FBSyxTQUFTLEVBQUMsc0JBQXNCOztXQUFhO1VBQ2xEOzs7WUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7V0FBTztTQUN6QixBQUNQLENBQUM7T0FDSCxNQUFNO0FBQ0wsWUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzNDLFlBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUMvQyxZQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQ3RCLGdCQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztTQUN2QjtBQUNELGFBQUssR0FDSDs7WUFBSyxTQUFTLEVBQUMsc0JBQXNCO1VBQ25DOztjQUFLLFNBQVMsRUFBQyxzQkFBc0I7O1dBQVk7VUFDakQ7OztZQUFNLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTTtXQUFPO1NBQzVCLEFBQ1AsQ0FBQztPQUNIO0FBQ0QsYUFDRTs7VUFBSyxTQUFTLEVBQUMsaUNBQWlDO1FBQzlDOztZQUFLLFNBQVMsRUFBQyxlQUFlO1VBQzVCOztjQUFLLFNBQVMsRUFBQyxhQUFhO1lBQUM7OztjQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTthQUFNO1dBQU07U0FDekQ7UUFDTjs7WUFBSyxTQUFTLEVBQUMsWUFBWTtVQUN6Qjs7Y0FBSyxTQUFTLEVBQUMsc0JBQXNCO1lBQ25DOztnQkFBSyxTQUFTLEVBQUMsc0JBQXNCOzthQUFhO1lBQ2xEOzs7Y0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7YUFBTztXQUN6QjtVQUNOOztjQUFLLFNBQVMsRUFBQyxzQkFBc0I7WUFDbkM7O2dCQUFLLFNBQVMsRUFBQyxzQkFBc0I7O2FBQVk7WUFDakQ7OztjQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTthQUFPO1dBQ3hCO1VBQ0wsS0FBSztTQUNGO09BQ0YsQ0FDTjtLQUNIO0dBQ0YsQ0FBQyIsImZpbGUiOiJ2aWV3cy9zY2hlZHVsZV9lbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxMy0yMDE1ICBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuICBUaGlzIGZpbGUgaXMgcGFydCBvZiBBcXVhcml1bSBDb250cm9sLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gIEFxdWFyaXVtIENvbnRyb2wgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gIGFsb25nIHdpdGggQXF1YXJpdW0gQ29udHJvbC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVSZXF1ZXN0RGVsZXRlQWN0aW9uLCBjcmVhdGVSZXF1ZXN0RWRpdEFjdGlvbiB9IGZyb20gJ2FjdGlvbnMvZW50cnlfc3RhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG9uRWRpdENsaWNrZWQoKSB7XG4gICAgY3JlYXRlUmVxdWVzdEVkaXRBY3Rpb24odGhpcy5wcm9wcy5lbnRyeUlkKTtcbiAgfSxcbiAgb25EZWxldGVDbGlja2VkKCkge1xuICAgIGNyZWF0ZVJlcXVlc3REZWxldGVBY3Rpb24odGhpcy5wcm9wcy5lbnRyeUlkKTtcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIGxldCBlbnRyeTtcbiAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdkeW5hbWljJykge1xuICAgICAgZW50cnkgPSAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzY2hlZHVsZV9lbnRyeV9ncm91cCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NjaGVkdWxlX2VudHJ5X2xhYmVsJz5FdmVudDo8L2Rpdj5cbiAgICAgICAgICA8ZGl2Pnt0aGlzLnByb3BzLmV2ZW50fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBob3VyID0gdGhpcy5wcm9wcy50aW1lLmhvdXIudG9TdHJpbmcoKTtcbiAgICAgIGxldCBtaW51dGUgPSB0aGlzLnByb3BzLnRpbWUubWludXRlLnRvU3RyaW5nKCk7XG4gICAgICBpZiAobWludXRlLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIG1pbnV0ZSA9ICcwJyArIG1pbnV0ZTtcbiAgICAgIH1cbiAgICAgIGVudHJ5ID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2NoZWR1bGVfZW50cnlfZ3JvdXAnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzY2hlZHVsZV9lbnRyeV9sYWJlbCc+VGltZTo8L2Rpdj5cbiAgICAgICAgICA8ZGl2Pntob3VyICsgJzonICsgbWludXRlfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwgcGFuZWwtZGVmYXVsdCBhcHBfc2VjdGlvbic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1oZWFkaW5nJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtdGl0bGUnPjxoND57dGhpcy5wcm9wcy5uYW1lfTwvaDQ+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtYm9keSc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NjaGVkdWxlX2VudHJ5X2dyb3VwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzY2hlZHVsZV9lbnRyeV9sYWJlbCc+U3RhdGU6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2Pnt0aGlzLnByb3BzLnN0YXRlfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzY2hlZHVsZV9lbnRyeV9ncm91cCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2NoZWR1bGVfZW50cnlfbGFiZWwnPlR5cGU6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2Pnt0aGlzLnByb3BzLnR5cGV9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2VudHJ5fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9