import '@rc-component/color-picker/assets/index.css';

import { type ScheduleEntry } from '@aquarium/shared';
import ColorPicker, { Color } from '@rc-component/color-picker';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
};

export function Entry({ name, schedule, setSchedule }: EntryProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(new Color('#163cff'));

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
            <div
              className="flex justify-center"
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              onTouchMove={(e) => {
                e.stopPropagation();
              }}
            >
              <ColorPicker value={value} onChange={setValue} disabledAlpha />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
