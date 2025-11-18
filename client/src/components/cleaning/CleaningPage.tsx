"use client";

import { useState } from "react";

import { type CleaningRecordEntry } from "@aquarium/shared";

import { CleaningContext } from "./context.ts";
import { CreateRecord } from "./CreateRecord.tsx";
import { RecordList } from "./RecordList.tsx";

function CleaningContent() {
  return (
    <div className="flex flex-col gap-4 px-2 pt-4">
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
    initialCleaningRecords,
  );

  return (
    <CleaningContext.Provider value={{ cleaningRecords, setCleaningRecords }}>
      <CleaningContent />
    </CleaningContext.Provider>
  );
}
