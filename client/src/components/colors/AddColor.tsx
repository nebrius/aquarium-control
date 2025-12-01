import { type Color as HSVColor } from '@aquarium/shared';
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

type AddColorProps = {
  colors: HSVColor[];
  setColors: React.Dispatch<React.SetStateAction<HSVColor[]>>;
};

export function AddColor({ colors, setColors }: AddColorProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newColorName, setNewColorName] = useState('');

  return (
    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Color
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Color</DialogTitle>
          <DialogDescription>Enter a name for the new color.</DialogDescription>
        </DialogHeader>
        <Input
          value={newColorName}
          onChange={(e) => {
            setNewColorName(e.target.value);
          }}
          placeholder="Color name"
        />
        <DialogFooter>
          <Button
            onClick={() => {
              const usedIds = new Set(colors.map((c) => c.id));
              let newId = 1;
              while (usedIds.has(newId)) {
                newId++;
              }
              setColors([
                ...colors,
                { id: newId, name: newColorName, h: 0, s: 0, v: 0 },
              ]);
              setNewColorName('');
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
