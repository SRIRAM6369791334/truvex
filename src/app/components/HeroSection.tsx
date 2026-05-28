import React from 'react';
import { Search, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';

interface HeroSectionProps {
  badge?: string;
  badgeColor?: 'teal' | 'gold' | 'navy';
  headline: string;
  headlineAccent?: string;
  subtext?: string;
  patternId: string;
  children?: React.ReactNode;
  compact?: boolean;
}

export function HeroSection({
  badge,
  headline,
  headlineAccent,
  subtext,
  children,
  compact = false,
}: HeroSectionProps) {
  return (
    <section className={`border-b border-accent/30 bg-primary px-4 text-white ${compact ? 'py-8' : 'py-10'}`}>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          {badge && (
            <div className="mb-2 inline-flex items-center gap-2 border border-accent/40 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              <ShieldCheck size={14} /> {badge}
            </div>
          )}
          <h1 className="font-serif text-3xl font-bold leading-tight text-white md:text-5xl">
            {headline}
            {headlineAccent && <span className="text-accent"> {headlineAccent}</span>}
          </h1>
          {subtext && <p className="mt-3 max-w-3xl text-sm leading-6 text-white/76 md:text-base">{subtext}</p>}
          {children && <div className="mt-5 flex flex-wrap gap-3">{children}</div>}
        </div>
        <div className="border border-white/15 bg-white/8 p-4">
          <label className="mb-2 block text-[12px] font-bold uppercase tracking-wide text-accent">Find suppliers</label>
          <div className="flex">
            <input className="min-w-0 flex-1 bg-white px-3 py-2.5 text-sm text-primary outline-none" placeholder="Search product or category" />
            <Link to="/categories" className="flex items-center gap-2 bg-accent px-4 py-2.5 text-sm font-bold text-white">
              <Search size={15} /> Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
