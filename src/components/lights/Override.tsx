import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/Card.tsx";
import { NativeSelect, NativeSelectOption } from "../ui/NativeSelect.tsx";
import { Switch } from "../ui/Switch.tsx";

export function Override() {
  return (
    <Card className="w-full max-w-sm mb-4">
      <CardHeader>
        <CardTitle>Override</CardTitle>
        <CardAction>
          <Switch />
        </CardAction>
      </CardHeader>
      <CardContent>
        <NativeSelect defaultValue="white">
          <NativeSelectOption value="off">Off</NativeSelectOption>
          <NativeSelectOption value="white">White</NativeSelectOption>
          <NativeSelectOption value="blue">Blue</NativeSelectOption>
        </NativeSelect>
      </CardContent>
    </Card>
  );
}
