import { MapPin } from 'lucide-react';
import { EnquiryTicker, SectionHeader } from './MarketplaceComponents';

const transactions = [
  { name: 'Apex Industrial Traders', category: 'Steel Fabrication', city: 'Mumbai', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { name: 'Bright Controls Pvt Ltd', category: 'Electrical Panels', city: 'Noida', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { name: 'Surat Packline LLP', category: 'Packaging Film', city: 'Surat', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { name: 'Metro Build Mart', category: 'Construction Hardware', city: 'Delhi', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop' },
  { name: 'Prime Auto Spares', category: 'Automotive Parts', city: 'Pune', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
  { name: 'Delta Safety Supply', category: 'Safety Products', city: 'Chennai', photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop' },
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
            <div key={item.name} className="market-card border-t-2 border-t-accent p-4">
              <div className="flex items-center gap-3">
                <img src={item.photo} alt={item.name} width={100} height={100} loading="lazy" className="h-12 w-12 rounded-full border-2 border-accent object-cover" />
                <div className="font-bold text-primary">{item.name}</div>
              </div>
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
