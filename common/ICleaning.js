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
exports.cleaningValidationSchema = {
    type: 'object',
    properties: {
        time: {
            required: true,
            type: 'number'
        },
        bioFilterReplaced: {
            required: true,
            type: 'boolean'
        },
        mechanicalFilterReplaced: {
            required: true,
            type: 'boolean'
        },
        spongeReplaced: {
            required: true,
            type: 'boolean'
        },
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUNsZWFuaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL0lDbGVhbmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQWFGLDBFQUEwRTtBQUM3RCxRQUFBLHdCQUF3QixHQUFRO0lBQzNDLElBQUksRUFBRSxRQUFRO0lBQ2QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsaUJBQWlCLEVBQUU7WUFDakIsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNELHdCQUF3QixFQUFFO1lBQ3hCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLFNBQVM7U0FDaEI7UUFDRCxjQUFjLEVBQUU7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxTQUFTO1NBQ2hCO0tBQ0Y7Q0FDRixDQUFDIn0=