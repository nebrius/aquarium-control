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
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUNsZWFuaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zcmMvSUNsZWFuaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBYUYsMEVBQTBFO0FBQzdELFFBQUEsd0JBQXdCLEdBQVE7SUFDM0MsSUFBSSxFQUFFLFFBQVE7SUFDZCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxpQkFBaUIsRUFBRTtZQUNqQixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxTQUFTO1NBQ2hCO1FBQ0Qsd0JBQXdCLEVBQUU7WUFDeEIsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNELGNBQWMsRUFBRTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLFNBQVM7U0FDaEI7S0FDRjtDQUNGLENBQUMifQ==