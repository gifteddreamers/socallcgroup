import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from './stripe';
import { updateUserStripeCustomer, updateUserSubscription, clearUserSubscription, getUserByStripeCustomerId } from './subscriptions';

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  console.warn('[Stripe Webhook] STRIPE_WEBHOOK_SECRET not set - webhook signature verification will fail');
}

/**
 * Stripe webhook handler
 * MUST be registered with express.raw({ type: 'application/json' }) middleware
 */
export async function handleStripeWebhook(req: Request, res: Response): Promise<void> {
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    res.status(400).send('Missing stripe-signature header');
    return;
  }

  if (!WEBHOOK_SECRET) {
    res.status(500).send('Webhook secret not configured');
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET);
  } catch (err) {
    const error = err as Error;
    console.error(`[Stripe Webhook] Signature verification failed:`, error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  // CRITICAL: Handle test events
  if (event.id.startsWith('evt_test_')) {
    console.log('[Stripe Webhook] Test event detected, returning verification response');
    res.json({ verified: true });
    return;
  }

  console.log(`[Stripe Webhook] Processing event: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error(`[Stripe Webhook] Error processing event:`, error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

/**
 * Handle successful checkout session
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void> {
  console.log(`[Stripe Webhook] Checkout session completed: ${session.id}`);

  const userId = session.metadata?.user_id;
  const tierId = session.metadata?.tier_id;

  if (!userId) {
    console.error('[Stripe Webhook] Missing user_id in checkout session metadata');
    return;
  }

  // Update user's Stripe customer ID
  if (session.customer && typeof session.customer === 'string') {
    await updateUserStripeCustomer(parseInt(userId), session.customer);
  }

  // If subscription was created, update user's subscription details
  if (session.subscription && typeof session.subscription === 'string' && tierId) {
    const subscription = await stripe.subscriptions.retrieve(session.subscription);
    await updateUserSubscription({
      userId: parseInt(userId),
      stripeSubscriptionId: subscription.id,
      currentTier: tierId,
      subscriptionStatus: subscription.status,
    });
  }
}

/**
 * Handle subscription creation or update
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
  console.log(`[Stripe Webhook] Subscription updated: ${subscription.id} (status: ${subscription.status})`);

  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
  const user = await getUserByStripeCustomerId(customerId);

  if (!user) {
    console.error(`[Stripe Webhook] User not found for customer: ${customerId}`);
    return;
  }

  const tierId = subscription.metadata?.tier_id;

  if (!tierId) {
    console.error('[Stripe Webhook] Missing tier_id in subscription metadata');
    return;
  }

  await updateUserSubscription({
    userId: user.id,
    stripeSubscriptionId: subscription.id,
    currentTier: tierId,
    subscriptionStatus: subscription.status,
  });
}

/**
 * Handle subscription deletion (cancellation)
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
  console.log(`[Stripe Webhook] Subscription deleted: ${subscription.id}`);

  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
  const user = await getUserByStripeCustomerId(customerId);

  if (!user) {
    console.error(`[Stripe Webhook] User not found for customer: ${customerId}`);
    return;
  }

  await clearUserSubscription(user.id);
}

/**
 * Handle successful invoice payment
 */
async function handleInvoicePaid(invoice: Stripe.Invoice): Promise<void> {
  console.log(`[Stripe Webhook] Invoice paid: ${invoice.id}`);

  // If this is a subscription invoice, ensure subscription status is up to date
  const invoiceAny = invoice as any;
  const subscriptionId = typeof invoiceAny.subscription === 'string' ? invoiceAny.subscription : invoiceAny.subscription?.id;
  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await handleSubscriptionUpdated(subscription);
  }
}

/**
 * Handle failed invoice payment
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  console.log(`[Stripe Webhook] Invoice payment failed: ${invoice.id}`);

  // Update subscription status to reflect payment failure
  const invoiceAny = invoice as any;
  const subscriptionId = typeof invoiceAny.subscription === 'string' ? invoiceAny.subscription : invoiceAny.subscription?.id;
  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await handleSubscriptionUpdated(subscription);
  }

  // TODO: Send notification to user about payment failure
  // You can use the notifyOwner helper or implement user email notifications
}
