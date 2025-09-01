
import * as migration_20250831_224704 from './20250831_224704';
import * as migration_20250831_235000 from './20250831_235000';

export const migrations = [
  {
    up: migration_20250831_224704.up,
    down: migration_20250831_224704.down,
    name: '20250831_224704',
  },
  {
    up: migration_20250831_235000.up,
    down: migration_20250831_235000.down,
    name: '20250831_235000'
  },
];
