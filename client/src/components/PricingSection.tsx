import PricingCard from "./PricingCard";

// Pricing tiers data (matches server/products.ts)
const PRICING_TIERS = [
  {
    id: 'startups',
    name: 'Startups',
    description: 'Perfect for early-stage businesses getting their financials in order',
    tagline: 'Bookkeeping built for founders who focus on growth',
    monthlyPrice: 25000,
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
    monthlyPrice: 50000,
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
    monthlyPrice: 100000,
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
    monthlyPrice: 250000,
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

const CORE_SERVICES = [
  'Invoice Customers / Generate Donation Receipts',
  'Pay Bills & Attach Receipts',
  'Reimburse Expenses',
  'Reconcile Bank & Credit Cards',
  'View Monthly Financial Statements',
  'Forecast Financial Flow Dashboard',
];

const INTEGRATION_OPTIONS = [
  'CRM',
  'Bill.com',
  'Expensify',
  'Ramp',
  'ADP',
  'Gusto',
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.51_0.12_230)] mb-6">
            Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Flat-fee accounting that scales with your transaction volume. No surprises, no hidden fees.
          </p>
          <p className="text-sm text-muted-foreground">
            All tiers include monthly QBO financial statements & interactive dashboard access
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} coreServices={CORE_SERVICES} />
          ))}
        </div>

        {/* Integration Options */}
        <div className="bg-white rounded-xl p-8 shadow-md max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center text-[oklch(0.51_0.12_230)] mb-6">
            Integration Options
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {INTEGRATION_OPTIONS.map((integration) => (
              <div
                key={integration}
                className="px-6 py-3 bg-[oklch(0.96_0.02_215)] text-[oklch(0.51_0.12_230)] rounded-lg font-medium text-sm border border-[oklch(0.72_0.11_215)]"
              >
                {integration}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Seamlessly connect your existing tools for a unified financial workflow
          </p>
        </div>

        {/* FAQ Teaser */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Questions about which tier is right for you?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="text-[oklch(0.51_0.12_230)] font-semibold hover:text-[oklch(0.72_0.11_215)] transition-colors underline"
          >
            Schedule a free consultation
          </button>
        </div>
      </div>
    </section>
  );
}
