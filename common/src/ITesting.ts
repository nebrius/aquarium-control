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

export interface ITestingEntry {
  time: number;
  ph: number;
  ammonia: number;
  nitrites: number;
  nitrates: number;
}

export interface ITesting {
  history: ITestingEntry[];
}

// Force to "any" type, otherwise TypeScript thinks the type is too strict
export const testingValidationSchema: any = {
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
