import { Outlet, Link, useLocation } from 'react-router';
import { useState } from 'react';
import { ChevronDown, MapPin, Menu, Phone, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Categories', path: '/categories' },
  { label: 'For Buyers', path: '/for-buyers' },
  { label: 'For Suppliers', path: '/for-suppliers' },
  { label: 'Services', path: '/services' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Contact', path: '/contact' },
];

const sitemap = [
  { label: 'About Truvex', path: '/about' },
  { label: 'Why Truvex', path: '/why-truvex' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'FAQ', path: '/faq' },
];

const topCategories = [
  'Industrial Machinery',
  'Electrical Panels',
  'Packaging Materials',
  'Construction Supplies',
  'Automotive Parts',
  'Safety Products',
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
  const hideFloatingRfq = location.pathname.startsWith('/contact');

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <div className="w-full max-w-full border-b border-primary/10 bg-primary text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 text-[12px]">
          <div className="min-w-0 flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold">
              <Phone size={14} className="text-accent" /> +91 98765 43210
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <MapPin size={14} className="text-accent" /> Delivering supplier matches across India
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button className="hidden items-center gap-1 border border-white/15 bg-white/5 px-2 py-1 text-white/90 md:flex">
              Mumbai <ChevronDown size={13} />
            </button>
            <Link to="/contact" className="market-button hidden bg-accent px-3 py-1.5 font-bold text-white hover:bg-accent/90 sm:inline-flex">
              Post Buy Requirement
            </Link>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 w-full max-w-full border-b-2 border-accent bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex min-h-16 items-center gap-4">
            <Link to="/" className="shrink-0 text-2xl font-bold text-primary">
              <span className="font-serif text-accent">Truvex</span>
            </Link>

            <div className="hidden min-w-0 flex-1 items-center lg:flex">
              <div className="flex w-full max-w-xl border border-primary/20 bg-white">
                <input
                  className="min-w-0 flex-1 px-3 py-2 text-sm text-primary outline-none"
                  placeholder="Search products, categories, suppliers..."
                />
                <Link to="/categories" className="market-button flex items-center gap-2 bg-accent px-4 py-2 text-sm font-bold text-white">
                  <Search size={16} /> Search
                </Link>
              </div>
            </div>

            <div className="hidden items-center gap-1 xl:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-2 text-[13px] font-semibold ${
                    isActive(link.path) ? 'bg-primary text-white' : 'text-primary hover:bg-muted hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              className="ml-auto flex shrink-0 p-2 text-primary xl:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-border bg-white xl:hidden">
            <div className="px-4 py-3">
              <div className="mb-3 flex border border-border">
                <input className="min-w-0 flex-1 px-3 py-2 text-sm outline-none" placeholder="Search suppliers..." />
                <Link to="/categories" onClick={() => setMobileOpen(false)} className="market-button bg-accent px-3 py-2 text-sm font-bold text-white">
                  Search
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2 text-sm font-semibold ${
                      isActive(link.path) ? 'bg-primary text-white' : 'text-primary hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="min-h-screen overflow-x-hidden pb-16 md:pb-0">
        <Outlet />
      </main>

      <footer className="border-t-2 border-accent bg-primary text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
          <div>
            <Link to="/" className="font-serif text-3xl font-bold text-accent">Truvex</Link>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Verified supplier discovery, RFQ routing, and managed B2B sourcing for Indian businesses.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] font-semibold text-white/80">
              <span className="border border-white/20 px-3 py-1.5 text-[11px]">GST Registered</span>
              <span className="border border-white/20 px-3 py-1.5 text-[11px]">Secure Platform</span>
              <span className="border border-white/20 px-3 py-1.5 text-[11px]">India-based Team</span>
              <span className="border border-white/20 px-3 py-1.5 text-[11px]">ISO Network</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-accent">Sitemap</h4>
            <div className="grid gap-2">
              {[...navLinks, ...sitemap].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-white/70 hover:text-accent">{link.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-accent">Top Categories</h4>
            <div className="grid gap-2">
              {topCategories.map((category) => (
                <Link key={category} to="/categories" className="text-sm text-white/70 hover:text-accent">{category}</Link>
              ))}
            </div>
          </div>

          <div className="border border-white/15 border-t-2 border-t-accent bg-white/5 p-5">
            <h4 className="text-lg font-bold text-white">Post Your Requirement</h4>
            <p className="mt-2 text-sm text-white/70">Tell us the product, quantity, and delivery city. Get verified supplier callbacks.</p>
            <Link to="/contact" className="market-button mt-4 inline-flex bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-accent/90">
              Start RFQ
            </Link>
          </div>
        </div>
        <section className="border-t border-white/10 bg-gradient-to-r from-primary to-secondary px-4 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=60&h=60&fit=crop"
              alt="Newsletter"
              width={60}
              height={60}
              loading="lazy"
              className="mx-auto mb-4 h-14 w-14 rounded-full border-2 border-accent object-cover"
            />
            <h3 className="font-serif text-2xl font-bold text-white">Get Sourcing Insights</h3>
            <p className="mt-2 text-sm text-white/70">Weekly tips on B2B procurement, supplier selection, and market trends.</p>
            <div className="mx-auto mt-5 flex max-w-md gap-2">
              <input placeholder="your@business.com" className="min-h-12 flex-1 rounded-l-xl bg-white px-4 py-3 text-base text-primary outline-none" />
              <button className="market-button min-h-12 rounded-r-xl bg-accent px-6 py-3 font-bold text-white hover:bg-accent/90">Subscribe</button>
            </div>
            <p className="mt-3 text-xs text-white/40">No spam. Unsubscribe anytime. 2,400+ subscribers.</p>
          </div>
        </section>
        <div className="border-t border-white/10 px-4 py-4 text-center text-[12px] text-white/50">
          Copyright 2026 Truvex. B2B sourcing platform, India.
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 grid w-screen max-w-full grid-cols-2 border-t border-border bg-white p-2 shadow-2xl md:hidden">
        <Link to="/contact" className="market-button min-h-12 bg-accent py-3 text-center text-sm font-bold text-white">Post Requirement</Link>
        <Link to="/categories" className="market-button min-h-12 bg-primary py-3 text-center text-sm font-bold text-white">Find Supplier</Link>
      </div>
      {!hideFloatingRfq && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, type: 'spring' }}
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 md:bottom-8 md:left-auto md:right-6 md:translate-x-0"
        >
          <Link
            to="/contact"
            className="rfq-pulse market-button flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-accent/40"
          >
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Post RFQ - Free
          </Link>
        </motion.div>
      )}
    </div>
  );
}
