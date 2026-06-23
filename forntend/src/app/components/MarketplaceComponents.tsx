import { useState, useRef } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedIcon from './AnimatedIcon';
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
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
  { iconName: 'shield', icon: BadgeCheck, label: '500+ Verified Suppliers' },
  { iconName: 'rupee', icon: IndianRupee, label: 'Free for Buyers' },
  { iconName: 'clock', icon: Clock3, label: 'Response in 4 Hours' },
  { iconName: null, icon: Truck, label: 'Pan-India Coverage' },
  { iconName: 'shield', icon: ShieldCheck, label: 'ISO Verified Network' },
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
  { name: 'Industrial Machinery', count: '12,400+', subs: '248 sub-categories', icon: Factory, image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400', subList: ['CNC Machines', 'Packaging Machinery', 'Food Processing', 'Textile Machinery', 'Woodworking', 'Machine Tools'] },
  { name: 'Electrical & Electronics', count: '8,900+', subs: '182 sub-categories', icon: ShieldCheck, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', subList: ['Transformers', 'Switchgears', 'Cables & Wires', 'Control Panels', 'Generators', 'Lighting'] },
  { name: 'Construction Materials', count: '15,100+', subs: '305 sub-categories', icon: Truck, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400', subList: ['TMT Bars', 'Cement & Concrete', 'Bricks & Blocks', 'Tiles & Marbles', 'Plumbing', 'Paints & Coatings'] },
  { name: 'Packaging Materials', count: '4,800+', subs: '96 sub-categories', icon: BadgeCheck, image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400', subList: ['Corrugated Boxes', 'Plastic Films', 'Glass Bottles', 'Tapes & Adhesives', 'Pallets', 'Labels & Stickers'] },
  { name: 'Office & IT Supplies', count: '9,300+', subs: '141 sub-categories', icon: Monitor, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400', subList: ['Laptops & Desktops', 'Printers & Scanners', 'Office Furniture', 'Stationery', 'Networking', 'Projectors'] },
  { name: 'Automotive Parts', count: '6,700+', subs: '126 sub-categories', icon: Factory, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400', subList: ['Engine Parts', 'Brake Systems', 'Tyres & Wheels', 'Suspension', 'Auto Electrical', 'Accessories'] },
  { name: 'Chemicals & Raw Materials', count: '5,600+', subs: '112 sub-categories', icon: FlaskConical, image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400', subList: ['Industrial Chemicals', 'Polymers & Resins', 'Agrochemicals', 'Solvents', 'Pigments', 'Specialty Chemicals'] },
  { name: 'Agricultural Products', count: '3,900+', subs: '84 sub-categories', icon: Leaf, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400', subList: ['Tractors', 'Irrigation Systems', 'Seeds & Fertilizers', 'Harvesting Tools', 'Greenhouse', 'Animal Feed'] },
  { name: 'Textile & Garments', count: '10,200+', subs: '190 sub-categories', icon: Factory, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', subList: ['Cotton Yarn', 'Denim Fabrics', 'Mens Wear', 'Womens Wear', 'Uniforms', 'Textile Machinery'] },
  { name: 'Medical & Healthcare', count: '4,100+', subs: '110 sub-categories', icon: ShieldCheck, image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400', subList: ['Surgical Instruments', 'Hospital Furniture', 'Diagnostic Kits', 'API Pharma', 'Medical Disposables'] },
  { name: 'Paper & Paper Products', count: '3,200+', subs: '70 sub-categories', icon: Truck, image: 'https://images.unsplash.com/photo-1588628566587-dbd176de94b4?w=400', subList: ['Kraft Paper', 'Tissue Paper', 'Notebooks', 'Printing Paper', 'Paper Bags'] },
  { name: 'Furniture & Decor', count: '6,400+', subs: '155 sub-categories', icon: Monitor, image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400', subList: ['Wooden Furniture', 'Plastic Chairs', 'Modular Kitchens', 'Home Decor', 'Office Desks'] },
  { name: 'Hardware & Tools', count: '8,800+', subs: '210 sub-categories', icon: Factory, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400', subList: ['Hand Tools', 'Power Tools', 'Fasteners', 'Door Hardware', 'Abrasives'] },
  { name: 'Food & Beverages', count: '11,500+', subs: '320 sub-categories', icon: Leaf, image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400', subList: ['Spices', 'Cereals', 'Processed Food', 'Beverages', 'Dry Fruits', 'Dairy Products'] },
  { name: 'Plastic & Polymers', count: '5,500+', subs: '135 sub-categories', icon: FlaskConical, image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400', subList: ['Plastic Granules', 'PVC Pipes', 'Molded Parts', 'Acrylic Sheets', 'FRP Products'] },
  { name: 'Apparel Accessories', count: '4,300+', subs: '85 sub-categories', icon: BadgeCheck, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', subList: ['Footwear', 'Belts', 'Caps & Hats', 'Bags & Luggage', 'Umbrellas'] },
  { name: 'Safety & Security', count: '3,700+', subs: '75 sub-categories', icon: ShieldCheck, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', subList: ['Safety Shoes', 'CCTV Cameras', 'Fire Extinguishers', 'Access Control', 'Helmets'] },
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
  { name: 'Apex Industrial Traders', city: 'Mumbai', category: 'Steel & Fabrication', initials: 'AI', logo: 'https://ui-avatars.com/api/?name=Apex+Industrial&background=0B1F3A&color=0D9488&size=128', cover: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600' },
  { name: 'Coimbatore Motor Works', city: 'Coimbatore', category: 'Industrial Motors', initials: 'CM', logo: 'https://ui-avatars.com/api/?name=Coimbatore+Motor&background=0B1F3A&color=0D9488&size=128', cover: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600' },
  { name: 'Surat Packline LLP', city: 'Surat', category: 'Packaging Materials', initials: 'SP', logo: 'https://ui-avatars.com/api/?name=Surat+Packline&background=0B1F3A&color=0D9488&size=128', cover: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600' },
  { name: 'Noida Control Systems', city: 'Noida', category: 'Electrical Panels', initials: 'NC', logo: 'https://ui-avatars.com/api/?name=Noida+Controls&background=0B1F3A&color=0D9488&size=128', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
  { name: 'Pune CNC Components', city: 'Pune', category: 'Precision Parts', initials: 'PC', logo: 'https://ui-avatars.com/api/?name=Pune+CNC&background=0B1F3A&color=0D9488&size=128', cover: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600' },
  { name: 'Ahmedabad Safety Hub', city: 'Ahmedabad', category: 'PPE & Safety', initials: 'AS', logo: 'https://ui-avatars.com/api/?name=Ahmedabad+Safety&background=0B1F3A&color=0D9488&size=128', cover: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600' },
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
        {trustSignals.map((item) => {
          const iconSize = item.iconName === 'rupee' ? 28 : (item.iconName ? 22 : 16);
          return (
            <div key={item.label} className="flex items-center gap-2 text-[13px] font-medium tracking-wide text-white/90">
              {item.iconName ? (
                <AnimatedIcon icon={item.iconName as any} size={iconSize} className="text-accent" />
              ) : (
                <item.icon size={iconSize} className="text-accent" />
              )}
              {item.label}
            </div>
          );
        })}
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
    <Link to="/services" className="group flex flex-col overflow-hidden rounded-none border border-border bg-white shadow-sm transition-all hover:shadow-lg hover:shadow-accent/5">
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

export function ClassicIndiaMartCard({ category }: { category: (typeof categories)[number] }) {
  return (
    <div className="bg-white border border-border shadow-sm rounded-none hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="bg-[#fbfcfd] border-b border-border p-3 px-4">
        <h3 className="font-bold text-[15px] text-primary hover:text-accent transition-colors cursor-pointer truncate">
          <Link to="/services">{category.name}</Link>
        </h3>
      </div>
      {/* Body */}
      <div className="p-4 flex gap-4">
        {/* Thumbnail */}
        <div className="w-[90px] h-[90px] shrink-0 border border-border/50 rounded-none overflow-hidden relative group">
          <img src={category.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300'} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        {/* Links list */}
        <div className="flex-1 min-w-0">
          <ul className="flex flex-col gap-1.5">
            {category.subList.slice(0, 4).map((sub) => (
              <li key={sub} className="truncate">
                <Link to="/services" className="text-[13px] text-muted-foreground hover:text-accent hover:underline transition-colors">
                  {sub}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border/40 bg-[#f8f9fa]">
        <Link to="/categories" className="text-[12px] font-bold text-accent hover:underline uppercase tracking-wide flex items-center gap-1">
          View All {category.name} <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

export function TabbedCategoryDirectory() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = categories[activeTab];

  return (
    <div className="mt-8 flex flex-col md:flex-row gap-0 overflow-hidden rounded-3xl border border-border bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {/* Left Sidebar (Tabs) */}
      <div className="w-full md:w-80 shrink-0 border-r border-border bg-[#f8f9fa] p-4 flex flex-col gap-2 overflow-y-auto max-h-[600px]">
        {categories.map((category, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={category.name}
              onMouseEnter={() => setActiveTab(idx)}
              onClick={() => setActiveTab(idx)}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all duration-300 ${isActive ? 'bg-white shadow-sm border border-border text-accent font-bold ring-1 ring-black/5 rounded-none' : 'border-transparent text-primary/70 hover:bg-black/5 hover:text-primary font-medium rounded-none'}`}
            >
              <category.icon size={20} className={isActive ? 'text-accent' : 'text-muted-foreground'} />
              <span className="text-[15px] truncate">{category.name}</span>
            </button>
          )
        })}
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-6 md:p-10 relative min-h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col h-full"
          >
            {/* Header of Content */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-border/50 gap-4">
              <div>
                <h3 className="font-serif text-3xl font-bold text-primary">{activeCategory.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{activeCategory.subs} &nbsp;•&nbsp; <span className="font-bold text-teal-600">{activeCategory.count} Verified Suppliers</span></p>
              </div>
              <div className="flex items-center gap-5">
                <Link to="/contact" className="market-button bg-accent text-white px-5 py-2.5 text-[12px] uppercase tracking-wider font-bold rounded-none shadow-sm hover:bg-accent/90 transition-colors shadow-accent/20">
                  Post Requirement
                </Link>
                <Link to="/categories" className="hidden sm:flex text-[13px] font-bold uppercase tracking-wider text-accent hover:underline items-center gap-1.5">
                  View All <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Banner Card inside grid */}
              <div className="group relative overflow-hidden rounded-none col-span-1 sm:col-span-2 lg:col-span-1 lg:row-span-2 shadow-sm border border-border min-h-[200px]">
                <img src={activeCategory.image} alt={activeCategory.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Sub categories */}
              {activeCategory.subList.map((sub) => (
                <Link to="/services" key={sub} className="group flex items-center gap-3 p-3.5 rounded-none border border-border bg-white hover:border-accent/40 hover:bg-[#fdfcf9] hover:shadow-sm transition-all duration-300">
                  <div className="h-10 w-10 shrink-0 rounded-none bg-black/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <activeCategory.icon size={18} className="text-primary/60 group-hover:text-accent" />
                  </div>
                  <span className="text-[14px] font-bold text-primary/80 group-hover:text-accent">{sub}</span>
                </Link>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
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
    <div className="group flex flex-col overflow-hidden rounded-none border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30">
      
      {/* Cover Image */}
      <div className="relative h-32 w-full overflow-hidden bg-gray-100">
        <img src={supplier.cover} alt={`${supplier.name} cover`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        
        {/* Verification Badge (floating top right) */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-none bg-black/40 px-2.5 py-1 backdrop-blur-md border border-white/10">
          <BadgeCheck size={14} className="text-teal-400" />
          <span className="text-[10px] font-bold tracking-wider text-white uppercase">Verified</span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-5 pt-0">
        {/* Overlapping Logo */}
        <div className="relative -mt-10 mb-3 h-20 w-20 shrink-0 rounded-none border-4 border-white bg-white shadow-sm">
          <img
            src={supplier.logo}
            alt={`${supplier.name} logo`}
            className="h-full w-full rounded-none object-cover"
          />
        </div>

        {/* Supplier Info */}
        <div className="mb-4">
          <h3 className="truncate font-serif text-[19px] font-bold text-primary transition-colors group-hover:text-accent">{supplier.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] font-medium text-muted-foreground">
            <span className="flex items-center gap-1 text-primary/80"><MapPin size={14} className="text-accent/80" /> {supplier.city}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="flex items-center gap-1 truncate"><Factory size={14} className="shrink-0 text-accent/80"/> <span className="truncate">{supplier.category}</span></span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-2 border-t border-border/50">
          <Link to="/contact" className="market-button flex h-11 items-center justify-center gap-2 rounded-none bg-primary px-4 text-[13px] uppercase tracking-wider font-bold text-white transition-all hover:bg-accent hover:shadow-lg hover:shadow-accent/20">
            Get Best Quote
          </Link>
          <Link to="/contact" className="flex h-11 w-11 items-center justify-center rounded-none border border-border bg-[#f8f9fa] text-primary transition-colors hover:border-primary hover:bg-primary/5">
            <Phone size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

const regions = [
  { name: 'Mumbai', bg: 'bg-blue-50/40' },
  { name: 'Coimbatore', bg: 'bg-orange-50/40' },
  { name: 'Surat', bg: 'bg-emerald-50/40' },
  { name: 'Noida', bg: 'bg-purple-50/40' },
  { name: 'Pune', bg: 'bg-rose-50/40' },
  { name: 'Ahmedabad', bg: 'bg-amber-50/40' },
];

export function SupplierNetworkInteractive() {
  const [activeRegion, setActiveRegion] = useState(regions[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={`px-4 py-12 transition-colors duration-1000 ease-in-out ${activeRegion.bg}`}>
      <div className="mx-auto max-w-7xl relative">
        <SectionHeader
          eyebrow="Supplier network"
          title="Verified supplier profiles accepting RFQs"
          subtext="Sample supplier tiles show the operating model: location, category, verification, and quote action in one view."
          viewAllTo="/categories"
        />

        {/* Map/Location Tags */}
        <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          <span className="shrink-0 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-primary">
            <MapPin size={14} className="text-accent" />
            Top Regions:
          </span>
          {regions.map((region) => {
            const isActive = activeRegion.name === region.name;
            return (
              <button 
                key={region.name} 
                onClick={() => setActiveRegion(region)}
                className={`relative shrink-0 rounded-none border px-5 py-2.5 text-[13px] font-bold transition-all duration-300 hover:shadow-sm ${isActive ? 'border-accent bg-accent/10 text-accent shadow-sm' : 'border-border/60 bg-white text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/5'}`}
              >
                <div className="flex items-center gap-2">
                  {isActive && (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent"></span>
                    </span>
                  )}
                  {region.name}
                </div>
              </button>
            )
          })}
        </div>

        {/* Horizontal Slider (Carousel) */}
        <div className="relative group">
          {/* Glassmorphic Arrows */}
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 hidden lg:flex h-12 w-12 items-center justify-center rounded-none bg-white/90 backdrop-blur-md shadow-lg border border-border text-primary transition-all duration-300 hover:scale-110 hover:bg-white hover:text-accent opacity-0 group-hover:opacity-100">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 hidden lg:flex h-12 w-12 items-center justify-center rounded-none bg-white/90 backdrop-blur-md shadow-lg border border-border text-primary transition-all duration-300 hover:scale-110 hover:bg-white hover:text-accent opacity-0 group-hover:opacity-100">
            <ChevronRight size={24} />
          </button>

          {/* Carousel Track */}
          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-8 pt-2 px-1 -mx-1 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none' }}>
            {suppliers.map((supplier) => (
              <div key={supplier.name} className="shrink-0 w-[280px] sm:w-[340px] snap-start">
                <SupplierCard supplier={supplier} />
              </div>
            ))}
          </div>
          
          {/* Edge Fade Mask */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/60 to-transparent opacity-100 z-10" />
        </div>
      </div>
    </section>
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
