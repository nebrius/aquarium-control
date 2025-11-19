"use client";

import { type CleaningType } from "@aquarium/shared";
import { useCallback, useState } from "react";

import { post } from "@/lib/request.ts";

import { Button } from "../ui/Button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog.tsx";
import { Label } from "../ui/Label.tsx";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup.tsx";
import { useCleaningContext } from "./context.ts";

export function CreateRecord() {
  const { setCleaningRecords } = useCleaningContext();
  const [bio, setBio] = useState<CleaningType>("none");
  const [nitraZorb, setNitraZorb] = useState<CleaningType>("none");
  const [sponge, setSponge] = useState<CleaningType>("none");
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSave = useCallback(() => {
    void (async () => {
      try {
        const response = await post({
          endpoint: "/cleaning",
          body: {
            date: new Date().toISOString(),
            organic: bio,
            nitrazorb: nitraZorb,
            sponge,
          },
        });

        if (!response.ok) {
          setErrorMessage("Failed to save cleaning record");
          setErrorDialogOpen(true);
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
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Error saving cleaning record",
        );
        setErrorDialogOpen(true);
      }
    })();
  }, [bio, nitraZorb, setCleaningRecords, sponge]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create New Record</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Label className="w-24" htmlFor="sponge-none">
              Sponge
            </Label>
            <RadioGroup
              className="flex gap-4"
              value={sponge}
              onValueChange={(value) => {
                setSponge(value as CleaningType);
              }}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="none" id="sponge-none" />
                <Label htmlFor="sponge-none">None</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="clean" id="sponge-clean" />
                <Label htmlFor="sponge-clean">Clean</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="replace" id="sponge-replace" />
                <Label htmlFor="sponge-replace">Replace</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-24" htmlFor="nitrazorb-none">
              NitraZorb
            </Label>
            <RadioGroup
              className="flex gap-4"
              value={nitraZorb}
              onValueChange={(value) => {
                setNitraZorb(value as CleaningType);
              }}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="none" id="nitrazorb-none" />
                <Label htmlFor="nitrazorb-none">None</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="clean" id="nitrazorb-clean" />
                <Label htmlFor="nitrazorb-clean">Clean</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="replace" id="nitrazorb-replace" />
                <Label htmlFor="nitrazorb-replace">Replace</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-24" htmlFor="bio-none">
              Bio
            </Label>
            <RadioGroup
              className="flex gap-4"
              value={bio}
              onValueChange={(value) => {
                setBio(value as CleaningType);
              }}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="none" id="bio-none" />
                <Label htmlFor="bio-none">None</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="clean" id="bio-clean" />
                <Label htmlFor="bio-clean">Clean</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="replace" id="bio-replace" />
                <Label htmlFor="bio-replace">Replace</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Button className="text-xl py-6 w-full" onClick={onSave}>
          Create
        </Button>
      </CardContent>
      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error saving cleaning record</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
