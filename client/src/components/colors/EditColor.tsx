'use client';

import { type Color as HSVColor } from '@aquarium/shared';
import convert from 'color-convert';
import { ChevronDown, Pencil, Trash } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { HsvColorPicker } from 'react-colorful';

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

  // Convert HSV to hex for display
  const hexColor = useMemo(() => {
    const [r, g, b] = convert.hsv.rgb([color.h, color.s, color.v]);
    return convert.rgb.hex([r, g, b]);
  }, [color.h, color.s, color.v]);

  // Update color when picker changes
  const handleColorChange = (newHsv: { h: number; s: number; v: number }) => {
    setColor({ ...color, h: newHsv.h, s: newHsv.s, v: newHsv.v });
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
                style={{ backgroundColor: `#${hexColor}` }}
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
              <HsvColorPicker
                color={{ h: color.h, s: color.s, v: color.v }}
                onChange={handleColorChange}
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
