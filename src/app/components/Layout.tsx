import { Outlet, Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Services', path: '/services' },
  { label: 'Categories', path: '/categories' },
  { label: 'For Buyers', path: '/for-buyers' },
  { label: 'For Suppliers', path: '/for-suppliers' },
  { label: 'Why Truvex', path: '/why-truvex' },
  { label: 'Roadmap', path: '/roadmap' },
];

const footerCols = [
  { label: 'Company', links: [{ label: 'About Us', path: '/about' }, { label: 'Why Truvex', path: '/why-truvex' }, { label: 'Roadmap', path: '/roadmap' }] },
  { label: 'Solutions', links: [{ label: 'For Buyers', path: '/for-buyers' }, { label: 'For Suppliers', path: '/for-suppliers' }, { label: 'Services', path: '/services' }] },
  { label: 'Resources', links: [{ label: 'How It Works', path: '/how-it-works' }, { label: 'Categories', path: '/categories' }, { label: 'Contact', path: '/contact' }] },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <div className="font-sans min-h-screen flex flex-col transition-colors duration-300">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-primary/95 dark:bg-card/85 backdrop-blur-xl border-b border-white/10 dark:border-border/30 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 no-underline group">
              <span className="font-serif text-accent text-2xl font-bold tracking-tight group-hover:opacity-90 transition-opacity">
                Truvex
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-[13px] whitespace-nowrap transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-accent font-semibold bg-white/5'
                      : 'text-white/80 dark:text-foreground/80 font-normal hover:text-white dark:hover:text-foreground hover:bg-white/10 dark:hover:bg-foreground/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <Link
                to="/contact"
                className="ml-2 bg-accent text-white px-5 py-2 rounded-md text-[13px] font-semibold whitespace-nowrap transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
              >
                Get a Quote
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="ml-3 p-2 rounded-full text-white/80 dark:text-foreground/80 hover:text-accent dark:hover:text-accent hover:bg-white/10 dark:hover:bg-foreground/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Hamburger & Theme Toggle */}
            <div className="xl:hidden flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-white/80 dark:text-foreground/80 hover:text-accent dark:hover:text-accent hover:bg-white/10 dark:hover:bg-foreground/5 transition-all duration-200"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                className="p-1 text-white dark:text-foreground hover:text-accent transition-colors focus:outline-none"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="xl:hidden bg-primary/95 dark:bg-card/95 backdrop-blur-xl border-t border-white/10 dark:border-border/30 absolute w-full shadow-xl">
            <div className="px-4 py-3 space-y-1">
              {[...navLinks, { label: 'Get a Quote', path: '/contact' }].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-3 rounded-md text-sm border-b border-white/5 dark:border-border/10 last:border-none transition-colors ${
                    isActive(link.path)
                      ? 'text-accent font-semibold bg-white/5'
                      : 'text-white/85 dark:text-foreground/85 font-normal hover:text-accent dark:hover:text-accent hover:bg-white/5 dark:hover:bg-foreground/5'
                  } ${link.path === '/contact' ? 'font-semibold mt-2' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-1 bg-background">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white border-t border-white/10 relative overflow-hidden">
        {/* Subtle background glow effect for premium feel */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="md:col-span-12 lg:col-span-5">
              <Link to="/" className="inline-block mb-4 group">
                <span className="font-serif text-accent text-3xl font-bold tracking-tight group-hover:opacity-90 transition-opacity">
                  Truvex
                </span>
              </Link>
              <p className="text-white/70 text-sm font-medium mb-4 tracking-wide">
                Smart Sourcing. Right Products. Right Leads.
              </p>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                Bridging buyers and verified suppliers across India — capturing real-time enquiries from Justdial & IndiaMart and turning them into tailored proposals.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="bg-secondary/80 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-secondary/50 shadow-sm">B2B Sourcing</span>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-accent/20 shadow-sm">Pan-India</span>
                <span className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10 shadow-sm">Est. 2026</span>
              </div>
            </div>

            {/* Link Columns */}
            <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerCols.map((col) => (
                <div key={col.label}>
                  <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-6">
                    {col.label}
                  </h4>
                  <ul className="space-y-4">
                    {col.links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="text-white/60 text-sm hover:text-white transition-all duration-300 flex items-center group"
                        >
                          <span className="w-0 h-[1px] bg-accent mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Find Us On */}
          <div className="mt-16 p-6 sm:p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-500 hover:shadow-xl hover:shadow-black/20">
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
              <span className="text-accent text-sm font-bold uppercase tracking-widest shrink-0">
                Also Find Us On
              </span>
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 w-full lg:justify-end">
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-2 mb-1 transform group-hover:-translate-y-0.5 transition-transform duration-300">
                    <span className="text-white text-sm font-semibold group-hover:text-accent transition-colors duration-300">📞 Justdial</span>
                  </div>
                  <span className="text-white/50 text-xs block group-hover:text-white/70 transition-colors duration-300">Search "Truvex" in your city</span>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-2 mb-1 transform group-hover:-translate-y-0.5 transition-transform duration-300">
                    <span className="text-white text-sm font-semibold group-hover:text-accent transition-colors duration-300">🏭 IndiaMart</span>
                  </div>
                  <span className="text-white/50 text-xs block group-hover:text-white/70 transition-colors duration-300">Post your buy lead & tag Truvex</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs text-center md:text-left">
              © 2026 Truvex. All rights reserved. | B2B Sourcing Platform, India
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service'].map((t) => (
                <Link key={t} to="#" className="text-white/40 text-xs hover:text-white transition-colors duration-300">
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
