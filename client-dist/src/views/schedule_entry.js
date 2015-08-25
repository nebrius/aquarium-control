define(['exports', 'module', 'actions/entry_state'], function (exports, module, _actionsEntry_state) {
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
            this.props.dynamicEvent
          )
        );
      } else {
        var hour = this.props.manualTime.hour.toString();
        var minute = this.props.manualTime.minute.toString();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL3NjaGVkdWxlX2VudHJ5LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQXFCZSxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDL0IsaUJBQWEsRUFBQSx5QkFBRztBQUNkLDhCQUpnQyx1QkFBdUIsRUFJL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM3QztBQUNELG1CQUFlLEVBQUEsMkJBQUc7QUFDaEIsOEJBUEsseUJBQXlCLEVBT0osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMvQztBQUNELFVBQU0sRUFBQSxrQkFBRztBQUNQLFVBQUksS0FBSyxZQUFBLENBQUM7QUFDVixVQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBRTtBQUNoQyxhQUFLLEdBQ0g7O1lBQUssU0FBUyxFQUFDLHNCQUFzQjtVQUNuQzs7Y0FBSyxTQUFTLEVBQUMsc0JBQXNCOztXQUFhO1VBQ2xEOzs7WUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7V0FBTztTQUNoQyxBQUNQLENBQUM7T0FDSCxNQUFNO0FBQ0wsWUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2pELFlBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNyRCxZQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQ3RCLGdCQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztTQUN2QjtBQUNELGFBQUssR0FDSDs7WUFBSyxTQUFTLEVBQUMsc0JBQXNCO1VBQ25DOztjQUFLLFNBQVMsRUFBQyxzQkFBc0I7O1dBQVk7VUFDakQ7OztZQUFNLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTTtXQUFPO1NBQzVCLEFBQ1AsQ0FBQztPQUNIO0FBQ0QsYUFDRTs7VUFBSyxTQUFTLEVBQUMsaUNBQWlDO1FBQzlDOztZQUFLLFNBQVMsRUFBQyxlQUFlO1VBQzVCOztjQUFLLFNBQVMsRUFBQyxhQUFhO1lBQUM7OztjQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTthQUFNO1dBQU07U0FDekQ7UUFDTjs7WUFBSyxTQUFTLEVBQUMsWUFBWTtVQUN6Qjs7Y0FBSyxTQUFTLEVBQUMsc0JBQXNCO1lBQ25DOztnQkFBSyxTQUFTLEVBQUMsc0JBQXNCOzthQUFhO1lBQ2xEOzs7Y0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7YUFBTztXQUN6QjtVQUNOOztjQUFLLFNBQVMsRUFBQyxzQkFBc0I7WUFDbkM7O2dCQUFLLFNBQVMsRUFBQyxzQkFBc0I7O2FBQVk7WUFDakQ7OztjQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTthQUFPO1dBQ3hCO1VBQ0wsS0FBSztTQUNGO09BQ0YsQ0FDTjtLQUNIO0dBQ0YsQ0FBQyIsImZpbGUiOiJ2aWV3cy9zY2hlZHVsZV9lbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlUmVxdWVzdERlbGV0ZUFjdGlvbiwgY3JlYXRlUmVxdWVzdEVkaXRBY3Rpb24gfSBmcm9tICdhY3Rpb25zL2VudHJ5X3N0YXRlJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBvbkVkaXRDbGlja2VkKCkge1xuICAgIGNyZWF0ZVJlcXVlc3RFZGl0QWN0aW9uKHRoaXMucHJvcHMuZW50cnlJZCk7XG4gIH0sXG4gIG9uRGVsZXRlQ2xpY2tlZCgpIHtcbiAgICBjcmVhdGVSZXF1ZXN0RGVsZXRlQWN0aW9uKHRoaXMucHJvcHMuZW50cnlJZCk7XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgZW50cnk7XG4gICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PSAnZHluYW1pYycpIHtcbiAgICAgIGVudHJ5ID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2NoZWR1bGVfZW50cnlfZ3JvdXAnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzY2hlZHVsZV9lbnRyeV9sYWJlbCc+RXZlbnQ6PC9kaXY+XG4gICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy5keW5hbWljRXZlbnR9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGhvdXIgPSB0aGlzLnByb3BzLm1hbnVhbFRpbWUuaG91ci50b1N0cmluZygpO1xuICAgICAgbGV0IG1pbnV0ZSA9IHRoaXMucHJvcHMubWFudWFsVGltZS5taW51dGUudG9TdHJpbmcoKTtcbiAgICAgIGlmIChtaW51dGUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgbWludXRlID0gJzAnICsgbWludXRlO1xuICAgICAgfVxuICAgICAgZW50cnkgPSAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzY2hlZHVsZV9lbnRyeV9ncm91cCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NjaGVkdWxlX2VudHJ5X2xhYmVsJz5UaW1lOjwvZGl2PlxuICAgICAgICAgIDxkaXY+e2hvdXIgKyAnOicgKyBtaW51dGV9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbCBwYW5lbC1kZWZhdWx0IGFwcF9zZWN0aW9uJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWhlYWRpbmcnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC10aXRsZSc+PGg0Pnt0aGlzLnByb3BzLm5hbWV9PC9oND48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1ib2R5Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2NoZWR1bGVfZW50cnlfZ3JvdXAnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NjaGVkdWxlX2VudHJ5X2xhYmVsJz5TdGF0ZTo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMuc3RhdGV9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NjaGVkdWxlX2VudHJ5X2dyb3VwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzY2hlZHVsZV9lbnRyeV9sYWJlbCc+VHlwZTo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMudHlwZX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7ZW50cnl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=