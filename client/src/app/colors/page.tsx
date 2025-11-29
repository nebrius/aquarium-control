import { type Color } from '@aquarium/shared';

import { ColorsPage } from '@/components/colors/ColorsPage.tsx';
import { get } from '@/lib/request.ts';

export default async function Colors() {
  const colors = await get<Color[]>('/colors');
  return <ColorsPage initialColors={colors} />;
}
