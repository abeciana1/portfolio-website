import { getPayload } from 'payload';
import buildConfig from '@/src/payload.config';

export const payload = await getPayload({ config: buildConfig });