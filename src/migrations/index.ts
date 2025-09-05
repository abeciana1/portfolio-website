import * as migration_20250831_224704 from './20250831_224704';
import * as migration_20250831_235000 from './20250831_235000';
import * as migration_20250904_165745_blogs_clean from './20250904_165745_blogs_clean';
import * as migration_20250905_161520 from './20250905_161520';

export const migrations = [
  {
    up: migration_20250831_224704.up,
    down: migration_20250831_224704.down,
    name: '20250831_224704',
  },
  {
    up: migration_20250831_235000.up,
    down: migration_20250831_235000.down,
    name: '20250831_235000',
  },
  {
    up: migration_20250904_165745_blogs_clean.up,
    down: migration_20250904_165745_blogs_clean.down,
    name: '20250904_165745_blogs_clean',
  },
  {
    up: migration_20250905_161520.up,
    down: migration_20250905_161520.down,
    name: '20250905_161520'
  },
];
