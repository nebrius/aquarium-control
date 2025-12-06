'use client';

import {
  type Color,
  type CreateScheduleEntry,
  type Override,
  type ScheduleEntry,
} from '@aquarium/shared';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { get, post, put } from '@/lib/request.ts';

import { Button } from '../ui/Button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog.tsx';
import { AddSchedule } from './AddSchedule.tsx';
import { CurrentColor } from './CurrentColor.tsx';
import { OverrideCard } from './OverrideCard.tsx';
import { Schedule } from './Schedule.tsx';

type LightsContextValue = {
  runningSchedule: ScheduleEntry[];
  runningOverride: Override;
  colors: Color[];
  setRunningSchedule: (schedule: ScheduleEntry[]) => void;
  setRunningOverride: (override: Override) => void;
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
    colors,
    setRunningSchedule,
    setRunningOverride,
  } = useLightsContext();
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(runningSchedule);
  const [scheduleToAdd, setScheduleToAdd] = useState<CreateScheduleEntry[]>([]);
  const [scheduleToEdit, setScheduleToEdit] = useState<ScheduleEntry[]>([]);
  const [scheduleToDelete, setScheduleToDelete] = useState<number[]>([]);
  const [override, setOverride] = useState<Override>({
    enabled: runningOverride.enabled,
    colorId: runningOverride.colorId,
  });
  const [overrideChanged, setOverrideChanged] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasUnsavedChanges =
    scheduleToAdd.length > 0 ||
    scheduleToEdit.length > 0 ||
    scheduleToDelete.length > 0 ||
    overrideChanged;

  const onSave = useCallback(() => {
    if (!hasUnsavedChanges) {
      return;
    }

    void (async () => {
      try {
        if (
          scheduleToAdd.length > 0 ||
          scheduleToEdit.length > 0 ||
          scheduleToDelete.length > 0
        ) {
          const response = await post({
            endpoint: '/schedule',
            body: {
              add: scheduleToAdd,
              edit: scheduleToEdit,
              delete: scheduleToDelete,
            },
          });

          if (!response.ok) {
            setErrorMessage('Failed to update schedule');
            setErrorDialogOpen(true);
            return;
          }

          const updatedSchedule = (await response.json()) as ScheduleEntry[];
          setSchedule(updatedSchedule);
          setRunningSchedule(updatedSchedule);
          setScheduleToAdd([]);
          setScheduleToEdit([]);
          setScheduleToDelete([]);
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
          setOverrideChanged(false);
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
    hasUnsavedChanges,
    scheduleToAdd,
    scheduleToEdit,
    scheduleToDelete,
    override,
    overrideChanged,
    setRunningOverride,
    setRunningSchedule,
  ]);

  return (
    <div className="grow h-full flex flex-col">
      <div className="flex flex-col gap-4 overflow-scroll grow basis-0 px-2 py-4">
        <OverrideCard
          override={override}
          colors={colors}
          setOverride={(newOverride) => {
            setOverride(newOverride);
            setOverrideChanged(true);
          }}
        />
        <CurrentColor />
        <AddSchedule
          schedule={schedule}
          colors={colors}
          setSchedule={setSchedule}
          setScheduleToAdd={setScheduleToAdd}
        />
        {schedule.map((entry, index) => (
          <Schedule
            key={entry.id}
            name={entry.name}
            schedule={entry}
            colors={colors}
            setSchedule={(updated) => {
              setSchedule((prev) =>
                prev.map((e, i) => (i === index ? updated : e))
              );
              setScheduleToEdit((prev) => {
                const existing = prev.findIndex((e) => e.id === updated.id);
                if (existing >= 0) {
                  const newList = [...prev];
                  newList[existing] = updated;
                  return newList;
                }
                return [...prev, updated];
              });
            }}
            onDelete={() => {
              setSchedule((prev) => prev.filter((e) => e.id !== entry.id));
              setScheduleToDelete((prev) => [...prev, entry.id]);
              setScheduleToEdit((prev) =>
                prev.filter((e) => e.id !== entry.id)
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

export function LightsPage() {
  const [runningSchedule, setRunningSchedule] = useState<
    ScheduleEntry[] | null
  >(null);
  const [runningOverride, setRunningOverride] = useState<Override | null>(null);
  const [colors, setColors] = useState<Color[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      get<ScheduleEntry[]>('/schedule'),
      get<Override>('/override'),
      get<Color[]>('/colors'),
    ])
      .then(([schedule, override, colorsData]) => {
        setRunningSchedule(schedule);
        setRunningOverride(override);
        setColors(colorsData);
      })
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

  if (!runningSchedule || !runningOverride || !colors) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  return (
    <LightsContext.Provider
      value={{
        runningSchedule,
        runningOverride,
        colors,
        setRunningSchedule,
        setRunningOverride,
      }}
    >
      <LightsContent />
    </LightsContext.Provider>
  );
}
