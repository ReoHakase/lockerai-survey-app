import { atomWithStorage } from 'jotai/utils';
import { z } from 'zod';

export const emailSchema = z.string().email();

export type Email = z.infer<typeof emailSchema>;

export const emailAtom = atomWithStorage<Email | null>('email', null);
