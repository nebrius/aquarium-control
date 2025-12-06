import path from 'node:path';

import {
  CleaningRecordSchema,
  OverrideSchema,
  UpdateColorsSchema,
  UpdateScheduleSchema,
} from '@aquarium/shared';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import websocket from '@fastify/websocket';
import Fastify from 'fastify';
import { type WebSocket } from 'ws';

import {
  addCleaningRecord,
  batchColorUpdates,
  batchScheduleUpdates,
  ConstraintError,
  getCleaningRecords,
  getColors,
  getOverride,
  getSchedule,
  setOverride,
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
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// Configure WebSocket
await fastify.register(websocket);

// Serve static files from client/out
await fastify.register(fastifyStatic, {
  root: path.join(import.meta.dirname, '../../client/out'),
  prefix: '/',
});

// Serve HTML files for clean URLs
fastify.get('/cleaning', (_, reply) => {
  return reply.sendFile('cleaning.html');
});

fastify.get('/colors', (_, reply) => {
  return reply.sendFile('colors.html');
});

// GET /api/cleaning - Get all cleaning records
fastify.get('/api/cleaning', () => {
  return getCleaningRecords();
});

// POST /api/cleaning - Add a cleaning record
fastify.post(
  '/api/cleaning',
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

// GET /api/override - Get the current override state
fastify.get('/api/override', () => {
  return getOverride();
});

// PUT /api/override - Set the override state
fastify.put(
  '/api/override',
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

// GET /api/schedule - Get the current schedule
fastify.get('/api/schedule', () => {
  return getSchedule();
});

// POST /api/schedule - Batch update schedule (add, edit, delete)
fastify.post(
  '/api/schedule',
  {
    schema: {
      body: UpdateScheduleSchema,
    },
  },
  (request) => {
    const schedule = batchScheduleUpdates(request.body);
    handleScheduleUpdate(schedule);
    return schedule;
  }
);

// GET /api/colors - Get all colors
fastify.get('/api/colors', () => {
  return getColors();
});

// POST /api/colors - Batch update colors (add, edit, delete)
fastify.post(
  '/api/colors',
  {
    schema: {
      body: UpdateColorsSchema,
    },
  },
  (request, reply) => {
    try {
      const colors = batchColorUpdates(request.body);
      handleColorUpdate(colors);
      return colors;
    } catch (error) {
      if (error instanceof ConstraintError) {
        return reply.status(400).send({ error: error.message });
      }
      throw error;
    }
  }
);

// WebSocket endpoint for real-time color updates
const clients = new Set<WebSocket>();

fastify.get('/api/current-color', { websocket: true }, (socket) => {
  fastify.log.debug(`Client connected`);
  clients.add(socket);
  socket.on('close', () => {
    fastify.log.debug(`Client disconnected`);
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
fastify.listen({ port: 80, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is now listening on ${address}`);
});
