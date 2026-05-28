import { Link } from 'react-router';
import { ClipboardList, FileSpreadsheet, Handshake, UsersRound } from 'lucide-react';
import { EnquiryTicker, MarketplacePageHeader, SectionHeader, TrustSignalsBar } from '../MarketplaceComponents';

const services = [
  { icon: ClipboardList, title: 'RFQ Capture', tag: 'Buyer tool', text: 'Collect product, quantity, city, timeline, and mobile details in a quote-ready format.' },
  { icon: UsersRound, title: 'Supplier Matching', tag: 'Marketplace', text: 'Route requirements to verified suppliers by product category, city, and capability.' },
  { icon: FileSpreadsheet, title: 'Proposal Support', tag: 'Managed service', text: 'Prepare structured commercial proposals, comparison sheets, and supplier shortlists.' },
  { icon: Handshake, title: 'Closure Support', tag: 'Supplier model', text: 'Support follow-up between qualified buyers and suppliers through deal stages.' },
];

const revenueRows = [
  { stream: 'Supplier Commission', chargedTo: 'Supplier', basis: 'Percentage of closed order value', fit: 'Best for pay-on-success suppliers' },
  { stream: 'Platform Subscription', chargedTo: 'Supplier', basis: 'Monthly priority lead access', fit: 'Best for high-capacity suppliers' },
  { stream: 'Buyer Consultation', chargedTo: 'Buyer', basis: 'Managed sourcing report fee', fit: 'Best for complex procurement' },
  { stream: 'Proposal Services', chargedTo: 'Buyer / Supplier', basis: 'Per proposal or comparison pack', fit: 'Best for technical purchases' },
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="Services"
        title="RFQ, Supplier Matching, and Managed Sourcing Services"
        subtext="Truvex provides practical B2B sourcing workflows for buyers and suppliers instead of generic lead-generation promises."
      />
      <EnquiryTicker />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Service modules"
            title="Functional sourcing services"
            subtext="Each service maps to a concrete marketplace workflow: capture, match, quote, and close."
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="border border-border border-t-2 border-t-accent bg-card p-4">
                <service.icon className="mb-3 text-accent" />
                <div className="mb-2 inline-flex bg-primary px-2 py-1 text-[11px] font-bold uppercase text-white">{service.tag}</div>
                <h3 className="text-base font-bold text-primary">{service.title}</h3>
                <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Commercial model" title="Transparent service and revenue structure" />
          <div className="overflow-x-auto border border-border bg-card">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-[12px] uppercase tracking-wide">Stream</th>
                  <th className="px-4 py-3 text-[12px] uppercase tracking-wide">Charged to</th>
                  <th className="px-4 py-3 text-[12px] uppercase tracking-wide">Basis</th>
                  <th className="px-4 py-3 text-[12px] uppercase tracking-wide">Best fit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {revenueRows.map((row) => (
                  <tr key={row.stream} className="hover:bg-muted/40">
                    <td className="px-4 py-3 font-bold text-primary">{row.stream}</td>
                    <td className="px-4 py-3"><span className="bg-accent px-2 py-1 text-[12px] font-bold text-white">{row.chargedTo}</span></td>
                    <td className="px-4 py-3 text-muted-foreground">{row.basis}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.fit}</td>
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
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Start sourcing</div>
            <h2 className="font-serif text-2xl font-bold text-white">Use Truvex for your next B2B purchase or supplier listing</h2>
            <p className="mt-1 text-sm text-white/70">Choose buyer RFQ support or supplier onboarding based on your business role.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/contact" className="bg-accent px-5 py-3 text-center text-sm font-bold text-white">Post Requirement</Link>
            <Link to="/for-suppliers" className="border border-white/30 px-5 py-3 text-center text-sm font-bold text-white">For Suppliers</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
