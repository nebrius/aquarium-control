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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL292ZXJyaWRlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQXFCZSxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDL0IsYUFBUyxFQUFBLG1CQUFDLENBQUMsRUFBRTtBQUNYLFVBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQy9DLFVBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQ3JDLDZCQU5HLGdDQUFnQyxFQU1GLEtBQUssQ0FBQyxDQUFDO09BQ3pDO0tBQ0Y7O0FBRUQsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsVUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7QUFDdkMsVUFBTSxVQUFVLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNqRixhQUNFOztVQUFLLFNBQVMsRUFBQyxvQkFBb0I7UUFDakM7O1lBQUssU0FBUyxFQUFDLDBDQUEwQyxFQUFDLElBQUksRUFBQyxPQUFPO1VBQ3BFOzs7QUFDSSxrQkFBSSxFQUFDLFFBQVE7QUFDYix1QkFBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxJQUFJLEtBQUssRUFBRSxDQUFDLEFBQUM7QUFDN0QscUJBQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxBQUFDOztXQUVuQjtVQUNUOzs7QUFDSSxrQkFBSSxFQUFDLFFBQVE7QUFDYix1QkFBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDLEFBQUM7QUFDL0QscUJBQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxBQUFDOztXQUVuQjtVQUNUOzs7QUFDSSxrQkFBSSxFQUFDLFFBQVE7QUFDYix1QkFBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxJQUFJLEtBQUssRUFBRSxDQUFDLEFBQUM7QUFDN0QscUJBQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxBQUFDOztXQUVuQjtTQUNMO09BQ0YsQ0FDTjtLQUNIO0dBQ0YsQ0FBQyIsImZpbGUiOiJ2aWV3cy9vdmVycmlkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlT3ZlcnJpZGVTdGF0ZUNoYW5nZWRBY3Rpb24gfSBmcm9tICdhY3Rpb25zL3NjaGVkdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBvbkNsaWNrZWQoZSkge1xuICAgIGNvbnN0IHN0YXRlID0gZS50YXJnZXQuaW5uZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHN0YXRlICE9IHRoaXMucHJvcHMub3ZlcnJpZGVTdGF0ZSkge1xuICAgICAgY3JlYXRlT3ZlcnJpZGVTdGF0ZUNoYW5nZWRBY3Rpb24oc3RhdGUpO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnByb3BzLm92ZXJyaWRlU3RhdGU7XG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IFsnb3ZlcnJpZGVfYnV0dG9uJywgJ2J0bicsICdidG4tZGVmYXVsdCcsICdidG4tbGcnLCAnYWN0aXZlJ107XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdvdmVycmlkZV9jb250YWluZXInPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnRuLWdyb3VwLXZlcnRpY2FsIG92ZXJyaWRlX2J1dHRvbl9ncm91cCcgcm9sZT0nZ3JvdXAnPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZShjbGFzc05hbWVzLCB7IGFjdGl2ZTogc3RhdGUgPT0gJ2RheScgfSl9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja2VkfT5cbiAgICAgICAgICAgIERheVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZShjbGFzc05hbWVzLCB7IGFjdGl2ZTogc3RhdGUgPT0gJ25pZ2h0JyB9KX1cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrZWR9PlxuICAgICAgICAgICAgTmlnaHRcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWUoY2xhc3NOYW1lcywgeyBhY3RpdmU6IHN0YXRlID09ICdvZmYnIH0pfVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tlZH0+XG4gICAgICAgICAgICBPZmZcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==