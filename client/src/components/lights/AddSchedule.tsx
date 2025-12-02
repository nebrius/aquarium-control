import {
  type Color,
  type CreateScheduleEntry,
  type ScheduleEntry,
} from '@aquarium/shared';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/Button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog.tsx';
import { Input } from '../ui/Input.tsx';

type AddScheduleProps = {
  schedule: ScheduleEntry[];
  colors: Color[];
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleEntry[]>>;
  setScheduleToAdd: React.Dispatch<React.SetStateAction<CreateScheduleEntry[]>>;
};

export function AddSchedule({
  schedule,
  colors,
  setSchedule,
  setScheduleToAdd,
}: AddScheduleProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newScheduleName, setNewScheduleName] = useState('A → B');

  return (
    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Schedule</DialogTitle>
          <DialogDescription>
            Enter a name for the new schedule entry.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={newScheduleName}
          onChange={(e) => {
            setNewScheduleName(e.target.value);
          }}
          placeholder="Schedule name"
        />
        <DialogFooter>
          <Button
            onClick={() => {
              const defaultColorId = Math.min(...colors.map((c) => c.id));
              const newEntry: CreateScheduleEntry = {
                name: newScheduleName,
                hour: 0,
                minute: 0,
                fade: 10,
                colorId: defaultColorId,
              };
              // Use negative IDs for unsaved entries to distinguish them
              const minId = Math.min(0, ...schedule.map((s) => s.id));
              setSchedule((prev) => [...prev, { id: minId - 1, ...newEntry }]);
              setScheduleToAdd((prev) => [...prev, newEntry]);
              setNewScheduleName('');
              setAddDialogOpen(false);
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
