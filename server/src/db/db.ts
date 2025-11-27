import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type CleaningRecordEntry, type Color } from '@aquarium/shared';
import { type Override, type ScheduleEntry } from '@aquarium/shared';
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

export function getColors(): Color[] {
  return getDb()
    .prepare('SELECT id, name, h, s, v FROM colors ORDER BY id ASC')
    .all() as Color[];
}

export function setColors(colors: Color[]) {
  const database = getDb();
  const deleteStmt = database.prepare('DELETE FROM colors');
  const insertStmt = database.prepare(
    'INSERT INTO colors (id, name, h, s, v) VALUES (?, ?, ?, ?, ?)'
  );

  const transaction = database.transaction(() => {
    deleteStmt.run();
    for (const color of colors) {
      insertStmt.run(color.id, color.name, color.h, color.s, color.v);
    }
  });

  transaction();
}

export function getSchedule() {
  return getDb()
    .prepare(
      'SELECT id, name, hour, minute, fade FROM schedule ORDER BY id ASC'
    )
    .all() as ScheduleEntry[];
}

export function setSchedule(schedule: ScheduleEntry[]) {
  const database = getDb();
  const deleteStmt = database.prepare('DELETE FROM schedule');
  const insertStmt = database.prepare(
    'INSERT INTO schedule (name, hour, minute, fade) VALUES (?, ?, ?, ?)'
  );

  const transaction = database.transaction(() => {
    deleteStmt.run();
    for (const entry of schedule) {
      insertStmt.run(entry.name, entry.hour, entry.minute, entry.fade);
    }
  });

  transaction();
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
