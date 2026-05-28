import { HeroSection } from '../HeroSection';
import { ScrollReveal } from '../ScrollReveal';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../AnimationUtils';

const tableRows = [
  { attr: 'Business Type', detail: 'B2B Sourcing & Lead Conversion', badge: { variant: 'teal', text: 'Core Business' } },
  { attr: 'Target Market', detail: 'SMEs, Traders, Manufacturers across India' },
  { attr: 'Lead Sources', detail: 'Justdial & IndiaMart' },
  { attr: 'Revenue Model', detail: 'Commission / Service Fee / Subscription' },
  { attr: 'Stage', detail: 'Early-Stage / Concept 2026', badge: { variant: 'gold', text: 'Concept' } },
  { attr: 'Geographic Focus', detail: 'Pan-India (starting Tier-2 & Tier-3)' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection badge="Our Story" headline="About Truvex" patternId="geo-about" compact />

      {/* Two-Column Section */}
      <section className="bg-background py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left column — OUR MISSION */}
            <ScrollReveal className="group">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 transition-colors group-hover:bg-primary/20">
                Our Mission
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Truvex was founded on a simple belief: finding the right product for your business should never be hard. We saw businesses wasting hours searching directories, getting irrelevant leads, and dealing with unverified suppliers.
              </p>
            </ScrollReveal>

            {/* Right column — OUR VISION */}
            <ScrollReveal delay={0.2} className="group">
              <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 transition-colors group-hover:bg-accent/20">
                Our Vision
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                A future where any business in India — regardless of size or location — can source any product with confidence, speed, and full pricing transparency.
              </p>

              {/* Quote Box */}
              <div className="bg-primary rounded-2xl p-8 relative overflow-hidden group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl transform -translate-x-1/2 translate-y-1/2"></div>
                
                <p className="relative text-accent text-xl italic font-serif leading-relaxed z-10">
                  "Because finding the right product should never be hard."
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-muted/30 py-24 px-4 sm:px-6 lg:px-8 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                The core principles that drive everything we do.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Transparency',
                desc: 'Clear communication, open pricing, and honest feedback at every step.',
                color: 'text-accent',
                bg: 'bg-accent/10',
                icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
              },
              {
                title: 'Speed',
                desc: 'Moving fast to keep your business ahead of the curve.',
                color: 'text-primary',
                bg: 'bg-primary/10',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
              },
              {
                title: 'Trust',
                desc: 'Building long-term relationships rooted in reliability and integrity.',
                color: 'text-teal-600',
                bg: 'bg-teal-500/10',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
              }
            ].map((value, idx) => (
              <StaggerItem key={value.title}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all relative overflow-hidden h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${value.bg} ${value.color} group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 relative z-10">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">{value.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { label: 'Founded', value: '2026' },
              { label: 'Target SMEs', value: '10K+' },
              { label: 'Categories', value: '50+' },
              { label: 'Cities', value: '100+' },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-bold text-accent mb-2 drop-shadow-md">{stat.value}</span>
                  <span className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">{stat.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Business Table Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Table Header */}
            <div className="bg-muted/50 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 p-5 md:px-8 border-b border-border">
              <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                Attribute
              </span>
              <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest hidden md:block">
                Details
              </span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-border">
              {tableRows.map((row) => (
                <div
                  key={row.attr}
                  className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 md:gap-4 p-5 md:px-8 items-center transition-colors hover:bg-muted/30 bg-white"
                >
                  <span className="text-muted-foreground text-sm font-medium">{row.attr}</span>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-primary text-sm font-medium">{row.detail}</span>
                    {row.badge && (
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                          row.badge.variant === 'gold' 
                            ? 'bg-accent/10 text-accent border border-accent/20' 
                            : 'bg-teal-500/10 text-teal-600 border border-teal-500/20'
                        }`}
                      >
                        {row.badge.text}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
