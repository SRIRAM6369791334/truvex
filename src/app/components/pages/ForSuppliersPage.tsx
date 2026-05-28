import { Link } from 'react-router';
import { BadgeCheck, BellRing, FileCheck2, MapPinned } from 'lucide-react';
import { EnquiryTicker, MarketplacePageHeader, SectionHeader, TrustSignalsBar } from '../MarketplaceComponents';

const leadTypes = [
  { type: 'Standard RFQ', buyer: 'Product, quantity, city', supplier: 'Quote-ready lead summary', cost: 'Commission on closure' },
  { type: 'Priority Lead', buyer: 'Urgent purchase timeline', supplier: 'Early notification and callback slot', cost: 'Subscription eligible' },
  { type: 'Proposal Support', buyer: 'Technical or price comparison needed', supplier: 'Structured proposal assistance', cost: 'Per proposal' },
];

const benefits = [
  { icon: BadgeCheck, title: 'Verified Buyer Intent', text: 'RFQs are captured with product, quantity, city, and contact details.' },
  { icon: BellRing, title: 'Fast Notifications', text: 'Relevant supplier categories receive direct lead alerts for quicker response.' },
  { icon: MapPinned, title: 'Pan-India Demand', text: 'Access sourcing requests from metro, industrial, and tier-2 business cities.' },
  { icon: FileCheck2, title: 'Proposal Support', text: 'Use Truvex to prepare structured commercial responses when needed.' },
];

export default function ForSuppliersPage() {
  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="For suppliers"
        title="Receive Qualified Buyer Requirements"
        subtext="Join the Truvex supplier network to receive product-specific RFQs from buyers who have shared quantity, city, and purchase timeline."
      />
      <EnquiryTicker label="Buyer leads" />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Supplier benefits"
            title="Built for serious B2B suppliers"
            subtext="The supplier experience prioritizes qualified leads, direct response, and transparent engagement models."
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="border border-border border-t-2 border-t-accent bg-card p-4">
                <benefit.icon className="mb-3 text-accent" />
                <h3 className="text-sm font-bold text-primary">{benefit.title}</h3>
                <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8">
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

      <section className="bg-primary px-4 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Supplier onboarding</div>
            <h2 className="font-serif text-2xl font-bold text-white">List your business as a verified supplier</h2>
            <p className="mt-1 text-sm text-white/70">Add city, category, supply capacity, certifications, and contact rules.</p>
          </div>
          <Link to="/contact" className="bg-accent px-5 py-3 text-center text-sm font-bold text-white">Join Supplier Network</Link>
        </div>
      </section>
    </div>
  );
}
