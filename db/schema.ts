import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const blogTable = pgTable("blogs", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    body: text().notNull(),
    orgId: text().notNull()
});
