/**
 * Stripe Products and Prices Configuration
 * 
 * This file defines all pricing tiers for Socall C Group's flat-fee accounting services.
 * Each tier includes transaction ranges, monthly pricing, and feature descriptions.
 */

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  tagline: string;
  monthlyPrice: number; // in cents
  transactionRange: string;
  transactionMin: number;
  transactionMax: number;
  features: string[];
  stripePriceId?: string; // Will be set after creating in Stripe
  recommended?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'startups',
    name: 'Startups',
    description: 'Perfect for early-stage businesses getting their financials in order',
    tagline: 'Bookkeeping built for founders who focus on growth',
    monthlyPrice: 25000, // $250
    transactionRange: '50–100',
    transactionMin: 50,
    transactionMax: 100,
    features: [
      'Invoice Customers / Generate Donation Receipts',
      'Pay Bills & Attach Receipts',
      'Reimburse Expenses',
      'Reconcile Bank & Credit Cards',
      'View Monthly Financial Statements',
      'Forecast Financial Flow Dashboard',
      'Monthly QBO Financial Statements',
      'Interactive Dashboard Access',
    ],
  },
  {
    id: 'emerging-growth',
    name: 'Emerging Growth',
    description: 'For growing businesses ready to scale without complexity',
    tagline: 'Scale without scaling complexity',
    monthlyPrice: 50000, // $500
    transactionRange: '100–300',
    transactionMin: 100,
    transactionMax: 300,
    recommended: true,
    features: [
      'All Startups tier features',
      'Priority support response',
      'Quarterly financial review calls',
      'Custom reporting templates',
      'Multi-entity support (up to 2)',
      'Advanced forecasting tools',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'Enterprise-grade financials with transparent pricing',
    tagline: 'Enterprise-grade financials, transparent pricing',
    monthlyPrice: 100000, // $1,000
    transactionRange: '300–600',
    transactionMin: 300,
    transactionMax: 600,
    features: [
      'All Emerging Growth tier features',
      'Dedicated account manager',
      'Monthly strategic planning sessions',
      'Custom workflow automation',
      'Multi-entity support (up to 5)',
      'CFO-level advisory services',
      'Tax planning consultation',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Dedicated financial infrastructure for serious businesses',
    tagline: 'Dedicated financial infrastructure for serious businesses',
    monthlyPrice: 250000, // $2,500
    transactionRange: '600–1,200',
    transactionMin: 600,
    transactionMax: 1200,
    features: [
      'All Scale tier features',
      'White-glove onboarding',
      'Unlimited multi-entity support',
      'Custom integration development',
      'Weekly strategic advisory calls',
      'Board-ready financial packages',
      'Audit preparation support',
      'Dedicated team (bookkeeper + advisor)',
    ],
  },
];

/**
 * Core services included in ALL tiers
 */
export const CORE_SERVICES = [
  'Invoice Customers / Generate Donation Receipts',
  'Pay Bills & Attach Receipts',
  'Reimburse Expenses',
  'Reconcile Bank & Credit Cards',
  'View Monthly Financial Statements',
  'Forecast Financial Flow Dashboard',
];

/**
 * Integration options available for all tiers
 */
export const INTEGRATION_OPTIONS = [
  'CRM',
  'Bill.com',
  'Expensify',
  'Ramp',
  'ADP',
  'Gusto',
];

/**
 * Add-on services available for purchase
 */
export interface AddOnService {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  priceLabel: string;
  tagline: string;
  cta: string;
}

export const ADD_ON_SERVICES: AddOnService[] = [
  {
    id: 'year-end-cleanup',
    name: 'Year-End Cleanup Package',
    description: 'Get messy historical books organized and audit-ready. The perfect entry point to ongoing bookkeeping.',
    price: 120000, // $1,200
    priceLabel: '$1,200 one-time',
    tagline: 'Get current, then stay current',
    cta: 'Schedule Cleanup',
  },
  {
    id: 'payroll-onboarding',
    name: 'Payroll Onboarding & Compliance',
    description: 'Multi-state payroll setup, tax filing automation, and ongoing compliance management.',
    price: 0, // Custom pricing
    priceLabel: 'Custom pricing',
    tagline: 'Payroll done right from day one',
    cta: 'Learn More',
  },
  {
    id: 'sales-tax-compliance',
    name: 'Sales Tax Compliance & Reporting',
    description: 'Automated sales tax calculation, quarterly filing, and audit trail documentation.',
    price: 0, // Custom pricing
    priceLabel: 'Custom pricing',
    tagline: 'Never miss a filing deadline',
    cta: 'Learn More',
  },
];

/**
 * Helper function to get tier by ID
 */
export function getTierById(id: string): PricingTier | undefined {
  return PRICING_TIERS.find(tier => tier.id === id);
}

/**
 * Helper function to get tier by transaction count
 */
export function getTierByTransactionCount(count: number): PricingTier | undefined {
  return PRICING_TIERS.find(
    tier => count >= tier.transactionMin && count <= tier.transactionMax
  );
}
