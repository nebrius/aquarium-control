import {
  type CleaningRecordEntry,
  type Color,
  type Override,
  type ScheduleEntry,
} from '@aquarium/shared';

import { CleaningPage } from '@/components/cleaning/CleaningPage.tsx';
import { ColorsPage } from '@/components/colors/ColorsPage.tsx';
import { LightsPage } from '@/components/lights/LightsPage.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/Tabs.tsx';
import { get } from '@/lib/request.ts';

export default async function Home() {
  const schedule = await get<ScheduleEntry[]>('/schedule');
  const override = await get<Override>('/override');
  const cleaningRecords = await get<CleaningRecordEntry[]>('/cleaning');
  const colors = await get<Color[]>('/colors');
  return (
    <Tabs className="absolute inset-[0]" defaultValue="lights">
      <header className="container flex items-center justify-center w-full bg-color border-b border-zinc-700 py-2">
        <TabsList>
          <TabsTrigger className="text-xl px-4 py-2" value="lights">
            Lights
          </TabsTrigger>
          <TabsTrigger className="text-xl px-4 py-2" value="colors">
            Colors
          </TabsTrigger>
          <TabsTrigger className="text-xl px-4 py-2" value="cleaning">
            Cleaning
          </TabsTrigger>
        </TabsList>
      </header>
      <TabsContent className="grow" value="lights">
        <LightsPage initialSchedule={schedule} initialOverride={override} />
      </TabsContent>
      <TabsContent className="grow" value="colors">
        <ColorsPage initialColors={colors} />
      </TabsContent>
      <TabsContent className="grow" value="cleaning">
        <CleaningPage initialCleaningRecords={cleaningRecords} />
      </TabsContent>
    </Tabs>
  );
}
