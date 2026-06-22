import { Link, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Menu, Phone, Search, X, Factory, Cpu, Package, ShieldCheck, Layers, ChevronRight, Home, Truck, ShoppingBag, Briefcase, Info, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnquiryTicker } from './MarketplaceComponents';
import apiClient from '../../apiClient';

interface HeaderProps {
  onOpenEnquiry: () => void;
}

const MotionLink = motion(Link);



const categoriesIconVariants = {
  normal: {
    y: 0,
    scale: 1,
    rotate: 0,
  },
  hover: {
    y: [0, -3, 0],
    scale: [1, 1.15, 1],
    rotate: [0, 8, -8, 0],
    transition: { duration: 0.6, ease: "easeOut" as any }
  }
};

const navLinks = [
  { 
    label: 'Home', 
    path: '/', 
    icon: Home,
    iconVariants: {
      hover: {
        y: [0, -3, 0],
        transition: { duration: 0.4, ease: "easeOut" as any }
      }
    }
  },
  { 
    label: 'Suppliers', 
    path: '/suppliers', 
    icon: Truck,
    iconVariants: {
      hover: {
        x: [0, 5, -2, 3, 0],
        transition: { duration: 0.6, ease: "easeOut" as any }
      }
    }
  },
  { 
    label: 'Buyers', 
    path: '/buyers', 
    icon: ShoppingBag,
    iconVariants: {
      hover: {
        rotate: [0, -12, 12, -8, 8, 0],
        transition: { duration: 0.6, ease: "easeOut" as any }
      }
    }
  },
  { 
    label: 'Services', 
    path: '/services', 
    icon: Briefcase,
    iconVariants: {
      hover: {
        y: [0, -3, 0],
        scale: [1, 1.12, 1],
        transition: { duration: 0.4, ease: "easeOut" as any }
      }
    }
  },
  { 
    label: 'About', 
    path: '/about', 
    icon: Info,
    iconVariants: {
      hover: {
        scale: [1, 1.15, 1],
        rotate: [0, 360],
        transition: { duration: 0.6, ease: "easeOut" as any }
      }
    }
  },
  { 
    label: 'Contact Us', 
    path: '/contact', 
    icon: Mail,
    iconVariants: {
      hover: {
        y: [0, -3, 1, 0],
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.5, ease: "easeOut" as any }
      }
    }
  },
];


const citiesList = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];

function SearchBar({ onMobileClose }: { onMobileClose?: () => void }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(query || '').trim()) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await apiClient.get('/services', { params: { search: (query || '').trim() } });
        setSuggestions((res.data?.data || []).slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch search suggestions', err);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!(query || '').trim()) return;
    if (onMobileClose) onMobileClose();
    navigate(`/services?search=${encodeURIComponent((query || '').trim())}`);
    setQuery('');
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-xl">
      <form 
        onSubmit={handleSubmit}
        className="flex w-full items-center border border-primary/15 bg-muted/20 rounded-none focus-within:border-accent focus-within:bg-white focus-within:ring-4 focus-within:ring-accent/10 transition-all duration-300"
      >
        <div className="flex items-center pl-4 pr-2.5 text-primary/40">
          <Search size={16} />
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="min-w-0 flex-1 bg-transparent py-3.5 px-0 text-sm text-primary placeholder-primary/40 outline-none"
          placeholder="Search products & suppliers..."
        />
        <button
          type="submit"
          className="market-button self-stretch flex items-center justify-center bg-accent px-4 text-white hover:bg-accent/90 rounded-none transition-all cursor-pointer"
          aria-label="Search"
        >
          <Search size={16} />
        </button>
      </form>

      <AnimatePresence>
        {isFocused && query.trim() && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-primary/10 shadow-2xl rounded-none overflow-hidden"
          >
            {suggestions.map((s) => (
              <Link
                key={s.id}
                to={`/services?search=${encodeURIComponent(s.title)}`}
                onClick={() => {
                  setQuery('');
                  if (onMobileClose) onMobileClose();
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-all border-b border-primary/5 last:border-0"
              >
                <div className="h-8 w-8 shrink-0 overflow-hidden bg-muted/50 flex items-center justify-center border border-primary/5">
                  {s.image ? <img src={s.image} alt={s.title} className="h-full w-full object-cover" /> : <Search size={12} className="text-primary/40" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary">{s.title}</div>
                  <div className="text-[11px] text-muted-foreground line-clamp-1">{s.description || 'View details'}</div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header({ onOpenEnquiry }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchHeaderCategories() {
      try {
        const res = await apiClient.get('/categories');
        if (res.data?.data) {
          // Format categories to match the expected mega menu structure
          const formatted = res.data.data.slice(0, 4).map((cat: any) => {
            // Assign icons dynamically or fallback to Layers
            const iconMap: Record<string, any> = {
              'Industrial & Factory': Factory,
              'Electrical & Panels': Cpu,
              'Packaging & Materials': Package,
              'Construction & Safety': ShieldCheck,
            };
            
            return {
              title: cat.name,
              icon: iconMap[cat.name] || Layers,
              items: (cat.subcategories || []).slice(0, 5).map((sub: any) => ({
                name: sub.name,
                path: `/categories?cat=${sub.id}`,
              }))
            };
          });
          setCategoriesData(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch mega menu categories:', err);
      }
    }
    fetchHeaderCategories();
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!cityDropdownOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.city-select-container')) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [cityDropdownOpen]);

  return (
    <>
      {/* Enquiry Ticker at the very top */}
      <EnquiryTicker />

      {/* Top Bar - hides on scroll to save space */}
      <div className={`relative z-[60] w-full max-w-full border-b border-primary/5 bg-primary text-white transition-all duration-300 ${
        isSticky ? 'h-0 overflow-hidden opacity-0 py-0' : 'py-2.5'
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 text-[13px]">
          <div className="min-w-0 flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Phone size={14} className="text-accent" /> +91 98765 43210
            </span>
            <span className="hidden items-center gap-1.5 sm:flex text-white/90">
              <MapPin size={14} className="text-accent" /> Delivering supplier matches across India
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 relative">
            {/* <div className="relative hidden md:block city-select-container">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1 border border-white/10 bg-white/5 px-2.5 py-1 text-white/90 hover:bg-white/10 rounded-none transition-all cursor-pointer"
              >
                {selectedCity} <ChevronDown size={13} className={`transition-transform duration-200 ${cityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {cityDropdownOpen && (
                  <motion.div
                    key="city-dropdown"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1.5 z-50 min-w-[130px] bg-primary border border-white/10 rounded-none shadow-xl py-1 text-left"
                  >
                    {citiesList.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setSelectedCity(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs hover:bg-white/10 transition-all block cursor-pointer ${
                          selectedCity === city ? 'text-accent font-bold bg-white/5' : 'text-white/80'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}

            <button
              type="button"
              onClick={onOpenEnquiry}
              className="market-button hidden bg-accent px-3.5 py-1.5 font-bold text-white hover:bg-accent/90 rounded-none transition-all sm:inline-flex cursor-pointer"
            >
              Post Buy Requirement
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <nav className={`sticky top-0 z-50 w-full max-w-full border-b transition-all duration-300 ${
        isSticky
          ? 'border-accent/20 bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl py-2'
          : 'border-primary/5 bg-white py-4.5'
      }`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex min-h-16 items-center justify-between gap-4">
            
            {/* Logo */}
            <Link to="/" className="shrink-0 transition-all hover:opacity-95">
              <img src="/logo.png" alt="Truvex Sourcing" className="h-14 md:h-16 w-auto object-contain" />
            </Link>

            {/* Premium Sharp-edged Search Bar */}
            <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex px-8">
              <SearchBar />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-1.5 xl:flex">
              {navLinks.slice(0, 1).map((link) => {
                const Icon = link.icon;
                return (
                  <MotionLink
                    key={link.path}
                    to={link.path}
                    whileHover="hover"
                    className={`flex items-center gap-1.5 px-3.5 py-2.5 text-[13px] font-semibold transition-all rounded-none ${
                      isActive(link.path)
                        ? 'bg-primary text-white shadow-md'
                        : 'text-primary hover:bg-muted hover:text-accent'
                    }`}
                  >
                    <motion.span variants={link.iconVariants} className="flex items-center">
                      <Icon size={14} />
                    </motion.span>
                    {link.label}
                  </MotionLink>
                );
              })}

              {/* Mega Menu Categories Link */}
              <div
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <MotionLink
                  to="/categories"
                  whileHover="hover"
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 text-[13px] font-semibold transition-all rounded-none cursor-pointer ${
                    megaMenuOpen ? 'bg-primary text-white shadow-md' : 'text-primary hover:bg-muted hover:text-accent'
                  }`}
                >
                  <motion.span
                    animate={megaMenuOpen ? "hover" : "normal"}
                    variants={categoriesIconVariants}
                    className="flex items-center"
                  >
                    <Layers size={14} />
                  </motion.span>
                  Categories <ChevronDown size={13} className={`transition-transform duration-350 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                </MotionLink>
              </div>

              {navLinks.slice(1).map((link) => {
                const Icon = link.icon;
                return (
                  <MotionLink
                    key={link.path}
                    to={link.path}
                    whileHover="hover"
                    className={`flex items-center gap-1.5 px-3.5 py-2.5 text-[13px] font-semibold transition-all rounded-none ${
                      isActive(link.path)
                        ? 'bg-primary text-white shadow-md'
                        : 'text-primary hover:bg-muted hover:text-accent'
                    }`}
                  >
                    <motion.span variants={link.iconVariants} className="flex items-center">
                      <Icon size={14} />
                    </motion.span>
                    {link.label}
                  </MotionLink>
                );
              })}
            </div>

            {/* Mobile / Tablet Controls */}
            <div className="flex items-center gap-3 xl:hidden">
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="p-2 text-primary hover:bg-muted rounded-none transition-all cursor-pointer lg:hidden"
                aria-label="Search"
              >
                {showMobileSearch ? <X size={22} /> : <Search size={22} />}
              </button>
              <button
                className="flex p-2 text-primary hover:bg-muted rounded-none transition-all cursor-pointer"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
          <AnimatePresence>
            {showMobileSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -15, scaleY: 0.95 }}
                animate={{ height: 'auto', opacity: 1, y: 0, scaleY: 1 }}
                exit={{ height: 0, opacity: 0, y: -15, scaleY: 0.95 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="lg:hidden pb-4"
              >
                <SearchBar onMobileClose={() => setShowMobileSearch(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute left-0 right-0 top-full z-50 mx-auto max-w-7xl px-4"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <div className="overflow-hidden border border-primary/10 bg-white/95 p-8 shadow-[0_30px_70px_rgba(0,0,0,0.12)] rounded-none backdrop-blur-xl">
                <div className="grid grid-cols-4 gap-8">
                  {categoriesData.map((cat, idx) => {
                    const Icon = cat.icon;
                    return (
                      <div key={idx} className="space-y-4">
                        <div className="flex items-center gap-2.5 font-serif text-lg font-bold text-primary border-b border-primary/5 pb-2">
                          <span className="rounded-none bg-accent/10 p-2 text-accent">
                            <Icon size={18} />
                          </span>
                          {cat.title}
                        </div>
                        <ul className="space-y-3.5">
                          {cat.items.map((item: any, itemIdx: number) => (
                            <li key={itemIdx}>
                              <Link
                                to={item.path}
                                className="group flex items-center justify-between py-1 text-sm text-primary/70 hover:text-accent transition-all"
                              >
                                <span>{item.name}</span>
                                <ChevronRight size={14} className="opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-xs xl:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-[320px] bg-white shadow-2xl xl:hidden h-screen flex flex-col"
            >
              {/* Mobile Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-primary/5 shrink-0">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-primary hover:bg-muted transition-all rounded-none cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-5 space-y-5 flex-1 overflow-y-auto">
                
                {/* Search in Mobile Drawer */}
                <SearchBar onMobileClose={() => setMobileOpen(false)} />

                <div className="grid grid-cols-1 gap-2">
                  
                  {/* Mobile Categories Accordion */}
                  <div className="border-b border-primary/5 pb-2">
                    <button
                      onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                      className="flex w-full items-center justify-between px-3 py-3 text-[14px] font-bold text-primary hover:bg-muted/40 rounded-none transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2"><Layers size={16} className="text-accent" /> Product Categories</span>
                      <ChevronDown size={16} className={`text-primary/60 transition-transform duration-350 ${mobileCategoriesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {mobileCategoriesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-muted/20 pl-4 pr-3 py-3 space-y-4 rounded-none mt-1"
                        >
                          {categoriesData.map((cat, idx) => {
                            const CatIcon = cat.icon;
                            return (
                              <div key={idx} className="space-y-2">
                                <span className="flex items-center gap-1.5 text-[11px] font-bold text-accent uppercase tracking-wider">
                                  <CatIcon size={12} />
                                  {cat.title}
                                </span>
                                <div className="pl-4 border-l border-primary/5 space-y-2">
                                  {cat.items.map((item: any, itemIdx: number) => (
                                    <Link
                                      key={itemIdx}
                                      to={item.path}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-1 text-sm text-primary/80 hover:text-accent font-medium transition-all"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Standard Links */}
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-3 text-sm font-semibold rounded-none transition-all ${
                          isActive(link.path)
                            ? 'bg-primary text-white shadow-md'
                            : 'text-primary hover:bg-muted/40 hover:text-accent'
                        }`}
                      >
                        <Icon size={16} className={isActive(link.path) ? 'text-white' : 'text-primary/60'} />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenEnquiry();
                      setTimeout(() => {
                        setMobileOpen(false);
                      }, 200);
                    }}
                    className="w-full market-button bg-accent py-3 text-center text-sm font-bold text-white rounded-none shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all cursor-pointer"
                  >
                    Post Buy Requirement
                  </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
