import { LoopsClient } from 'loops';
import { env } from '@/env';

export const loops = new LoopsClient(env.LOOPS_API_KEY); // eslint-disable-line import/prefer-default-export
