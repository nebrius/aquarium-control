import { type CleaningRecordEntry } from '@aquarium/shared';

import { CleaningPage } from '@/components/cleaning/CleaningPage.tsx';
import { get } from '@/lib/request.ts';

export default async function Cleaning() {
  const cleaningRecords = await get<CleaningRecordEntry[]>('/cleaning');
  return <CleaningPage initialCleaningRecords={cleaningRecords} />;
}
