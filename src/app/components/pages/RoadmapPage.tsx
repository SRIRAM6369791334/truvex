import { HeroSection } from '../HeroSection';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const phases = [
  {
    phase: 'Phase 1',
    period: 'Month 1–2',
    label: 'SETUP',
    colorClass: 'text-accent',
    bgClass: 'bg-accent',
    borderClass: 'border-accent',
    ringClass: 'ring-accent/15',
    hoverBorder: 'hover:border-accent',
    desc: 'Register on Justdial & IndiaMart. Build initial supplier database. Define target product categories and internal SOPs for lead handling and proposal creation.',
    status: 'Foundation',
  },
  {
    phase: 'Phase 2',
    period: 'Month 3–4',
    label: 'LAUNCH',
    colorClass: 'text-accent',
    bgClass: 'bg-accent',
    borderClass: 'border-accent',
    ringClass: 'ring-accent/15',
    hoverBorder: 'hover:border-accent',
    desc: 'Begin active lead capture. Close first 20 deals. Refine proposal templates and buyer communication scripts based on real-market feedback.',
    status: 'Go Live',
  },
  {
    phase: 'Phase 3',
    period: 'Month 5–8',
    label: 'SCALE',
    colorClass: 'text-accent',
    bgClass: 'bg-accent',
    borderClass: 'border-accent',
    ringClass: 'ring-accent/15',
    hoverBorder: 'hover:border-accent',
    desc: 'Expand into additional product categories. Hire 2–3 sourcing executives. Build repeat-buyer relationships and referral pipeline for organic growth.',
    status: 'Growth',
  },
  {
    phase: 'Phase 4',
    period: 'Month 9–12',
    label: 'TECHNOLOGY',
    colorClass: 'text-accent',
    bgClass: 'bg-accent',
    borderClass: 'border-accent',
    ringClass: 'ring-accent/15',
    hoverBorder: 'hover:border-accent',
    desc: 'Build a simple CRM / buyer portal for tracking requirements, proposals, and order status in real time — reducing manual overhead.',
    status: 'Digitise',
  },
  {
    phase: 'Phase 5',
    period: 'Year 2+',
    label: 'EXPANSION',
    colorClass: 'text-teal-700',
    bgClass: 'bg-teal-700',
    borderClass: 'border-teal-700',
    ringClass: 'ring-teal-700/15',
    hoverBorder: 'hover:border-teal-700',
    desc: 'Pan-India operations. Premium supplier subscriptions. Possible SaaS offering for enterprise buyers. International sourcing corridors.',
    status: 'Scale Up',
  },
];

export default function RoadmapPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection
        badge="The Journey Ahead"
        headline="Growth Roadmap"
        subtext="From concept to pan-India operations — a clear five-phase plan for building Truvex into India's leading sourcing platform."
        patternId="geo-roadmap"
      />

      {/* Timeline */}
      <section className="bg-background py-20 px-4 relative">
        <div className="max-w-4xl mx-auto relative">
          {phases.map((phase, i) => (
            <motion.div 
              key={phase.phase} 
              className="flex gap-0 mb-0 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              {/* Left Date Column */}
              <div className="hidden md:flex w-[140px] shrink-0 text-right pr-6 pt-1 flex-col items-end">
                <span className="text-primary text-sm font-bold group-hover:text-accent transition-colors">{phase.phase}</span>
                <span className="text-muted-foreground text-xs mt-0.5">{phase.period}</span>
              </div>

              {/* Center: Dot + Line */}
              <div className="flex flex-col items-center w-10 shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  className={`w-[18px] h-[18px] rounded-full ${phase.bgClass} border-[3px] ${phase.borderClass} ring-4 ${phase.ringClass} shrink-0 mt-1.5 relative z-10 transition-transform duration-300 group-hover:scale-125`}
                />
                {i < phases.length - 1 && (
                  <motion.div 
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                    className="w-[2px] flex-1 min-h-[40px] bg-muted mt-2 origin-top group-hover:bg-accent/40 transition-colors duration-500" 
                  />
                )}
              </div>

              {/* Right: Content */}
              <div className="flex-1 pl-6 pb-12">
                {/* Mobile date */}
                <div className="md:hidden mb-1.5">
                  <span className="text-primary text-xs font-bold">{phase.phase} &middot; {phase.period}</span>
                </div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className={`bg-card/60 backdrop-blur-md border border-muted/50 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl ${phase.hoverBorder} group-hover:bg-card relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center gap-3 mb-4 flex-wrap relative z-10">
                    <h3 className="font-['Playfair_Display',_serif] text-primary text-xl font-bold">
                      {phase.label}
                    </h3>
                    <span
                      className={`${phase.bgClass} text-white px-3 py-1 rounded-full text-[0.68rem] font-bold uppercase tracking-wider shadow-sm`}
                    >
                      {phase.status}
                    </span>
                    <span className="text-muted-foreground text-xs md:hidden">{phase.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{phase.desc}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Milestone Summary */}
      <section className="bg-card py-20 px-4 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display',_serif] text-primary text-3xl md:text-4xl font-bold">
              Key Milestones
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full opacity-50" />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { target: '20', label: 'First 20 deals closed', period: 'Month 4', colorClass: 'text-accent', borderClass: 'border-accent/20', bgHoverClass: 'hover:bg-accent/5', ringHover: 'hover:ring-accent/30' },
              { target: '2–3', label: 'Sourcing executives hired', period: 'Month 8', colorClass: 'text-teal-700', borderClass: 'border-teal-700/20', bgHoverClass: 'hover:bg-teal-700/5', ringHover: 'hover:ring-teal-700/30' },
              { target: 'CRM', label: 'Buyer portal launched', period: 'Month 12', colorClass: 'text-primary', borderClass: 'border-primary/20', bgHoverClass: 'hover:bg-primary/5', ringHover: 'hover:ring-primary/30' },
              { target: 'SaaS', label: 'Enterprise product launch', period: 'Year 2', colorClass: 'text-teal-700', borderClass: 'border-teal-700/20', bgHoverClass: 'hover:bg-teal-700/5', ringHover: 'hover:ring-teal-700/30' },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`text-center p-8 bg-background/50 backdrop-blur-sm rounded-2xl border ${m.borderClass} transition-all duration-300 hover:shadow-lg ${m.bgHoverClass} ring-1 ring-transparent ${m.ringHover} group relative overflow-hidden`}
              >
                <div className={`font-['Playfair_Display',_serif] ${m.colorClass} text-5xl font-bold leading-none transition-transform duration-500 group-hover:scale-110`}>
                  {m.target}
                </div>
                <div className="text-primary text-sm font-semibold mt-5">{m.label}</div>
                <div className="text-muted-foreground text-xs mt-2">{m.period}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-24 px-4 text-center relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-32 left-1/4 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-[100px]" 
           />
           <motion.div 
             animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute -bottom-32 right-1/4 w-96 h-96 bg-teal-600 rounded-full mix-blend-screen filter blur-[100px]" 
           />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto relative z-10"
        >
          <h2 className="font-['Playfair_Display',_serif] text-white text-4xl font-bold mb-6">
            Be Part of the Journey
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10 font-light">
            Join Truvex as a buyer or supplier early — and grow with India's most focused B2B sourcing platform.
          </p>
          <Link
            to="/contact"
            className="group relative bg-accent text-white px-10 py-4 rounded-xl text-base font-semibold no-underline inline-flex items-center gap-3 overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(201,151,58,0.5)] hover:-translate-y-1"
          >
            <span className="relative z-10">Get in Touch</span> 
            <motion.span 
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &rarr;
            </motion.span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
