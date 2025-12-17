import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { createCheckoutSession, cancelSubscription, updateSubscription, getSubscription, listInvoices } from "./stripe";
import { updateUserStripeCustomer } from "./subscriptions";
import { PRICING_TIERS } from "./products";

export const stripeRouter = router({
  /**
   * Create a Stripe checkout session for tier subscription
   */
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        tierId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { tierId } = input;
      const user = ctx.user;

      // Validate tier exists
      const tier = PRICING_TIERS.find(t => t.id === tierId);
      if (!tier) {
        throw new Error(`Invalid tier ID: ${tierId}`);
      }

      // Get origin for success/cancel URLs
      const origin = ctx.req.headers.origin || `${ctx.req.protocol}://${ctx.req.headers.host}`;

      const session = await createCheckoutSession({
        tierId,
        userId: user.id,
        userEmail: user.email || '',
        userName: user.name,
        stripeCustomerId: user.stripeCustomerId,
        successUrl: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${origin}/#pricing`,
      });

      // Update user's Stripe customer ID if it was just created
      if (session.customer && typeof session.customer === 'string' && !user.stripeCustomerId) {
        await updateUserStripeCustomer(user.id, session.customer);
      }

      return {
        sessionId: session.id,
        url: session.url,
      };
    }),

  /**
   * Get current subscription details
   */
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;

    if (!user.stripeSubscriptionId) {
      return null;
    }

    const subscription = await getSubscription(user.stripeSubscriptionId);

    const subscriptionAny = subscription as any;
    return {
      id: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscriptionAny.current_period_end,
      cancelAtPeriodEnd: subscriptionAny.cancel_at_period_end,
      tierId: subscription.metadata?.tier_id,
    };
  }),

  /**
   * Cancel subscription
   */
  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const user = ctx.user;

    if (!user.stripeSubscriptionId) {
      throw new Error('No active subscription found');
    }

    const subscription = await cancelSubscription(user.stripeSubscriptionId);

    return {
      id: subscription.id,
      status: subscription.status,
      canceledAt: subscription.canceled_at,
    };
  }),

  /**
   * Update subscription to a different tier
   */
  updateSubscription: protectedProcedure
    .input(
      z.object({
        newTierId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { newTierId } = input;
      const user = ctx.user;

      if (!user.stripeSubscriptionId) {
        throw new Error('No active subscription found');
      }

      // Validate new tier exists
      const newTier = PRICING_TIERS.find(t => t.id === newTierId);
      if (!newTier) {
        throw new Error(`Invalid tier ID: ${newTierId}`);
      }

      const subscription = await updateSubscription({
        subscriptionId: user.stripeSubscriptionId,
        newTierId,
      });

      return {
        id: subscription.id,
        status: subscription.status,
        tierId: newTierId,
      };
    }),

  /**
   * Get billing history (invoices)
   */
  getBillingHistory: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;

    if (!user.stripeCustomerId) {
      return [];
    }

    const invoices = await listInvoices(user.stripeCustomerId, 10);

    return invoices.map(invoice => ({
      id: invoice.id,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: invoice.status,
      created: invoice.created,
      invoicePdf: invoice.invoice_pdf,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
    }));
  }),

  /**
   * Get all pricing tiers
   */
  getPricingTiers: protectedProcedure.query(() => {
    return PRICING_TIERS;
  }),
});
