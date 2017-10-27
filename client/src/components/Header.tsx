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

import * as React from 'react';

export interface IHeaderProps {
  userName: string;
  deviceName: string;
}

export function Header(props: IHeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="header-side-content"></div>
      <div className="header-title">
        <h1>Aquarium Control</h1>
        <div>Connected to "{props.deviceName}"</div>
      </div>
      <div className="header-side-content">{props.userName}</div>
    </header>
  );
}
