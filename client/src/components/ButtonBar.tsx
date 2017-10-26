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
import * as classNames from 'classnames';

export interface IButtonBarItem {
  displayName: string;
  valueName: string;
}

export interface IButtonBarProps {
  items: IButtonBarItem[];
  onItemSelected: (valueName: string) => void;
  defaultValueName: string;
}

interface IButtonBarState {
  currentValueName: string;
}

export class ButtonBar extends React.Component<IButtonBarProps, IButtonBarState> {

  constructor(props: IButtonBarProps) {
    super(props);
    this._handleItemClick = this._handleItemClick.bind(this);
    this.state = {
      currentValueName: this.props.defaultValueName
    };
  }

  public render() {
    const props = this.props;
    const buttons = props.items.map((item) => {
      return (
        <button
          type="button"
          className={classNames('btn', 'btn-secondary', { active: this.state.currentValueName === item.valueName })}
          onClick={this._handleItemClick}
          name={item.valueName}
          key={item.valueName}
        >
          {item.displayName}
        </button>
      );
    });
    return (
      <div className="btn-group" role="group" aria-label="Mode">
        {buttons}
      </div>
    );
  }

  private _handleItemClick(event: React.MouseEvent<HTMLButtonElement>) {
    const newValue = event.currentTarget.name;
    if (newValue === this.state.currentValueName) {
      return;
    }
    this.setState((previousState) => {
      this.props.onItemSelected(newValue);
      const newState: IButtonBarState = {
        currentValueName: newValue
      };
      return newState;
    });
  }
}
