import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { users } from "../drizzle/schema";

/**
 * Update user's Stripe customer ID
 */
export async function updateUserStripeCustomer(userId: number, stripeCustomerId: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(users)
    .set({ stripeCustomerId })
    .where(eq(users.id, userId));
}

/**
 * Update user's subscription details
 */
export async function updateUserSubscription(params: {
  userId: number;
  stripeSubscriptionId: string;
  currentTier: string;
  subscriptionStatus: string;
}): Promise<void> {
  const { userId, stripeSubscriptionId, currentTier, subscriptionStatus } = params;
  
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(users)
    .set({
      stripeSubscriptionId,
      currentTier,
      subscriptionStatus,
    })
    .where(eq(users.id, userId));
}

/**
 * Clear user's subscription (on cancellation)
 */
export async function clearUserSubscription(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(users)
    .set({
      stripeSubscriptionId: null,
      currentTier: null,
      subscriptionStatus: null,
    })
    .where(eq(users.id, userId));
}

/**
 * Get user by Stripe customer ID
 */
export async function getUserByStripeCustomerId(stripeCustomerId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.stripeCustomerId, stripeCustomerId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}
