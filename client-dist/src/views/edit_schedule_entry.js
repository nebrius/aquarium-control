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
    displayName: 'edit_schedule_entry',

    onSaveClicked: function onSaveClicked() {
      (0, _actionsEntry_state.createEditSavedAction)();
    },
    onCancelClicked: function onCancelClicked() {
      (0, _actionsEntry_state.createEditCancelledAction)();
    },
    onStateClicked: function onStateClicked(e) {
      var state = e.target.value;
      if (this.props.state !== state) {
        debugger;
      }
    },
    render: function render() {
      var _this = this;

      var createStateRadioOptions = function createStateRadioOptions(label, checked) {
        var input = undefined;
        if (checked) {
          input = React.createElement('input', { type: 'radio', name: 'state_radios', onChange: _this.onStateClicked, value: label.toLowerCase(), checked: true });
        } else {
          input = React.createElement('input', { type: 'radio', name: 'state_radios', onChange: _this.onStateClicked, value: label.toLowerCase() });
        }
        return React.createElement(
          'div',
          { className: 'radio' },
          React.createElement(
            'label',
            null,
            input,
            label
          )
        );
      };
      return React.createElement(
        'div',
        { className: 'overlay' },
        React.createElement(
          'div',
          { className: 'popup_container' },
          React.createElement(
            'h2',
            { className: 'popup_header' },
            'Edit Schedule'
          ),
          React.createElement(
            'div',
            { className: 'popup_body' },
            React.createElement(
              'div',
              { className: 'form-group' },
              React.createElement(
                'label',
                null,
                'State'
              ),
              createStateRadioOptions('Day', this.props.state === 'day'),
              createStateRadioOptions('Night', this.props.state === 'night'),
              createStateRadioOptions('Off', this.props.state === 'off')
            ),
            React.createElement(
              'div',
              { className: 'dialog_buttons' },
              React.createElement(
                'button',
                { style: { marginRight: 20 }, className: 'btn btn-danger popup_button', onClick: this.onSaveClicked },
                'Save'
              ),
              React.createElement(
                'button',
                { className: 'btn btn-default popup_button', onClick: this.onCancelClicked },
                'Cancel'
              )
            )
          )
        )
      );
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2VkaXRfc2NoZWR1bGVfZW50cnkuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBcUJlLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMvQixpQkFBYSxFQUFBLHlCQUFHO0FBQ2QsOEJBSksscUJBQXFCLEdBSUgsQ0FBQztLQUN6QjtBQUNELG1CQUFlLEVBQUEsMkJBQUc7QUFDaEIsOEJBUDRCLHlCQUF5QixHQU8xQixDQUFDO0tBQzdCO0FBQ0Qsa0JBQWMsRUFBQSx3QkFBQyxDQUFDLEVBQUU7QUFDaEIsVUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDN0IsVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7QUFDOUIsaUJBQVM7T0FDVjtLQUNGO0FBQ0QsVUFBTSxFQUFBLGtCQUFHOzs7QUFDUCxVQUFNLHVCQUF1QixHQUFHLFNBQTFCLHVCQUF1QixDQUFJLEtBQUssRUFBRSxPQUFPLEVBQUs7QUFDbEQsWUFBSSxLQUFLLFlBQUEsQ0FBQztBQUNWLFlBQUksT0FBTyxFQUFFO0FBQ1gsZUFBSyxHQUFHLCtCQUFPLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUUsTUFBSyxjQUFjLEFBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxBQUFDLEVBQUMsT0FBTyxNQUFBLEdBQUcsQ0FBQztTQUN2SCxNQUFNO0FBQ0wsZUFBSyxHQUFHLCtCQUFPLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUUsTUFBSyxjQUFjLEFBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxBQUFDLEdBQUcsQ0FBQztTQUMvRztBQUNELGVBQ0U7O1lBQUssU0FBUyxFQUFDLE9BQU87VUFDcEI7OztZQUNHLEtBQUs7WUFDTCxLQUFLO1dBQ0E7U0FDSixDQUNOO09BQ0gsQ0FBQztBQUNGLGFBQ0U7O1VBQUssU0FBUyxFQUFDLFNBQVM7UUFDdEI7O1lBQUssU0FBUyxFQUFDLGlCQUFpQjtVQUM5Qjs7Y0FBSSxTQUFTLEVBQUMsY0FBYzs7V0FBbUI7VUFDL0M7O2NBQUssU0FBUyxFQUFDLFlBQVk7WUFDekI7O2dCQUFLLFNBQVMsRUFBQyxZQUFZO2NBQ3pCOzs7O2VBQW9CO2NBQ25CLHVCQUF1QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7Y0FDMUQsdUJBQXVCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQztjQUM5RCx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO2FBQ3ZEO1lBQ047O2dCQUFLLFNBQVMsRUFBQyxnQkFBZ0I7Y0FDN0I7O2tCQUFRLEtBQUssRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsQUFBQyxFQUFDLFNBQVMsRUFBQyw2QkFBNkIsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQUFBQzs7ZUFBYztjQUN0SDs7a0JBQVEsU0FBUyxFQUFDLDhCQUE4QixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZSxBQUFDOztlQUFnQjthQUMzRjtXQUNGO1NBQ0Y7T0FDRixDQUNOO0tBQ0g7R0FDRixDQUFDIiwiZmlsZSI6InZpZXdzL2VkaXRfc2NoZWR1bGVfZW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTMtMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlRWRpdFNhdmVkQWN0aW9uLCBjcmVhdGVFZGl0Q2FuY2VsbGVkQWN0aW9uIH0gZnJvbSAnYWN0aW9ucy9lbnRyeV9zdGF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgb25TYXZlQ2xpY2tlZCgpIHtcbiAgICBjcmVhdGVFZGl0U2F2ZWRBY3Rpb24oKTtcbiAgfSxcbiAgb25DYW5jZWxDbGlja2VkKCkge1xuICAgIGNyZWF0ZUVkaXRDYW5jZWxsZWRBY3Rpb24oKTtcbiAgfSxcbiAgb25TdGF0ZUNsaWNrZWQoZSkge1xuICAgIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWU7XG4gICAgaWYgKHRoaXMucHJvcHMuc3RhdGUgIT09IHN0YXRlKSB7XG4gICAgICBkZWJ1Z2dlcjtcbiAgICB9XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjcmVhdGVTdGF0ZVJhZGlvT3B0aW9ucyA9IChsYWJlbCwgY2hlY2tlZCkgPT4ge1xuICAgICAgbGV0IGlucHV0O1xuICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgaW5wdXQgPSA8aW5wdXQgdHlwZT0ncmFkaW8nIG5hbWU9J3N0YXRlX3JhZGlvcycgb25DaGFuZ2U9e3RoaXMub25TdGF0ZUNsaWNrZWR9IHZhbHVlPXtsYWJlbC50b0xvd2VyQ2FzZSgpfSBjaGVja2VkIC8+O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXQgPSA8aW5wdXQgdHlwZT0ncmFkaW8nIG5hbWU9J3N0YXRlX3JhZGlvcycgb25DaGFuZ2U9e3RoaXMub25TdGF0ZUNsaWNrZWR9IHZhbHVlPXtsYWJlbC50b0xvd2VyQ2FzZSgpfSAvPjtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyYWRpbyc+XG4gICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAge2lucHV0fVxuICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nb3ZlcmxheSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwb3B1cF9jb250YWluZXInPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9J3BvcHVwX2hlYWRlcic+RWRpdCBTY2hlZHVsZTwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BvcHVwX2JvZHknPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Zvcm0tZ3JvdXAnPlxuICAgICAgICAgICAgICA8bGFiZWw+U3RhdGU8L2xhYmVsPlxuICAgICAgICAgICAgICB7Y3JlYXRlU3RhdGVSYWRpb09wdGlvbnMoJ0RheScsIHRoaXMucHJvcHMuc3RhdGUgPT09ICdkYXknKX1cbiAgICAgICAgICAgICAge2NyZWF0ZVN0YXRlUmFkaW9PcHRpb25zKCdOaWdodCcsIHRoaXMucHJvcHMuc3RhdGUgPT09ICduaWdodCcpfVxuICAgICAgICAgICAgICB7Y3JlYXRlU3RhdGVSYWRpb09wdGlvbnMoJ09mZicsIHRoaXMucHJvcHMuc3RhdGUgPT09ICdvZmYnKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2RpYWxvZ19idXR0b25zJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyBtYXJnaW5SaWdodDogMjAgfX0gY2xhc3NOYW1lPSdidG4gYnRuLWRhbmdlciBwb3B1cF9idXR0b24nIG9uQ2xpY2s9e3RoaXMub25TYXZlQ2xpY2tlZH0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnRuIGJ0bi1kZWZhdWx0IHBvcHVwX2J1dHRvbicgb25DbGljaz17dGhpcy5vbkNhbmNlbENsaWNrZWR9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9