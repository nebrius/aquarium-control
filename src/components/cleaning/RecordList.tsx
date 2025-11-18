import { type CleaningRecordEntry } from "@/types/cleaning.ts";

import { useCleaningContext } from "./context.ts";

function Record({ record }: { record: CleaningRecordEntry }) {
  const date = new Date(record.date).toLocaleDateString("en-US");
  return (
    <>
      <div className="border-t border-r border-zinc-700 px-2 py-1">{date}</div>
      <div className="border-t border-zinc-700 pl-4 pr-2 py-1 text-center">
        {record.sponge === "replace"
          ? "🗑️"
          : record.sponge === "clean"
            ? "💦"
            : ""}
      </div>
      <div className="border-t border-zinc-700 px-2 py-1 text-center">
        {record.nitrazorb === "replace"
          ? "🗑️"
          : record.nitrazorb === "clean"
            ? "💦"
            : ""}
      </div>
      <div className="border-t border-zinc-700 px-2 py-1 text-center">
        {record.organic === "replace"
          ? "🗑️"
          : record.organic === "clean"
            ? "💦"
            : ""}
      </div>
    </>
  );
}

export function RecordList() {
  const { cleaningRecords } = useCleaningContext();

  return (
    <div className="border border-zinc-700 rounded-md overflow-hidden">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto]">
        <div className="border-r border-b border-zinc-700 px-2 py-1 font-medium bg-card">
          Date
        </div>
        <div className="border-b border-zinc-700 pl-4 pr-2 py-1 font-medium bg-card">
          Sponge
        </div>
        <div className="border-b border-zinc-700 px-2 py-1 font-medium bg-card">
          NitraZorb
        </div>
        <div className="border-b border-zinc-700 px-2 py-1 font-medium bg-card">
          Bio
        </div>
        {cleaningRecords.map((record) => (
          <Record key={record.date} record={record} />
        ))}
      </div>
    </div>
  );
}
