define(['exports', 'module'], function (exports, module) {
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
          entry,
          React.createElement(
            'div',
            { className: 'schedule_entry_button_container' },
            React.createElement(
              'button',
              { className: 'btn btn-primary schedule_entry_button' },
              'Edit'
            ),
            React.createElement(
              'button',
              { className: 'btn btn-danger schedule_entry_button' },
              'Delete'
            )
          )
        )
      );
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL3NjaGVkdWxlX2VudHJ5LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQW1CZSxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDL0IsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsVUFBSSxLQUFLLFlBQUEsQ0FBQztBQUNWLFVBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksU0FBUyxFQUFFO0FBQ2hDLGFBQUssR0FDSDs7WUFBSyxTQUFTLEVBQUMsc0JBQXNCO1VBQ25DOztjQUFLLFNBQVMsRUFBQyxzQkFBc0I7O1dBQWE7VUFDbEQ7OztZQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtXQUFPO1NBQ2hDLEFBQ1AsQ0FBQztPQUNILE1BQU07QUFDTCxZQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDakQsWUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3JELFlBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7QUFDdEIsZ0JBQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCO0FBQ0QsYUFBSyxHQUNIOztZQUFLLFNBQVMsRUFBQyxzQkFBc0I7VUFDbkM7O2NBQUssU0FBUyxFQUFDLHNCQUFzQjs7V0FBWTtVQUNqRDs7O1lBQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNO1dBQU87U0FDNUIsQUFDUCxDQUFDO09BQ0g7QUFDRCxhQUNFOztVQUFLLFNBQVMsRUFBQyxpQ0FBaUM7UUFDOUM7O1lBQUssU0FBUyxFQUFDLGVBQWU7VUFDNUI7O2NBQUssU0FBUyxFQUFDLGFBQWE7WUFBQzs7O2NBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO2FBQU07V0FBTTtTQUN6RDtRQUNOOztZQUFLLFNBQVMsRUFBQyxZQUFZO1VBQ3pCOztjQUFLLFNBQVMsRUFBQyxzQkFBc0I7WUFDbkM7O2dCQUFLLFNBQVMsRUFBQyxzQkFBc0I7O2FBQWE7WUFDbEQ7OztjQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSzthQUFPO1dBQ3pCO1VBQ047O2NBQUssU0FBUyxFQUFDLHNCQUFzQjtZQUNuQzs7Z0JBQUssU0FBUyxFQUFDLHNCQUFzQjs7YUFBWTtZQUNqRDs7O2NBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO2FBQU87V0FDeEI7VUFDTCxLQUFLO1VBQ047O2NBQUssU0FBUyxFQUFDLGlDQUFpQztZQUM5Qzs7Z0JBQVEsU0FBUyxFQUFDLHVDQUF1Qzs7YUFBYztZQUN2RTs7Z0JBQVEsU0FBUyxFQUFDLHNDQUFzQzs7YUFBZ0I7V0FDcEU7U0FDRjtPQUNGLENBQ047S0FDSDtHQUNGLENBQUMiLCJmaWxlIjoidmlld3Mvc2NoZWR1bGVfZW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCkge1xuICAgIGxldCBlbnRyeTtcbiAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdkeW5hbWljJykge1xuICAgICAgZW50cnkgPSAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzY2hlZHVsZV9lbnRyeV9ncm91cCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NjaGVkdWxlX2VudHJ5X2xhYmVsJz5FdmVudDo8L2Rpdj5cbiAgICAgICAgICA8ZGl2Pnt0aGlzLnByb3BzLmR5bmFtaWNFdmVudH08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaG91ciA9IHRoaXMucHJvcHMubWFudWFsVGltZS5ob3VyLnRvU3RyaW5nKCk7XG4gICAgICBsZXQgbWludXRlID0gdGhpcy5wcm9wcy5tYW51YWxUaW1lLm1pbnV0ZS50b1N0cmluZygpO1xuICAgICAgaWYgKG1pbnV0ZS5sZW5ndGggPT0gMSkge1xuICAgICAgICBtaW51dGUgPSAnMCcgKyBtaW51dGU7XG4gICAgICB9XG4gICAgICBlbnRyeSA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NjaGVkdWxlX2VudHJ5X2dyb3VwJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2NoZWR1bGVfZW50cnlfbGFiZWwnPlRpbWU6PC9kaXY+XG4gICAgICAgICAgPGRpdj57aG91ciArICc6JyArIG1pbnV0ZX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsIHBhbmVsLWRlZmF1bHQgYXBwX3NlY3Rpb24nPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtaGVhZGluZyc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLXRpdGxlJz48aDQ+e3RoaXMucHJvcHMubmFtZX08L2g0PjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWJvZHknPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzY2hlZHVsZV9lbnRyeV9ncm91cCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2NoZWR1bGVfZW50cnlfbGFiZWwnPlN0YXRlOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy5zdGF0ZX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2NoZWR1bGVfZW50cnlfZ3JvdXAnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NjaGVkdWxlX2VudHJ5X2xhYmVsJz5UeXBlOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy50eXBlfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtlbnRyeX1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2NoZWR1bGVfZW50cnlfYnV0dG9uX2NvbnRhaW5lcic+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnRuIGJ0bi1wcmltYXJ5IHNjaGVkdWxlX2VudHJ5X2J1dHRvbic+RWRpdDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J0biBidG4tZGFuZ2VyIHNjaGVkdWxlX2VudHJ5X2J1dHRvbic+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=