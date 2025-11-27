'use client';

import {
  type ColorSet,
  type Override,
  type ScheduleEntry,
} from '@aquarium/shared';
import equal from 'fast-deep-equal';
import { createContext, useCallback, useContext, useState } from 'react';

import { put } from '@/lib/request.ts';

import { Button } from '../ui/Button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog.tsx';
import { Colors } from './Colors.tsx';
import { Entry } from './Entry.tsx';
import { OverrideCard } from './OverrideCard.tsx';

type LightsContextValue = {
  runningSchedule: ScheduleEntry[];
  runningOverride: Override;
  runningColors: ColorSet;
  setRunningSchedule: (schedule: ScheduleEntry[]) => void;
  setRunningOverride: (override: Override) => void;
  setRunningColors: (colors: ColorSet) => void;
};

const LightsContext = createContext<LightsContextValue | undefined>(undefined);

function useLightsContext() {
  const ctx = useContext(LightsContext);
  if (!ctx) {
    throw new Error('useLightsContext must be used within a LightsPage');
  }
  return ctx;
}

function LightsContent() {
  const {
    runningSchedule,
    runningOverride,
    runningColors,
    setRunningSchedule,
    setRunningOverride,
    setRunningColors,
  } = useLightsContext();
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(runningSchedule);
  const [override, setOverride] = useState<Override>({
    enabled: runningOverride.enabled,
    state: runningOverride.state,
  });
  const [colors, setColors] = useState<ColorSet>(runningColors);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasUnsavedChanges =
    !equal(schedule, runningSchedule) ||
    !equal(override, runningOverride) ||
    !equal(colors, runningColors);

  const onSave = useCallback(() => {
    const scheduleChanged = !equal(schedule, runningSchedule);

    const overrideChanged = !equal(override, runningOverride);

    const colorsChanged = !equal(colors, runningColors);

    if (!scheduleChanged && !overrideChanged && !colorsChanged) {
      return;
    }

    void (async () => {
      try {
        if (scheduleChanged) {
          const response = await put({
            endpoint: '/schedule',
            body: schedule,
          });

          if (!response.ok) {
            setErrorMessage('Failed to update schedule');
            setErrorDialogOpen(true);
            return;
          }

          setRunningSchedule(schedule);
        }

        if (overrideChanged) {
          const response = await put({
            endpoint: '/override',
            body: override,
          });

          if (!response.ok) {
            setErrorMessage('Failed to update override');
            setErrorDialogOpen(true);
            return;
          }

          setRunningOverride(override);
        }

        if (colorsChanged) {
          const response = await put({
            endpoint: '/color-set',
            body: colors,
          });

          if (!response.ok) {
            setErrorMessage('Failed to update colors');
            setErrorDialogOpen(true);
            return;
          }

          setRunningColors(colors);
        }
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Error saving lights configuration'
        );
        setErrorDialogOpen(true);
      }
    })();
  }, [
    schedule,
    override,
    runningOverride,
    runningSchedule,
    colors,
    setRunningOverride,
    setRunningSchedule,
    setRunningColors,
    runningColors,
  ]);

  return (
    <div className="grow h-full flex flex-col">
      <div className="flex flex-col gap-4 overflow-scroll grow basis-0 px-2 py-4">
        <OverrideCard
          override={override}
          setOverride={(override) => {
            setOverride(override);
          }}
        />
        <Colors
          colors={colors}
          setColors={setColors}
          savedColors={runningColors}
        />
        {schedule.map((entry, index) => (
          <Entry
            key={entry.id}
            name={entry.name}
            schedule={entry}
            setSchedule={(updated) => {
              setSchedule((prev) =>
                prev.map((e, i) => (i === index ? updated : e))
              );
            }}
          />
        ))}
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
      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error saving lights</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

type LightsPageProps = {
  initialSchedule: ScheduleEntry[];
  initialOverride: Override;
  initialColors: ColorSet;
};

export function LightsPage({
  initialSchedule,
  initialOverride,
  initialColors,
}: LightsPageProps) {
  const [runningSchedule, setRunningSchedule] =
    useState<ScheduleEntry[]>(initialSchedule);
  const [runningOverride, setRunningOverride] =
    useState<Override>(initialOverride);
  const [runningColors, setRunningColors] = useState<ColorSet>(initialColors);

  return (
    <LightsContext.Provider
      value={{
        runningSchedule,
        runningOverride,
        runningColors,
        setRunningSchedule,
        setRunningOverride,
        setRunningColors,
      }}
    >
      <LightsContent />
    </LightsContext.Provider>
  );
}
