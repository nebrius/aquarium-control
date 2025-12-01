import { type Color, type Override } from '@aquarium/shared';

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/Card.tsx';
import { NativeSelect, NativeSelectOption } from '../ui/NativeSelect.tsx';
import { Switch } from '../ui/Switch.tsx';

type OverrideCardProps = {
  override: Override;
  colors: Color[];
  setOverride: (override: Override) => void;
};

export function OverrideCard({
  override,
  colors,
  setOverride,
}: OverrideCardProps) {
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
          defaultValue={override.colorId}
          onChange={(e) => {
            setOverride({ ...override, colorId: Number(e.target.value) });
          }}
        >
          {colors.map((color) => (
            <NativeSelectOption key={color.id} value={color.id}>
              {color.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </CardContent>
    </Card>
  );
}
