import Stripe from 'stripe';
import { PRICING_TIERS, getTierById } from './products';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
});

/**
 * Create or retrieve Stripe customer for a user
 */
export async function getOrCreateStripeCustomer(params: {
  userId: number;
  email: string;
  name?: string | null;
  stripeCustomerId?: string | null;
}): Promise<string> {
  const { userId, email, name, stripeCustomerId } = params;

  // If customer ID exists, verify it's valid
  if (stripeCustomerId) {
    try {
      await stripe.customers.retrieve(stripeCustomerId);
      return stripeCustomerId;
    } catch (error) {
      console.warn(`[Stripe] Customer ${stripeCustomerId} not found, creating new one`);
    }
  }

  // Create new customer
  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
    metadata: {
      user_id: userId.toString(),
    },
  });

  return customer.id;
}

/**
 * Create a checkout session for tier subscription
 */
export async function createCheckoutSession(params: {
  tierId: string;
  userId: number;
  userEmail: string;
  userName?: string | null;
  stripeCustomerId?: string | null;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const { tierId, userId, userEmail, userName, stripeCustomerId, successUrl, cancelUrl } = params;

  // Get tier configuration
  const tier = getTierById(tierId);
  if (!tier) {
    throw new Error(`Invalid tier ID: ${tierId}`);
  }

  // Get or create Stripe customer
  const customerId = await getOrCreateStripeCustomer({
    userId,
    email: userEmail,
    name: userName,
    stripeCustomerId,
  });

  // Create or get Stripe price for this tier
  const price = await getOrCreatePrice(tier);

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    client_reference_id: userId.toString(),
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
    customer_update: {
      address: 'auto',
      name: 'auto',
    },
    metadata: {
      user_id: userId.toString(),
      tier_id: tierId,
      customer_email: userEmail,
      customer_name: userName || '',
    },
    subscription_data: {
      metadata: {
        user_id: userId.toString(),
        tier_id: tierId,
      },
    },
  });

  return session;
}

/**
 * Get or create Stripe price for a tier
 */
async function getOrCreatePrice(tier: typeof PRICING_TIERS[0]): Promise<Stripe.Price> {
  // Search for existing price
  const prices = await stripe.prices.list({
    lookup_keys: [tier.id],
    limit: 1,
  });

  if (prices.data.length > 0) {
    return prices.data[0]!;
  }

  // Create product if it doesn't exist
  const products = await stripe.products.list({
    limit: 100,
  });

  let product = products.data.find((p: Stripe.Product) => p.metadata.tier_id === tier.id);

  if (!product) {
    product = await stripe.products.create({
      name: `${tier.name} Tier - Flat-Fee Accounting`,
      description: tier.description,
      metadata: {
        tier_id: tier.id,
        transaction_range: tier.transactionRange,
      },
    });
  }

  // Create price
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: tier.monthlyPrice,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    lookup_key: tier.id,
    metadata: {
      tier_id: tier.id,
    },
  });

  return price;
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.cancel(subscriptionId);
}

/**
 * Update subscription to a different tier
 */
export async function updateSubscription(params: {
  subscriptionId: string;
  newTierId: string;
}): Promise<Stripe.Subscription> {
  const { subscriptionId, newTierId } = params;

  // Get new tier
  const newTier = getTierById(newTierId);
  if (!newTier) {
    throw new Error(`Invalid tier ID: ${newTierId}`);
  }

  // Get or create price for new tier
  const newPrice = await getOrCreatePrice(newTier);

  // Retrieve current subscription
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Update subscription
  return await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0]!.id,
        price: newPrice.id,
      },
    ],
    proration_behavior: 'create_prorations',
    metadata: {
      ...subscription.metadata,
      tier_id: newTierId,
    },
  });
}

/**
 * Get subscription details
 */
export async function getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.retrieve(subscriptionId);
}

/**
 * List customer's invoices
 */
export async function listInvoices(customerId: string, limit: number = 10): Promise<Stripe.Invoice[]> {
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit,
  });
  return invoices.data;
}
