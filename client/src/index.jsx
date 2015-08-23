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

import { getSchedule, getStatus, saveSchedule } from 'api';
import { createScheduleUpdatedAction } from 'actions/schedule_updated';
import { createStatusUpdatedAction } from 'actions/status_updated';
import App from 'views/app';
import 'stores/schedule';
import 'stores/status';

setInterval(() => getStatus(createStatusUpdatedAction), 1000);
getSchedule(createScheduleUpdatedAction);
