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
    <footer className="border-t border-primary/10 bg-[#f1f5f9] text-primary">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-2 md:grid-cols-4 items-start">
        {/* Col 1: Logo & Description */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="inline-block transition-all hover:opacity-95">
            <img src="/logo.png" alt="Truvex Sourcing" className="h-16 w-auto object-contain" />
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
            Verified supplier discovery, RFQ routing, and managed B2B sourcing for Indian businesses.
          </p>
          <div className="flex flex-wrap gap-2 text-[10px] font-semibold">
            <span className="border border-primary/15 bg-white text-primary/70 px-2.5 py-1">GST Registered</span>
            <span className="border border-primary/15 bg-white text-primary/70 px-2.5 py-1">Secure Platform</span>
          </div>
        </div>

        {/* Col 2: Get to know */}
        <div>
          <h4 className="mb-4 text-sm font-bold text-primary">Get to know</h4>
          <div className="grid gap-2.5">
            {footerCompanyLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-accent transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>

        {/* Col 3: Customer Service */}
        <div>
          <h4 className="mb-4 text-sm font-bold text-primary">Customer Service</h4>
          <div className="grid gap-2.5">
            {footerSourcingLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-accent transition-colors">{link.label}</Link>
            ))}
            {footerPartnerLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-accent transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>

        {/* Col 4: Contact Information */}
        <div>
          <h4 className="mb-4 text-sm font-bold text-primary">Contact Information</h4>
          <div className="grid gap-2.5 text-sm text-muted-foreground">
            <p className="leading-relaxed">
              <span className="font-semibold text-primary">Address: </span>
              Level 4, Trade Centre, BKC, Mumbai 400051, India
            </p>
            <p>
              <span className="font-semibold text-primary">Call : </span>
              <a href="tel:+919876543210" className="hover:text-accent transition-colors">+91 98765 43210</a>
            </p>
            <p>
              <span className="font-semibold text-primary">Email : </span>
              <a href="mailto:hello@truvex.in" className="hover:text-accent transition-colors">hello@truvex.in</a>
            </p>
          </div>
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
      <div className="border-t border-primary/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
          <div>
            Copyright © 2026 Truvex. All rights reserved.
          </div>
          <div>
            Designed by <a href="https://saitechnosolutions.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-medium">Sai techno solutions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
