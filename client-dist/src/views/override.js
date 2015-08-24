define(['exports', 'module', 'actions/schedule'], function (exports, module, _actionsSchedule) {
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
    displayName: 'override',

    onClicked: function onClicked(e) {
      var state = e.target.innerText.toLowerCase();
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
          { className: 'btn-group', role: 'group' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL292ZXJyaWRlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQXFCZSxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDL0IsYUFBUyxFQUFBLG1CQUFDLENBQUMsRUFBRTtBQUNYLFVBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQy9DLFVBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQ3JDLDZCQU5HLGdDQUFnQyxFQU1GLEtBQUssQ0FBQyxDQUFDO09BQ3pDO0tBQ0Y7O0FBRUQsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsVUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7QUFDdkMsVUFBTSxVQUFVLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNqRixhQUNFOztVQUFLLFNBQVMsRUFBQyxvQkFBb0I7UUFDakM7O1lBQUssU0FBUyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsT0FBTztVQUNyQzs7O0FBQ0ksa0JBQUksRUFBQyxRQUFRO0FBQ2IsdUJBQVMsRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssSUFBSSxLQUFLLEVBQUUsQ0FBQyxBQUFDO0FBQzdELHFCQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQUFBQzs7V0FFbkI7VUFDVDs7O0FBQ0ksa0JBQUksRUFBQyxRQUFRO0FBQ2IsdUJBQVMsRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQyxBQUFDO0FBQy9ELHFCQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQUFBQzs7V0FFbkI7VUFDVDs7O0FBQ0ksa0JBQUksRUFBQyxRQUFRO0FBQ2IsdUJBQVMsRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssSUFBSSxLQUFLLEVBQUUsQ0FBQyxBQUFDO0FBQzdELHFCQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQUFBQzs7V0FFbkI7U0FDTDtPQUNGLENBQ047S0FDSDtHQUNGLENBQUMiLCJmaWxlIjoidmlld3Mvb3ZlcnJpZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7IGNyZWF0ZU92ZXJyaWRlU3RhdGVDaGFuZ2VkQWN0aW9uIH0gZnJvbSAnYWN0aW9ucy9zY2hlZHVsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgb25DbGlja2VkKGUpIHtcbiAgICBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LmlubmVyVGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChzdGF0ZSAhPSB0aGlzLnByb3BzLm92ZXJyaWRlU3RhdGUpIHtcbiAgICAgIGNyZWF0ZU92ZXJyaWRlU3RhdGVDaGFuZ2VkQWN0aW9uKHN0YXRlKTtcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5wcm9wcy5vdmVycmlkZVN0YXRlO1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBbJ292ZXJyaWRlX2J1dHRvbicsICdidG4nLCAnYnRuLWRlZmF1bHQnLCAnYnRuLWxnJywgJ2FjdGl2ZSddO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nb3ZlcnJpZGVfY29udGFpbmVyJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J0bi1ncm91cCcgcm9sZT0nZ3JvdXAnPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZShjbGFzc05hbWVzLCB7IGFjdGl2ZTogc3RhdGUgPT0gJ2RheScgfSl9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja2VkfT5cbiAgICAgICAgICAgIERheVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZShjbGFzc05hbWVzLCB7IGFjdGl2ZTogc3RhdGUgPT0gJ25pZ2h0JyB9KX1cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrZWR9PlxuICAgICAgICAgICAgTmlnaHRcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWUoY2xhc3NOYW1lcywgeyBhY3RpdmU6IHN0YXRlID09ICdvZmYnIH0pfVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tlZH0+XG4gICAgICAgICAgICBPZmZcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==