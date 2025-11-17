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
  hour: number;
  minute: number;
  fade: number;
  setTime: (hour: number, minute: number, fade: number) => void;
};

export function Entry({ name, hour, minute, fade, setTime }: EntryProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 align-center">
          <IntegerSelect
            id="hour"
            value={hour}
            min={0}
            max={23}
            setValue={(hour) => {
              setTime(hour, minute, fade);
            }}
          />
          <IntegerSelect
            id="minute"
            value={minute}
            min={0}
            max={59}
            setValue={(minute) => {
              setTime(hour, minute, fade);
            }}
          />
          <div className="grow"></div>
          <IntegerSelect
            id="fade"
            value={fade}
            min={0}
            max={59}
            setValue={(fade) => {
              setTime(hour, minute, fade);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
