import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Play, Star } from 'lucide-react';
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
    ['12,400+', 'Products Listed'],
    ['847', 'RFQs This Month'],
    ['4.2hr', 'Avg Response Time'],
    ['INR 2.3Cr+', 'Orders Facilitated'],
  ];

  return (
    <section className="bg-gradient-to-r from-primary to-secondary px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center gap-2 text-sm font-bold text-green-300">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />
          Platform Active
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: index * 0.08 }}
              className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
            >
              <div className="font-serif text-4xl font-bold text-accent">{value}</div>
              <div className="mt-1 text-[12px] font-bold uppercase tracking-wide text-white/70">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % testimonials.length), 4000);
    return () => window.clearInterval(timer);
  }, []);

  const active = testimonials[index];

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Buyer proof" title="Verified sourcing outcomes" subtext="Auto-rotating buyer stories with the operating detail users expect from a B2B platform." />
        <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <div className="relative min-h-[310px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35 }}
                className="market-card relative overflow-hidden p-8 shadow-xl"
              >
                <img src={active.image} alt={active.name} width={100} height={100} loading="lazy" className="h-16 w-16 rounded-full border-4 border-accent object-cover" />
                <blockquote className="mt-5 text-lg font-semibold leading-8 text-primary">"{active.quote}"</blockquote>
                <div className="mt-4 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-accent text-accent" />)}
                </div>
                <p className="mt-3 font-bold text-primary">{active.name}</p>
                <p className="text-sm text-muted-foreground">{active.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="grid gap-2">
            {testimonials.map((item, itemIndex) => (
              <button
                key={item.name}
                onClick={() => setIndex(itemIndex)}
                className={`min-h-12 border px-3 py-2 text-left text-sm transition ${
                  itemIndex === index ? 'border-accent bg-accent/10 text-primary' : 'border-border bg-white/70 text-muted-foreground'
                }`}
              >
                {item.name} - {item.role.split(',')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustedByBrands() {
  const brands = [
    ['Tata Group', 'https://logo.clearbit.com/tatasteel.com'],
    ['Mahindra', 'https://logo.clearbit.com/mahindra.com'],
    ['Godrej', 'https://logo.clearbit.com/godrej.com'],
    ['Reliance', 'https://logo.clearbit.com/ril.com'],
    ['L&T', 'https://logo.clearbit.com/larsentoubro.com'],
    ['Bajaj', 'https://logo.clearbit.com/bajajauto.com'],
  ];
  const items = [...brands, ...brands];

  return (
    <section className="overflow-hidden bg-white px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Trusted network" title="Suppliers & buyers from India's leading companies" />
        <div className="overflow-hidden">
          <div className="flex w-max animate-market-ticker gap-4">
            {items.map(([name, logo], index) => (
              <div key={`${name}-${index}`} className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-border bg-white p-5 grayscale transition hover:grayscale-0">
                <img src={logo} alt={name} width={120} height={52} loading="lazy" className="max-h-12 max-w-28 object-contain" />
              </div>
            ))}
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
