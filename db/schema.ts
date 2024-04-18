import { relations } from "drizzle-orm";
import { text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  conversations: many(conversation),
}));

export const conversation = pgTable("conversation", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  ownerId: uuid("ownerId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const conversationRelations = relations(
  conversation,
  ({ one, many }) => ({
    owner: one(user, {
      fields: [conversation.ownerId],
      references: [user.id],
    }),
    messages: many(message),
  })
);

export const message = pgTable("message", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  senderType: text("senderType").notNull(),
  conversationId: uuid("conversationId")
    .notNull()
    .references(() => conversation.id, { onDelete: "cascade" }),
});

export const messageRelations = relations(message, ({ one }) => ({
  conversation: one(conversation, {
    fields: [message.conversationId],
    references: [conversation.id],
  }),
}));
