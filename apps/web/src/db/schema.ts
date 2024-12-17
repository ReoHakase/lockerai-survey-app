import { randomUUID } from 'crypto';
import { uuid, text, pgTable, pgEnum, varchar, timestamp, boolean, real } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const redeemTypeOptionsEnum = pgEnum('redeem_type_options', ['annotation', 'vote']);
export const authorizationOptionsEnum = pgEnum('authorization_options', ['grant', 'deny']);

export const annotationTable = pgTable('annotation', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  email: varchar({ length: 255 }).notNull(),
  imageId: varchar('image_id', { length: 255 }).notNull(),
  label: varchar({ length: 255 }).notNull(),
  inquiry: text().notNull(),
  duration: real().notNull(),
  quick: boolean().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const voteTable = pgTable('vote', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  email: varchar({ length: 255 }).notNull(),
  annotation: uuid()
    .references(() => annotationTable.id)
    .notNull(),
  authorization: authorizationOptionsEnum().notNull(),
  duration: real().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const redeemTable = pgTable('redeem', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  email: varchar({ length: 255 }).notNull(),
  secret: varchar({ length: 255 }).notNull(),
  type: redeemTypeOptionsEnum().notNull(),
  confirmedAt: timestamp('confirmed_at'),
  requestedAt: timestamp('requested_at').defaultNow().notNull(),
});

export const insertAnnotationSchema = createInsertSchema(annotationTable);
export type InsertAnnotation = z.infer<typeof insertAnnotationSchema>;
export const insertVoteSchema = createInsertSchema(voteTable);
export type InsertVote = z.infer<typeof insertVoteSchema>;
export const insertRedeemSchema = createInsertSchema(redeemTable);
export type InsertRedeem = z.infer<typeof insertRedeemSchema>;
