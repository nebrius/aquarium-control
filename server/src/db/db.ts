import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type CleaningRecordEntry } from '@aquarium/shared';
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

export function getSchedule(): Schedule {
  const rows = getDb()
    .prepare(
      'SELECT name, hour, minute, fade, h, s, v FROM schedule ORDER BY name ASC'
    )
    .all() as {
    name: string;
    hour: number;
    minute: number;
    fade: number;
    h: number;
    s: number;
    v: number;
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
      h: byName.get('offToNight')!.h,
      s: byName.get('offToNight')!.s,
      v: byName.get('offToNight')!.v,
    },
    nightToDay: {
      hour: byName.get('nightToDay')!.hour,
      minute: byName.get('nightToDay')!.minute,
      fade: byName.get('nightToDay')!.fade,
      h: byName.get('nightToDay')!.h,
      s: byName.get('nightToDay')!.s,
      v: byName.get('nightToDay')!.v,
    },
    dayToNight: {
      hour: byName.get('dayToNight')!.hour,
      minute: byName.get('dayToNight')!.minute,
      fade: byName.get('dayToNight')!.fade,
      h: byName.get('dayToNight')!.h,
      s: byName.get('dayToNight')!.s,
      v: byName.get('dayToNight')!.v,
    },
    nightToOff: {
      hour: byName.get('nightToOff')!.hour,
      minute: byName.get('nightToOff')!.minute,
      fade: byName.get('nightToOff')!.fade,
      h: byName.get('nightToOff')!.h,
      s: byName.get('nightToOff')!.s,
      v: byName.get('nightToOff')!.v,
    },
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  };

  return schedule;
}

export function setSchedule(schedule: Schedule) {
  const stmt = getDb().prepare(
    'UPDATE schedule SET hour = ?, minute = ?, fade = ?, h = ?, s = ?, v = ? WHERE name = ?'
  );

  stmt.run(
    schedule.offToNight.hour,
    schedule.offToNight.minute,
    schedule.offToNight.fade,
    schedule.offToNight.h,
    schedule.offToNight.s,
    schedule.offToNight.v,
    'offToNight'
  );
  stmt.run(
    schedule.nightToDay.hour,
    schedule.nightToDay.minute,
    schedule.nightToDay.fade,
    schedule.nightToDay.h,
    schedule.nightToDay.s,
    schedule.nightToDay.v,
    'nightToDay'
  );
  stmt.run(
    schedule.dayToNight.hour,
    schedule.dayToNight.minute,
    schedule.dayToNight.fade,
    schedule.dayToNight.h,
    schedule.dayToNight.s,
    schedule.dayToNight.v,
    'dayToNight'
  );
  stmt.run(
    schedule.nightToOff.hour,
    schedule.nightToOff.minute,
    schedule.nightToOff.fade,
    schedule.nightToOff.h,
    schedule.nightToOff.s,
    schedule.nightToOff.v,
    'nightToOff'
  );
}

export function getOverride(): Override {
  const row = getDb()
    .prepare('SELECT enabled, state FROM override WHERE id = 1')
    .get() as { enabled: number; state: 'off' | 'blue' | 'white' } | undefined;

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
