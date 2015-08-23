define(['exports'], function (exports) {
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

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.getSchedule = getSchedule;
  exports.getStatus = getStatus;
  exports.saveSchedule = saveSchedule;

  function getSchedule(cb) {
    fetch('/api/schedule').then(function (response) {
      return response.json();
    }).then(cb);
  }

  function getStatus(cb) {
    fetch('/api/status').then(function (response) {
      return response.json();
    }).then(cb);
  }

  function saveSchedule(schedule, cb) {
    fetch(new Request('/api/schedule', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(schedule)
    })).then(cb);
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CTyxXQUFTLFdBQVcsQ0FBQyxFQUFFLEVBQUU7QUFDOUIsU0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7YUFBSyxRQUFRLENBQUMsSUFBSSxFQUFFO0tBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNyRTs7QUFFTSxXQUFTLFNBQVMsQ0FBQyxFQUFFLEVBQUU7QUFDNUIsU0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7YUFBSyxRQUFRLENBQUMsSUFBSSxFQUFFO0tBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNuRTs7QUFFTSxXQUFTLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFO0FBQ3pDLFNBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxlQUFlLEVBQUU7QUFDakMsWUFBTSxFQUFFLE1BQU07QUFDZCxhQUFPLEVBQUUsSUFBSSxPQUFPLENBQUM7QUFDbkIsc0JBQWMsRUFBRSxrQkFBa0I7T0FDbkMsQ0FBQztBQUNGLFVBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztLQUMvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7R0FDZCIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTUgIEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG4gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFxdWFyaXVtIENvbnRyb2wuXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgQXF1YXJpdW0gQ29udHJvbCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgYWxvbmcgd2l0aCBBcXVhcml1bSBDb250cm9sLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2hlZHVsZShjYikge1xuICBmZXRjaCgnL2FwaS9zY2hlZHVsZScpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpLnRoZW4oY2IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhdHVzKGNiKSB7XG4gIGZldGNoKCcvYXBpL3N0YXR1cycpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpLnRoZW4oY2IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVNjaGVkdWxlKHNjaGVkdWxlLCBjYikge1xuICBmZXRjaChuZXcgUmVxdWVzdCgnL2FwaS9zY2hlZHVsZScsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2NoZWR1bGUpXG4gIH0pKS50aGVuKGNiKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==