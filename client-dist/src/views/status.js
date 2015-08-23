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
    displayName: 'status',

    render: function render() {
      var serverTime = this.props.time ? new Date(this.props.time).toString() : '';
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'status_container' },
          React.createElement(
            'div',
            { className: 'status_label' },
            'Server Time:'
          ),
          React.createElement(
            'div',
            { className: 'status_value' },
            serverTime
          )
        ),
        React.createElement(
          'div',
          { className: 'status_container' },
          React.createElement(
            'div',
            { className: 'status_label' },
            'Lighting State:'
          ),
          React.createElement(
            'div',
            { className: 'status_value' },
            this.props.lightingState
          )
        ),
        React.createElement(
          'div',
          { className: 'status_container' },
          React.createElement(
            'div',
            { className: 'status_label' },
            'Next Transition At:'
          ),
          React.createElement(
            'div',
            { className: 'status_value' },
            this.props.nextTransitionTime
          )
        ),
        React.createElement(
          'div',
          { className: 'status_container' },
          React.createElement(
            'div',
            { className: 'status_label' },
            'Next Transition State:'
          ),
          React.createElement(
            'div',
            { className: 'status_value' },
            this.props.nextTransitionState
          )
        )
      );
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL3N0YXR1cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFtQmUsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQy9CLFVBQU0sRUFBQSxrQkFBRztBQUNQLFVBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEFBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDakYsYUFDRTs7O1FBQ0U7O1lBQUssU0FBUyxFQUFDLGtCQUFrQjtVQUMvQjs7Y0FBSyxTQUFTLEVBQUMsY0FBYzs7V0FBbUI7VUFDaEQ7O2NBQUssU0FBUyxFQUFDLGNBQWM7WUFBRSxVQUFVO1dBQU87U0FDNUM7UUFDTjs7WUFBSyxTQUFTLEVBQUMsa0JBQWtCO1VBQy9COztjQUFLLFNBQVMsRUFBQyxjQUFjOztXQUFzQjtVQUNuRDs7Y0FBSyxTQUFTLEVBQUMsY0FBYztZQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTtXQUFPO1NBQzFEO1FBQ047O1lBQUssU0FBUyxFQUFDLGtCQUFrQjtVQUMvQjs7Y0FBSyxTQUFTLEVBQUMsY0FBYzs7V0FBMEI7VUFDdkQ7O2NBQUssU0FBUyxFQUFDLGNBQWM7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQjtXQUFPO1NBQy9EO1FBQ047O1lBQUssU0FBUyxFQUFDLGtCQUFrQjtVQUMvQjs7Y0FBSyxTQUFTLEVBQUMsY0FBYzs7V0FBNkI7VUFDMUQ7O2NBQUssU0FBUyxFQUFDLGNBQWM7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQjtXQUFPO1NBQ2hFO09BQ0YsQ0FDTjtLQUNIO0dBQ0YsQ0FBQyIsImZpbGUiOiJ2aWV3cy9zdGF0dXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHNlcnZlclRpbWUgPSB0aGlzLnByb3BzLnRpbWUgPyAobmV3IERhdGUodGhpcy5wcm9wcy50aW1lKSkudG9TdHJpbmcoKSA6ICcnO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX2NvbnRhaW5lcic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c19sYWJlbCc+U2VydmVyIFRpbWU6PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c192YWx1ZSc+e3NlcnZlclRpbWV9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX2NvbnRhaW5lcic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c19sYWJlbCc+TGlnaHRpbmcgU3RhdGU6PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c192YWx1ZSc+e3RoaXMucHJvcHMubGlnaHRpbmdTdGF0ZX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0dXNfY29udGFpbmVyJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX2xhYmVsJz5OZXh0IFRyYW5zaXRpb24gQXQ6PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c192YWx1ZSc+e3RoaXMucHJvcHMubmV4dFRyYW5zaXRpb25UaW1lfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c19jb250YWluZXInPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0dXNfbGFiZWwnPk5leHQgVHJhbnNpdGlvbiBTdGF0ZTo8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX3ZhbHVlJz57dGhpcy5wcm9wcy5uZXh0VHJhbnNpdGlvblN0YXRlfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9