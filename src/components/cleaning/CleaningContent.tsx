import { type CleaningRecordEntry } from "@/types/lights.ts";

export function CleaningContent({
  cleaningRecords,
}: {
  cleaningRecords: CleaningRecordEntry[];
}) {
  return (
    <div>
      {cleaningRecords.map((record) => (
        <div>{record.date}</div>
      ))}
    </div>
  );
}
