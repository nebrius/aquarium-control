import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import Database from "better-sqlite3";

import { type CleaningRecordEntry } from "@aquarium/shared";
import { type Override, type Schedule } from "@aquarium/shared";

const DB_DIR = join(homedir(), ".aquarium-control");
const DB_FILE = join(DB_DIR, "db.sqlite");

const SCHEMA_FILE = join(dirname(fileURLToPath(import.meta.url)), "schema.sql");

let db: Database.Database | undefined;

function getDb() {
  if (db) {
    return db;
  }

  const isNew = !existsSync(DB_FILE);
  if (isNew) {
    mkdirSync(DB_DIR, { recursive: true });
  }

  console.log(isNew ? "Creating database" : "Opening database");
  db = new Database(DB_FILE);

  if (isNew) {
    const schema = readFileSync(SCHEMA_FILE, "utf8");
    db.exec(schema);
  }

  return db;
}

export function getSchedule(): Schedule {
  const rows = getDb()
    .prepare("SELECT name, hour, minute, fade FROM schedule ORDER BY name ASC")
    .all() as { name: string; hour: number; minute: number; fade: number }[];

  const expectedNames = [
    "offToBlue",
    "blueToWhite",
    "whiteToBlue",
    "blueToOff",
  ] as const;

  if (rows.length !== expectedNames.length) {
    throw new Error(
      `schedule table must contain exactly ${String(expectedNames.length)} rows`,
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
      hour: byName.get("offToBlue")!.hour,
      minute: byName.get("offToBlue")!.minute,
      fade: byName.get("offToBlue")!.fade,
    },
    blueToWhite: {
      hour: byName.get("blueToWhite")!.hour,
      minute: byName.get("blueToWhite")!.minute,
      fade: byName.get("blueToWhite")!.fade,
    },
    whiteToBlue: {
      hour: byName.get("whiteToBlue")!.hour,
      minute: byName.get("whiteToBlue")!.minute,
      fade: byName.get("whiteToBlue")!.fade,
    },
    blueToOff: {
      hour: byName.get("blueToOff")!.hour,
      minute: byName.get("blueToOff")!.minute,
      fade: byName.get("blueToOff")!.fade,
    },
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  };

  return schedule;
}

export function setSchedule(schedule: Schedule) {
  const stmt = getDb().prepare(
    "UPDATE schedule SET hour = ?, minute = ?, fade = ? WHERE name = ?",
  );

  stmt.run(
    schedule.offToBlue.hour,
    schedule.offToBlue.minute,
    schedule.offToBlue.fade,
    "offToBlue",
  );
  stmt.run(
    schedule.blueToWhite.hour,
    schedule.blueToWhite.minute,
    schedule.blueToWhite.fade,
    "blueToWhite",
  );
  stmt.run(
    schedule.whiteToBlue.hour,
    schedule.whiteToBlue.minute,
    schedule.whiteToBlue.fade,
    "whiteToBlue",
  );
  stmt.run(
    schedule.blueToOff.hour,
    schedule.blueToOff.minute,
    schedule.blueToOff.fade,
    "blueToOff",
  );
}

export function getOverride(): Override {
  const row = getDb()
    .prepare("SELECT enabled, state FROM override WHERE id = 1")
    .get() as { enabled: number; state: "off" | "blue" | "white" } | undefined;

  if (!row) {
    throw new Error("override row is missing from the database");
  }

  return {
    enabled: row.enabled === 1,
    state: row.state,
  };
}

export function setOverride(override: Override) {
  getDb()
    .prepare(
      "INSERT INTO override (id, enabled, state) VALUES (1, ?, ?) " +
        "ON CONFLICT(id) DO UPDATE SET enabled = excluded.enabled, state = excluded.state",
    )
    .run(override.enabled ? 1 : 0, override.state);
}

export function getCleaningRecords(): CleaningRecordEntry[] {
  return getDb()
    .prepare(
      "SELECT date, sponge, nitrazorb, organic FROM cleaning_records ORDER BY date DESC, id DESC",
    )
    .all() as CleaningRecordEntry[];
}

export function addCleaningRecord(record: CleaningRecordEntry) {
  getDb()
    .prepare(
      "INSERT INTO cleaning_records (date, sponge, nitrazorb, organic) VALUES (?, ?, ?, ?)",
    )
    .run(
      new Date(record.date).toISOString(),
      record.sponge,
      record.nitrazorb,
      record.organic,
    );
}
