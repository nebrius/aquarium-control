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

export interface IRequestOptions {
  endpoint: string;
  method: 'GET' | 'POST';
  body?: object;
}

export function request(
  { endpoint, method, body }: IRequestOptions,
  cb: (err: Error | string | undefined, result?: any) => void
): void {
  const options: RequestInit = { method, credentials: 'same-origin' };
  if (body) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    options.headers = headers;
    options.body = JSON.stringify(body);
  }
  fetch(`/api/${endpoint}`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server returned ${res.statusText || res.status}`);
      }
      return res.json();
    })
    .then((data) => cb(undefined, data))
    .catch((err) => cb(err));
}
