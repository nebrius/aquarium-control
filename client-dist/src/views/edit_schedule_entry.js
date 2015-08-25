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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2VkaXRfc2NoZWR1bGVfZW50cnkuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBcUJlLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMvQixpQkFBYSxFQUFBLHlCQUFHO0FBQ2QsOEJBSksscUJBQXFCLEdBSUgsQ0FBQztLQUN6QjtBQUNELG1CQUFlLEVBQUEsMkJBQUc7QUFDaEIsOEJBUDRCLHlCQUF5QixHQU8xQixDQUFDO0tBQzdCO0FBQ0Qsa0JBQWMsRUFBQSx3QkFBQyxDQUFDLEVBQUU7QUFDaEIsVUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDN0IsVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7QUFDOUIsaUJBQVM7T0FDVjtLQUNGO0FBQ0QsVUFBTSxFQUFBLGtCQUFHOzs7QUFDUCxVQUFNLHVCQUF1QixHQUFHLFNBQTFCLHVCQUF1QixDQUFJLEtBQUssRUFBRSxPQUFPLEVBQUs7QUFDbEQsWUFBSSxLQUFLLFlBQUEsQ0FBQztBQUNWLFlBQUksT0FBTyxFQUFFO0FBQ1gsZUFBSyxHQUFHLCtCQUFPLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUUsTUFBSyxjQUFjLEFBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxBQUFDLEVBQUMsT0FBTyxNQUFBLEdBQUcsQ0FBQztTQUN2SCxNQUFNO0FBQ0wsZUFBSyxHQUFHLCtCQUFPLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUUsTUFBSyxjQUFjLEFBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxBQUFDLEdBQUcsQ0FBQztTQUMvRztBQUNELGVBQ0U7O1lBQUssU0FBUyxFQUFDLE9BQU87VUFDcEI7OztZQUNHLEtBQUs7WUFDTCxLQUFLO1dBQ0E7U0FDSixDQUNOO09BQ0gsQ0FBQztBQUNGLGFBQ0U7O1VBQUssU0FBUyxFQUFDLFNBQVM7UUFDdEI7O1lBQUssU0FBUyxFQUFDLGlCQUFpQjtVQUM5Qjs7Y0FBSSxTQUFTLEVBQUMsY0FBYzs7V0FBbUI7VUFDL0M7O2NBQUssU0FBUyxFQUFDLFlBQVk7WUFDekI7O2dCQUFLLFNBQVMsRUFBQyxZQUFZO2NBQ3pCOzs7O2VBQW9CO2NBQ25CLHVCQUF1QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7Y0FDMUQsdUJBQXVCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQztjQUM5RCx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO2FBQ3ZEO1lBQ047O2dCQUFLLFNBQVMsRUFBQyxnQkFBZ0I7Y0FDN0I7O2tCQUFRLEtBQUssRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsQUFBQyxFQUFDLFNBQVMsRUFBQyw2QkFBNkIsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQUFBQzs7ZUFBYztjQUN0SDs7a0JBQVEsU0FBUyxFQUFDLDhCQUE4QixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZSxBQUFDOztlQUFnQjthQUMzRjtXQUNGO1NBQ0Y7T0FDRixDQUNOO0tBQ0g7R0FDRixDQUFDIiwiZmlsZSI6InZpZXdzL2VkaXRfc2NoZWR1bGVfZW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7IGNyZWF0ZUVkaXRTYXZlZEFjdGlvbiwgY3JlYXRlRWRpdENhbmNlbGxlZEFjdGlvbiB9IGZyb20gJ2FjdGlvbnMvZW50cnlfc3RhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG9uU2F2ZUNsaWNrZWQoKSB7XG4gICAgY3JlYXRlRWRpdFNhdmVkQWN0aW9uKCk7XG4gIH0sXG4gIG9uQ2FuY2VsQ2xpY2tlZCgpIHtcbiAgICBjcmVhdGVFZGl0Q2FuY2VsbGVkQWN0aW9uKCk7XG4gIH0sXG4gIG9uU3RhdGVDbGlja2VkKGUpIHtcbiAgICBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIGlmICh0aGlzLnByb3BzLnN0YXRlICE9PSBzdGF0ZSkge1xuICAgICAgZGVidWdnZXI7XG4gICAgfVxuICB9LFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY3JlYXRlU3RhdGVSYWRpb09wdGlvbnMgPSAobGFiZWwsIGNoZWNrZWQpID0+IHtcbiAgICAgIGxldCBpbnB1dDtcbiAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgIGlucHV0ID0gPGlucHV0IHR5cGU9J3JhZGlvJyBuYW1lPSdzdGF0ZV9yYWRpb3MnIG9uQ2hhbmdlPXt0aGlzLm9uU3RhdGVDbGlja2VkfSB2YWx1ZT17bGFiZWwudG9Mb3dlckNhc2UoKX0gY2hlY2tlZCAvPjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0ID0gPGlucHV0IHR5cGU9J3JhZGlvJyBuYW1lPSdzdGF0ZV9yYWRpb3MnIG9uQ2hhbmdlPXt0aGlzLm9uU3RhdGVDbGlja2VkfSB2YWx1ZT17bGFiZWwudG9Mb3dlckNhc2UoKX0gLz47XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmFkaW8nPlxuICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIHtpbnB1dH1cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J292ZXJsYXknPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncG9wdXBfY29udGFpbmVyJz5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPSdwb3B1cF9oZWFkZXInPkVkaXQgU2NoZWR1bGU8L2gyPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwb3B1cF9ib2R5Jz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmb3JtLWdyb3VwJz5cbiAgICAgICAgICAgICAgPGxhYmVsPlN0YXRlPC9sYWJlbD5cbiAgICAgICAgICAgICAge2NyZWF0ZVN0YXRlUmFkaW9PcHRpb25zKCdEYXknLCB0aGlzLnByb3BzLnN0YXRlID09PSAnZGF5Jyl9XG4gICAgICAgICAgICAgIHtjcmVhdGVTdGF0ZVJhZGlvT3B0aW9ucygnTmlnaHQnLCB0aGlzLnByb3BzLnN0YXRlID09PSAnbmlnaHQnKX1cbiAgICAgICAgICAgICAge2NyZWF0ZVN0YXRlUmFkaW9PcHRpb25zKCdPZmYnLCB0aGlzLnByb3BzLnN0YXRlID09PSAnb2ZmJyl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkaWFsb2dfYnV0dG9ucyc+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgbWFyZ2luUmlnaHQ6IDIwIH19IGNsYXNzTmFtZT0nYnRuIGJ0bi1kYW5nZXIgcG9wdXBfYnV0dG9uJyBvbkNsaWNrPXt0aGlzLm9uU2F2ZUNsaWNrZWR9PlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J0biBidG4tZGVmYXVsdCBwb3B1cF9idXR0b24nIG9uQ2xpY2s9e3RoaXMub25DYW5jZWxDbGlja2VkfT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==