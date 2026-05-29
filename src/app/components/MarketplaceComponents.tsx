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
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="relative">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-accent"></span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
        </div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl">{title}</h2>
        {subtext && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtext}</p>}
      </div>
      {viewAllTo && (
        <Link to={viewAllTo} className="group inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-accent">
          View All 
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

export function TrustSignalsBar({ compact = false }: { compact?: boolean }) {
  return (
    <div className="border-y border-accent/20 bg-gradient-to-r from-[#0B1F3A] via-[#112A4F] to-[#0B1F3A] text-white shadow-inner">
      <div className={`mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 ${compact ? 'py-3' : 'py-4'}`}>
        {trustSignals.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-[13px] font-medium tracking-wide text-white/90">
            <item.icon size={16} className="text-accent" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EnquiryTicker({ items = enquiries, label = 'Live Updates' }: { items?: string[]; label?: string }) {
  return (
    <div className="overflow-hidden border-b border-border bg-[#F8FAFC]">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5">
        <div className="flex shrink-0 items-center gap-2 rounded-full bg-accent/10 px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent">{label}</span>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-sm font-medium text-primary/80">
          <div className="inline-block animate-market-ticker">
            {[...items, ...items].map((item, index) => (
              <span key={`${item}-${index}`} className="mr-12 inline-flex items-center gap-2">
                {item}
                <span className="h-1 w-1 rounded-full bg-border"></span>
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
    <Link to="/categories" className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
      <div className="relative h-32 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          width={400}
          height={180}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md ring-1 ring-white/30">
          <category.icon size={20} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-[15px] font-bold leading-snug text-primary transition-colors group-hover:text-accent">{category.name}</h3>
            <p className="mt-0.5 text-[12px] text-muted-foreground">{category.subs}</p>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground">
            <BadgeCheck size={14} className="text-teal-600" />
            {category.count} suppliers
          </div>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PopularSearchStrip() {
  return (
    <div className="flex items-center gap-3 overflow-x-auto border-y border-border bg-card/50 px-4 py-3 backdrop-blur-sm">
      <span className="shrink-0 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-primary">
        <Search size={14} className="text-accent" />
        Popular:
      </span>
      {popularSearches.map((tag) => (
        <Link
          key={tag}
          to="/categories"
          className="shrink-0 rounded-full border border-border/60 bg-white px-3.5 py-1 text-[12px] font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}

export function SupplierCard({ supplier }: { supplier: (typeof suppliers)[number] }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden">
        <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-accent/5 transition-transform group-hover:scale-150" />
      </div>
      <div className="relative mb-4 flex items-start gap-4">
        <div className="relative">
          <img
            src={supplier.logo}
            alt={`${supplier.name} logo`}
            width={128}
            height={128}
            loading="lazy"
            className="h-14 w-14 shrink-0 rounded-xl border border-border/50 object-cover shadow-sm"
          />
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-teal-500 text-white">
            <BadgeCheck size={10} />
          </div>
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <h3 className="truncate text-[15px] font-bold text-primary transition-colors group-hover:text-accent">{supplier.name}</h3>
          <div className="mt-1 flex flex-col gap-1 text-[12px] font-medium text-muted-foreground sm:flex-row sm:items-center sm:gap-3">
            <span className="flex items-center gap-1"><MapPin size={12} /> {supplier.city}</span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
            <span className="flex items-center gap-1"><Factory size={12} className="shrink-0"/> <span className="truncate">{supplier.category}</span></span>
          </div>
        </div>
      </div>
      
      <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 border-t border-border/50 pt-4">
        <Link to="/contact" className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-accent hover:shadow-lg hover:shadow-accent/20">
          Get Best Quote
        </Link>
        <Link to="/contact" className="flex items-center justify-center rounded-xl border border-border bg-white px-3 text-primary transition-colors hover:border-primary hover:bg-primary/5">
          <Phone size={16} />
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
    <section className="relative overflow-hidden bg-[#0A1A30] px-4 py-16 text-white sm:py-24">
      {imageUrl && (
        <>
          <img src={imageUrl} alt="" width={1200} height={600} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A30] via-[#0A1A30]/95 to-[#0A1A30]/70" />
        </>
      )}
      
      {/* Decorative Blur */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-[100px]" />
      
      <div className="relative z-10 mx-auto grid max-w-screen-2xl gap-10 px-0 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:px-4">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </div>
          <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            {subtext}
          </p>
          
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-medium text-slate-400">
            <span className="flex items-center gap-1.5"><BadgeCheck size={16} className="text-teal-400"/> Trusted by 50,000+ Buyers</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-600" />
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-teal-400"/> ISO Certified Sellers</span>
          </div>
        </div>
        
        <div className="relative w-full max-w-md lg:ml-auto">
          {/* Glass Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            
            <div className="relative">
              <label className="mb-3 block text-sm font-semibold text-white">Find Products & Suppliers</label>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-400 outline-none transition-colors focus:border-accent focus:bg-black/40"
                    placeholder="E.g. Industrial Valves, Steel Pipes..."
                  />
                </div>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-400 outline-none transition-colors focus:border-accent focus:bg-black/40"
                    placeholder="Location (Optional)"
                  />
                </div>
                <Link to="/categories" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-bold text-white transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25">
                  Search Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
