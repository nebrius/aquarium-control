'use client';

import { type Color as HSVColor } from '@aquarium/shared';
import ColorPicker, { Color } from '@rc-component/color-picker';
import convert from 'color-convert';
import equal from 'fast-deep-equal';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { put } from '@/lib/request.ts';

import { Button } from '../ui/Button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.tsx';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/Collapsible.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog.tsx';

type EditColorProps = {
  color: HSVColor;
  savedColor: HSVColor;
  setColor: (color: HSVColor) => void;
};

function EditColor({ savedColor, color, setColor }: EditColorProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Convert HSV from schedule to RGB for color picker
  const rgbColor = useMemo(() => {
    const [r, g, b] = convert.hsv.rgb([color.h, color.s, color.v]);
    return new Color({ r, g, b });
  }, [color.h, color.s, color.v]);

  // Convert saved HSV to RGB for color indicator
  const savedRgbColor = useMemo(() => {
    const [r, g, b] = convert.hsv.rgb([
      savedColor.h,
      savedColor.s,
      savedColor.v,
    ]);
    return new Color({ r, g, b });
  }, [savedColor.h, savedColor.s, savedColor.v]);

  // Update color when picker changes
  const handleColorChange = (newColor: Color) => {
    const hex = newColor.toHexString();
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const [h, s, v] = convert.rgb.hsv([r, g, b]);
    setColor({ ...color, h, s, v });
  };

  useEffect(() => {
    if (isColorPickerOpen && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isColorPickerOpen]);
  return (
    <Collapsible open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
      <CollapsibleTrigger asChild className="mt-4 w-full">
        <div className="flex items-center gap-2">
          <div className="grow">
            <div
              style={{ backgroundColor: savedRgbColor.toHexString() }}
              className="size-6 w-[124px] rounded-full"
            ></div>
          </div>
          <div>
            <Button variant="outline">
              Edit {color.name}
              <ChevronDown
                className={`transition-transform duration-200 ${
                  isColorPickerOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <div className="flex justify-center touch-none">
          <ColorPicker
            value={rgbColor}
            onChange={handleColorChange}
            disabledAlpha
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

type ColorsProps = {
  initialColors: HSVColor[];
};

export function ColorsPage({ initialColors }: ColorsProps) {
  const [runningColors, setRunningColors] = useState<HSVColor[]>(initialColors);
  const [colors, setColors] = useState<HSVColor[]>(initialColors);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const hasUnsavedChanges = !equal(colors, runningColors);
  const onSave = useCallback(() => {
    const colorsChanged = !equal(colors, runningColors);

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

        setRunningColors(colors);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Error saving lights configuration'
        );
        setErrorDialogOpen(true);
      }
    })();
  }, [colors, setRunningColors, runningColors]);

  return (
    <div className="grow h-full flex flex-col">
      <div className="flex flex-col gap-4 overflow-scroll grow basis-0 px-2 py-4">
        <Card className="w-full max-w-sm mb-4">
          <CardHeader>
            <CardTitle>Color Definitions</CardTitle>
          </CardHeader>
          <CardContent>
            {colors.map((color, index) => (
              <EditColor
                key={color.id}
                color={color}
                savedColor={runningColors[index]}
                setColor={(updatedColor) => {
                  const newColors = [...colors];
                  newColors[index] = updatedColor;
                  setColors(newColors);
                }}
              />
            ))}
          </CardContent>
        </Card>
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
