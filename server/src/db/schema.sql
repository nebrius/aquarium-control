CREATE TABLE schedule (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  hour INTEGER NOT NULL CHECK (hour BETWEEN 0 AND 255),
  minute INTEGER NOT NULL CHECK (minute BETWEEN 0 AND 255),
  fade INTEGER NOT NULL CHECK (fade BETWEEN 0 AND 255),
  h INTEGER NOT NULL CHECK (h BETWEEN 0 AND 360),
  s INTEGER NOT NULL CHECK (s BETWEEN 0 AND 100),
  v INTEGER NOT NULL CHECK (v BETWEEN 0 AND 100)
);

INSERT INTO schedule (name, hour, minute, fade, h, s, v) VALUES
  ('offToBlue', 6, 0, 10, 240, 100, 100),
  ('blueToWhite', 10, 0, 10, 240, 0, 100),
  ('whiteToBlue', 18, 0, 10, 240, 100, 100),
  ('blueToOff', 23, 0, 10, 240, 100, 0);

CREATE TABLE override (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  enabled INTEGER NOT NULL CHECK (enabled IN (0, 1)),
  state TEXT NOT NULL CHECK (state IN ('off', 'blue', 'white'))
);

INSERT INTO override (id, enabled, state) VALUES (1, 0, 'off');

CREATE TABLE cleaning_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  sponge TEXT NOT NULL CHECK (sponge IN ('none', 'clean', 'replace')),
  nitrazorb TEXT NOT NULL CHECK (nitrazorb IN ('none', 'clean', 'replace')),
  organic TEXT NOT NULL CHECK (organic IN ('none', 'clean', 'replace'))
);
