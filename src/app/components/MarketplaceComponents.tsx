import { Link } from 'react-router';
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Factory,
  FlaskConical,
  IndianRupee,
  Leaf,
  MapPin,
  Monitor,
  Phone,
  Search,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export const trustSignals = [
  { icon: BadgeCheck, label: '500+ Verified Suppliers' },
  { icon: IndianRupee, label: 'Free for Buyers' },
  { icon: Clock3, label: 'Response in 4 Hours' },
  { icon: Truck, label: 'Pan-India Coverage' },
  { icon: ShieldCheck, label: 'ISO Verified Network' },
];

export const enquiries = [
  'Steel Pipes enquiry from Mumbai',
  'Industrial Motors from Coimbatore',
  'Packaging Rolls requirement from Surat',
  'CNC Components buyer from Pune',
  'Electrical Panels enquiry from Noida',
  'Safety Gloves bulk order from Ahmedabad',
];

export const categories = [
  { name: 'Industrial Machinery', count: '12,400+', subs: '248 sub-categories', icon: Factory, image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400' },
  { name: 'Electrical & Electronics', count: '8,900+', subs: '182 sub-categories', icon: ShieldCheck, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
  { name: 'Construction Materials', count: '15,100+', subs: '305 sub-categories', icon: Truck, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400' },
  { name: 'Packaging Materials', count: '4,800+', subs: '96 sub-categories', icon: BadgeCheck, image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400' },
  { name: 'Office & IT Supplies', count: '9,300+', subs: '141 sub-categories', icon: Monitor, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400' },
  { name: 'Automotive Parts', count: '6,700+', subs: '126 sub-categories', icon: Factory, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400' },
  { name: 'Chemicals & Raw Materials', count: '5,600+', subs: '112 sub-categories', icon: FlaskConical, image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400' },
  { name: 'Agricultural Products', count: '3,900+', subs: '84 sub-categories', icon: Leaf, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400' },
];

export const popularSearches = [
  'Steel Pipes',
  'Packaging Film',
  'Industrial Motors',
  'Safety Shoes',
  'Electrical Panels',
  'CNC Components',
  'PVC Pipes',
  'Office Chairs',
  'Machine Tools',
  'Solar Panels',
];

export const suppliers = [
  { name: 'Apex Industrial Traders', city: 'Mumbai', category: 'Steel & Fabrication', initials: 'AI', logo: 'https://ui-avatars.com/api/?name=Apex+Industrial&background=0B1F3A&color=C9973A&size=128' },
  { name: 'Coimbatore Motor Works', city: 'Coimbatore', category: 'Industrial Motors', initials: 'CM', logo: 'https://ui-avatars.com/api/?name=Coimbatore+Motor&background=0B1F3A&color=C9973A&size=128' },
  { name: 'Surat Packline LLP', city: 'Surat', category: 'Packaging Materials', initials: 'SP', logo: 'https://ui-avatars.com/api/?name=Surat+Packline&background=0B1F3A&color=C9973A&size=128' },
  { name: 'Noida Control Systems', city: 'Noida', category: 'Electrical Panels', initials: 'NC', logo: 'https://ui-avatars.com/api/?name=Noida+Controls&background=0B1F3A&color=C9973A&size=128' },
  { name: 'Pune CNC Components', city: 'Pune', category: 'Precision Parts', initials: 'PC', logo: 'https://ui-avatars.com/api/?name=Pune+CNC&background=0B1F3A&color=C9973A&size=128' },
  { name: 'Ahmedabad Safety Hub', city: 'Ahmedabad', category: 'PPE & Safety', initials: 'AS', logo: 'https://ui-avatars.com/api/?name=Ahmedabad+Safety&background=0B1F3A&color=C9973A&size=128' },
];

export function SectionHeader({
  eyebrow,
  title,
  subtext,
  viewAllTo,
}: {
  eyebrow: string;
  title: string;
  subtext?: string;
  viewAllTo?: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 border-b border-border bg-white px-4 py-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">{eyebrow}</div>
        <h2 className="font-serif text-2xl font-bold leading-tight text-primary md:text-3xl">{title}</h2>
        {subtext && <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">{subtext}</p>}
      </div>
      {viewAllTo && (
        <Link to={viewAllTo} className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-accent">
          View All <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}

export function TrustSignalsBar({ compact = false }: { compact?: boolean }) {
  return (
    <div className="border-y border-accent/30 bg-gradient-to-r from-[#0B1F3A] to-[#142848] text-white">
      <div className={`mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 ${compact ? 'py-2' : 'py-3'}`}>
        {trustSignals.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-[12px] font-semibold text-white/90">
            <item.icon size={15} className="text-accent" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EnquiryTicker({ items = enquiries, label = 'New' }: { items?: string[]; label?: string }) {
  return (
    <div className="overflow-hidden border-y border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
        <span className="shrink-0 bg-accent px-2 py-1 text-[11px] font-bold uppercase text-white">{label}</span>
        <div className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-sm text-primary">
          <div className="inline-block animate-market-ticker">
            {[...items, ...items].map((item, index) => (
              <span key={`${item}-${index}`} className="mr-8">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryCard({ category }: { category: (typeof categories)[number] }) {
  return (
    <div className="market-card group overflow-hidden border-t-2 border-t-accent">
      <div className="relative h-28 overflow-hidden border-b border-border">
        <img
          src={category.image}
          alt={category.name}
          width={400}
          height={180}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary/35" />
      </div>
      <div className="p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-accent/30 bg-accent/10 text-accent">
            <category.icon size={21} />
          </div>
          <div>
            <h3 className="text-sm font-bold leading-snug text-primary">{category.name}</h3>
            <p className="text-[12px] text-muted-foreground">{category.subs}</p>
          </div>
        </div>
        <span className="flex items-center gap-1 border border-teal-200 bg-teal-50 px-2 py-0.5 text-[11px] font-bold text-teal-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-600" />
          Live
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-[12px] font-semibold text-muted-foreground">{category.count} suppliers</span>
        <Link to="/categories" className="inline-flex items-center gap-1 text-[12px] font-bold text-accent">
          View Suppliers <ArrowRight size={13} />
        </Link>
      </div>
      </div>
    </div>
  );
}

export function PopularSearchStrip() {
  return (
    <div className="flex gap-2 overflow-x-auto border border-border bg-card p-3">
      <span className="shrink-0 py-1 text-[12px] font-bold uppercase tracking-wide text-primary">Popular Searches:</span>
      {popularSearches.map((tag) => (
        <Link
          key={tag}
          to="/categories"
          className="shrink-0 border border-border bg-muted/40 px-3 py-1 text-[12px] font-semibold text-primary hover:border-accent hover:text-accent"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}

export function SupplierCard({ supplier }: { supplier: (typeof suppliers)[number] }) {
  return (
    <div className="market-card group border-t-2 border-t-accent p-4">
      <div className="mb-3 flex items-start gap-3">
        <img
          src={supplier.logo}
          alt={`${supplier.name} logo`}
          width={128}
          height={128}
          loading="lazy"
          className="h-11 w-11 shrink-0 rounded-full border-2 border-accent object-cover"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-sm font-bold text-primary">{supplier.name}</h3>
            <BadgeCheck size={15} className="shrink-0 text-teal-700" />
          </div>
          <div className="mt-1 flex items-center gap-1 text-[12px] font-medium text-muted-foreground">
            <MapPin size={13} />
            {supplier.city}
          </div>
        </div>
      </div>
      <div className="mb-3 border-y border-border py-2 text-[12px]">
        <span className="font-semibold text-primary">Category:</span> <span className="text-muted-foreground">{supplier.category}</span>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/contact" className="market-button flex-1 bg-accent px-3 py-2 text-center text-[12px] font-bold text-white hover:bg-accent/90">
          Get Quote
        </Link>
        <Link to="/contact" className="flex items-center justify-center border border-border px-3 py-2 text-primary hover:border-primary">
          <Phone size={15} />
        </Link>
      </div>
    </div>
  );
}

export function MarketplacePageHeader({
  eyebrow,
  title,
  subtext,
  imageUrl,
}: {
  eyebrow: string;
  title: string;
  subtext: string;
  imageUrl?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-accent/30 bg-primary px-4 py-10 text-white">
      {imageUrl && (
        <>
          <img src={imageUrl} alt="" width={1200} height={520} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-primary/70" />
        </>
      )}
      <div className="relative z-10 mx-auto grid max-w-screen-2xl gap-6 px-0 lg:grid-cols-[1fr_420px] lg:items-center lg:px-4">
        <div>
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</div>
          <h1 className="font-serif text-3xl font-bold leading-tight text-white md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/78 md:text-base">{subtext}</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
          <label className="mb-2 block text-[12px] font-bold uppercase tracking-wide text-accent">Search supplier categories</label>
          <div className="flex">
            <input
              className="min-w-0 flex-1 border-0 bg-white px-3 py-2.5 text-sm text-primary outline-none"
              placeholder="Enter product or service"
            />
            <Link to="/categories" className="market-button bg-accent px-4 py-2.5 text-sm font-bold text-white">
              Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
