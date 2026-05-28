import { Link } from 'react-router';
import { Check } from 'lucide-react';
import { MarketplacePageHeader, TrustSignalsBar } from '../MarketplaceComponents';

const tiers = [
  {
    name: 'Buyer Standard',
    price: 'Free',
    description: 'For SMEs posting product requirements.',
    features: ['Unlimited buying requirements', 'Curated supplier proposals', 'Supplier verification tags', 'Basic email support'],
    button: 'Post Requirement',
    href: '/contact',
    highlight: false,
  },
  {
    name: 'Supplier Premium',
    price: 'INR 4,999',
    period: '/month',
    description: 'For manufacturers and traders seeking verified B2B leads.',
    features: ['Priority access to buyer leads', 'Featured placement in proposals', 'Buyer intent summaries', 'Dedicated account support'],
    button: 'Join as Supplier',
    href: '/for-suppliers',
    highlight: true,
  },
  {
    name: 'Enterprise Sourcing',
    price: 'Custom',
    description: 'Managed procurement for larger or complex sourcing requirements.',
    features: ['Dedicated procurement support', 'Compliance checks', 'Multi-vendor negotiation', 'Supply chain mapping'],
    button: 'Contact Sales',
    href: '/contact',
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="Transparent Pricing"
        title="Simple, Aligned Pricing"
        subtext="Free for buyers. Commission-based for suppliers. No hidden fees."
      />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-6 shadow-sm transition-all duration-200 hover:shadow-[0_8px_32px_rgba(11,31,58,0.12)] ${
                tier.highlight
                  ? 'border border-primary border-t-4 border-t-accent bg-primary text-white'
                  : 'border border-border border-t-2 border-t-accent bg-white/80 backdrop-blur-xl text-primary'
              }`}
            >
              <h3 className={`text-xl font-bold ${tier.highlight ? 'text-white' : 'text-primary'}`}>{tier.name}</h3>
              <p className={`mt-2 text-sm ${tier.highlight ? 'text-white/70' : 'text-muted-foreground'}`}>{tier.description}</p>
              <div className="my-6">
                <span className="font-serif text-4xl font-bold">{tier.price}</span>
                {tier.period && <span className={tier.highlight ? 'text-white/60' : 'text-muted-foreground'}>{tier.period}</span>}
              </div>
              <ul className="mb-8 grid gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className={tier.highlight ? 'text-white/85' : 'text-primary/80'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to={tier.href} className="market-button inline-flex bg-accent px-4 py-2 font-bold text-white">
                {tier.button}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary px-4 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Get Started</div>
            <h2 className="font-serif text-2xl font-bold text-white">Choose buyer RFQ or supplier onboarding</h2>
          </div>
          <Link to="/contact" className="market-button bg-accent px-5 py-3 text-sm font-bold text-white">Start Today</Link>
        </div>
      </section>
    </div>
  );
}
