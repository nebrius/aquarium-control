'use client';

import { type Color as HSVColor } from '@aquarium/shared';
import ColorPicker, { Color } from '@rc-component/color-picker';
import convert from 'color-convert';
import { ChevronDown, Pencil, Trash } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog.tsx';
import { Input } from '../ui/Input.tsx';

type EditColorProps = {
  color: HSVColor;
  setColor: (color: HSVColor) => void;
  onDelete: () => void;
};

export function EditColor({ color, setColor, onDelete }: EditColorProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newName, setNewName] = useState(color.name);
  const cardRef = useRef<HTMLDivElement>(null);

  // Convert HSV from schedule to RGB for color picker
  const rgbColor = useMemo(() => {
    const [r, g, b] = convert.hsv.rgb([color.h, color.s, color.v]);
    return new Color({ r, g, b });
  }, [color.h, color.s, color.v]);

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
      <Card ref={cardRef}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer">
            <div className="flex items-center gap-2">
              <div
                style={{ backgroundColor: rgbColor.toHexString() }}
                className="size-6 w-[64px] rounded-full"
              />
              <CardTitle className="grow">{color.name}</CardTitle>
              <ChevronDown
                className={`transition-transform duration-200 ${
                  isColorPickerOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-center touch-none">
              <ColorPicker
                value={rgbColor}
                onChange={handleColorChange}
                disabledAlpha
              />
            </div>
            <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Pencil className="mr-2 h-4 w-4" />
                  Rename Color
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename Color</DialogTitle>
                  <DialogDescription>
                    Enter a new name for this color.
                  </DialogDescription>
                </DialogHeader>
                <Input
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                  placeholder="Color name"
                />
                <DialogFooter>
                  <Button
                    onClick={() => {
                      setColor({ ...color, name: newName });
                      setRenameDialogOpen(false);
                    }}
                  >
                    Rename
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                onDelete();
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Color
            </Button>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
