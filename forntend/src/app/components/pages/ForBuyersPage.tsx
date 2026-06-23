import { Link } from 'react-router';
import { EnquiryTicker, MarketplacePageHeader, SectionHeader, TrustSignalsBar } from '../MarketplaceComponents';
import AnimatedIcon from '../AnimatedIcon';

const stats = [
  { iconName: 'shield', value: '500+', label: 'Verified suppliers' },
  { iconName: 'rupee', value: 'INR 0', label: 'Cost to post RFQ' },
  { iconName: 'clock', value: '4 hrs', label: 'Target response window' },
  { iconName: 'box', value: '120+', label: 'Product categories' },
];

const steps = [
  { step: '1', iconName: 'target', title: 'Post Requirement', desc: 'Tell us exactly what you need, including quantity and budget.' },
  { step: '2', iconName: 'document', title: 'Receive Quotes', desc: 'Get competitive quotes directly from verified sellers.' },
  { step: '3', iconName: 'handshake', title: 'Finalize Deal', desc: 'Compare quotes, negotiate, and close the best deal.' },
];

const buyerRows = [
  { problem: 'Unverified supplier calls', truvex: 'Shortlisted verified suppliers only', result: 'Less follow-up waste' },
  { problem: 'No clear quote format', truvex: 'Structured product, quantity, city, and timeline capture', result: 'Faster comparison' },
  { problem: 'Searching across directories', truvex: 'Single RFQ routed to relevant categories', result: 'Response in 4 hours' },
  { problem: 'Supplier availability unknown', truvex: 'Active city/category supplier cards', result: 'Better callback rate' },
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

      {/* STATS SECTION */}
      <section className="px-4 py-16 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Buyer dashboard"
            title="Procurement signals in one view"
            subtext="The buyer experience is built around RFQ speed, verified suppliers, and direct commercial follow-up."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
            {stats.map((stat) => (
              <div key={stat.label} className="group bg-white border border-border hover:border-accent shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-start">
                {/* Dark primary icon block — same style as Home Page metric cards */}
                <div className="w-16 h-16 bg-primary flex items-center justify-center mb-5 border-b-4 border-accent group-hover:bg-accent/90 transition-colors duration-300">
                  <AnimatedIcon icon={stat.iconName as any} size={36} />
                </div>
                <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
                <div className="mt-1 text-[12px] font-bold uppercase tracking-wide text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 py-16 bg-[#f4f6f8] border-b border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="How it works" title="From Requirement to Deal in 3 Steps" />
          <div className="grid md:grid-cols-3 gap-8 mt-12 relative">
            <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-border z-0" />
            {steps.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 bg-primary flex items-center justify-center mb-6 shadow-xl border-4 border-accent/20 relative">
                  <AnimatedIcon icon={s.iconName as any} size={48} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white text-[10px] font-black flex items-center justify-center">{s.step}</span>
                </div>
                <h3 className="font-bold text-primary text-base mb-2">{s.step}. {s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-4 pb-12 py-16 bg-white">
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

      <section className="bg-primary px-4 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Free for buyers</div>
            <h2 className="font-serif text-2xl font-bold text-white">Post one RFQ. Get supplier callbacks.</h2>
            <p className="mt-1 text-sm text-white/70">Best for industrial products, bulk orders, repeat procurement, and city-specific sourcing.</p>
          </div>
          <Link to="/contact" className="market-button bg-accent px-5 py-3 text-center text-sm font-bold text-white">Request for Quotation</Link>
        </div>
      </section>
    </div>
  );
}
