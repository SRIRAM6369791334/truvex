import { Link } from 'react-router';
import { ArrowRight, BadgeCheck, Clock3, MapPin, PackageCheck, Search, ShieldCheck, Users } from 'lucide-react';
import {
  CategoryCard,
  EnquiryTicker,
  PopularSearchStrip,
  SectionHeader,
  SupplierCard,
  TrustSignalsBar,
  categories,
  suppliers,
} from '../MarketplaceComponents';

const metrics = [
  { label: 'Verified suppliers', value: '500+', icon: BadgeCheck },
  { label: 'Active buyers/month', value: '2,800+', icon: Users },
  { label: 'Product categories', value: '120+', icon: PackageCheck },
  { label: 'Avg. first response', value: '4 hrs', icon: Clock3 },
];

const transactions = [
  { company: 'R.K. Fabricators', category: 'MS Pipes', city: 'Rajkot' },
  { company: 'Bright Controls', category: 'Control Panels', city: 'Noida' },
  { company: 'Sun Pack Industries', category: 'Stretch Film', city: 'Surat' },
  { company: 'Delta Safety Supply', category: 'PPE Kits', city: 'Chennai' },
  { company: 'Prime Auto Spares', category: 'CNC Parts', city: 'Pune' },
  { company: 'Metro Build Mart', category: 'Fasteners', city: 'Delhi' },
  { company: 'Coastal Pumps', category: 'Industrial Pumps', city: 'Kochi' },
  { company: 'Western Tools', category: 'Machine Tools', city: 'Ahmedabad' },
];

function MiniRFQForm() {
  return (
    <form className="border border-white/15 bg-white p-4 text-primary shadow-lg">
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-border pb-2">
        <h2 className="text-base font-bold text-primary">Post Buy Requirement</h2>
        <span className="hidden text-[11px] font-bold uppercase text-teal-700 sm:inline">Free for buyers</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.75fr_1fr_auto]">
        <div>
          <label htmlFor="product" className="mb-1 block text-[12px] font-bold">Product Name <span className="text-accent">*</span></label>
          <input id="product" required className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="e.g. Steel pipes" />
        </div>
        <div>
          <label htmlFor="quantity" className="mb-1 block text-[12px] font-bold">Quantity <span className="text-accent">*</span></label>
          <input id="quantity" required className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="500 pcs" />
        </div>
        <div>
          <label htmlFor="mobile" className="mb-1 block text-[12px] font-bold">
            Mobile <span className="text-accent">*</span>
            <span className="ml-1 cursor-help text-muted-foreground" title="Why we need this: suppliers respond fastest by phone or WhatsApp.">?</span>
          </label>
          <input id="mobile" required className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="+91 mobile" />
        </div>
        <button type="submit" className="hidden self-end bg-accent px-5 py-2 text-sm font-bold text-white hover:bg-accent/90 lg:block">
          Submit
        </button>
      </div>
      <button type="submit" className="mt-3 w-full bg-accent px-5 py-2 text-sm font-bold text-white hover:bg-accent/90 lg:hidden">
        Submit
      </button>
    </form>
  );
}

export default function HomePage() {
  return (
    <div className="bg-background">
      <section className="overflow-hidden border-b border-accent/30 bg-primary px-4 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 border border-accent/40 bg-white/5 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-accent">
              <ShieldCheck size={15} /> Verified B2B Supplier Network
            </div>
            <h1 className="max-w-full text-wrap font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">
              Find Verified Suppliers in 4 Hours. Free for Buyers.
            </h1>
            <p className="mt-4 max-w-full text-sm leading-6 text-white/78 sm:text-base sm:leading-7">
              Post a requirement, compare qualified suppliers, and get direct callbacks for industrial, construction, packaging, electronics, and business products across India.
            </p>
            <div className="mt-6">
              <MiniRFQForm />
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="min-w-0 border border-white/15 border-t-2 border-t-accent bg-white/8 p-4">
                <metric.icon className="mb-3 text-accent" size={24} />
                <div className="text-3xl font-extrabold text-white">{metric.value}</div>
                <div className="mt-1 break-words text-[11px] font-semibold uppercase tracking-wide text-white/70 sm:text-[12px]">{metric.label}</div>
              </div>
            ))}
              <div className="col-span-2 min-w-0 border border-teal-400/30 bg-teal-500/10 p-4 text-sm text-white/85">
              <div className="mb-1 font-bold text-teal-100">Buyer support desk active today</div>
              Product matching, supplier verification, and RFQ routing handled by Truvex.
            </div>
          </div>
        </div>
      </section>

      <EnquiryTicker />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Product categories"
            title="Source from high-demand B2B categories"
            subtext="Dense supplier discovery across core Indian industrial and commercial product segments."
            viewAllTo="/categories"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => <CategoryCard key={category.name} category={category} />)}
          </div>
          <div className="mt-4">
            <PopularSearchStrip />
          </div>
        </div>
      </section>

      <TrustSignalsBar compact />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Supplier network"
            title="Verified supplier profiles accepting RFQs"
            subtext="Sample supplier tiles show the operating model: location, category, verification, and quote action in one view."
            viewAllTo="/categories"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {suppliers.map((supplier) => <SupplierCard key={supplier.name} supplier={supplier} />)}
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-8 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Recent transactions</div>
            <h2 className="font-serif text-3xl font-bold text-white">Business activity across Indian cities</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Replace passive testimonials with current marketplace signals: buyer requirements, supplier categories, and city-level activity.
            </p>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-sm font-bold text-white">
              Post Requirement <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {transactions.map((item) => (
              <div key={`${item.company}-${item.city}`} className="border border-white/15 bg-white/10 p-3">
                <div className="font-bold text-white">{item.company}</div>
                <div className="mt-1 text-[12px] text-white/70">{item.category}</div>
                <div className="mt-2 flex items-center gap-1 text-[12px] font-semibold text-accent">
                  <MapPin size={13} /> {item.city}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-accent/30 bg-card px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Buyer helpdesk</div>
            <h2 className="font-serif text-2xl font-bold text-primary">Need a supplier shortlist today?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Send your requirement and get matched with verified suppliers by phone or WhatsApp.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/contact" className="bg-accent px-5 py-3 text-center text-sm font-bold text-white">Post Buy Requirement</Link>
            <Link to="/categories" className="border border-primary px-5 py-3 text-center text-sm font-bold text-primary">Find Supplier</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
