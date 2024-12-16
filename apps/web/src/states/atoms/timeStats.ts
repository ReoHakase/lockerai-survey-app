import { atom } from 'jotai';
import { z } from 'zod';

export const timeStatsSchema = z.union([
  z.object({
    startsAt: z.null(),
    endsAt: z.null(),
  }),
  z.object({
    startsAt: z.date(),
    endsAt: z.null(),
  }),
  z.object({
    startsAt: z.date(),
    endsAt: z.date(),
  }),
]);

export type TimeStats = z.infer<typeof timeStatsSchema>;

/**
 * アンケートの開始・終了時間を記録するAtom
 */
export const timeStatsAtom = atom<TimeStats>({
  startsAt: null,
  endsAt: null,
});

/**
 * アンケートの回答時間を保持するAtom
 * 単位は秒
 */
export const durationAtom = atom<number | null>((get) => {
  const timeStats = get(timeStatsAtom);
  if (timeStats.startsAt === null || timeStats.endsAt === null) {
    return null;
  }
  return (timeStats.endsAt.getTime() - timeStats.startsAt.getTime()) / 1000;
});
