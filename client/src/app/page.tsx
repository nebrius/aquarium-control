import { type Override, type ScheduleEntry } from '@aquarium/shared';

import { LightsPage } from '@/components/lights/LightsPage.tsx';
import { get } from '@/lib/request.ts';

export default async function Home() {
  const schedule = await get<ScheduleEntry[]>('/schedule');
  const override = await get<Override>('/override');
  return <LightsPage initialSchedule={schedule} initialOverride={override} />;
}
