import { type Color as HSVColor, type CreateColor } from '@aquarium/shared';
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
  setColorsToAdd: React.Dispatch<React.SetStateAction<CreateColor[]>>;
};

export function AddColor({ colors, setColors, setColorsToAdd }: AddColorProps) {
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
              const newColor: CreateColor = {
                name: newColorName,
                h: 0,
                s: 0,
                v: 0,
              };
              // Use negative IDs for unsaved colors to distinguish them
              const minId = Math.min(0, ...colors.map((c) => c.id));
              setColors([...colors, { id: minId - 1, ...newColor }]);
              setColorsToAdd((prev) => [...prev, newColor]);
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
