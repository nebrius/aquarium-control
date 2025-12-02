import { type Color as HSVColor } from '@aquarium/shared';
import convert from 'color-convert';
import { useEffect, useMemo, useState } from 'react';

import { HOST } from '@/lib/request.ts';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.tsx';

const RETRY_TIMEOUT = 250;
function connect(onMessage: (color: HSVColor) => void) {
  const ws = new WebSocket(`ws://${HOST}/current-color`);

  ws.addEventListener('open', () => {
    console.log('WebSocket connected');
  });

  ws.addEventListener('message', (event) => {
    try {
      const colorData = JSON.parse(event.data as string) as HSVColor;
      onMessage(colorData);
    } catch (error) {
      console.error('Failed to parse color data:', error);
    }
  });

  ws.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.addEventListener('close', () => {
    console.log('WebSocket disconnected, retrying...');
    setTimeout(() => connect(onMessage), RETRY_TIMEOUT);
  });

  return () => {
    ws.close();
  };
}

export function CurrentColor() {
  // Initialize to the card background color, so we have something to show. It
  // won't be there long before the web socket overwrites it
  const [currentColor, setCurrentColor] = useState<{
    h: number;
    s: number;
    v: number;
  }>({ h: 233, s: 13, v: 11 });

  useEffect(() => {
    return connect(setCurrentColor);
  }, []);

  const displayColor = useMemo(() => {
    const [r, g, b] = convert.hsv.rgb([
      currentColor.h,
      currentColor.s,
      currentColor.v,
    ]);
    return `rgb(${r}, ${g}, ${b})`;
  }, [currentColor]);

  return (
    <>
      <Card className="w-full max-w-sm mb-4">
        <CardHeader>
          <CardTitle>Current Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            style={{ backgroundColor: displayColor }}
            className="w-full h-6 rounded-full"
          ></div>
        </CardContent>
      </Card>
    </>
  );
}
