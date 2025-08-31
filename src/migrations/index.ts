import * as migration_20250831_210036 from './20250831_210036';
import * as migration_20250831_224704 from './20250831_224704';

export const migrations = [
  {
    up: migration_20250831_210036.up,
    down: migration_20250831_210036.down,
    name: '20250831_210036',
  },
  {
    up: migration_20250831_224704.up,
    down: migration_20250831_224704.down,
    name: '20250831_224704'
  },
];
