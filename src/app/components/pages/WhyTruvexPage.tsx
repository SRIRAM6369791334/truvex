import { HeroSection } from '../HeroSection';
import { Link } from 'react-router';
import { Zap, Target, ShieldCheck, Globe, Handshake, Lightbulb, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../AnimationUtils';

const scores = [
  { label: 'Truvex', speed: 95, verification: 100, transparency: 90, effort: 95, color: 'bg-teal-500' },
  { label: 'Traditional Broker', speed: 40, verification: 55, transparency: 30, effort: 30, color: 'bg-amber-400' },
  { label: 'Open Platform', speed: 60, verification: 20, transparency: 50, effort: 20, color: 'bg-slate-400' },
];
const scoreMetrics = ['Speed', 'Verification', 'Transparency', 'Ease'];

const advantages = [
  { icon: <Zap className="w-7 h-7 text-accent" />, title: 'Speed', desc: 'Truvex responds to buyer leads within hours. Traditional brokers take days. In sourcing, speed wins deals.' },
  { icon: <Target className="w-7 h-7 text-accent" />, title: 'Personalisation', desc: "Every proposal is tailored to the buyer's exact requirement — specifications, budget, and delivery needs." },
  { icon: <ShieldCheck className="w-7 h-7 text-accent" />, title: 'Trusted Network', desc: 'A curated network of verified and performance-rated suppliers ensures quality at every touchpoint.' },
  { icon: <Globe className="w-7 h-7 text-accent" />, title: 'Multi-Platform Presence', desc: 'Active on both Justdial and IndiaMart — maximising lead volume, diversity, and geographic coverage.' },
  { icon: <Handshake className="w-7 h-7 text-accent" />, title: 'Low Buyer Effort', desc: 'Buyers post a requirement once. Truvex handles analysis, outreach, proposal, and supplier coordination.' },
  { icon: <Lightbulb className="w-7 h-7 text-accent" />, title: 'Transparent Pricing', desc: 'Proposals include itemised pricing so buyers make fully informed decisions with zero hidden surprises.' },
];

const comparisonRows = [
  { feature: 'Response Time', truvex: 'Hours', broker: 'Days', platform: 'Variable' },
  { feature: 'Supplier Verification', truvex: 'Always', broker: 'Sometimes', platform: 'Rarely' },
  { feature: 'Custom Proposals', truvex: 'Yes', broker: 'No', platform: 'No' },
  { feature: 'Pricing Transparency', truvex: 'Full', broker: 'Partial', platform: 'None' },
  { feature: 'Buyer Effort', truvex: 'Minimal', broker: 'High', platform: 'Very High' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export default function WhyTruvexPage() {
  return (
    <div className="w-full">
      <HeroSection
        badge="Competitive Edge"
        headline="Why Choose Truvex"
        subtext="Six distinct advantages that set Truvex apart from traditional brokers and open B2B platforms."
        patternId="geo-why"
      />

      {/* Animated Score Card */}
      <section className="bg-muted py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-4">Performance Score</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">How We Compare</h2>
          </FadeIn>

          <div className="space-y-8">
            {scores.map((s, si) => (
              <FadeIn key={s.label} delay={si * 0.1} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground text-lg">{s.label}</h3>
                  {si === 0 && <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">Truvex ⭐</span>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[s.speed, s.verification, s.transparency, s.effort].map((val, mi) => (
                    <div key={mi}>
                      <div className="text-xs text-muted-foreground mb-2 font-medium">{scoreMetrics[mi]}</div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${s.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${val}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: si * 0.1 + mi * 0.05, ease: 'easeOut' }}
                        />
                      </div>
                      <div className="text-xs font-bold text-foreground mt-1">{val}/100</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage Cards */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {advantages.map((adv) => (
              <motion.div
                key={adv.title}
                variants={cardVariants}
                className="bg-card border border-border border-l-accent rounded-r-xl p-8 hover:shadow-xl hover:-translate-y-1 hover:translate-x-1 transition-all duration-300 group"
              >
                <div className="mb-5 p-3 bg-accent/10 rounded-lg inline-flex group-hover:scale-110 transition-transform duration-300">
                  {adv.icon}
                </div>
                <h3 className="font-['Playfair_Display',_serif] text-foreground text-xl font-bold mb-3">
                  {adv.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-card py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              Side-by-Side Comparison
            </div>
            <h2 className="font-['Playfair_Display',_serif] text-foreground text-3xl md:text-4xl font-bold">
              Truvex vs. The Alternatives
            </h2>
          </motion.div>

          <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-card">
            {/* Header */}
            <div className="grid grid-cols-4 bg-primary p-4 md:p-6 gap-2 md:gap-4 items-center">
              <span className="text-primary-foreground/70 text-xs font-semibold uppercase tracking-wider col-span-1">Feature</span>
              <div className="text-center col-span-1">
                <span className="bg-secondary text-secondary-foreground px-3 py-1 md:px-4 md:py-1.5 rounded-md text-sm font-bold shadow-sm">Truvex</span>
              </div>
              <span className="text-primary-foreground/70 text-xs font-semibold uppercase tracking-wider text-center col-span-1 hidden sm:block">Traditional Broker</span>
              <span className="text-primary-foreground/70 text-xs font-semibold uppercase tracking-wider text-center col-span-1 block sm:hidden">Broker</span>
              <span className="text-primary-foreground/70 text-xs font-semibold uppercase tracking-wider text-center col-span-1 hidden sm:block">Open Platform</span>
              <span className="text-primary-foreground/70 text-xs font-semibold uppercase tracking-wider text-center col-span-1 block sm:hidden">Platform</span>
            </div>

            {/* Rows */}
            <motion.div 
              className="flex flex-col"
              variants={tableContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {comparisonRows.map((row, i) => (
                <motion.div
                  key={row.feature}
                  variants={tableRowVariants}
                  className={`grid grid-cols-4 p-4 md:p-6 gap-2 md:gap-4 items-center transition-colors hover:bg-muted/30 ${
                    i !== 0 ? 'border-t border-border' : ''
                  } ${i % 2 === 0 ? 'bg-card' : 'bg-muted/10'}`}
                >
                  <span className="text-foreground text-sm font-medium col-span-1">{row.feature}</span>
                  {/* Truvex column highlighted */}
                  <div className="text-center col-span-1 flex justify-center">
                    <span className="bg-secondary/10 text-secondary px-2 py-1 md:px-4 md:py-1.5 rounded-md text-sm font-bold inline-flex items-center gap-1.5 whitespace-nowrap">
                      <Check className="w-3 h-3 md:w-4 md:h-4" /> {row.truvex}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs md:text-sm text-center col-span-1">{row.broker}</span>
                  <span className="text-muted-foreground text-xs md:text-sm text-center col-span-1">{row.platform}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-24 px-4 text-center relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_100%)] pointer-events-none" />
        
        <motion.div 
          className="max-w-2xl mx-auto relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-['Playfair_Display',_serif] text-primary-foreground text-3xl md:text-4xl font-bold mb-4">
            Experience the Truvex Difference
          </h2>
          <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Speed, transparency, and verified relationships — everything traditional sourcing lacks, all in one platform.
          </p>
          <Link
            to="/contact"
            className="bg-accent text-accent-foreground px-8 py-4 rounded-lg text-lg font-bold inline-flex items-center gap-2 hover:bg-accent/90 hover:scale-105 hover:shadow-[0_8px_25px_rgba(201,151,58,0.4)] transition-all duration-300"
          >
            Get Started Today 
            <span className="text-xl">→</span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

