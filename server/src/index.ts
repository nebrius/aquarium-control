import {
  CleaningRecordSchema,
  ColorSetSchema,
  OverrideSchema,
  ScheduleSchema,
} from '@aquarium/shared';
import cors from '@fastify/cors';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify from 'fastify';

import {
  addCleaningRecord,
  getCleaningRecords,
  getColorSet,
  getOverride,
  getSchedule,
  setColorSet,
  setOverride,
  setSchedule,
} from './db/db.ts';
import {
  getCurrentColor,
  handleColorUpdate,
  handleOverrideUpdate,
  handleScheduleUpdate,
} from './lights.ts';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    level: 'info',
    serializers: {
      req(request) {
        return {
          method: request.method,
          url: request.url,
        };
      },
      res(reply) {
        return {
          statusCode: reply.statusCode,
        };
      },
    },
  },
  disableRequestLogging: true,
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
      body: ScheduleSchema,
    },
  },
  (request) => {
    setSchedule(request.body);
    handleScheduleUpdate(request.body);
    return { message: 'OK' };
  }
);

// GET /color-set - Get the current color set
fastify.get('/color-set', () => {
  return getColorSet();
});

// PUT /color-set - Set the color set
fastify.put(
  '/color-set',
  {
    schema: {
      body: ColorSetSchema,
    },
  },
  (request) => {
    setColorSet(request.body);
    handleColorUpdate(request.body);
    return { message: 'OK' };
  }
);

// GET /currentColor - Get the current color
fastify.get('/current-color', () => {
  return getCurrentColor();
});

// Run the server!
fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is now listening on ${address}`);
});
