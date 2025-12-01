import {
  CleaningRecordSchema,
  OverrideSchema,
  ScheduleEntrySchema,
  UpdateColorsSchema,
} from '@aquarium/shared';
import cors from '@fastify/cors';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import websocket from '@fastify/websocket';
import Fastify from 'fastify';
import { Type } from 'typebox';
import { type WebSocket } from 'ws';

import {
  addCleaningRecord,
  batchColorUpdates,
  getCleaningRecords,
  getColors,
  getOverride,
  getSchedule,
  setOverride,
  setSchedule,
} from './db/db.ts';
import {
  getCurrentColor,
  handleColorUpdate,
  handleOverrideUpdate,
  handleScheduleUpdate,
  onLightColorChanged,
} from './lights.ts';
import { logger } from './logging.ts';

const fastify = Fastify({
  loggerInstance: logger,
  disableRequestLogging: true,
}).withTypeProvider<TypeBoxTypeProvider>();

// Configure CORS
await fastify.register(cors, {
  origin: ['http://localhost:3000', 'http://localhost:80'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// Configure WebSocket
await fastify.register(websocket);

// GET /cleaning - Get all cleaning records
fastify.get('/cleaning', () => {
  return getCleaningRecords();
});

// POST /cleaning - Add a cleaning record
fastify.post(
  '/cleaning',
  {
    schema: {
      body: CleaningRecordSchema,
    },
  },
  (request) => {
    addCleaningRecord(request.body);
    return { message: 'OK' };
  }
);

// GET /override - Get the current override state
fastify.get('/override', () => {
  return getOverride();
});

// PUT /override - Set the override state
fastify.put(
  '/override',
  {
    schema: {
      body: OverrideSchema,
    },
  },
  (request) => {
    setOverride(request.body);
    handleOverrideUpdate(request.body);
    return { message: 'OK' };
  }
);

// GET /schedule - Get the current schedule
fastify.get('/schedule', () => {
  return getSchedule();
});

// PUT /schedule - Set the schedule
fastify.put(
  '/schedule',
  {
    schema: {
      body: Type.Array(ScheduleEntrySchema),
    },
  },
  (request) => {
    setSchedule(request.body);
    handleScheduleUpdate(request.body);
    return { message: 'OK' };
  }
);

// GET /colors - Get all colors
fastify.get('/colors', () => {
  return getColors();
});

// POST /colors - Batch update colors (add, edit, delete)
fastify.post(
  '/colors',
  {
    schema: {
      body: UpdateColorsSchema,
    },
  },
  (request) => {
    const colors = batchColorUpdates(request.body);
    handleColorUpdate(colors);
    return colors;
  }
);

// WebSocket endpoint for real-time color updates
const clients = new Set<WebSocket>();

fastify.get('/current-color', { websocket: true }, (socket) => {
  fastify.log.info(`Client connected`);
  clients.add(socket);
  socket.on('close', () => {
    fastify.log.info(`Client disconnected`);
    clients.delete(socket);
  });

  // Send the initial color to kick start their display
  socket.send(JSON.stringify(getCurrentColor()));
});

// Subscribe to color changes and broadcast to all connected clients
onLightColorChanged((color) => {
  const message = JSON.stringify(color);
  clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
});

// Run the server!
fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is now listening on ${address}`);
});
