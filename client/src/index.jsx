/*
  Copyright (C) 2013-2015  Bryan Hughes <bryan@theoreticalideations.com>

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

import { getSchedule, getStatus, saveSchedule } from 'api';
import { createScheduleUpdatedAction } from 'actions/schedule';
import { createStatusUpdatedAction } from 'actions/status_updated';
import App from 'views/app';
import {
  registerCallback as registerScheduleCallback,
  getData as getScheduleData
} from 'stores/schedule';
import {
  registerCallback as registerStatusCallback,
  getData as getStatusData
} from 'stores/status';
import {
  registerCallback as registerEntryStateCallback,
  getData as getEntryStateData
} from 'stores/entry_state';

setInterval(() => getStatus(createStatusUpdatedAction), 1000);
getSchedule(createScheduleUpdatedAction);

function render() {
  const props = {
    schedule: getScheduleData(),
    status: getStatusData(),
    entryState: getEntryStateData()
  };
  React.render(
    <App {...props} />,
    document.getElementById('content')
  );
}

registerScheduleCallback(render);
registerStatusCallback(render);
registerEntryStateCallback(render);
