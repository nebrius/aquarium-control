import { CleaningContent } from "@/components/cleaning/CleaningContent.tsx";
import { LightsContent } from "@/components/lights/LightsContent.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs.tsx";

export default function Home() {
  return (
    <Tabs className="absolute inset-[0]" defaultValue="lights">
      <header className="container flex items-center justify-center w-full bg-color border-b border-zinc-700 py-2">
        <TabsList>
          <TabsTrigger className="text-xl px-4 py-2" value="lights">
            Lights
          </TabsTrigger>
          <TabsTrigger className="text-xl px-4 py-2" value="cleaning">
            Cleaning
          </TabsTrigger>
        </TabsList>
      </header>
      <TabsContent className="grow" value="lights">
        <LightsContent
          runningSchedule={{
            offToBlue: {
              hour: 0,
              minute: 0,
              fade: 0,
            },
            blueToWhite: {
              hour: 0,
              minute: 0,
              fade: 0,
            },
            whiteToBlue: {
              hour: 0,
              minute: 0,
              fade: 0,
            },
            blueToOff: {
              hour: 0,
              minute: 0,
              fade: 0,
            },
          }}
          runningOverride={{
            enabled: false,
            state: "off",
          }}
        />
      </TabsContent>
      <TabsContent className="grow" value="cleaning">
        <CleaningContent />
      </TabsContent>
    </Tabs>
  );
}
