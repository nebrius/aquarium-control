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

  module.exports = Object.freeze({
    SCHEDULE_UPDATED: 'SCHEDULE_UPDATED',
    OVERRIDE_STATE_CHANGED: 'OVERRIDE_STATE_CHANGED',
    MODE_CHANGED: 'MODE_CHANGED',
    REQUEST_DELETE: 'REQUEST_DELETE',
    CANCEL_DELETE: 'CANCEL_DELETE',
    CONFIRM_DELETE: 'CONFIRM_DELETE',
    REQUEST_EDIT: 'REQUEST_EDIT',
    STATUS_UPDATED: 'STATUS_UPDATED'
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFtQmUsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUMzQixvQkFBZ0IsRUFBRSxrQkFBa0I7QUFDcEMsMEJBQXNCLEVBQUUsd0JBQXdCO0FBQ2hELGdCQUFZLEVBQUUsY0FBYztBQUM1QixrQkFBYyxFQUFFLGdCQUFnQjtBQUNoQyxpQkFBYSxFQUFFLGVBQWU7QUFDOUIsa0JBQWMsRUFBRSxnQkFBZ0I7QUFDaEMsZ0JBQVksRUFBRSxjQUFjO0FBQzVCLGtCQUFjLEVBQUUsZ0JBQWdCO0dBQ2pDLENBQUMiLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAoQykgMjAxNSAgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cbiAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgQXF1YXJpdW0gQ29udHJvbC5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICBBcXVhcml1bSBDb250cm9sIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICBhbG9uZyB3aXRoIEFxdWFyaXVtIENvbnRyb2wuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmZyZWV6ZSh7XG4gIFNDSEVEVUxFX1VQREFURUQ6ICdTQ0hFRFVMRV9VUERBVEVEJyxcbiAgT1ZFUlJJREVfU1RBVEVfQ0hBTkdFRDogJ09WRVJSSURFX1NUQVRFX0NIQU5HRUQnLFxuICBNT0RFX0NIQU5HRUQ6ICdNT0RFX0NIQU5HRUQnLFxuICBSRVFVRVNUX0RFTEVURTogJ1JFUVVFU1RfREVMRVRFJyxcbiAgQ0FOQ0VMX0RFTEVURTogJ0NBTkNFTF9ERUxFVEUnLFxuICBDT05GSVJNX0RFTEVURTogJ0NPTkZJUk1fREVMRVRFJyxcbiAgUkVRVUVTVF9FRElUOiAnUkVRVUVTVF9FRElUJyxcbiAgU1RBVFVTX1VQREFURUQ6ICdTVEFUVVNfVVBEQVRFRCdcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9