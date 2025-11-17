import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.tsx";
import { Input } from "../ui/Input.tsx";
import { Label } from "../ui/Label.tsx";

type EntryProps = {
  name: string;
  hour: number;
  minute: number;
  setTime: (hour: number, minute: number) => void;
};

export function Entry({ name, hour, minute, setTime }: EntryProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          <div className="grid gap-2">
            <Label htmlFor="hour">Hour</Label>
            <Input
              id="hour"
              type="number"
              min={0}
              max={23}
              step={1}
              value={hour}
              onChange={(e) => {
                setTime(parseInt(e.target.value), minute);
              }}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="minute">Minute</Label>
            <Input
              id="minute"
              type="number"
              min={0}
              max={59}
              step={1}
              value={minute}
              onChange={(e) => {
                setTime(hour, parseInt(e.target.value));
              }}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
