import { Link } from 'react-router';
import { BadgeCheck, Clock3, PackageCheck, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <form className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 text-white shadow-2xl">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/95">Post Buy Requirement</h2>
        </div>
        <span className="hidden text-[10px] font-bold uppercase tracking-wider bg-accent/15 px-2.5 py-1 rounded text-accent sm:inline">Free for buyers</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.75fr_1fr_auto]">
        <div>
          <label htmlFor="product" className="mb-1.5 block text-[12px] font-bold text-white/80 uppercase tracking-wider">Product Name <span className="text-accent">*</span></label>
          <input id="product" required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-accent/60 focus:bg-white/10 transition-all duration-300" placeholder="e.g. Steel pipes" />
        </div>
        <div>
          <label htmlFor="quantity" className="mb-1.5 block text-[12px] font-bold text-white/80 uppercase tracking-wider">Quantity <span className="text-accent">*</span></label>
          <input id="quantity" required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-accent/60 focus:bg-white/10 transition-all duration-300" placeholder="500 pcs" />
        </div>
        <div>
          <label htmlFor="mobile" className="mb-1.5 block text-[12px] font-bold text-white/80 uppercase tracking-wider">
            Mobile Number <span className="text-accent">*</span>
            <span className="ml-1.5 cursor-help text-white/40 hover:text-white" title="Why we need this: suppliers respond fastest by phone or WhatsApp.">?</span>
          </label>
          <input id="mobile" required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-accent/60 focus:bg-white/10 transition-all duration-300" placeholder="+91 mobile" />
        </div>
        <button type="submit" className="market-button hidden self-end bg-accent px-6 py-2.5 text-sm font-bold text-white hover:bg-accent/90 lg:block rounded-xl min-h-11 shadow-lg shadow-accent/20">
          Submit RFQ
        </button>
      </div>
      <button type="submit" className="market-button mt-4 w-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent/90 lg:hidden rounded-xl min-h-11 shadow-lg shadow-accent/20">
        Submit RFQ
      </button>
    </form>
  );
}

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* ─── Promo Banner ─── */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="mx-auto max-w-screen-xl">
          <a
            href="#"
            className="group relative block w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl"
            aria-label="Truvex – Sourcing Made Simple"
          >
            {/* Banner image – visible on md+ */}
            <img
              src="/banner-ad.png"
              alt="Truvex – Sourcing Made Simple"
              className="hidden w-full object-cover md:block"
              style={{ height: '160px' }}
            />

            {/* Fallback gradient banner (mobile & SSR) */}
            <div
              className="flex items-center justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E40AF] via-[#1D4ED8] to-[#2563EB] px-6 py-5 md:hidden"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-200">
                  Truvex B2B Platform
                </p>
                <h2 className="mt-0.5 text-xl font-extrabold leading-tight text-white">
                  Sourcing Made{' '}
                  <span className="text-amber-300">Simple!</span>
                </h2>
                <p className="mt-1 text-xs text-blue-100">
                  500+ verified suppliers · Free for buyers
                </p>
              </div>
              <div className="shrink-0 rounded-xl bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm">
                Explore →
              </div>
            </div>
          </a>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-accent/30 bg-[#0A192F] px-4 py-16 text-white md:py-24">
        {/* Ambient decorative lighting */}
        <div className="pointer-events-none absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-48 -bottom-48 h-[700px] w-[700px] rounded-full bg-blue-600/15 blur-[160px]" />
        <div className="pointer-events-none absolute left-1/3 top-1/4 h-[350px] w-[350px] rounded-full bg-teal-500/5 blur-[100px]" />

        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600"
          alt="Industrial warehouse"
          width={1600}
          height={760}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/85 to-[#0A192F]/40" />
        
        <div className="relative z-10 mx-auto grid max-w-screen-2xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-w-0"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
              <ShieldCheck size={14} className="stroke-[2.5]" /> Verified B2B Supplier Network
            </div>
            
            <h1 className="max-w-full text-wrap font-serif text-3xl font-bold leading-[1.15] text-white sm:text-[clamp(2.5rem,5.5vw,4.5rem)]">
              We Source <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">Everything</span> Your Business Needs
            </h1>
            
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-[18px] sm:leading-[1.7]">
              Submit one requirement and Truvex connects it to verified suppliers across hotel supplies, kitchen equipment, furniture, safety, gym, and industrial products.
            </p>
            
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <button 
                  type="button" 
                  onClick={openEnquiryPopup} 
                  className="market-button flex min-h-12 items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all duration-300 w-full sm:w-auto"
                >
                  Submit Requirement
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link to="/suppliers" className="market-button flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
                  Become Supplier
                </Link>
              </motion.div>
            </div>
            
            <div className="mt-8">
              <MiniRFQForm />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid min-w-0 grid-cols-2 gap-4"
          >
            {metrics.map((metric) => {
              const isHighlighted = metric.label === 'Avg. first response';
              return (
                <motion.div 
                  key={metric.label} 
                  whileHover={{ y: -6, borderColor: isHighlighted ? 'rgba(245,158,11,0.8)' : 'rgba(245,158,11,0.4)' }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`min-w-0 rounded-2xl border p-6 shadow-xl relative overflow-hidden transition-all duration-300 ${
                    isHighlighted 
                      ? 'border-accent/50 bg-gradient-to-br from-accent/15 via-white/[0.03] to-white/[0.01] shadow-accent/5' 
                      : 'border-white/10 bg-white/[0.02] backdrop-blur-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <metric.icon className={isHighlighted ? "text-accent animate-pulse" : "text-accent"} size={26} />
                    <span className={`h-1.5 w-1.5 rounded-full absolute right-6 top-6 ${isHighlighted ? "bg-accent animate-ping" : "bg-white/20"}`} />
                    <span className={`h-1.5 w-1.5 rounded-full absolute right-6 top-6 ${isHighlighted ? "bg-accent" : "bg-white/20"}`} />
                  </div>
                  <div className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{metric.value}</div>
                  <div className={`mt-1.5 break-words text-[10px] font-bold uppercase tracking-wider ${isHighlighted ? 'text-accent' : 'text-white/50'}`}>{metric.label}</div>
                </motion.div>
              );
            })}
            
            <div className="col-span-2 min-w-0 rounded-2xl border border-teal-500/20 bg-teal-500/5 backdrop-blur-md p-5 text-sm text-white/85 shadow-lg flex items-center gap-4">
              <div className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </div>
              <div>
                <div className="font-bold text-teal-300 text-xs uppercase tracking-wider mb-0.5">Buyer support desk active today</div>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">Product matching, supplier verification, and RFQ routing handled by Truvex.</p>
              </div>
            </div>
          </motion.div>
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
