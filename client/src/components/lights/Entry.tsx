import { type Color, type ScheduleEntry } from '@aquarium/shared';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
  colors: Color[];
};

export function Entry({ name, schedule, setSchedule, colors }: EntryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isOpen]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card ref={cardRef} className="w-full max-w-sm">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer">
            <div className="flex items-center gap-2">
              <CardTitle className="grow">{name}</CardTitle>
              <ChevronDown
                className={`transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
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
            </div>
            <div className="mt-4">
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
            <div className="flex flex-col gap-2 mt-4">
              <Label htmlFor="color">Color</Label>
              <NativeSelect
                id="color"
                value={schedule.colorId}
                onChange={(e) => {
                  setSchedule({ ...schedule, colorId: Number(e.target.value) });
                }}
              >
                {colors.map((color) => (
                  <NativeSelectOption key={color.id} value={color.id}>
                    {color.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
