import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./usersSchema";
import { relations } from "drizzle-orm";
import { categories } from "./categoriesSchema";

export const videos = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  userId: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  // .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const videoRelations = relations(videos, ({ one }) => {
  return {
    user: one(users, {
      fields: [videos.userId],
      references: [users.id],
    }),
    category: one(categories, {
      fields: [videos.categoryId],
      references: [categories.id],
    }),
  };
});
