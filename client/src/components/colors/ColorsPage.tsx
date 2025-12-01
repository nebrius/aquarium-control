'use client';

import { type Color as HSVColor } from '@aquarium/shared';
import equal from 'fast-deep-equal';
import { useCallback, useState } from 'react';

import { put } from '@/lib/request.ts';

import { Button } from '../ui/Button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog.tsx';
import { AddColor } from './AddColor.tsx';
import { EditColor } from './EditColor.tsx';

type ColorsProps = {
  initialColors: HSVColor[];
};

export function ColorsPage({ initialColors }: ColorsProps) {
  const [savedColors, setSavedColors] = useState<HSVColor[]>(initialColors);
  const [colors, setColors] = useState<HSVColor[]>(initialColors);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const hasUnsavedChanges = !equal(colors, savedColors);
  const onSave = useCallback(() => {
    const colorsChanged = !equal(colors, savedColors);

    if (!colorsChanged) {
      return;
    }

    void (async () => {
      try {
        const response = await put({
          endpoint: '/colors',
          body: colors,
        });

        if (!response.ok) {
          setErrorMessage('Failed to update colors');
          setErrorDialogOpen(true);
          return;
        }

        setSavedColors(colors);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Error saving lights configuration'
        );
        setErrorDialogOpen(true);
      }
    })();
  }, [colors, setSavedColors, savedColors]);

  return (
    <div className="grow h-full flex flex-col">
      <div className="flex flex-col gap-4 overflow-scroll grow basis-0 px-2 py-4">
        <AddColor colors={colors} setColors={setColors} />
        {colors.map((color, index) => (
          <EditColor
            key={color.id}
            color={color}
            setColor={(updatedColor) => {
              const newColors = [...colors];
              newColors[index] = updatedColor;
              setColors(newColors);
            }}
            onDelete={() => {
              const newColors = colors.filter((c) => c.id !== color.id);
              setColors(newColors);
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
            <DialogTitle>Error saving colors</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
