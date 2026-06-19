import { Link } from 'react-router';

interface FooterProps {
  onOpenEnquiry: () => void;
}

const footerCompanyLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  // { label: 'Why Truvex', path: '/why-truvex' },
  // { label: 'Roadmap', path: '/roadmap' },
  // { label: 'Blog & News', path: '/blog' },
  { label: 'Contact Us', path: '/contact' },
];

const footerSourcingLinks = [
  { label: 'Sourcing Services', path: '/services' },
  // { label: 'Browse Suppliers', path: '/supplier-listing' },
  { label: 'Product Categories', path: '/categories' },
  // { label: 'How It Works', path: '/how-it-works' },
  // { label: 'Pricing Plans', path: '/pricing' },
];

const footerPartnerLinks = [
  // { label: 'For Buyers', path: '/for-buyers' },
  // { label: 'For Suppliers', path: '/for-suppliers' },
  { label: 'Post a Requirement', path: '/buyers' },
  { label: 'Supplier Registration', path: '/suppliers' },
  // { label: 'FAQ', path: '/faq' },
  // { label: 'Testimonials', path: '/testimonials' },
];

export default function Footer({ onOpenEnquiry }: FooterProps) {
  return (
    <footer className="border-t-2 border-accent bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
          <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-accent">Company</h4>
          <div className="grid gap-2">
            {footerCompanyLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-white/70 hover:text-accent">{link.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-accent">Sourcing</h4>
          <div className="grid gap-2">
            {footerSourcingLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-white/70 hover:text-accent">{link.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-accent">Solutions</h4>
          <div className="grid gap-2">
            {footerPartnerLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-white/70 hover:text-accent">{link.label}</Link>
            ))}
          </div>
        </div>

        <div className="border border-white/15 border-t-2 border-t-accent bg-white/5 p-5 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <h4 className="text-lg font-bold text-white">Post Your Requirement</h4>
          <p className="mt-2 text-sm text-white/70">Tell us the product, quantity, and delivery city. Get verified supplier callbacks.</p>
          <button type="button" onClick={onOpenEnquiry} className="market-button mt-4 inline-flex bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-accent/90">
            Start RFQ
          </button>
        </div>
      </div>
      {/* <section className="border-t border-white/10 bg-gradient-to-r from-primary to-secondary px-4 py-12">
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
      </section> */}
      <div className="border-t border-white/10 px-4 py-4 text-center text-[12px] text-white/50">
        Copyright 2026 Truvex. B2B sourcing platform, India.
      </div>
    </footer>
  );
}
