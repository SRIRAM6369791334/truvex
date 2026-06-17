import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Play, Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import Lottie from 'lottie-react';
import boxLottie from './lottie/box.json';
import documentLottie from './lottie/document.json';
import clockLottie from './lottie/clock.json';
import trendingLottie from './lottie/trending.json';
import { SectionHeader } from './MarketplaceComponents';

const testimonials = [
  {
    name: 'Rajesh Mehta',
    role: 'Purchase Manager, Pune Manufacturing Co.',
    quote: 'Truvex found us a verified steel supplier in Rajkot within 6 hours. Saved our production schedule.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    name: 'Priya Nair',
    role: 'Procurement Lead, Chennai Packaging Works',
    quote: 'We received three structured packaging quotes the same day. The comparison was clear and usable.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    name: 'Arvind Shah',
    role: 'Owner, Ahmedabad Safety Hub',
    quote: 'The RFQs are more relevant than directory calls. We only respond to buyers with real quantity details.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
  {
    name: 'Meera Iyer',
    role: 'Operations Head, Coimbatore Motors',
    quote: 'Supplier verification and city-level matching made the process faster for our factory team.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
  },
  {
    name: 'Nikhil Bansal',
    role: 'Director, Noida Control Systems',
    quote: 'Truvex helped us respond to better-qualified panel enquiries instead of chasing cold leads.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
  },
  {
    name: 'Anita Rao',
    role: 'Buyer, Metro Build Mart',
    quote: 'We had supplier callbacks within hours and could compare hardware quotes before the next site meeting.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop',
  },
];

export function LiveMarketplaceStats() {
  const stats = [
    ['12,400+', 'Products Listed', boxLottie],
    ['847', 'RFQs This Month', documentLottie],
    ['4.2hr', 'Avg Response Time', clockLottie],
    ['INR 2.3Cr+', 'Orders Facilitated', trendingLottie],
  ] as const;

  return (
    <section className="relative z-20 -mt-24 px-4 pb-12">
      {/* Light background for the bottom half to blend seamlessly with the next section */}
      <div className="absolute bottom-0 left-0 right-0 z-0 h-1/2 bg-background" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label, lottieData], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10"
            >
              {/* Top right faint circle accent as seen in the image */}
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#fdfaf6] transition-all duration-500 group-hover:scale-150 group-hover:bg-[#fcf4e3]" />
              
              <div className="relative z-10 flex flex-col items-start text-left">
                {/* Lottie animation icon */}
                <div 
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#f8f9fa] text-[#D97706] transition-colors duration-300 group-hover:bg-[#fcf4e3]"
                >
                  <Lottie animationData={lottieData} loop={true} className="h-10 w-10" />
                </div>
                
                {/* Number */}
                <div className="font-serif text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-[2.1rem]">{value}</div>
                
                {/* Label */}
                <div className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-[#64748b]">{label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 py-24 bg-[#fafbfc] overflow-hidden border-y border-border/50 relative">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-6 bg-accent"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Buyer proof</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl">Verified sourcing outcomes</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Real stories from businesses who transformed their procurement process using our platform.</p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-3">
            <button onClick={() => scroll('left')} className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-primary transition-all hover:border-accent hover:text-accent hover:shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-primary transition-all hover:border-accent hover:text-accent hover:shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none' }}>
            {testimonials.map((item, index) => (
              <div key={item.name} className="shrink-0 w-[300px] sm:w-[380px] lg:w-[400px] snap-start">
                <div className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/30">
                  
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-accent text-accent" />)}
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 border border-emerald-100">
                        <BadgeCheck size={12} />
                        Verified
                      </div>
                    </div>
                    
                    <blockquote className="mb-8 font-serif text-[17px] leading-relaxed text-primary/90">
                      "{item.quote}"
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-4 border-t border-border/50 pt-5">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-full object-cover border border-border/50" />
                    <div>
                      <p className="font-bold text-primary text-[15px]">{item.name}</p>
                      <p className="text-[13px] font-medium text-muted-foreground line-clamp-1">{item.role}</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}

export function TrustedByBrands() {
  const brands = [
    ['Tata Group', 'tatasteel.com'],
    ['Mahindra', 'mahindra.com'],
    ['Godrej', 'godrej.com'],
    ['Reliance', 'ril.com'],
    ['L&T', 'larsentoubro.com'],
    ['Bajaj', 'bajajauto.com'],
    ['Ashok Leyland', 'ashokleyland.com'],
    ['Wipro', 'wipro.com'],
  ];
  
  // Double the items for seamless infinite scroll
  const topRowItems = [...brands.slice(0, 4), ...brands.slice(0, 4), ...brands.slice(0, 4)];
  const bottomRowItems = [...brands.slice(4, 8), ...brands.slice(4, 8), ...brands.slice(4, 8)];

  return (
    <section className="overflow-hidden bg-[#fafbfc] px-4 py-20 border-y border-border/50 relative">
      {/* Left and Right Fade Overlays */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-[#fafbfc] to-transparent sm:w-32"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-[#fafbfc] to-transparent sm:w-32"></div>

      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-10 flex flex-col items-center justify-center relative z-20">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-6 bg-accent"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Trusted network</span>
            <span className="h-px w-6 bg-accent"></span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-[2.5rem]">Suppliers & buyers from India's leading companies</h2>
        </div>
        
        <div className="relative mx-auto max-w-[1000px] overflow-hidden">
          <div className="flex flex-col gap-4">
            
            {/* Top Row - Scrolling Left */}
            <div className="flex w-max animate-market-ticker gap-4 hover:[animation-play-state:paused]">
              {topRowItems.map(([name, domain], index) => (
                <div key={`top-${name}-${index}`} className="group flex h-20 w-[240px] shrink-0 items-center justify-center gap-4 rounded-2xl border border-border/60 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/30">
                  <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt={name} width={36} height={36} loading="lazy" className="h-9 w-9 object-contain transition-all duration-300 group-hover:scale-110" />
                  <span className="font-bold text-gray-800 text-[15px] transition-all duration-300 group-hover:text-primary">{name}</span>
                </div>
              ))}
            </div>

            {/* Bottom Row - Scrolling Right (Reverse) */}
            <div className="flex w-max animate-market-ticker gap-4 hover:[animation-play-state:paused]" style={{ animationDirection: 'reverse' }}>
              {bottomRowItems.map(([name, domain], index) => (
                <div key={`bottom-${name}-${index}`} className="group flex h-20 w-[240px] shrink-0 items-center justify-center gap-4 rounded-2xl border border-border/60 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/30">
                  <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt={name} width={36} height={36} loading="lazy" className="h-9 w-9 object-contain transition-all duration-300 group-hover:scale-110" />
                  <span className="font-bold text-gray-800 text-[15px] transition-all duration-300 group-hover:text-primary">{name}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export function IndustryInsightsBlog() {
  const posts = [
    ['Industry Trends', 'How SMEs in Tier-2 Cities Are Winning with Digital Procurement', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600'],
    ['Sourcing Tips', '5 Red Flags When Qualifying a New B2B Supplier', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600'],
    ['Market Watch', 'Steel & Packaging Prices in India: Q1 2026 Outlook', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600'],
  ];

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Insights" title="B2B sourcing guides and market updates" viewAllTo="/blog" />
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map(([tag, title, image]) => (
            <Link key={title} to="/blog" className="market-card group block overflow-hidden">
              <div className="h-44 overflow-hidden border-b border-border">
                <img src={image} alt={title} width={600} height={280} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <span className="bg-primary px-2 py-1 text-[11px] font-bold uppercase text-white">{tag}</span>
                <h3 className="mt-3 text-base font-bold leading-6 text-primary">{title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SupplierCitiesMap() {
  const cities = [
    ['Mumbai', '22%', '52%', '148 active suppliers'],
    ['Delhi', '43%', '31%', '126 active suppliers'],
    ['Pune', '27%', '58%', '92 active suppliers'],
    ['Bangalore', '40%', '73%', '116 active suppliers'],
    ['Chennai', '46%', '82%', '88 active suppliers'],
    ['Ahmedabad', '24%', '43%', '74 active suppliers'],
    ['Surat', '22%', '47%', '61 active suppliers'],
    ['Coimbatore', '43%', '86%', '54 active suppliers'],
  ];

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Supplier coverage" title="Active supplier cities across India" />
        <div className="relative overflow-hidden rounded-2xl border border-border bg-primary">
          <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200" alt="India aerial map" width={1200} height={520} loading="lazy" className="h-[420px] w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-primary/35" />
          {cities.map(([city, left, top, label]) => (
            <div key={city} className="group absolute" style={{ left, top }}>
              <span className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-accent/70" />
              <span className="relative block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-2 ring-white" />
              <div className="pointer-events-none absolute left-3 top-3 hidden min-w-40 rounded-md bg-white px-3 py-2 text-xs font-semibold text-primary shadow-xl group-hover:block">
                <MapPin className="mr-1 inline h-3 w-3 text-accent" /> {city}: {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideoExplainer() {
  const [open, setOpen] = useState(false);

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-xl">
          <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200" alt="Truvex process explainer" width={1200} height={520} loading="lazy" className="h-[360px] w-full object-cover" />
          <div className="absolute inset-0 bg-primary/50" />
          <button onClick={() => setOpen(true)} className="market-button absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-2xl">
            <Play className="ml-1 h-9 w-9 fill-white" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="font-serif text-3xl font-bold">Watch how Truvex turns a 5-minute requirement into 3 verified proposals</h2>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-primary/80 p-4 backdrop-blur-md" onClick={() => setOpen(false)}>
          <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black" onClick={(event) => event.stopPropagation()}>
            <iframe title="Truvex explainer" className="h-full w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowFullScreen />
          </div>
        </div>
      )}
    </section>
  );
}

export function ProcessComparisonSection() {
  const without = ['Day 1: Search Justdial manually', 'Day 2-3: Call 20+ suppliers', 'Day 4: Get inconsistent quotes', 'Day 7: Finally compare options'];
  const withTruvex = ['Hour 1: Post requirement', 'Hour 2: Truvex qualifies suppliers', 'Hour 4: Receive structured proposals', 'Hour 6: Make informed decision'];

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Before / after" title="Manual sourcing vs Truvex-managed sourcing" />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['Without Truvex', without, 'bg-red-50 border-red-200', 'bg-red-500'],
            ['With Truvex', withTruvex, 'bg-green-50 border-green-200', 'bg-green-600'],
          ].map(([title, rows, shellClass, barClass]) => (
            <div key={title as string} className={`rounded-2xl border p-5 ${shellClass}`}>
              <h3 className="text-lg font-bold text-primary">{title as string}</h3>
              <div className="mt-4 grid gap-3">
                {(rows as string[]).map((row) => <div key={row} className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-primary">{row}</div>)}
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white">
                <motion.div initial={{ width: 0 }} whileInView={{ width: title === 'With Truvex' ? '100%' : '62%' }} viewport={{ once: true }} transition={{ duration: title === 'With Truvex' ? 0.8 : 2 }} className={`h-full ${barClass}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
