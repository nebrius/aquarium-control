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
  cleaningRequestCreateRecord,
  cleaningCreateRecordFailed,
  cleaningCreateRecordSucceeded
} from '../actions/actions';
import { RecordCleaning, IRecordCleaningDispatch, IRecordCleaningProps } from '../components/RecordCleaning';
import { ICleaning, ICleaningEntry } from '../common/common';
import * as clone from 'clone';

function mapStateToProps(state: IAppState): IRecordCleaningProps {
  return {
    saveStatus: clone(state.aquariumCleaning.saveStatus)
  };
}

function mapDispatchToProps(dispatch: (action: IAction) => any): IRecordCleaningDispatch {
  return {
    requestCreateCleaningRecord: (newRecord: ICleaningEntry) => {
      dispatch(cleaningRequestCreateRecord(newRecord));
      request({
        endpoint: 'cleaning',
        method: 'POST',
        body: newRecord
      }, (err, result: ICleaning) => {
        if (err) {
          dispatch(cleaningCreateRecordFailed());
        } else {
          dispatch(cleaningCreateRecordSucceeded(result));
        }
      });
    }
  };
}

export const RecordCleaningContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordCleaning);
