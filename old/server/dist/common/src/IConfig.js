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
// Force to "any" type, otherwise TypeScript thinks the type is too strict
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vc3JjL0lDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7QUF5QkYsMEVBQTBFO0FBQzdELFFBQUEsc0JBQXNCLEdBQVE7SUFDekMsSUFBSSxFQUFFLFFBQVE7SUFDZCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxRQUFRO1lBQ2QsSUFBSSxFQUFFLENBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBRTtTQUNoQztRQUNELGFBQWEsRUFBRTtZQUNiLFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsQ0FBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBRTtTQUNoQztRQUNELFFBQVEsRUFBRTtZQUNSLFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRTt3QkFDSixRQUFRLEVBQUUsSUFBSTt3QkFDZCxJQUFJLEVBQUUsUUFBUTtxQkFDZjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osUUFBUSxFQUFFLElBQUk7d0JBQ2QsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsSUFBSSxFQUFFLENBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBRTtxQkFDOUI7b0JBQ0QsS0FBSyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJO3dCQUNkLElBQUksRUFBRSxRQUFRO3dCQUNkLElBQUksRUFBRSxDQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFFO3FCQUNoQztvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsUUFBUSxFQUFFLElBQUk7d0JBQ2QsS0FBSyxFQUFFLENBQUM7Z0NBQ04sSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsVUFBVSxFQUFFO29DQUNWLEtBQUssRUFBRTt3Q0FDTCxRQUFRLEVBQUUsSUFBSTt3Q0FDZCxJQUFJLEVBQUUsUUFBUTt3Q0FDZCxJQUFJLEVBQUUsQ0FBRSxTQUFTLEVBQUUsUUFBUSxDQUFFO3FDQUM5QjtpQ0FDRjs2QkFDRixFQUFFO2dDQUNELElBQUksRUFBRSxRQUFRO2dDQUNkLFVBQVUsRUFBRTtvQ0FDVixJQUFJLEVBQUU7d0NBQ0osUUFBUSxFQUFFLElBQUk7d0NBQ2QsSUFBSSxFQUFFLFFBQVE7cUNBQ2Y7b0NBQ0QsTUFBTSxFQUFFO3dDQUNOLFFBQVEsRUFBRSxJQUFJO3dDQUNkLElBQUksRUFBRSxRQUFRO3FDQUNmO2lDQUNGOzZCQUNGLENBQUM7cUJBQ0g7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=