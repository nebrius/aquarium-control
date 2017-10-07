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
import FacebookLogin from 'react-facebook-login';

export interface ILoginButtonProps {
  onLoginFailed(): void;
  onLoginSucceeded(accessToken: string): void;
}

export class LoginButton extends React.Component<ILoginButtonProps, {}> {

  constructor() {
    super();
    this.loginCallback = this.loginCallback.bind(this);
  }

  public render() {
    return (
      <FacebookLogin
        appId="1988163144802425"
        autoLoad={true}
        fields=""
        callback={this.loginCallback}
        cssClass="login-button"
        icon="fa-facebook"
      />
    );
  }

  private loginCallback(response: any): void {
    if (response.accessToken) {
      this.props.onLoginSucceeded(response.accessToken);
    } else {
      this.props.onLoginFailed();
    }
  }

}
