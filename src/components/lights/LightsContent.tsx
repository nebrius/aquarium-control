"use client";

import equal from "fast-deep-equal";
import { useMemo, useState } from "react";

import {
  type Override,
  type Schedule,
  type ScheduleEntry,
} from "@/types/lights.ts";

import { Button } from "../ui/Button.tsx";
import { Entry } from "./Entry.tsx";
import { OverrideEntry } from "./OverrideEntry.tsx";

type LightsContentProps = {
  runningSchedule: Schedule;
  runningOverride: Override;
};

export function LightsContent({
  runningSchedule,
  runningOverride,
}: LightsContentProps) {
  const [offToBlue, setOffToBlue] = useState<ScheduleEntry>(
    runningSchedule.offToBlue,
  );
  const [blueToWhite, setBlueToWhite] = useState<ScheduleEntry>(
    runningSchedule.blueToWhite,
  );
  const [whiteToBlue, setWhiteToBlue] = useState<ScheduleEntry>(
    runningSchedule.whiteToBlue,
  );
  const [blueToOff, setBlueToOff] = useState<ScheduleEntry>(
    runningSchedule.blueToOff,
  );
  const [override, setOverride] = useState<Override>({
    enabled: runningOverride.enabled,
    state: runningOverride.state,
  });

  const hasUnsavedChanges = useMemo(() => {
    return (
      !equal(offToBlue, runningSchedule.offToBlue) ||
      !equal(blueToWhite, runningSchedule.blueToWhite) ||
      !equal(whiteToBlue, runningSchedule.whiteToBlue) ||
      !equal(blueToOff, runningSchedule.blueToOff) ||
      !equal(override, runningOverride)
    );
  }, [offToBlue, blueToWhite, whiteToBlue, blueToOff, override]);

  return (
    <div className="grow h-full flex flex-col">
      <div className="flex flex-col gap-4 overflow-scroll grow basis-0 px-2 pt-4">
        <OverrideEntry
          override={override}
          setOverride={(override) => {
            setOverride(override);
          }}
        />
        <Entry
          name="Off → Blue"
          schedule={offToBlue}
          setSchedule={(schedule) => {
            setOffToBlue(schedule);
          }}
        />
        <Entry
          name="Blue → White"
          schedule={blueToWhite}
          setSchedule={(schedule) => {
            setBlueToWhite(schedule);
          }}
        />
        <Entry
          name="White → Blue"
          schedule={whiteToBlue}
          setSchedule={(schedule) => {
            setWhiteToBlue(schedule);
          }}
        />
        <Entry
          name="Blue → Off"
          schedule={blueToOff}
          setSchedule={(schedule) => {
            setBlueToOff(schedule);
          }}
        />
      </div>
      <div className="w-full p-4 bg-color border-t border-zinc-700">
        <Button className="text-xl py-6 w-full" disabled={!hasUnsavedChanges}>
          Save
        </Button>
      </div>
    </div>
  );
}
