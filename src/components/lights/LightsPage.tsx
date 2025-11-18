"use client";

import equal from "fast-deep-equal";
import { createContext, useCallback, useContext, useState } from "react";

import {
  type Override,
  type Schedule,
  type ScheduleEntry,
} from "@/types/lights.ts";

import { Button } from "../ui/Button.tsx";
import { Entry } from "./Entry.tsx";
import { OverrideEntry } from "./OverrideEntry.tsx";

type LightsContextValue = {
  runningSchedule: Schedule;
  runningOverride: Override;
  setRunningSchedule: (schedule: Schedule) => void;
  setRunningOverride: (override: Override) => void;
};

const LightsContext = createContext<LightsContextValue | undefined>(undefined);

function useLightsContext() {
  const ctx = useContext(LightsContext);
  if (!ctx) {
    throw new Error("useLightsContext must be used within a LightsPage");
  }
  return ctx;
}

function LightsContent() {
  const {
    runningSchedule,
    runningOverride,
    setRunningSchedule,
    setRunningOverride,
  } = useLightsContext();
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

  const hasUnsavedChanges =
    !equal(offToBlue, runningSchedule.offToBlue) ||
    !equal(blueToWhite, runningSchedule.blueToWhite) ||
    !equal(whiteToBlue, runningSchedule.whiteToBlue) ||
    !equal(blueToOff, runningSchedule.blueToOff) ||
    !equal(override, runningOverride);

  const onSave = useCallback(() => {
    const scheduleChanged =
      !equal(offToBlue, runningSchedule.offToBlue) ||
      !equal(blueToWhite, runningSchedule.blueToWhite) ||
      !equal(whiteToBlue, runningSchedule.whiteToBlue) ||
      !equal(blueToOff, runningSchedule.blueToOff);

    const overrideChanged = !equal(override, runningOverride);

    if (!scheduleChanged && !overrideChanged) {
      return;
    }

    void (async () => {
      try {
        if (scheduleChanged) {
          const response = await fetch("/schedule", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              offToBlue,
              blueToWhite,
              whiteToBlue,
              blueToOff,
            }),
          });

          if (!response.ok) {
            console.error("Failed to update schedule", await response.text());
            return;
          }

          setRunningSchedule({
            offToBlue,
            blueToWhite,
            whiteToBlue,
            blueToOff,
          });
        }

        if (overrideChanged) {
          const response = await fetch("/override", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(override),
          });

          if (!response.ok) {
            console.error("Failed to update override", await response.text());
            return;
          }

          setRunningOverride(override);
        }
      } catch (error) {
        console.error("Error saving lights configuration", error);
      }
    })();
  }, [
    blueToOff,
    blueToWhite,
    offToBlue,
    override,
    runningOverride,
    runningSchedule.blueToOff,
    runningSchedule.blueToWhite,
    runningSchedule.offToBlue,
    runningSchedule.whiteToBlue,
    setRunningOverride,
    setRunningSchedule,
    whiteToBlue,
  ]);

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
        <Button
          className="text-xl py-6 w-full"
          disabled={!hasUnsavedChanges}
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

type LightsPageProps = {
  initialSchedule: Schedule;
  initialOverride: Override;
};

export function LightsPage({
  initialSchedule,
  initialOverride,
}: LightsPageProps) {
  const [runningSchedule, setRunningSchedule] =
    useState<Schedule>(initialSchedule);
  const [runningOverride, setRunningOverride] =
    useState<Override>(initialOverride);

  return (
    <LightsContext.Provider
      value={{
        runningSchedule,
        runningOverride,
        setRunningSchedule,
        setRunningOverride,
      }}
    >
      <LightsContent />
    </LightsContext.Provider>
  );
}
