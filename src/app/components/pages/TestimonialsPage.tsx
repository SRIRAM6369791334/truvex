import TestimonialsSection from '../TestimonialsSection';
import { MarketplacePageHeader, SectionHeader, TrustSignalsBar } from '../MarketplaceComponents';

export default function TestimonialsPage() {
  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="Social proof"
        title="Recent Marketplace Activity"
        subtext="Supplier names, cities, and categories provide faster trust signals than generic testimonial copy."
      />
      <TrustSignalsBar />
      <TestimonialsSection />
      <section className="bg-white px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Platform proof" title="What makes buyers return to Truvex" />
          <div className="overflow-x-auto border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-[12px] uppercase">Buyer Type</th>
                  <th className="px-4 py-3 text-[12px] uppercase">Use Case</th>
                  <th className="px-4 py-3 text-[12px] uppercase">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['SME Manufacturer', 'Monthly raw material sourcing', 'Reduced search time by 70%'],
                  ['Retail Chain Buyer', 'Packaging vendor shortlist', 'Got 3 quotes in 6 hours'],
                  ['Construction Contractor', 'Hardware & fasteners bulk order', 'Saved 12% vs market rate'],
                  ['Industrial Plant Owner', 'Electrical panel procurement', 'Verified supplier in 24hrs'],
                ].map(([type, use, result]) => (
                  <tr key={type} className="hover:bg-muted/40">
                    <td className="px-4 py-3 font-bold text-primary">{type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{use}</td>
                    <td className="px-4 py-3 font-semibold text-teal-700">{result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
