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

export function getSchedule(cb) {
  fetch('/api/schedule').then((response) => response.json()).then(cb);
}

export function getStatus(cb) {
  fetch('/api/status').then((response) => response.json()).then(cb);
}

export function saveSchedule(schedule, cb) {
  fetch(new Request('/api/schedule', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(schedule)
  })).then(cb);
}
