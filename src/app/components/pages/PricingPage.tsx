import { Check } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../AnimationUtils';

export default function PricingPage() {
  const tiers = [
    {
      name: "Buyer Standard",
      price: "Free",
      description: "For SMEs looking to source products efficiently.",
      features: [
        "Unlimited buying requirements",
        "Curated supplier proposals",
        "Supplier verification tags",
        "Basic email support"
      ],
      button: "Post Requirement",
      highlight: false
    },
    {
      name: "Supplier Premium",
      price: "₹4,999",
      period: "/month",
      description: "For manufacturers looking for verified B2B leads.",
      features: [
        "Priority access to buyer leads",
        "Featured placement in proposals",
        "Detailed buyer intent analytics",
        "Dedicated account manager",
        "Automated proposal drafting"
      ],
      button: "Join as Supplier",
      highlight: true
    },
    {
      name: "Enterprise Sourcing",
      price: "Custom",
      description: "End-to-end procurement for large corporations.",
      features: [
        "Dedicated procurement team",
        "Custom compliance audits",
        "Multi-vendor negotiation",
        "Supply chain mapping",
        "API integrations"
      ],
      button: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Transparent Pricing</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Simple, Aligned Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Free for buyers. Performance-based for suppliers. No hidden fees.</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, i) => (
            <StaggerItem key={i} className={`rounded-2xl p-8 ${tier.highlight ? 'bg-primary text-primary-foreground shadow-2xl ring-4 ring-primary/20 scale-105' : 'bg-card text-foreground border border-border shadow-sm'}`}>
              <h3 className={`text-xl font-bold mb-2 ${tier.highlight ? 'text-white' : 'text-primary'}`}>{tier.name}</h3>
              <p className={tier.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}>{tier.description}</p>
              
              <div className="my-6">
                <span className="text-4xl font-extrabold">{tier.price}</span>
                {tier.period && <span className={tier.highlight ? 'text-primary-foreground/60' : 'text-muted-foreground'}>{tier.period}</span>}
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${tier.highlight ? 'text-accent' : 'text-teal-600'}`} />
                    <span className={tier.highlight ? 'text-primary-foreground/90' : 'text-foreground/80'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-xl font-bold transition-all ${
                tier.highlight 
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:-translate-y-1' 
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}>
                {tier.button}
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
