'use client';

import { type Color as HSVColor, type CreateColor } from '@aquarium/shared';
import { useCallback, useEffect, useState } from 'react';

import { get, post } from '@/lib/request.ts';

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

export function ColorsPage() {
  const [colors, setColors] = useState<HSVColor[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    get<HSVColor[]>('/colors')
      .then(setColors)
      .catch((err: unknown) => {
        setLoadError(
          err instanceof Error ? err.message : 'Failed to load data'
        );
      });
  }, []);
  const [colorsToAdd, setColorsToAdd] = useState<CreateColor[]>([]);
  const [colorsToEdit, setColorsToEdit] = useState<HSVColor[]>([]);
  const [colorsToDelete, setColorsToDelete] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const hasUnsavedChanges =
    colorsToAdd.length > 0 ||
    colorsToEdit.length > 0 ||
    colorsToDelete.length > 0;

  const onSave = useCallback(() => {
    if (!hasUnsavedChanges) {
      return;
    }

    void (async () => {
      try {
        const response = await post({
          endpoint: '/colors',
          body: {
            add: colorsToAdd,
            edit: colorsToEdit,
            delete: colorsToDelete,
          },
        });

        if (!response.ok) {
          if (response.status === 400) {
            const { error: errorText } = (await response.json()) as {
              error: string;
            };
            setErrorMessage(errorText);
          } else {
            setErrorMessage(`Failed to update colors$`);
          }
          setErrorDialogOpen(true);
          return;
        }

        const updatedColors = (await response.json()) as HSVColor[];
        setColors(updatedColors);
        setColorsToAdd([]);
        setColorsToEdit([]);
        setColorsToDelete([]);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Error saving colors'
        );
        setErrorDialogOpen(true);
      }
    })();
  }, [hasUnsavedChanges, colorsToAdd, colorsToEdit, colorsToDelete]);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {loadError}
      </div>
    );
  }

  if (!colors) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  return (
    <div className="grow h-full flex flex-col">
      <div className="flex flex-col gap-4 overflow-scroll grow basis-0 px-2 py-4">
        <AddColor
          colors={colors}
          setColors={
            setColors as React.Dispatch<React.SetStateAction<HSVColor[]>>
          }
          setColorsToAdd={setColorsToAdd}
        />
        {colors.map((color, index) => (
          <EditColor
            key={color.id}
            color={color}
            setColor={(updatedColor) => {
              const newColors = [...colors];
              newColors[index] = updatedColor;
              setColors(newColors);
              setColorsToEdit((prev) => {
                const existing = prev.findIndex(
                  (c) => c.id === updatedColor.id
                );
                if (existing >= 0) {
                  const updated = [...prev];
                  updated[existing] = updatedColor;
                  return updated;
                }
                return [...prev, updatedColor];
              });
            }}
            onDelete={() => {
              const newColors = colors.filter((c) => c.id !== color.id);
              setColors(newColors);
              setColorsToDelete((prev) => [...prev, color.id]);
              // Remove from edit list if it was there
              setColorsToEdit((prev) => prev.filter((c) => c.id !== color.id));
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
            <DialogDescription className="text-left whitespace-pre-wrap">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
