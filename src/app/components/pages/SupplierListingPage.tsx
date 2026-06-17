import { BadgeCheck, MapPin } from 'lucide-react';
import { MarketplacePageHeader, SectionHeader, TrustSignalsBar, suppliers } from '../MarketplaceComponents';
import { openEnquiryPopup } from '../LeadCaptureComponents';

const productImages = [
  'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
  'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500',
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500',
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500',
];

export default function SupplierListingPage() {
  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="Supplier Network"
        title="Verified Supplier Listings"
        subtext="Browse supplier profiles and products. Direct contact details stay hidden; send enquiries through Truvex."
        imageUrl="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1600"
      />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Protected marketplace"
            title="Supplier profiles without direct contact exposure"
            subtext="Each listing shows business credibility, product visuals, category and city, then routes all enquiries through Truvex."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {suppliers.map((supplier, index) => (
              <div key={supplier.name} className="market-card overflow-hidden border-t-2 border-t-accent">
                <div className="grid grid-cols-3 gap-1 border-b border-border bg-muted p-1">
                  {[0, 1, 2].map((offset) => (
                    <img
                      key={offset}
                      src={productImages[(index + offset) % productImages.length]}
                      alt={`${supplier.category} product`}
                      width={500}
                      height={300}
                      loading="lazy"
                      className="h-24 w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <img src={supplier.logo} alt={`${supplier.name} logo`} width={128} height={128} loading="lazy" className="h-14 w-14 rounded-full border-2 border-accent object-cover" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="truncate text-base font-bold text-primary">{supplier.name}</h3>
                        <BadgeCheck className="shrink-0 text-teal-700" size={17} />
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
                        <MapPin size={13} /> {supplier.city}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    Verified supplier for {supplier.category}. Product capacity and commercial response are available through Truvex enquiry routing.
                  </p>
                  <div className="mt-4 rounded-xl bg-amber-50 p-3 text-[12px] font-semibold text-primary">
                    Direct supplier phone/email hidden for marketplace privacy.
                  </div>
                  <button onClick={openEnquiryPopup} className="market-button mt-4 min-h-12 w-full rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white">
                    Send Enquiry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
