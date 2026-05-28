import { Link } from 'react-router';
import { Clock3, IndianRupee, SearchCheck, ShieldCheck } from 'lucide-react';
import { EnquiryTicker, MarketplacePageHeader, SectionHeader, TrustSignalsBar } from '../MarketplaceComponents';

const buyerRows = [
  { problem: 'Unverified supplier calls', truvex: 'Shortlisted verified suppliers only', result: 'Less follow-up waste' },
  { problem: 'No clear quote format', truvex: 'Structured product, quantity, city, and timeline capture', result: 'Faster comparison' },
  { problem: 'Searching across directories', truvex: 'Single RFQ routed to relevant categories', result: 'Response in 4 hours' },
  { problem: 'Supplier availability unknown', truvex: 'Active city/category supplier cards', result: 'Better callback rate' },
];

const stats = [
  { icon: ShieldCheck, value: '500+', label: 'Verified suppliers' },
  { icon: IndianRupee, value: 'INR 0', label: 'Cost to post RFQ' },
  { icon: Clock3, value: '4 hrs', label: 'Target response window' },
  { icon: SearchCheck, value: '120+', label: 'Product categories' },
];

export default function ForBuyersPage() {
  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="For buyers"
        title="Post Requirements and Find Verified Suppliers Faster"
        subtext="Truvex helps purchase teams and business owners move from product requirement to supplier callback without browsing unverified listings."
        imageUrl="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200"
      />
      <EnquiryTicker />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Buyer dashboard"
            title="Procurement signals in one view"
            subtext="The buyer experience is built around RFQ speed, verified suppliers, and direct commercial follow-up."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="market-card border-t-2 border-t-accent p-4">
                <stat.icon className="mb-3 text-accent" />
                <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
                <div className="mt-1 text-[12px] font-bold uppercase tracking-wide text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="How buyers use Truvex" title="From requirement to quote shortlist" viewAllTo="/contact" />
          <div className="overflow-x-auto border border-border bg-card">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-[12px] uppercase tracking-wide">Buyer issue</th>
                  <th className="px-4 py-3 text-[12px] uppercase tracking-wide">Truvex workflow</th>
                  <th className="px-4 py-3 text-[12px] uppercase tracking-wide">Business outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {buyerRows.map((row) => (
                  <tr key={row.problem} className="hover:bg-muted/40">
                    <td className="px-4 py-3 font-semibold text-primary">{row.problem}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.truvex}</td>
                    <td className="px-4 py-3 font-semibold text-teal-700">{row.result}</td>
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
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Free for buyers</div>
            <h2 className="font-serif text-2xl font-bold text-white">Post one RFQ. Get supplier callbacks.</h2>
            <p className="mt-1 text-sm text-white/70">Best for industrial products, bulk orders, repeat procurement, and city-specific sourcing.</p>
          </div>
          <Link to="/contact" className="market-button bg-accent px-5 py-3 text-center text-sm font-bold text-white">Post Buy Requirement</Link>
        </div>
      </section>
    </div>
  );
}
