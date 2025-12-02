'use client';

import { type CleaningRecordEntry } from '@aquarium/shared';
import { useState } from 'react';

import { CleaningContext } from './context.ts';
import { CreateRecord } from './CreateRecord.tsx';
import { RecordList } from './RecordList.tsx';

function CleaningContent() {
  return (
    <div className="flex flex-col gap-4 px-2">
      <CreateRecord />
      <RecordList />
    </div>
  );
}

export function CleaningPage({
  initialCleaningRecords,
}: {
  initialCleaningRecords: CleaningRecordEntry[];
}) {
  const [cleaningRecords, setCleaningRecords] = useState<CleaningRecordEntry[]>(
    initialCleaningRecords
  );

  return (
    <CleaningContext.Provider value={{ cleaningRecords, setCleaningRecords }}>
      <div className="flex flex-col gap-4 overflow-scroll grow basis-0 px-2 py-4">
        <CleaningContent />
      </div>
    </CleaningContext.Provider>
  );
}
