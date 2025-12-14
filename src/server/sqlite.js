import { Database } from "bun:sqlite";

import { Config } from "./config";

const SETUP = `
  -- Enable write-ahead log mode (better performance with many readers)
  PRAGMA journal_mode = WAL;

  -- Enable foreign keys
  PRAGMA foreign_keys = ON;

  BEGIN;

  CREATE TABLE IF NOT EXISTS channel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,

    ytid TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS streams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,

    ytid TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL, -- maximum length of 100 characters
    info TEXT NOT NULL, -- maximum length of 5000 bytes

    broadcast TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    thumbnail_hires TEXT NOT NULL,

    category TEXT NOT NULL,
    channel_id INTEGER NOT NULL,
    published_at TEXT NOT NULL,

    language_content TEXT NOT NULL,
    language_snippet TEXT NOT NULL,

    opt_hires INTEGER NOT NULL,   -- contentDetails.definition == "hd"
    opt_caption INTEGER NOT NULL, -- contentDetails.caption == "true"
    opt_deleted INTEGER NOT NULL,

    stat_views INTEGER NOT NULL,    -- statistics.viewCount
    stat_likes INTEGER NOT NULL,    -- statistics.likeCount
    stat_comments INTEGER NOT NULL, -- statistics.commentCount

    FOREIGN KEY(channel_id) REFERENCES channel(id)
  );

  CREATE TABLE IF NOT EXISTS stream_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    value_id INTEGER NOT NULL,
    video_id INTEGER NOT NULL,

    FOREIGN KEY(value_id) REFERENCES tag(id),
    FOREIGN KEY(video_id) REFERENCES stream(id)
  );

  CREATE UNIQUE INDEX IF NOT EXISTS index_channel_ytid ON channel(ytid);
  CREATE UNIQUE INDEX IF NOT EXISTS index_streams_ytid ON streams(ytid);

  COMMIT;
`;

const sqlite = new Database(Config.sqlite.path, Config.sqlite.opts);

sqlite.exec(SETUP);

export { sqlite };
