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
      function formatDate(time) {
        return time ? new Date(time).toString() : '';
      }
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
            formatDate(this.props.time)
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
            this.props.state
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
            formatDate(this.props.nextTransitionTime)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL3N0YXR1cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFtQmUsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQy9CLFVBQU0sRUFBQSxrQkFBRztBQUNQLGVBQVMsVUFBVSxDQUFDLElBQUksRUFBRTtBQUN4QixlQUFPLElBQUksR0FBRyxBQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQztPQUNoRDtBQUNELGFBQ0U7OztRQUNFOztZQUFLLFNBQVMsRUFBQyxrQkFBa0I7VUFDL0I7O2NBQUssU0FBUyxFQUFDLGNBQWM7O1dBQW1CO1VBQ2hEOztjQUFLLFNBQVMsRUFBQyxjQUFjO1lBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1dBQU87U0FDN0Q7UUFDTjs7WUFBSyxTQUFTLEVBQUMsa0JBQWtCO1VBQy9COztjQUFLLFNBQVMsRUFBQyxjQUFjOztXQUFzQjtVQUNuRDs7Y0FBSyxTQUFTLEVBQUMsY0FBYztZQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztXQUFPO1NBQ2xEO1FBQ047O1lBQUssU0FBUyxFQUFDLGtCQUFrQjtVQUMvQjs7Y0FBSyxTQUFTLEVBQUMsY0FBYzs7V0FBMEI7VUFDdkQ7O2NBQUssU0FBUyxFQUFDLGNBQWM7WUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztXQUFPO1NBQzNFO1FBQ047O1lBQUssU0FBUyxFQUFDLGtCQUFrQjtVQUMvQjs7Y0FBSyxTQUFTLEVBQUMsY0FBYzs7V0FBNkI7VUFDMUQ7O2NBQUssU0FBUyxFQUFDLGNBQWM7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQjtXQUFPO1NBQ2hFO09BQ0YsQ0FDTjtLQUNIO0dBQ0YsQ0FBQyIsImZpbGUiOiJ2aWV3cy9zdGF0dXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTMtMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXIoKSB7XG4gICAgZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lKSB7XG4gICAgICByZXR1cm4gdGltZSA/IChuZXcgRGF0ZSh0aW1lKSkudG9TdHJpbmcoKSA6ICcnO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c19jb250YWluZXInPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0dXNfbGFiZWwnPlNlcnZlciBUaW1lOjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0dXNfdmFsdWUnPntmb3JtYXREYXRlKHRoaXMucHJvcHMudGltZSl9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX2NvbnRhaW5lcic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c19sYWJlbCc+TGlnaHRpbmcgU3RhdGU6PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c192YWx1ZSc+e3RoaXMucHJvcHMuc3RhdGV9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX2NvbnRhaW5lcic+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c19sYWJlbCc+TmV4dCBUcmFuc2l0aW9uIEF0OjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0dXNfdmFsdWUnPntmb3JtYXREYXRlKHRoaXMucHJvcHMubmV4dFRyYW5zaXRpb25UaW1lKX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0dXNfY29udGFpbmVyJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhdHVzX2xhYmVsJz5OZXh0IFRyYW5zaXRpb24gU3RhdGU6PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0YXR1c192YWx1ZSc+e3RoaXMucHJvcHMubmV4dFRyYW5zaXRpb25TdGF0ZX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==