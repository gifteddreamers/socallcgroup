import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "./schema";

/**
 * Mockup requests table for AI-generated web app mockups
 * Stores user descriptions and generated mockup images
 */
export const mockupRequests = mysqlTable("mockup_requests", {
  id: int("id").autoincrement().primaryKey(),
  
  /** User who requested the mockup (nullable for anonymous requests) */
  userId: int("userId").references(() => users.id, { onDelete: "cascade" }),
  
  /** User's description of their web app idea */
  description: text("description").notNull(),
  
  /** Generated mockup image URL (S3) */
  mockupImageUrl: varchar("mockupImageUrl", { length: 500 }),
  
  /** LLM-generated enhancement of user description */
  enhancedPrompt: text("enhancedPrompt"),
  
  /** Status of mockup generation */
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  // Status values: pending, generating, completed, failed
  
  /** Error message if generation failed */
  errorMessage: text("errorMessage"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MockupRequest = typeof mockupRequests.$inferSelect;
export type InsertMockupRequest = typeof mockupRequests.$inferInsert;
