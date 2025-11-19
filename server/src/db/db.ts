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
    'offToBlue',
    'blueToWhite',
    'whiteToBlue',
    'blueToOff',
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
    offToBlue: {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      hour: byName.get('offToBlue')!.hour,
      minute: byName.get('offToBlue')!.minute,
      fade: byName.get('offToBlue')!.fade,
      h: byName.get('offToBlue')!.h,
      s: byName.get('offToBlue')!.s,
      v: byName.get('offToBlue')!.v,
    },
    blueToWhite: {
      hour: byName.get('blueToWhite')!.hour,
      minute: byName.get('blueToWhite')!.minute,
      fade: byName.get('blueToWhite')!.fade,
      h: byName.get('blueToWhite')!.h,
      s: byName.get('blueToWhite')!.s,
      v: byName.get('blueToWhite')!.v,
    },
    whiteToBlue: {
      hour: byName.get('whiteToBlue')!.hour,
      minute: byName.get('whiteToBlue')!.minute,
      fade: byName.get('whiteToBlue')!.fade,
      h: byName.get('whiteToBlue')!.h,
      s: byName.get('whiteToBlue')!.s,
      v: byName.get('whiteToBlue')!.v,
    },
    blueToOff: {
      hour: byName.get('blueToOff')!.hour,
      minute: byName.get('blueToOff')!.minute,
      fade: byName.get('blueToOff')!.fade,
      h: byName.get('blueToOff')!.h,
      s: byName.get('blueToOff')!.s,
      v: byName.get('blueToOff')!.v,
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
    schedule.offToBlue.hour,
    schedule.offToBlue.minute,
    schedule.offToBlue.fade,
    schedule.offToBlue.h,
    schedule.offToBlue.s,
    schedule.offToBlue.v,
    'offToBlue'
  );
  stmt.run(
    schedule.blueToWhite.hour,
    schedule.blueToWhite.minute,
    schedule.blueToWhite.fade,
    schedule.blueToWhite.h,
    schedule.blueToWhite.s,
    schedule.blueToWhite.v,
    'blueToWhite'
  );
  stmt.run(
    schedule.whiteToBlue.hour,
    schedule.whiteToBlue.minute,
    schedule.whiteToBlue.fade,
    schedule.whiteToBlue.h,
    schedule.whiteToBlue.s,
    schedule.whiteToBlue.v,
    'whiteToBlue'
  );
  stmt.run(
    schedule.blueToOff.hour,
    schedule.blueToOff.minute,
    schedule.blueToOff.fade,
    schedule.blueToOff.h,
    schedule.blueToOff.s,
    schedule.blueToOff.v,
    'blueToOff'
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
