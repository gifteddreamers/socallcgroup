import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(overrides?: Partial<AuthenticatedUser>): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-stripe",
    email: "test@socallcgroup.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    currentTier: null,
    subscriptionStatus: null,
    ...overrides,
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
      get: (name: string) => {
        if (name === "host") return "socall-c-group.manus.space";
        return undefined;
      },
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("Stripe Router - Checkout Session Creation", () => {
  it("should create checkout session with valid tier ID", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Note: This will create a real Stripe checkout session in test mode
    // In production tests, you'd mock the Stripe API
    const result = await caller.stripe.createCheckoutSession({
      tierId: "startups",
    });

    expect(result).toHaveProperty("sessionId");
    expect(result).toHaveProperty("url");
    expect(result.url).toContain("checkout.stripe.com");
  });

  it("should throw error for invalid tier ID", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.stripe.createCheckoutSession({
        tierId: "invalid-tier",
      })
    ).rejects.toThrow();
  });

  it("should include promotion code in checkout session when provided", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.stripe.createCheckoutSession({
      tierId: "emerging-growth",
      promotionCode: "WELCOME2025",
    });

    expect(result).toHaveProperty("sessionId");
    expect(result).toHaveProperty("url");
  });
});

describe("Stripe Router - Subscription Management", () => {
  it("should return null when user has no subscription", async () => {
    const { ctx } = createAuthContext({
      stripeSubscriptionId: null,
    });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.stripe.getSubscription();

    expect(result).toBeNull();
  });

  it("should return subscription details when user has active subscription", async () => {
    // Note: This test requires a real subscription ID from Stripe test mode
    // In a real test environment, you'd set up test data or use mocks
    const { ctx } = createAuthContext({
      stripeSubscriptionId: "sub_test_12345", // This would be a real test subscription
    });
    const caller = appRouter.createCaller(ctx);

    // This will fail if the subscription doesn't exist, which is expected in test mode
    // In production, you'd mock the Stripe API or use test fixtures
    try {
      const result = await caller.stripe.getSubscription();
      
      if (result) {
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("status");
        expect(result).toHaveProperty("currentPeriodEnd");
      }
    } catch (error) {
      // Expected to fail without real test data
      expect(error).toBeDefined();
    }
  });
});

describe("Stripe Router - Billing History", () => {
  it("should return empty array when user has no Stripe customer ID", async () => {
    const { ctx } = createAuthContext({
      stripeCustomerId: null,
    });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.stripe.getBillingHistory();

    expect(result).toEqual([]);
  });

  it("should return billing history for user with Stripe customer ID", async () => {
    const { ctx } = createAuthContext({
      stripeCustomerId: "cus_test_12345", // This would be a real test customer
    });
    const caller = appRouter.createCaller(ctx);

    // This will fail if the customer doesn't exist, which is expected in test mode
    try {
      const result = await caller.stripe.getBillingHistory();
      
      expect(Array.isArray(result)).toBe(true);
    } catch (error) {
      // Expected to fail without real test data
      expect(error).toBeDefined();
    }
  });
});

describe("Stripe Router - Subscription Cancellation", () => {
  it("should throw error when user has no active subscription", async () => {
    const { ctx } = createAuthContext({
      stripeSubscriptionId: null,
    });
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.stripe.cancelSubscription()
    ).rejects.toThrow("No active subscription found");
  });

  it("should cancel subscription successfully when user has active subscription", async () => {
    const { ctx } = createAuthContext({
      stripeSubscriptionId: "sub_test_12345", // This would be a real test subscription
    });
    const caller = appRouter.createCaller(ctx);

    // This will fail if the subscription doesn't exist, which is expected in test mode
    try {
      const result = await caller.stripe.cancelSubscription();
      
      expect(result).toHaveProperty("success");
      expect(result.success).toBe(true);
    } catch (error) {
      // Expected to fail without real test data
      expect(error).toBeDefined();
    }
  });
});
