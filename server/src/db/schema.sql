CREATE TABLE schedule (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  hour INTEGER NOT NULL CHECK (hour BETWEEN 0 AND 255),
  minute INTEGER NOT NULL CHECK (minute BETWEEN 0 AND 255),
  fade INTEGER NOT NULL CHECK (fade BETWEEN 0 AND 255)
);

INSERT INTO schedule (id, name, hour, minute, fade) VALUES
  (0, 'Off → Night', 6, 0, 10),
  (1, 'Night → Day', 10, 0, 10),
  (2, 'Day → Night', 18, 0, 10),
  (3, 'Night → Off', 23, 0, 10);

CREATE TABLE colors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  h INTEGER NOT NULL CHECK (h BETWEEN 0 AND 360),
  s INTEGER NOT NULL CHECK (s BETWEEN 0 AND 100),
  v INTEGER NOT NULL CHECK (v BETWEEN 0 AND 100)
);

INSERT INTO colors (name, h, s, v) VALUES
  ('night', 240, 100, 100),
  ('day', 240, 0, 100);

CREATE TABLE override (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  enabled INTEGER NOT NULL CHECK (enabled IN (0, 1)),
  state TEXT NOT NULL CHECK (state IN ('off', 'night', 'day'))
);

INSERT INTO override (id, enabled, state) VALUES (1, 0, 'off');

CREATE TABLE cleaning_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  sponge TEXT NOT NULL CHECK (sponge IN ('none', 'clean', 'replace')),
  nitrazorb TEXT NOT NULL CHECK (nitrazorb IN ('none', 'clean', 'replace')),
  organic TEXT NOT NULL CHECK (organic IN ('none', 'clean', 'replace'))
);
