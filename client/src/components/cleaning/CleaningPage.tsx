'use client';

import { type CleaningRecordEntry } from '@aquarium/shared';
import { useEffect, useState } from 'react';

import { get } from '@/lib/request.ts';

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

export function CleaningPage() {
  const [cleaningRecords, setCleaningRecords] = useState<
    CleaningRecordEntry[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    get<CleaningRecordEntry[]>('/cleaning')
      .then(setCleaningRecords)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      });
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    );
  }

  if (!cleaningRecords) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  return (
    <CleaningContext.Provider
      value={{
        cleaningRecords,
        setCleaningRecords: setCleaningRecords as React.Dispatch<
          React.SetStateAction<CleaningRecordEntry[]>
        >,
      }}
    >
      <div className="flex flex-col gap-4 overflow-scroll grow basis-0 px-2 py-4">
        <CleaningContent />
      </div>
    </CleaningContext.Provider>
  );
}
