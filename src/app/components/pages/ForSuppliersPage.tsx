import { Link } from 'react-router';
import { EnquiryTicker, MarketplacePageHeader, SectionHeader, TrustSignalsBar } from '../MarketplaceComponents';
import { SupplierCitiesMap } from '../VisualSections';
import AnimatedIcon from '../AnimatedIcon';

const benefits = [
  { iconName: 'shield', title: 'Verified Buyer Intent', text: 'RFQs are captured with product, quantity, city, and contact details.' },
  { iconName: 'bell', title: 'Fast Notifications', text: 'Relevant supplier categories receive direct lead alerts for quicker response.' },
  { iconName: 'trending', title: 'Pan-India Demand', text: 'Access sourcing requests from metro, industrial, and tier-2 business cities.' },
  { iconName: 'document', title: 'Proposal Support', text: 'Use Truvex to prepare structured commercial responses when needed.' },
];

const steps = [
  { step: '1', iconName: 'users', title: 'Create Account', desc: 'Add your basic details and verify your mobile number' },
  { step: '2', iconName: 'document', title: 'Add Business Details', desc: 'Provide your company name, address, and GST info' },
  { step: '3', iconName: 'box', title: 'Upload Products', desc: 'Add high-quality photos and detailed specifications' },
];

const leadTypes = [
  { type: 'Standard RFQ', buyer: 'Product, quantity, city', supplier: 'Quote-ready lead summary', cost: 'Commission on closure' },
  { type: 'Priority Lead', buyer: 'Urgent purchase timeline', supplier: 'Early notification and callback slot', cost: 'Subscription eligible' },
  { type: 'Proposal Support', buyer: 'Technical or price comparison needed', supplier: 'Structured proposal assistance', cost: 'Per proposal' },
];

export default function ForSuppliersPage() {
  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="For suppliers"
        title="Receive Qualified Buyer Requirements"
        subtext="Join the Truvex supplier network to receive product-specific RFQs from buyers who have shared quantity, city, and purchase timeline."
        imageUrl="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200"
      />
      <EnquiryTicker label="Buyer leads" />
      <TrustSignalsBar />

      {/* HOW IT WORKS */}
      <section className="px-4 py-16 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Get started" title="3 Simple Steps to Start Receiving Leads" />
          <div className="grid md:grid-cols-3 gap-8 mt-12 relative">
            {/* Connector lines */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-border z-0" />

            {steps.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 bg-primary flex items-center justify-center mb-6 shadow-xl border-4 border-accent/20 relative">
                  <AnimatedIcon icon={s.iconName as any} size={48} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white text-[10px] font-black flex items-center justify-center">{s.step}</span>
                </div>
                <h3 className="font-bold text-primary text-base mb-2">{s.step}. {s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-4 py-16 bg-[#f4f6f8]">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Supplier benefits"
            title="Built for serious B2B suppliers"
            subtext="The supplier experience prioritizes qualified leads, direct response, and transparent engagement models."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-10">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="group bg-white border border-border hover:border-accent p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {/* Icon block: dark bg like Home Page hero metric cards */}
                <div className="w-16 h-16 bg-primary flex items-center justify-center mb-5 border-b-4 border-accent group-hover:bg-accent/90 transition-colors duration-300">
                  <AnimatedIcon icon={benefit.iconName as any} size={36} />
                </div>
                <h3 className="text-sm font-bold text-primary mb-2">{benefit.title}</h3>
                <p className="text-[13px] leading-5 text-muted-foreground">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupplierCitiesMap />

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Lead model" title="How supplier opportunities are routed" />
          <div className="overflow-x-auto border border-border bg-card">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-[12px] uppercase tracking-wide">Lead type</th>
                  <th className="px-4 py-3 text-[12px] uppercase tracking-wide">Buyer data captured</th>
                  <th className="px-4 py-3 text-[12px] uppercase tracking-wide">Supplier receives</th>
                  <th className="px-4 py-3 text-[12px] uppercase tracking-wide">Cost basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leadTypes.map((row) => (
                  <tr key={row.type} className="hover:bg-muted/40">
                    <td className="px-4 py-3 font-bold text-primary">{row.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.buyer}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.supplier}</td>
                    <td className="px-4 py-3 font-semibold text-teal-700">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Supplier onboarding</div>
            <h2 className="font-serif text-2xl font-bold text-white">List your business as a verified supplier</h2>
            <p className="mt-1 text-sm text-white/70">Add city, category, supply capacity, certifications, and contact rules.</p>
          </div>
          <Link to="/contact" className="market-button bg-accent px-5 py-3 text-center text-sm font-bold text-white">Join Supplier Network</Link>
        </div>
      </section>
    </div>
  );
}
