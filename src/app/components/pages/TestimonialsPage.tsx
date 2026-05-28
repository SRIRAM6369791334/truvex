import TestimonialsSection from '../TestimonialsSection';
import { MarketplacePageHeader, TrustSignalsBar } from '../MarketplaceComponents';

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
    </div>
  );
}
