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
exports.testingValidationSchema = {
    type: 'object',
    properties: {
        time: {
            required: true,
            type: 'number'
        },
        ph: {
            required: true,
            type: 'number'
        },
        ammonia: {
            required: true,
            type: 'number'
        },
        nitrites: {
            required: true,
            type: 'number'
        },
        nitrates: {
            required: true,
            type: 'number'
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSVRlc3RpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL3NyYy9JVGVzdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQWNGLDBFQUEwRTtBQUM3RCxRQUFBLHVCQUF1QixHQUFRO0lBQzFDLElBQUksRUFBRSxRQUFRO0lBQ2QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsRUFBRSxFQUFFO1lBQ0YsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsUUFBUTtTQUNmO0tBQ0Y7Q0FDRixDQUFDIn0=