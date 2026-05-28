import { Link } from 'react-router';
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Factory,
  IndianRupee,
  MapPin,
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
  { name: 'Industrial Machinery', count: '12,400+', subs: '248 sub-categories', icon: Factory },
  { name: 'Electrical & Electronics', count: '8,900+', subs: '182 sub-categories', icon: ShieldCheck },
  { name: 'Construction Materials', count: '15,100+', subs: '305 sub-categories', icon: Truck },
  { name: 'Packaging Materials', count: '4,800+', subs: '96 sub-categories', icon: BadgeCheck },
  { name: 'Office & IT Supplies', count: '9,300+', subs: '141 sub-categories', icon: Search },
  { name: 'Automotive Parts', count: '6,700+', subs: '126 sub-categories', icon: Factory },
  { name: 'Chemicals & Raw Materials', count: '5,600+', subs: '112 sub-categories', icon: ShieldCheck },
  { name: 'Agricultural Products', count: '3,900+', subs: '84 sub-categories', icon: Truck },
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
  { name: 'Apex Industrial Traders', city: 'Mumbai', category: 'Steel & Fabrication', initials: 'AI' },
  { name: 'Coimbatore Motor Works', city: 'Coimbatore', category: 'Industrial Motors', initials: 'CM' },
  { name: 'Surat Packline LLP', city: 'Surat', category: 'Packaging Materials', initials: 'SP' },
  { name: 'Noida Control Systems', city: 'Noida', category: 'Electrical Panels', initials: 'NC' },
  { name: 'Pune CNC Components', city: 'Pune', category: 'Precision Parts', initials: 'PC' },
  { name: 'Ahmedabad Safety Hub', city: 'Ahmedabad', category: 'PPE & Safety', initials: 'AS' },
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
    <div className="mb-5 flex flex-col gap-3 border-b border-border bg-card px-4 py-4 sm:flex-row sm:items-end sm:justify-between">
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
    <div className="border-y border-accent/30 bg-primary text-white">
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
    <div className="group border border-border border-t-2 border-t-accent bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md">
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
    <div className="border border-border border-t-2 border-t-accent bg-card p-4 shadow-sm transition hover:border-accent hover:shadow-md">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-sm font-bold text-white">{supplier.initials}</div>
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
        <Link to="/contact" className="flex-1 bg-accent px-3 py-2 text-center text-[12px] font-bold text-white hover:bg-accent/90">
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
}: {
  eyebrow: string;
  title: string;
  subtext: string;
}) {
  return (
    <section className="border-b border-accent/30 bg-primary px-4 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</div>
          <h1 className="font-serif text-3xl font-bold leading-tight text-white md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/78 md:text-base">{subtext}</p>
        </div>
        <div className="border border-white/15 bg-white/8 p-4">
          <label className="mb-2 block text-[12px] font-bold uppercase tracking-wide text-accent">Search supplier categories</label>
          <div className="flex">
            <input
              className="min-w-0 flex-1 border-0 bg-white px-3 py-2.5 text-sm text-primary outline-none"
              placeholder="Enter product or service"
            />
            <Link to="/categories" className="bg-accent px-4 py-2.5 text-sm font-bold text-white">
              Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
