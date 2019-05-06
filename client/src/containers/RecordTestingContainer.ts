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

import { connect } from 'react-redux';
import { IAppState } from '../util/IAppState';
import { request } from '../util/api';
import {
  IAction,
  testingRequestCreateRecord,
  testingCreateRecordFailed,
  testingCreateRecordSucceeded
} from '../actions/actions';
import { RecordTesting, IRecordTestingDispatch, IRecordTestingProps } from '../components/RecordTesting';
import { ITesting, ITestingEntry } from '../common/common';
import * as clone from 'clone';

function mapStateToProps(state: IAppState): IRecordTestingProps {
  return {
    saveStatus: clone(state.aquariumTesting.saveStatus)
  };
}

function mapDispatchToProps(dispatch: (action: IAction) => any): IRecordTestingDispatch {
  return {
    requestCreateTestingRecord: (newRecord: ITestingEntry) => {
      dispatch(testingRequestCreateRecord(newRecord));
      request({
        endpoint: 'testing',
        method: 'POST',
        body: newRecord
      }, (err, result: { testing: ITesting }) => {
        if (err) {
          dispatch(testingCreateRecordFailed());
        } else {
          dispatch(testingCreateRecordSucceeded(result.testing));
        }
      });
    }
  };
}

export const RecordTestingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordTesting);
