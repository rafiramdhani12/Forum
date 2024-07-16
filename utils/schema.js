import {integer, pgTable, serial, text, varchar} from "drizzle-orm/pg-core";

export const Ideas = pgTable("ideas", {
  id: serial("id").primaryKey(),
  content: varchar("content").notNull(),
  username: varchar("username").notNull(),
  vote: integer("vote").default(0),
  createdAt: varchar("createdAt").notNull(),
});

export const Komentar = pgTable("Komentar", {
  id: serial("id").primaryKey(),
  comment: text("comment").notNull(),
  ideaId: integer("ideaId").references(() => Ideas.id), // Reference to Ideas table
  username: varchar("username").notNull(),
  vote: integer("vote").default(0),
  createdAt: varchar("createdAt").notNull(),
});
