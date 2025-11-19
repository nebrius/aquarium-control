import {
  CleaningRecordSchema,
  OverrideSchema,
  ScheduleSchema,
} from '@aquarium/shared';
import cors from '@fastify/cors';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify from 'fastify';

import {
  addCleaningRecord,
  getCleaningRecords,
  getOverride,
  getSchedule,
  setOverride,
  setSchedule,
} from './db/db.ts';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

// Configure CORS
await fastify.register(cors, {
  origin: ['http://localhost:3000', 'http://localhost:80'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

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
      body: ScheduleSchema,
    },
  },
  (request) => {
    setSchedule(request.body);
    return { message: 'OK' };
  }
);

// Run the server!
fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is now listening on ${address}`);
});
