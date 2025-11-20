import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type CleaningRecordEntry, type ColorSet } from '@aquarium/shared';
import { type Override, type Schedule } from '@aquarium/shared';
import Database from 'better-sqlite3';

const DB_DIR = join(homedir(), '.aquarium-control');
const DB_FILE = join(DB_DIR, 'db.sqlite');

const SCHEMA_FILE = join(dirname(fileURLToPath(import.meta.url)), 'schema.sql');

let db: Database.Database | undefined;

function getDb() {
  if (db) {
    return db;
  }

  const isNew = !existsSync(DB_FILE);
  if (isNew) {
    mkdirSync(DB_DIR, { recursive: true });
  }

  console.log(isNew ? 'Creating database' : 'Opening database');
  db = new Database(DB_FILE);

  if (isNew) {
    const schema = readFileSync(SCHEMA_FILE, 'utf8');
    db.exec(schema);
  }

  return db;
}

export function getColorSet(): ColorSet {
  const rows = getDb()
    .prepare('SELECT name, h, s, v FROM colors ORDER BY name ASC')
    .all() as {
    name: string;
    h: number;
    s: number;
    v: number;
  }[];

  const expectedNames = ['night', 'day'] as const;

  if (rows.length !== expectedNames.length) {
    throw new Error(
      `colors table must contain exactly ${String(expectedNames.length)} rows`
    );
  }

  const byName = new Map(rows.map((row) => [row.name, row] as const));

  for (const name of expectedNames) {
    if (!byName.has(name)) {
      throw new Error(`missing colors row: ${name}`);
    }
  }

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const night = byName.get('night')!;
  const day = byName.get('day')!;
  return {
    night: {
      h: night.h,
      s: night.s,
      v: night.v,
    },
    day: {
      h: day.h,
      s: day.s,
      v: day.v,
    },
  };
  /* eslint-enable @typescript-eslint/no-non-null-assertion */
}

export function setColorSet(colorSet: ColorSet) {
  const stmt = getDb().prepare(
    'UPDATE colors SET h = ?, s = ?, v = ? WHERE name = ?'
  );

  stmt.run(colorSet.night.h, colorSet.night.s, colorSet.night.v, 'night');
  stmt.run(colorSet.day.h, colorSet.day.s, colorSet.day.v, 'day');
}

export function getSchedule(): Schedule {
  const rows = getDb()
    .prepare('SELECT name, hour, minute, fade FROM schedule ORDER BY name ASC')
    .all() as {
    name: string;
    hour: number;
    minute: number;
    fade: number;
  }[];

  const expectedNames = [
    'offToNight',
    'nightToDay',
    'dayToNight',
    'nightToOff',
  ] as const;

  if (rows.length !== expectedNames.length) {
    throw new Error(
      `schedule table must contain exactly ${String(expectedNames.length)} rows`
    );
  }

  const byName = new Map(rows.map((row) => [row.name, row] as const));

  for (const name of expectedNames) {
    if (!byName.has(name)) {
      throw new Error(`missing schedule row: ${name}`);
    }
  }

  const schedule: Schedule = {
    offToNight: {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      hour: byName.get('offToNight')!.hour,
      minute: byName.get('offToNight')!.minute,
      fade: byName.get('offToNight')!.fade,
    },
    nightToDay: {
      hour: byName.get('nightToDay')!.hour,
      minute: byName.get('nightToDay')!.minute,
      fade: byName.get('nightToDay')!.fade,
    },
    dayToNight: {
      hour: byName.get('dayToNight')!.hour,
      minute: byName.get('dayToNight')!.minute,
      fade: byName.get('dayToNight')!.fade,
    },
    nightToOff: {
      hour: byName.get('nightToOff')!.hour,
      minute: byName.get('nightToOff')!.minute,
      fade: byName.get('nightToOff')!.fade,
    },
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  };

  return schedule;
}

export function setSchedule(schedule: Schedule) {
  const stmt = getDb().prepare(
    'UPDATE schedule SET hour = ?, minute = ?, fade = ? WHERE name = ?'
  );

  stmt.run(
    schedule.offToNight.hour,
    schedule.offToNight.minute,
    schedule.offToNight.fade,
    'offToNight'
  );
  stmt.run(
    schedule.nightToDay.hour,
    schedule.nightToDay.minute,
    schedule.nightToDay.fade,
    'nightToDay'
  );
  stmt.run(
    schedule.dayToNight.hour,
    schedule.dayToNight.minute,
    schedule.dayToNight.fade,
    'dayToNight'
  );
  stmt.run(
    schedule.nightToOff.hour,
    schedule.nightToOff.minute,
    schedule.nightToOff.fade,
    'nightToOff'
  );
}

export function getOverride(): Override {
  const row = getDb()
    .prepare('SELECT enabled, state FROM override WHERE id = 1')
    .get() as { enabled: number; state: 'off' | 'night' | 'day' } | undefined;

  if (!row) {
    throw new Error('override row is missing from the database');
  }

  return {
    enabled: row.enabled === 1,
    state: row.state,
  };
}

export function setOverride(override: Override) {
  getDb()
    .prepare(
      'INSERT INTO override (id, enabled, state) VALUES (1, ?, ?) ' +
        'ON CONFLICT(id) DO UPDATE SET enabled = excluded.enabled, state = excluded.state'
    )
    .run(override.enabled ? 1 : 0, override.state);
}

export function getCleaningRecords(): CleaningRecordEntry[] {
  return getDb()
    .prepare(
      'SELECT date, sponge, nitrazorb, organic FROM cleaning_records ORDER BY date DESC, id DESC'
    )
    .all() as CleaningRecordEntry[];
}

export function addCleaningRecord(record: CleaningRecordEntry) {
  getDb()
    .prepare(
      'INSERT INTO cleaning_records (date, sponge, nitrazorb, organic) VALUES (?, ?, ?, ?)'
    )
    .run(
      new Date(record.date).toISOString(),
      record.sponge,
      record.nitrazorb,
      record.organic
    );
}
