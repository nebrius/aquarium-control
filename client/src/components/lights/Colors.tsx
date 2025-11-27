import { type Color as HSVColor } from '@aquarium/shared';
import ColorPicker, { Color } from '@rc-component/color-picker';
import convert from 'color-convert';
import { ChevronDown } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { HOST } from '@/lib/request.ts';

import { Button } from '../ui/Button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.tsx';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/Collapsible.tsx';

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
  colors: HSVColor[];
  savedColors: HSVColor[];
  setColors: (colors: HSVColor[]) => void;
};

const RETRY_TIMEOUT = 250;
function connect(onMessage: (color: HSVColor) => void) {
  const ws = new WebSocket(`ws://${HOST}/current-color`);

  ws.addEventListener('open', () => {
    console.log('WebSocket connected');
  });

  ws.addEventListener('message', (event) => {
    try {
      const colorData = JSON.parse(event.data as string) as HSVColor;
      onMessage(colorData);
    } catch (error) {
      console.error('Failed to parse color data:', error);
    }
  });

  ws.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.addEventListener('close', () => {
    console.log('WebSocket disconnected, retrying...');
    setTimeout(() => connect(onMessage), RETRY_TIMEOUT);
  });

  return () => {
    ws.close();
  };
}

export function Colors({ colors, setColors, savedColors }: ColorsProps) {
  // Initialize to the card background color, so we have something to show. It
  // won't be there long before the web socket overwrites it
  const [currentColor, setCurrentColor] = useState<{
    h: number;
    s: number;
    v: number;
  }>({ h: 233, s: 13, v: 11 });

  useEffect(() => {
    return connect(setCurrentColor);
  }, []);

  const displayColor = useMemo(() => {
    const [r, g, b] = convert.hsv.rgb([
      currentColor.h,
      currentColor.s,
      currentColor.v,
    ]);
    return new Color({ r, g, b });
  }, [currentColor]);

  return (
    <>
      <Card className="w-full max-w-sm mb-4">
        <CardHeader>
          <CardTitle>Current Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            style={{ backgroundColor: displayColor.toHexString() }}
            className="w-full h-6 rounded-full"
          ></div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-sm mb-4">
        <CardHeader>
          <CardTitle>Color Definitions</CardTitle>
        </CardHeader>
        <CardContent>
          {colors.map((color, index) => (
            <EditColor
              key={color.id}
              color={color}
              savedColor={savedColors[index]}
              setColor={(updatedColor) => {
                const newColors = [...colors];
                newColors[index] = updatedColor;
                setColors(newColors);
              }}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
}
