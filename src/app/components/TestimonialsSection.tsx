import { MapPin } from 'lucide-react';
import { EnquiryTicker, SectionHeader } from './MarketplaceComponents';

const transactions = [
  { name: 'Apex Industrial Traders', category: 'Steel Fabrication', city: 'Mumbai' },
  { name: 'Bright Controls Pvt Ltd', category: 'Electrical Panels', city: 'Noida' },
  { name: 'Surat Packline LLP', category: 'Packaging Film', city: 'Surat' },
  { name: 'Metro Build Mart', category: 'Construction Hardware', city: 'Delhi' },
  { name: 'Prime Auto Spares', category: 'Automotive Parts', city: 'Pune' },
  { name: 'Delta Safety Supply', category: 'Safety Products', city: 'Chennai' },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-background px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Marketplace proof"
          title="Recent supplier and buyer activity"
          subtext="Live-style activity signals replace long testimonial copy and make the platform feel operational."
        />
        <EnquiryTicker label="Recent" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {transactions.map((item) => (
            <div key={item.name} className="border border-border border-t-2 border-t-accent bg-card p-4">
              <div className="font-bold text-primary">{item.name}</div>
              <div className="mt-1 text-[12px] text-muted-foreground">{item.category}</div>
              <div className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-accent">
                <MapPin size={13} /> {item.city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
