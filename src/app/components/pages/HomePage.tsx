import { Link } from 'react-router';
import { BadgeCheck, Clock3, PackageCheck, ShieldCheck, Users } from 'lucide-react';
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
import { IndustryInsightsBlog, LiveMarketplaceStats, TestimonialCarousel, TrustedByBrands } from '../VisualSections';
import { MiniFAQ, ServiceCard, SupplierBuyerCTA, openEnquiryPopup, serviceCategories } from '../LeadCaptureComponents';

const metrics = [
  { label: 'Verified suppliers', value: '500+', icon: BadgeCheck },
  { label: 'Active buyers/month', value: '2,800+', icon: Users },
  { label: 'Product categories', value: '120+', icon: PackageCheck },
  { label: 'Avg. first response', value: '4 hrs', icon: Clock3 },
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
        <button type="submit" className="market-button hidden self-end bg-accent px-5 py-2 text-sm font-bold text-white hover:bg-accent/90 lg:block">
          Submit
        </button>
      </div>
      <button type="submit" className="market-button mt-3 w-full bg-accent px-5 py-2 text-sm font-bold text-white hover:bg-accent/90 lg:hidden">
        Submit
      </button>
    </form>
  );
}

export default function HomePage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-accent/30 bg-primary px-4 py-10 text-white">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600"
          alt="Industrial warehouse"
          width={1600}
          height={760}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 mx-auto grid max-w-screen-2xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 border border-accent/40 bg-white/5 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-accent">
              <ShieldCheck size={15} /> Verified B2B Supplier Network
            </div>
            <h1 className="max-w-full text-wrap font-serif text-2xl font-bold leading-tight text-white sm:text-[clamp(2.5rem,6vw,5rem)]">
              We Source Everything Your Business Needs
            </h1>
            <p className="mt-4 max-w-full text-sm leading-6 text-white/78 sm:text-base sm:leading-7">
              Submit one requirement and Truvex connects it to verified suppliers across hotel supplies, kitchen equipment, furniture, safety, gym, and industrial products.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link to="/suppliers" className="market-button min-h-12 bg-accent px-5 py-3 text-center text-sm font-bold text-white">Become Supplier</Link>
              <button type="button" onClick={openEnquiryPopup} className="market-button min-h-12 border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white">Submit Requirement</button>
            </div>
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
      <LiveMarketplaceStats />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Company intro</div>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary">A B2B sourcing desk built for lead generation and trust</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Truvex helps buyers submit clear requirements and helps verified suppliers receive better-qualified enquiries. Contact details stay protected, RFQs stay structured, and every flow is designed to create business leads.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Services" title="Source products across business categories" subtext="Each service card opens an enquiry path so buyers can quickly generate a lead." viewAllTo="/services" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((service) => <ServiceCard key={service.title} service={service} />)}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Why choose us" title="Trust-first sourcing for buyers and suppliers" />
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ['Verified Supplier Network', 'Supplier profiles are reviewed before leads are routed.'],
              ['No Direct Contact Exposure', 'Listings do not reveal supplier phone or email publicly.'],
              ['Lead Generation Focus', 'Every CTA points to requirement capture, supplier registration, or enquiry flow.'],
            ].map(([title, text]) => (
              <div key={title} className="market-card border-t-2 border-t-accent p-5">
                <h3 className="text-base font-bold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeader eyebrow="Process" title="How a requirement becomes a business lead" />
          <div className="grid gap-3">
            {['Buyer submits requirement', 'Admin reviews', 'Supplier contacted', 'Quotation shared', 'Deal finalized'].map((step, index) => (
              <div key={step} className="market-card flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary font-serif text-lg font-bold text-accent">{index + 1}</div>
                <div className="font-bold text-primary">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Product categories"
            title="Source from high-demand B2B categories"
            subtext="Dense supplier discovery across core Indian industrial and commercial product segments."
            viewAllTo="/categories"
          />
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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

      <TestimonialCarousel />
      <SupplierBuyerCTA />
      <IndustryInsightsBlog />
      <TrustedByBrands />
      <MiniFAQ />

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-2xl bg-primary p-6 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Contact section</div>
            <h2 className="font-serif text-2xl font-bold text-white">Need help choosing a supplier category?</h2>
            <p className="mt-1 text-sm text-white/70">Call, WhatsApp, or submit an enquiry and Truvex will guide the next step.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/contact" className="market-button min-h-12 bg-accent px-5 py-3 text-sm font-bold text-white">Contact Us</Link>
            <button type="button" onClick={openEnquiryPopup} className="market-button min-h-12 border border-white/30 px-5 py-3 text-sm font-bold text-white">Open Enquiry</button>
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
            <Link to="/contact" className="market-button bg-accent px-5 py-3 text-center text-sm font-bold text-white">Post Buy Requirement</Link>
            <Link to="/categories" className="market-button border border-primary px-5 py-3 text-center text-sm font-bold text-primary">Find Supplier</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
