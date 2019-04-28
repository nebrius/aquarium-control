"use strict";
/*
Copyright (C) 2013-2017 Bryan Hughes <bryan@nebri.us>

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
Object.defineProperty(exports, "__esModule", { value: true });
// Force to "any" type, otherwise TypeScript things the type is too strict
exports.configValidationSchema = {
    type: 'object',
    properties: {
        mode: {
            required: true,
            type: 'string',
            enum: ['program', 'override']
        },
        overrideState: {
            required: true,
            type: 'string',
            enum: ['day', 'night', 'off']
        },
        schedule: {
            required: true,
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        required: true,
                        type: 'string'
                    },
                    type: {
                        required: true,
                        type: 'string',
                        enum: ['dynamic', 'manual']
                    },
                    state: {
                        required: true,
                        type: 'string',
                        enum: ['day', 'night', 'off']
                    },
                    details: {
                        required: true,
                        oneOf: [{
                                type: 'object',
                                properties: {
                                    event: {
                                        required: true,
                                        type: 'string',
                                        enum: ['sunrise', 'sunset']
                                    }
                                }
                            }, {
                                type: 'object',
                                properties: {
                                    hour: {
                                        required: true,
                                        type: 'number'
                                    },
                                    minute: {
                                        required: true,
                                        type: 'number'
                                    }
                                }
                            }]
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9JQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBeUJGLDBFQUEwRTtBQUM3RCxRQUFBLHNCQUFzQixHQUFRO0lBQ3pDLElBQUksRUFBRSxRQUFRO0lBQ2QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxDQUFFLFNBQVMsRUFBRSxVQUFVLENBQUU7U0FDaEM7UUFDRCxhQUFhLEVBQUU7WUFDYixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxRQUFRO1lBQ2QsSUFBSSxFQUFFLENBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUU7U0FDaEM7UUFDRCxRQUFRLEVBQUU7WUFDUixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUU7d0JBQ0osUUFBUSxFQUFFLElBQUk7d0JBQ2QsSUFBSSxFQUFFLFFBQVE7cUJBQ2Y7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLFFBQVEsRUFBRSxJQUFJO3dCQUNkLElBQUksRUFBRSxRQUFRO3dCQUNkLElBQUksRUFBRSxDQUFFLFNBQVMsRUFBRSxRQUFRLENBQUU7cUJBQzlCO29CQUNELEtBQUssRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSTt3QkFDZCxJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsQ0FBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBRTtxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFFBQVEsRUFBRSxJQUFJO3dCQUNkLEtBQUssRUFBRSxDQUFDO2dDQUNOLElBQUksRUFBRSxRQUFRO2dDQUNkLFVBQVUsRUFBRTtvQ0FDVixLQUFLLEVBQUU7d0NBQ0wsUUFBUSxFQUFFLElBQUk7d0NBQ2QsSUFBSSxFQUFFLFFBQVE7d0NBQ2QsSUFBSSxFQUFFLENBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBRTtxQ0FDOUI7aUNBQ0Y7NkJBQ0YsRUFBRTtnQ0FDRCxJQUFJLEVBQUUsUUFBUTtnQ0FDZCxVQUFVLEVBQUU7b0NBQ1YsSUFBSSxFQUFFO3dDQUNKLFFBQVEsRUFBRSxJQUFJO3dDQUNkLElBQUksRUFBRSxRQUFRO3FDQUNmO29DQUNELE1BQU0sRUFBRTt3Q0FDTixRQUFRLEVBQUUsSUFBSTt3Q0FDZCxJQUFJLEVBQUUsUUFBUTtxQ0FDZjtpQ0FDRjs2QkFDRixDQUFDO3FCQUNIO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQyJ9