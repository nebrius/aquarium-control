'use client';

import {
  type Color,
  type ColorSet,
  type Override,
  type Schedule,
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
  initialCurrentColor: Color;
  runningSchedule: Schedule;
  runningOverride: Override;
  runningColors: ColorSet;
  setRunningSchedule: (schedule: Schedule) => void;
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
    initialCurrentColor,
    runningSchedule,
    runningOverride,
    runningColors,
    setRunningSchedule,
    setRunningOverride,
    setRunningColors,
  } = useLightsContext();
  const [offToNight, setOffToNight] = useState<ScheduleEntry>(
    runningSchedule.offToNight
  );
  const [nightToDay, setNightToDay] = useState<ScheduleEntry>(
    runningSchedule.nightToDay
  );
  const [dayToNight, setDayToNight] = useState<ScheduleEntry>(
    runningSchedule.dayToNight
  );
  const [nightToOff, setNightToOff] = useState<ScheduleEntry>(
    runningSchedule.nightToOff
  );
  const [override, setOverride] = useState<Override>({
    enabled: runningOverride.enabled,
    state: runningOverride.state,
  });
  const [colors, setColors] = useState<ColorSet>(runningColors);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasUnsavedChanges =
    !equal(offToNight, runningSchedule.offToNight) ||
    !equal(nightToDay, runningSchedule.nightToDay) ||
    !equal(dayToNight, runningSchedule.dayToNight) ||
    !equal(nightToOff, runningSchedule.nightToOff) ||
    !equal(override, runningOverride) ||
    !equal(colors, runningColors);

  const onSave = useCallback(() => {
    const scheduleChanged =
      !equal(offToNight, runningSchedule.offToNight) ||
      !equal(nightToDay, runningSchedule.nightToDay) ||
      !equal(dayToNight, runningSchedule.dayToNight) ||
      !equal(nightToOff, runningSchedule.nightToOff);

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
            body: {
              offToNight,
              nightToDay,
              dayToNight,
              nightToOff,
            },
          });

          if (!response.ok) {
            setErrorMessage('Failed to update schedule');
            setErrorDialogOpen(true);
            return;
          }

          setRunningSchedule({
            offToNight,
            nightToDay,
            dayToNight,
            nightToOff,
          });
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
    dayToNight,
    nightToDay,
    nightToOff,
    offToNight,
    override,
    runningOverride,
    runningSchedule.dayToNight,
    runningSchedule.nightToDay,
    runningSchedule.nightToOff,
    runningSchedule.offToNight,
    colors,
    setRunningOverride,
    setRunningSchedule,
    setRunningColors,
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
          initialColor={initialCurrentColor}
          colors={colors}
          setColors={setColors}
          savedColors={runningColors}
        />
        <Entry
          name="Off → Night"
          schedule={offToNight}
          setSchedule={(schedule) => {
            setOffToNight(schedule);
          }}
        />
        <Entry
          name="Night → Day"
          schedule={nightToDay}
          setSchedule={(schedule) => {
            setNightToDay(schedule);
          }}
        />
        <Entry
          name="Day → Night"
          schedule={dayToNight}
          setSchedule={(schedule) => {
            setDayToNight(schedule);
          }}
        />
        <Entry
          name="Night → Off"
          schedule={nightToOff}
          setSchedule={(schedule) => {
            setNightToOff(schedule);
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
  initialSchedule: Schedule;
  initialOverride: Override;
  initialColors: ColorSet;
  initialCurrentColor: Color;
};

export function LightsPage({
  initialSchedule,
  initialOverride,
  initialColors,
  initialCurrentColor,
}: LightsPageProps) {
  const [runningSchedule, setRunningSchedule] =
    useState<Schedule>(initialSchedule);
  const [runningOverride, setRunningOverride] =
    useState<Override>(initialOverride);
  const [runningColors, setRunningColors] = useState<ColorSet>(initialColors);

  return (
    <LightsContext.Provider
      value={{
        initialCurrentColor,
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
