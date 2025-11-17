"use client";

import { Entry } from "./Entry.tsx";

export function LightsContent() {
  return (
    <div className="flex mx-2 flex-col gap-2">
      <Entry name="Blue" hour={0} minute={0} setTime={(hour, minute) => {}} />
      <Entry name="White" hour={0} minute={0} setTime={(hour, minute) => {}} />
      <Entry name="Blue" hour={0} minute={0} setTime={(hour, minute) => {}} />
      <Entry name="Off" hour={0} minute={0} setTime={(hour, minute) => {}} />
    </div>
  );
}
