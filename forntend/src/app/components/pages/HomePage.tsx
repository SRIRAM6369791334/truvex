import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ShieldCheck, PackageCheck, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedIcon from '../AnimatedIcon';
import { submitRFQ } from '../../../services/leadService';
import apiClient from '../../../apiClient';

import {
  CategoryCard,
  EnquiryTicker,
  PopularSearchStrip,
  SectionHeader,
  SupplierCard,
  SupplierNetworkInteractive,
  TabbedCategoryDirectory,
  TrustSignalsBar,
  categories,
  suppliers,
} from '../MarketplaceComponents';
import { IndustryInsightsBlog, LiveMarketplaceStats, TestimonialCarousel, TrustedByBrands } from '../VisualSections';
import { MiniFAQ, ServiceDynamicList, SupplierBuyerCTA, openEnquiryPopup, serviceCategories } from '../LeadCaptureComponents';

const metrics = [
  { label: 'Verified suppliers', value: '500+', iconName: 'shield' },
  { label: 'Active buyers/month', value: '2,800+', iconName: 'users' },
  { label: 'Product categories', value: '120+', iconName: 'box' },
  { label: 'Avg. first response', value: '4 hrs', iconName: 'clock' },
];

function MiniRFQForm() {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate mobile number: must be exactly 10 digits
    if (mobile.length !== 10) {
      setError('Mobile number must be exactly 10 digits.');
      return;
    }

    setLoading(true);
    try {
      await submitRFQ({
        product_name: product,
        quantity,
        delivery_city: 'Not specified',
        mobile,
      });
      setSuccess(true);
      setProduct('');
      setQuantity('');
      setMobile('');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-none border border-accent/50 p-6 text-center text-white shadow-2xl bg-gradient-to-br from-accent/15 via-white/[0.03] to-white/[0.01] backdrop-blur-xl">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-bold text-lg text-white mb-1">RFQ Submitted!</h3>
        <p className="text-sm text-white/70">Our team will connect you with verified suppliers shortly.</p>
        <button onClick={() => setSuccess(false)} className="mt-4 text-xs text-accent underline">Submit another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-none border p-5 text-white shadow-2xl border-accent/50 bg-gradient-to-br from-accent/15 via-white/[0.03] to-white/[0.01] shadow-accent/5 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-none h-2 w-2 bg-accent"></span>
          </span>
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/95">Post Buy Requirement</h2>
        </div>
        <span className="hidden text-[10px] font-bold uppercase tracking-wider bg-accent/15 px-2.5 py-1 rounded-none text-accent sm:inline">Free for buyers</span>
      </div>
      {error && <div className="mb-3 rounded border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</div>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.75fr_1fr_auto]">
        <div>
          <label htmlFor="product" className="mb-1.5 block text-[12px] font-bold text-white/80 uppercase tracking-wider">Product Name <span className="text-accent">*</span></label>
          <input id="product" required value={product} onChange={(e) => setProduct(e.target.value)} className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-accent/60 focus:bg-white/10 transition-all duration-300" placeholder="e.g. Steel pipes" />
        </div>
        <div>
          <label htmlFor="quantity" className="mb-1.5 block text-[12px] font-bold text-white/80 uppercase tracking-wider">Quantity <span className="text-accent">*</span></label>
          <input id="quantity" required value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-accent/60 focus:bg-white/10 transition-all duration-300" placeholder="500 pcs" />
        </div>
        <div>
          <label htmlFor="mobile" className="mb-1.5 block text-[12px] font-bold text-white/80 uppercase tracking-wider">
            Mobile Number <span className="text-accent">*</span>
            <span className="ml-1.5 cursor-help text-white/40 hover:text-white" title="Why we need this: suppliers respond fastest by phone or WhatsApp.">?</span>
          </label>
          <input
            id="mobile"
            required
            type="text"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ''); // only allow digits
              if (value.length <= 10) {
                setMobile(value);
              }
            }}
            className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-accent/60 focus:bg-white/10 transition-all duration-300"
            placeholder="e.g. 9876543210"
          />
        </div>
        <button type="submit" disabled={loading} className="market-button hidden self-end bg-accent px-6 py-2.5 text-sm font-bold text-white hover:bg-accent/90 lg:block rounded-none min-h-11 shadow-lg shadow-accent/20 disabled:opacity-60">
          {loading ? '...' : 'Submit RFQ'}
        </button>
      </div>
      <button type="submit" disabled={loading} className="market-button mt-4 w-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent/90 lg:hidden rounded-none min-h-11 shadow-lg shadow-accent/20 disabled:opacity-60">
        {loading ? 'Submitting...' : 'Submit RFQ'}
      </button>
    </form>
  );
}


function BannerAnimation() {
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoopKey(prev => prev + 1);
    }, 8500); // Loops the animation every 8.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div key={loopKey} className="z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
      <motion.h2 
        className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-primary leading-tight"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06 }
          }
        }}
      >
        {"We don't just source. We deliver value.".split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, textShadow: "0px 0px 0px rgba(198,140,62,0)", color: "#0A192F" },
              visible: { 
                opacity: 1, 
                textShadow: [
                  "0px 0px 0px rgba(198,140,62,0)", 
                  "0px 5px 15px rgba(198,140,62,0.3)", 
                  "0px 0px 0px rgba(198,140,62,0)"
                ],
                color: ["#0A192F", "#c68c3e", "#0A192F"],
                transition: {
                  opacity: { duration: 0.1 },
                  textShadow: { duration: 2, repeat: Infinity, repeatType: "reverse", delay: index * 0.1 },
                  color: { duration: 2, repeat: Infinity, repeatType: "reverse", delay: index * 0.1 }
                }
              }
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h2>

      <motion.h3 
        className="text-xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-700"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 1.5 }
          }
        }}
      >
        {"We find it. We verify it. We deliver it.".split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, textShadow: "0px 0px 0px rgba(198,140,62,0)" },
              visible: { 
                opacity: 1, 
                textShadow: [
                  "0px 0px 0px rgba(198,140,62,0)", 
                  "0px 3px 10px rgba(198,140,62,0.2)", 
                  "0px 0px 0px rgba(198,140,62,0)"
                ],
                transition: {
                  opacity: { duration: 0.1 },
                  textShadow: { duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: index * 0.15 }
                }
              }
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h3>

      <motion.div 
        className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.5 }}
      >
        <Link to="/contact" className="market-button bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-accent/90 hover:shadow-xl transition-all w-full sm:w-auto">
          Post Your Requirement
        </Link>
        <Link to="/services" className="market-button border-2 border-primary text-primary px-8 py-3 text-sm font-bold hover:bg-primary/5 transition-all w-full sm:w-auto">
          Explore Services
        </Link>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const [banners, setBanners] = useState<string[]>([
    "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80"
  ]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const res = await apiClient.get('/settings');
        if (res.data?.success && res.data.data?.homepage_banner_images?.length > 0) {
          setBanners(res.data.data.homepage_banner_images);
        } else if (res.data?.data?.homepage_banner_images?.length > 0) {
          setBanners(res.data.data.homepage_banner_images);
        }
      } catch (err) {
        console.error('Failed to load dynamic banners:', err);
      }
    };
    loadBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  const resolveBannerUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const rootUrl = apiClient.defaults.baseURL?.replace(/\/api$/, '') || 'http://172.16.0.10:5001';
    return `${rootUrl}${url}`;
  };

  return (
    <div className="bg-background">
      {/* ─── Promo Banner ─── */}
      <div className="bg-white px-4 py-3 border-b border-gray-100" style={{ display: "none" }}>
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

      <section className="w-full relative py-32 flex flex-col items-center justify-center min-h-[500px] overflow-hidden border-b border-border">
        {/* Shipping Background Images Carousel */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={currentIdx}
              src={resolveBannerUrl(banners[currentIdx])} 
              alt="Global Shipping Logistics" 
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
        
        {/* Frosted Glass Overlay (Glassmorphism) */}
        <div className="absolute inset-0 z-10 bg-white/70" />
        
        {/* Subtle background accent glow to match theme */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-10" />
        
        <BannerAnimation />
      </section>

      <section className="relative overflow-hidden border-b border-accent/30 bg-[#0A192F] px-4 pt-16 pb-32 text-white md:pt-24 md:pb-40">
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
              We Source <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">Your Requirement</span> For Your  Business
            </h1>
            
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-[18px] sm:leading-[1.7]">
              Submit one requirement and Truvex connects it to verified suppliers across hotel supplies, kitchen equipment, furniture, safety, gym, and industrial products.
            </p>
            
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <button 
                  type="button" 
                  onClick={openEnquiryPopup} 
                  className="market-button flex min-h-12 items-center justify-center rounded-none bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all duration-300 w-full sm:w-auto"
                >
                  Submit Requirement
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link to="/suppliers" className="market-button flex min-h-12 items-center justify-center rounded-none border px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 w-full sm:w-auto border-accent/50 bg-gradient-to-br from-accent/15 via-white/[0.03] to-white/[0.01] shadow-accent/5 hover:border-accent hover:shadow-accent/20">
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
                  whileHover={{ y: -6, borderColor: 'rgba(245,158,11,0.8)' }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="min-w-0 rounded-none border p-6 shadow-xl relative overflow-hidden transition-all duration-300 border-accent/50 bg-gradient-to-br from-accent/15 via-white/[0.03] to-white/[0.01] shadow-accent/5"
                >
                  <div className="flex items-start justify-between">
                    <div className={isHighlighted ? "animate-pulse" : ""}>
                      <AnimatedIcon icon={metric.iconName as any} size={32} />
                    </div>
                    {/* {isHighlighted && <span className="h-1.5 w-1.5 rounded-none absolute right-6 top-6 bg-accent animate-ping" />} */}
                    {/* <span className={`h-1.5 w-1.5 rounded-none absolute right-6 top-6 ${isHighlighted ? "bg-accent" : "bg-white/20"}`} /> */}
                  </div>
                  <div className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{metric.value}</div>
                  <div className={`mt-1.5 break-words text-[10px] font-bold uppercase tracking-wider ${isHighlighted ? 'text-accent' : 'text-white/50'}`}>{metric.label}</div>
                </motion.div>
              );
            })}
            
            <div className="col-span-2 min-w-0 rounded-none border backdrop-blur-md p-5 text-sm text-white/85 shadow-lg flex items-center gap-4 border-accent/50 bg-gradient-to-br from-accent/15 via-white/[0.03] to-white/[0.01] shadow-accent/5">
              <div className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-none h-3 w-3 bg-accent"></span>
              </div>
              <div>
                <div className="font-bold text-accent text-xs uppercase tracking-wider mb-0.5">Buyer support desk active today</div>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">Product matching, supplier verification, and RFQ routing handled by Truvex.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LiveMarketplaceStats />
      <TrustSignalsBar />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-none border border-accent/20 bg-gradient-to-br from-white via-white to-accent/5 p-8 shadow-xl shadow-accent/5 md:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-none bg-accent/10 blur-[80px]" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-none border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-none bg-accent" />
                  Company Intro
                </div>
                <h2 className="font-serif text-3xl font-bold leading-tight text-primary md:text-4xl">
                  A B2B sourcing desk built for <span className="text-accent">lead generation</span> and trust
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  Truvex helps buyers submit clear requirements and helps verified suppliers receive better-qualified enquiries. Contact details stay protected, RFQs stay structured, and every flow is designed to create business leads.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-none border border-border bg-white p-3 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-teal-50 text-teal-600">
                      <ShieldCheck size={20} />
                    </div>
                    <span className="text-xs font-bold text-primary">Data Protection</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-none border border-border bg-white p-3 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-blue-50 text-blue-600">
                      <PackageCheck size={20} />
                    </div>
                    <span className="text-xs font-bold text-primary">Structured RFQs</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-none border border-border bg-white p-3 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-amber-50 text-accent">
                      <BadgeCheck size={20} />
                    </div>
                    <span className="text-xs font-bold text-primary">Verified Leads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Services" title="Source products across business categories" subtext="Each category provides verified suppliers ready to fulfill bulk and retail orders." viewAllTo="/services" />
          <ServiceDynamicList />
        </div>
      </section>

      <section className="px-4 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="OUR EDGE" title="Why Businesses Choose Truvex" />
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            {[
              { title: 'Manufacturer Trust, Built Over Time', text: 'Our manufacturer relationships aren\'t transactional — they\'re deep partnerships. This gives us leverage to negotiate better pricing and priority fulfilment for our clients.', iconName: 'handshake' },
              { title: 'Quality That Doesn\'t Compromise', text: 'We set clear quality benchmarks with every manufacturer we work with. What arrives at your door is exactly what was promised — no surprises, no shortcuts.', iconName: 'diamond' },
              { title: 'Prices That Beat the Market', text: 'By sourcing directly from manufacturers, we remove unnecessary layers of cost. Your business benefits from prices that even bulk retail channels struggle to match.', iconName: 'trending-down' },
              { title: 'Multi-Category, One Partner', text: 'From hospitality supplies to office products, we source across categories. One point of contact for all your procurement needs saves your team time and effort.', iconName: 'box' },
              { title: 'Fully GST Compliant', text: 'Every order comes with proper GST-compliant invoicing and documentation. Clean, transparent transactions that keep your accounts hassle-free.', iconName: 'clipboard' },
              { title: 'Reliable & Accountable', text: 'We commit to timelines and we keep them. When you place an order through Truvex, you have a partner who is accountable for delivery — not just a contact to chase.', iconName: 'zap' },
            ].map(({ title, text, iconName }) => (
              <div key={title} className="group relative overflow-hidden rounded-none border border-border bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30">
                
                {/* Glowing Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Floating Badge Lottie Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-[#f8f9fa] transition-all duration-500 group-hover:bg-accent/10 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-accent/20">
                    <AnimatedIcon icon={iconName as any} size={48} loop={true} autoplay={true} />
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-primary transition-colors duration-300 group-hover:text-accent">{title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="px-4 py-8">
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
      </section> */}

      {/* <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Product categories"
            title="Source from high-demand B2B categories"
            subtext="Dense supplier discovery across core Indian industrial and commercial product segments."
            viewAllTo="/categories"
          />
          <TabbedCategoryDirectory />
          <div className="mt-8">
            <PopularSearchStrip />
          </div>
        </div>
      </section> */}

      {/* <TrustSignalsBar compact /> */}

      {/* <SupplierNetworkInteractive /> */}

      {/* <TestimonialCarousel /> */}
      <SupplierBuyerCTA />
      {/* <IndustryInsightsBlog /> */}
      <TrustedByBrands />
      {/* <MiniFAQ /> */}

      {/* <section className="px-4 py-8">
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
            <Link to="/services" className="market-button border border-primary px-5 py-3 text-center text-sm font-bold text-primary">Find Supplier</Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
