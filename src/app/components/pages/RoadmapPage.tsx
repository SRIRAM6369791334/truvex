import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { MarketplacePageHeader, TrustSignalsBar } from '../MarketplaceComponents';

const phases = [
  { phase: 'Phase 1', period: 'Month 1-2', label: 'SETUP', desc: 'Register on Justdial & IndiaMart. Build initial supplier database. Define target categories and SOPs.', status: 'Foundation' },
  { phase: 'Phase 2', period: 'Month 3-4', label: 'LAUNCH', desc: 'Begin active lead capture. Close first 20 deals. Refine proposal templates and buyer scripts.', status: 'Go Live' },
  { phase: 'Phase 3', period: 'Month 5-8', label: 'SCALE', desc: 'Expand categories. Hire sourcing executives. Build repeat-buyer relationships and referral pipeline.', status: 'Growth' },
  { phase: 'Phase 4', period: 'Month 9-12', label: 'TECHNOLOGY', desc: 'Build CRM and buyer portal for tracking requirements, proposals, and order status in real time.', status: 'Digitise' },
  { phase: 'Phase 5', period: 'Year 2+', label: 'EXPANSION', desc: 'Pan-India operations, premium supplier subscriptions, and enterprise sourcing workflows.', status: 'Scale Up' },
];

export default function RoadmapPage() {
  return (
    <div className="overflow-hidden bg-background">
      <MarketplacePageHeader
        eyebrow="The Journey Ahead"
        title="Growth Roadmap"
        subtext="From concept to pan-India operations - a clear five-phase plan for building Truvex into India's leading sourcing platform."
      />
      <TrustSignalsBar />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              className="flex gap-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="hidden w-[140px] shrink-0 pr-6 pt-1 text-right md:block">
                <span className="text-sm font-bold text-primary">{phase.phase}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{phase.period}</span>
              </div>
              <div className="flex w-10 shrink-0 flex-col items-center">
                <div className="relative z-10 mt-1.5 h-[18px] w-[18px] rounded-full border-[3px] border-accent bg-accent ring-4 ring-accent/15" />
                {i < phases.length - 1 && <div className="mt-2 min-h-[64px] w-[2px] flex-1 bg-muted" />}
              </div>
              <div className="flex-1 pb-8">
                <div className="mb-1.5 md:hidden">
                  <span className="text-xs font-bold text-primary">{phase.phase} - {phase.period}</span>
                </div>
                <div className="market-card border-l-4 border-l-accent p-5 shadow-sm">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h3 className="font-serif text-xl font-bold text-primary">{phase.label}</h3>
                    <span className="bg-accent px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-white">{phase.status}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{phase.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-card px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-primary">Key Milestones</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ['20', 'First 20 deals closed', 'Month 4'],
              ['2-3', 'Sourcing executives hired', 'Month 8'],
              ['CRM', 'Buyer portal launched', 'Month 12'],
              ['SaaS', 'Enterprise product launch', 'Year 2'],
            ].map(([target, label, period]) => (
              <div key={label} className="market-card border border-border bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                <div className="font-serif text-5xl font-bold leading-none text-accent">{target}</div>
                <div className="mt-5 text-sm font-semibold text-primary">{label}</div>
                <div className="mt-2 text-xs text-muted-foreground">{period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Roadmap</div>
            <h2 className="font-serif text-2xl font-bold text-white">Be Part of the Journey</h2>
            <p className="mt-1 text-sm text-white/70">Join Truvex as a buyer or supplier early and grow with India's focused B2B sourcing platform.</p>
          </div>
          <Link to="/contact" className="market-button bg-accent px-5 py-3 text-sm font-bold text-white">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}
