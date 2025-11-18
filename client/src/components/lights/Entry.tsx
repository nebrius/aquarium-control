import { type ScheduleEntry } from "@/types/lights.ts";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.tsx";
import { Label } from "../ui/Label.tsx";
import { NativeSelect, NativeSelectOption } from "../ui/NativeSelect.tsx";

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
  return (
    <Card className="w-full max-w-sm">
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
      </CardContent>
    </Card>
  );
}
