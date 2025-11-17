"use client";

import { useState } from "react";

import { Button } from "../ui/Button.tsx";
import { Entry } from "./Entry.tsx";
import { Override } from "./Override.tsx";

export function LightsContent() {
  const [blue1, setBlue1] = useState({ hour: 6, minute: 0, fade: 0 });
  const [white, setWhite] = useState({ hour: 8, minute: 0, fade: 0 });
  const [blue2, setBlue2] = useState({ hour: 18, minute: 0, fade: 0 });
  const [off, setOff] = useState({ hour: 22, minute: 0, fade: 0 });

  return (
    <div className="grow h-full flex flex-col">
      <div className="flex flex-col gap-4 overflow-scroll grow basis-0 px-2 pt-4">
        <Override />
        <Entry
          name="Off → Blue"
          hour={blue1.hour}
          minute={blue1.minute}
          fade={blue1.fade}
          setTime={(hour, minute, fade) => {
            setBlue1({ hour, minute, fade });
          }}
        />
        <Entry
          name="Blue → White"
          hour={white.hour}
          minute={white.minute}
          fade={white.fade}
          setTime={(hour, minute, fade) => {
            console.log(hour, minute, fade);
            setWhite({ hour, minute, fade });
          }}
        />
        <Entry
          name="White → Blue"
          hour={blue2.hour}
          minute={blue2.minute}
          fade={blue2.fade}
          setTime={(hour, minute, fade) => {
            console.log(hour, minute, fade);
            setBlue2({ hour, minute, fade });
          }}
        />
        <Entry
          name="Blue → Off"
          hour={off.hour}
          minute={off.minute}
          fade={off.fade}
          setTime={(hour, minute, fade) => {
            console.log(hour, minute, fade);
            setOff({ hour, minute, fade });
          }}
        />
      </div>
      <div className="w-full p-4 bg-color border-t border-zinc-700">
        <Button className="text-xl py-6 w-full">Save</Button>
      </div>
    </div>
  );
}
