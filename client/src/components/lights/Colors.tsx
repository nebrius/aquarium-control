import { type ColorSet } from '@aquarium/shared';
import ColorPicker, { Color } from '@rc-component/color-picker';
import convert from 'color-convert';
import { ChevronDown } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { get } from '@/lib/request.ts';

import { Button } from '../ui/Button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.tsx';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/Collapsible.tsx';

type EditColorProps = {
  name: string;
  savedColor: { h: number; s: number; v: number };
  color: { h: number; s: number; v: number };
  setColor: (color: { h: number; s: number; v: number }) => void;
};

function EditColor({ name, savedColor, color, setColor }: EditColorProps) {
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

  // Update schedule when color changes
  const handleColorChange = (newColor: Color) => {
    const hex = newColor.toHexString();
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const [h, s, v] = convert.rgb.hsv([r, g, b]);
    setColor({ h, s, v });
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
              Edit {name}
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
  colors: ColorSet;
  savedColors: ColorSet;
  setColors: (colors: ColorSet) => void;
};

export function Colors({ colors, setColors, savedColors }: ColorsProps) {
  const [color, setColor] = useState<
    { h: number; s: number; v: number } | undefined
  >(undefined);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const result = await get('/current-color');
        setColor(result as { h: number; s: number; v: number });
      } catch (error) {
        console.error('Failed to fetch current color:', error);
      }
    };

    // Fetch immediately
    void fetchColor();

    // Then poll every second
    const interval = setInterval(() => {
      void fetchColor();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const displayColor = useMemo(() => {
    if (!color) return null;
    const [r, g, b] = convert.hsv.rgb([color.h, color.s, color.v]);
    return new Color({ r, g, b });
  }, [color]);

  return (
    <Card className="w-full max-w-sm mb-4">
      <CardHeader>
        <CardTitle>Current Color</CardTitle>
      </CardHeader>
      <CardContent>
        {color && displayColor ? (
          <div
            style={{ backgroundColor: displayColor.toHexString() }}
            className="w-full h-6 rounded-full"
          ></div>
        ) : (
          <div className="text-muted-foreground">Loading...</div>
        )}
      </CardContent>
      <CardHeader>
        <CardTitle>Colors</CardTitle>
      </CardHeader>
      <CardContent>
        <EditColor
          name="Day"
          color={colors.day}
          savedColor={savedColors.day}
          setColor={(color) => {
            setColors({ ...colors, day: color });
          }}
        />
        <EditColor
          name="Night"
          color={colors.night}
          savedColor={savedColors.night}
          setColor={(color) => {
            setColors({ ...colors, night: color });
          }}
        />
      </CardContent>
    </Card>
  );
}
