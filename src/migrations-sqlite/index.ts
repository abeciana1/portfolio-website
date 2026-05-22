import * as migration_20260522_012819_init_turso_schema from './20260522_012819_init_turso_schema';

export const migrations = [
  {
    up: migration_20260522_012819_init_turso_schema.up,
    down: migration_20260522_012819_init_turso_schema.down,
    name: '20260522_012819_init_turso_schema'
  },
];
