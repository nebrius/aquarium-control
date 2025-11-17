import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.tsx";
import { Input } from "../ui/Input.tsx";

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
          <div>
            <Input
              className="max-w-[70px]"
              id="hour"
              type="number"
              min={0}
              max={23}
              step={1}
              value={hour}
              onChange={(e) => {
                setTime(parseInt(e.target.value), minute, fade);
              }}
              required
            />
          </div>
          <div className="flex items-center">:</div>
          <div>
            <Input
              className="max-w-[70px]"
              id="minute"
              type="number"
              min={0}
              max={59}
              step={1}
              value={minute}
              onChange={(e) => {
                setTime(hour, parseInt(e.target.value), fade);
              }}
              required
            />
          </div>
          <div className="flex items-center justify-end grow">fade:</div>
          <div>
            <Input
              className="max-w-[70px]"
              id="fade"
              type="number"
              min={0}
              max={59}
              step={1}
              value={fade}
              onChange={(e) => {
                setTime(hour, minute, parseInt(e.target.value));
              }}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
