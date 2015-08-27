define(['exports', 'module'], function (exports, module) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL3N0YXR1cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFtQmUsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQy9CLFVBQU0sRUFBQSxrQkFBRztBQUNQLFVBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEFBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDakYsYUFDRTs7O1FBQ0U7O1lBQUssU0FBUyxFQUFDLGtCQUFrQjtVQUMvQjs7Y0FBSyxTQUFTLEVBQUMsY0FBYzs7V0FBbUI7VUFDaEQ7O2NBQUssU0FBUyxFQUFDLGNBQWM7WUFBRSxVQUFVO1dBQU87U0FDNUM7UUFDTjs7WUFBSyxTQUFTLEVBQUMsa0JBQWtCO1VBQy9COztjQUFLLFNBQVMsRUFBQyxjQUFjOztXQUFzQjtVQUNuRDs7Y0FBSyxTQUFTLEVBQUMsY0FBYztZQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTtXQUFPO1NBQzFEO1FBQ047O1lBQUssU0FBUyxFQUFDLGtCQUFrQjtVQUMvQjs7Y0FBSyxTQUFTLEVBQUMsY0FBYzs7V0FBMEI7VUFDdkQ7O2NBQUssU0FBUyxFQUFDLGNBQWM7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQjtXQUFPO1NBQy9EO1FBQ047O1lBQUssU0FBUyxFQUFDLGtCQUFrQjtVQUMvQjs7Y0FBSyxTQUFTLEVBQUMsY0FBYzs7V0FBNkI7VUFDMUQ7O2NBQUssU0FBUyxFQUFDLGNBQWM7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQjtXQUFPO1NBQ2hFO09BQ0YsQ0FDTjtLQUNIO0dBQ0YsQ0FBQyIsImZpbGUiOiJ2aWV3cy9zdGF0dXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTMtMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc2VydmVyVGltZSA9IHRoaXMucHJvcHMudGltZSA/IChuZXcgRGF0ZSh0aGlzLnByb3BzLnRpbWUpKS50b1N0cmluZygpIDogJyc7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0dXNfY29udGFpbmVyJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX2xhYmVsJz5TZXJ2ZXIgVGltZTo8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX3ZhbHVlJz57c2VydmVyVGltZX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0dXNfY29udGFpbmVyJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX2xhYmVsJz5MaWdodGluZyBTdGF0ZTo8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX3ZhbHVlJz57dGhpcy5wcm9wcy5saWdodGluZ1N0YXRlfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c19jb250YWluZXInPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0dXNfbGFiZWwnPk5leHQgVHJhbnNpdGlvbiBBdDo8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX3ZhbHVlJz57dGhpcy5wcm9wcy5uZXh0VHJhbnNpdGlvblRpbWV9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX2NvbnRhaW5lcic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c19sYWJlbCc+TmV4dCBUcmFuc2l0aW9uIFN0YXRlOjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0dXNfdmFsdWUnPnt0aGlzLnByb3BzLm5leHRUcmFuc2l0aW9uU3RhdGV9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=