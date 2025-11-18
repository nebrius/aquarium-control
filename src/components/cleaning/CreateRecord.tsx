"use client";

import { useCallback, useState } from "react";

import { Button } from "../ui/Button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.tsx";
import { Checkbox } from "../ui/Checkbox.tsx";
import { Label } from "../ui/Label.tsx";
import { useCleaningContext } from "./context.ts";

export function CreateRecord() {
  const { setCleaningRecords } = useCleaningContext();
  const [bio, setBio] = useState(false);
  const [nitraZorb, setNitraZorb] = useState(false);
  const [sponge, setSponge] = useState(false);

  const onSave = useCallback(() => {
    void (async () => {
      try {
        const response = await fetch("/cleaning", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date: new Date().toISOString(),
            organic: bio,
            nitrazorb: nitraZorb,
            sponge,
          }),
        });

        if (!response.ok) {
          console.error(
            "Failed to save cleaning record",
            await response.text(),
          );
          return;
        }

        setCleaningRecords((prev) => [
          {
            date: new Date().toISOString(),
            organic: bio,
            nitrazorb: nitraZorb,
            sponge,
          },
          ...prev,
        ]);
      } catch (error) {
        console.error("Error saving cleaning record", error);
      }
    })();
  }, [bio, nitraZorb, setCleaningRecords, sponge]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create New Record</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex gap-4">
          <div className="flex gap-2">
            <Checkbox
              id="Sponge"
              checked={sponge}
              onCheckedChange={(checked) => {
                setSponge(checked === true);
              }}
            />
            <Label htmlFor="Sponge">Sponge</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox
              id="NitraZorb"
              checked={nitraZorb}
              onCheckedChange={(checked) => {
                setNitraZorb(checked === true);
              }}
            />
            <Label htmlFor="NitraZorb">NitraZorb</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox
              id="Bio"
              checked={bio}
              onCheckedChange={(checked) => {
                setBio(checked === true);
              }}
            />
            <Label htmlFor="Bio">Bio</Label>
          </div>
        </div>
        <Button className="text-xl py-6 w-full" onClick={onSave}>
          Create
        </Button>
      </CardContent>
    </Card>
  );
}
