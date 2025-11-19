import '@rc-component/color-picker/assets/index.css';

import { type ScheduleEntry } from '@aquarium/shared';
import ColorPicker, { Color } from '@rc-component/color-picker';
import convert from 'color-convert';
import { ChevronDown } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '../ui/Button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.tsx';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/Collapsible.tsx';
import { Label } from '../ui/Label.tsx';
import { NativeSelect, NativeSelectOption } from '../ui/NativeSelect.tsx';

function IntegerSelect({
  id,
  value,
  min,
  max,
  setValue,
}: {
  id: string;
  value: number;
  min: number;
  max: number;
  setValue: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</Label>
      <NativeSelect
        id={id}
        value={value}
        onChange={(e) => {
          setValue(parseInt(e.target.value));
        }}
      >
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((i) => (
          <NativeSelectOption key={i} value={i}>
            {i}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}

type EntryProps = {
  name: string;
  schedule: ScheduleEntry;
  setSchedule: (schedule: ScheduleEntry) => void;
  hideColorPicker?: boolean;
};

export function Entry({
  name,
  schedule,
  setSchedule,
  hideColorPicker,
}: EntryProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Convert HSV from schedule to RGB for color picker
  const initialColor = useMemo(() => {
    const [r, g, b] = convert.hsv.rgb([schedule.h, schedule.s, schedule.v]);
    return new Color({ r, g, b });
  }, [schedule.h, schedule.s, schedule.v]);

  const [value, setValue] = useState(initialColor);

  // Update color when schedule changes
  useEffect(() => {
    setValue(initialColor);
  }, [initialColor]);

  // Update schedule when color changes
  const handleColorChange = (newColor: Color) => {
    setValue(newColor);
    const hex = newColor.toHexString();
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const [h, s, v] = convert.rgb.hsv([r, g, b]);
    setSchedule({ ...schedule, h, s, v });
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
    <Card ref={cardRef} className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 align-center">
          <IntegerSelect
            id="hour"
            value={schedule.hour}
            min={0}
            max={23}
            setValue={(hour) => {
              setSchedule({ ...schedule, hour });
            }}
          />
          <IntegerSelect
            id="minute"
            value={schedule.minute}
            min={0}
            max={59}
            setValue={(minute) => {
              setSchedule({ ...schedule, minute });
            }}
          />
          <div className="grow"></div>
          <IntegerSelect
            id="fade"
            value={schedule.fade}
            min={0}
            max={59}
            setValue={(fade) => {
              setSchedule({ ...schedule, fade });
            }}
          />
        </div>
        {!hideColorPicker && (
          <Collapsible
            open={isColorPickerOpen}
            onOpenChange={setIsColorPickerOpen}
          >
            <CollapsibleTrigger asChild className="mt-4 w-full">
              <Button variant="ghost">
                Choose Color
                <ChevronDown
                  className={`transition-transform duration-200 ${
                    isColorPickerOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="flex justify-center touch-none">
                <ColorPicker
                  value={value}
                  onChange={handleColorChange}
                  disabledAlpha
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}
