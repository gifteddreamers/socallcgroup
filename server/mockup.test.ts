import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(overrides?: Partial<AuthenticatedUser>): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-mockup",
    email: "mockup@socallcgroup.com",
    name: "Mockup Tester",
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
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

function createPublicContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("Mockup Router - Generate Mockup", () => {
  it("should reject description shorter than 10 characters", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.mockup.generateMockup({
        description: "short",
      })
    ).rejects.toThrow();
  });

  it("should generate mockup with valid description (public user)", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Note: This creates a real mockup using LLM + image generation
    // It may take 10-20 seconds to complete
    const result = await caller.mockup.generateMockup({
      description: "A donation platform for animal rescues with payment processing and donor management",
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("mockupImageUrl");
    expect(result).toHaveProperty("enhancedPrompt");
    expect(result.status).toBe("completed");
    expect(result.mockupImageUrl).toContain("http");
  }, 30000); // 30 second timeout for AI generation

  it("should generate mockup with valid description (authenticated user)", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.mockup.generateMockup({
      description: "A nonprofit volunteer scheduling app with calendar integration and SMS reminders",
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("mockupImageUrl");
    expect(result).toHaveProperty("enhancedPrompt");
    expect(result.status).toBe("completed");
  }, 30000); // 30 second timeout for AI generation
});

describe("Mockup Router - Get My Mockups", () => {
  it("should return mockups for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // First generate a mockup
    await caller.mockup.generateMockup({
      description: "A simple event registration form with email confirmation",
    });

    // Then fetch user's mockups
    const mockups = await caller.mockup.getMyMockups();

    expect(Array.isArray(mockups)).toBe(true);
    expect(mockups.length).toBeGreaterThan(0);
    
    if (mockups.length > 0) {
      expect(mockups[0]).toHaveProperty("id");
      expect(mockups[0]).toHaveProperty("description");
      expect(mockups[0]).toHaveProperty("status");
    }
  }, 30000); // 30 second timeout for AI generation

  it("should require authentication", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.mockup.getMyMockups()
    ).rejects.toThrow("Please login");
  });
});

describe("Mockup Router - Get Mockup By ID", () => {
  it("should return mockup by ID", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // First generate a mockup
    const generated = await caller.mockup.generateMockup({
      description: "A task management dashboard with kanban board and time tracking",
    });

    // Then fetch it by ID
    const mockup = await caller.mockup.getMockupById({
      id: generated.id,
    });

    expect(mockup).toBeDefined();
    expect(mockup?.id).toBe(generated.id);
    expect(mockup?.description).toContain("task management");
  }, 30000); // 30 second timeout for AI generation

  it("should return null for non-existent mockup ID", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const mockup = await caller.mockup.getMockupById({
      id: 999999,
    });

    expect(mockup).toBeNull();
  });
});
