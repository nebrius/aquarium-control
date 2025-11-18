import { CleaningPage } from "@/components/cleaning/CleaningPage.tsx";
import { LightsPage } from "@/components/lights/LightsPage.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs.tsx";
import { getCleaningRecords, getOverride, getSchedule } from "@/db/db.ts";

export default function Home() {
  const schedule = getSchedule();
  const override = getOverride();
  const cleaningRecords = getCleaningRecords();
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
        <LightsPage initialSchedule={schedule} initialOverride={override} />
      </TabsContent>
      <TabsContent className="grow" value="cleaning">
        <CleaningPage initialCleaningRecords={cleaningRecords} />
      </TabsContent>
    </Tabs>
  );
}
