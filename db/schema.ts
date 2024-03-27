import { pgTable, uuid, text, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name"),
  username: text("username"),
  email: text("email"),
  password: text("password"),
  isPremium: boolean("is_premium").default(false),
});
