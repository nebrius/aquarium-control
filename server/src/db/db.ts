import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  type CleaningRecordEntry,
  type Color,
  type CreateColor,
  type CreateScheduleEntry,
  type Override,
  type ScheduleEntry,
  type UpdateColors,
  type UpdateSchedule,
} from '@aquarium/shared';
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

function createColors(
  database: Database.Database,
  colors: CreateColor[]
): void {
  if (colors.length === 0) return;

  const placeholders = colors.map(() => '(?, ?, ?, ?)').join(', ');
  const values = colors.flatMap((c) => [c.name, c.h, c.s, c.v]);

  database
    .prepare(`INSERT INTO colors (name, h, s, v) VALUES ${placeholders}`)
    .run(...values);
}

function updateColors(database: Database.Database, colors: Color[]): void {
  if (colors.length === 0) return;

  const stmt = database.prepare(
    'UPDATE colors SET name = ?, h = ?, s = ?, v = ? WHERE id = ?'
  );

  for (const color of colors) {
    stmt.run(color.name, color.h, color.s, color.v, color.id);
  }
}

function deleteColors(database: Database.Database, ids: number[]): void {
  if (ids.length === 0) return;

  const placeholders = ids.map(() => '?').join(', ');

  database
    .prepare(`DELETE FROM colors WHERE id IN (${placeholders})`)
    .run(...ids);
}

export function batchColorUpdates(updates: UpdateColors): Color[] {
  const database = getDb();

  const transaction = database.transaction(() => {
    deleteColors(database, updates.delete);
    updateColors(database, updates.edit);
    createColors(database, updates.add);
  });

  transaction();
  return getColors();
}

export function getSchedule(): ScheduleEntry[] {
  const rows = getDb()
    .prepare(
      'SELECT id, name, hour, minute, fade, color_id FROM schedule ORDER BY id ASC'
    )
    .all() as {
    id: number;
    name: string;
    hour: number;
    minute: number;
    fade: number;
    color_id: number;
  }[];

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    hour: row.hour,
    minute: row.minute,
    fade: row.fade,
    colorId: row.color_id,
  }));
}

function createScheduleEntries(
  database: Database.Database,
  entries: CreateScheduleEntry[]
): void {
  if (entries.length === 0) return;

  const placeholders = entries.map(() => '(?, ?, ?, ?, ?)').join(', ');
  const values = entries.flatMap((e) => [
    e.name,
    e.hour,
    e.minute,
    e.fade,
    e.colorId,
  ]);

  database
    .prepare(
      `INSERT INTO schedule (name, hour, minute, fade, color_id) VALUES ${placeholders}`
    )
    .run(...values);
}

function updateScheduleEntries(
  database: Database.Database,
  entries: ScheduleEntry[]
): void {
  if (entries.length === 0) return;

  const stmt = database.prepare(
    'UPDATE schedule SET name = ?, hour = ?, minute = ?, fade = ?, color_id = ? WHERE id = ?'
  );

  for (const entry of entries) {
    stmt.run(
      entry.name,
      entry.hour,
      entry.minute,
      entry.fade,
      entry.colorId,
      entry.id
    );
  }
}

function deleteScheduleEntries(
  database: Database.Database,
  ids: number[]
): void {
  if (ids.length === 0) return;

  const placeholders = ids.map(() => '?').join(', ');

  database
    .prepare(`DELETE FROM schedule WHERE id IN (${placeholders})`)
    .run(...ids);
}

export function batchScheduleUpdates(updates: UpdateSchedule): ScheduleEntry[] {
  const database = getDb();

  const transaction = database.transaction(() => {
    deleteScheduleEntries(database, updates.delete);
    updateScheduleEntries(database, updates.edit);
    createScheduleEntries(database, updates.add);
  });

  transaction();
  return getSchedule();
}

export function getOverride(): Override {
  const row = getDb()
    .prepare('SELECT enabled, color_id FROM override WHERE id = 1')
    .get() as { enabled: number; color_id: number } | undefined;

  if (!row) {
    throw new Error('override row is missing from the database');
  }

  return {
    enabled: row.enabled === 1,
    colorId: row.color_id,
  };
}

export function setOverride(override: Override) {
  getDb()
    .prepare(
      'INSERT INTO override (id, enabled, color_id) VALUES (1, ?, ?) ' +
        'ON CONFLICT(id) DO UPDATE SET enabled = excluded.enabled, color_id = excluded.color_id'
    )
    .run(override.enabled ? 1 : 0, override.colorId);
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
