import { type LightState, type Override } from "@/types/lights.ts";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/Card.tsx";
import { NativeSelect, NativeSelectOption } from "../ui/NativeSelect.tsx";
import { Switch } from "../ui/Switch.tsx";

type OverrideEntryProps = {
  override: Override;
  setOverride: (override: Override) => void;
};

export function OverrideEntry({ override, setOverride }: OverrideEntryProps) {
  return (
    <Card className="w-full max-w-sm mb-4">
      <CardHeader>
        <CardTitle>Override</CardTitle>
        <CardAction>
          <Switch
            checked={override.enabled}
            onCheckedChange={(checked) => {
              setOverride({ ...override, enabled: checked });
            }}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <NativeSelect
          defaultValue={override.state}
          onChange={(e) => {
            setOverride({ ...override, state: e.target.value as LightState });
          }}
        >
          <NativeSelectOption value="off">Off</NativeSelectOption>
          <NativeSelectOption value="white">White</NativeSelectOption>
          <NativeSelectOption value="blue">Blue</NativeSelectOption>
        </NativeSelect>
      </CardContent>
    </Card>
  );
}
