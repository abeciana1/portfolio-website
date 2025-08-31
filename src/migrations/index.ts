import * as migration_20250831_210036 from './20250831_210036';

export const migrations = [
  {
    up: migration_20250831_210036.up,
    down: migration_20250831_210036.down,
    name: '20250831_210036'
  },
];
