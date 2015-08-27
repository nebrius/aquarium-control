define(['exports'], function (exports) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CTyxXQUFTLFdBQVcsQ0FBQyxFQUFFLEVBQUU7QUFDOUIsU0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7YUFBSyxRQUFRLENBQUMsSUFBSSxFQUFFO0tBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNyRTs7QUFFTSxXQUFTLFNBQVMsQ0FBQyxFQUFFLEVBQUU7QUFDNUIsU0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7YUFBSyxRQUFRLENBQUMsSUFBSSxFQUFFO0tBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNuRTs7QUFFTSxXQUFTLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFO0FBQ3pDLFNBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxlQUFlLEVBQUU7QUFDakMsWUFBTSxFQUFFLE1BQU07QUFDZCxhQUFPLEVBQUUsSUFBSSxPQUFPLENBQUM7QUFDbkIsc0JBQWMsRUFBRSxrQkFBa0I7T0FDbkMsQ0FBQztBQUNGLFVBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztLQUMvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7R0FDZCIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTMtMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjaGVkdWxlKGNiKSB7XG4gIGZldGNoKCcvYXBpL3NjaGVkdWxlJykudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSkudGhlbihjYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0dXMoY2IpIHtcbiAgZmV0Y2goJy9hcGkvc3RhdHVzJykudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSkudGhlbihjYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlU2NoZWR1bGUoc2NoZWR1bGUsIGNiKSB7XG4gIGZldGNoKG5ldyBSZXF1ZXN0KCcvYXBpL3NjaGVkdWxlJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICB9KSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzY2hlZHVsZSlcbiAgfSkpLnRoZW4oY2IpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9