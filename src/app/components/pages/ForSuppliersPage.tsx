import { HeroSection } from '../HeroSection';
import { Link } from 'react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../AnimationUtils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const whyJoin = [
  {
    icon: '✅',
    title: 'Verified Buyers',
    desc: 'Every buyer passes our qualification process. No spam, no tyre-kickers — only genuine purchase intent.',
  },
  {
    icon: '📈',
    title: 'Higher Conversion',
    desc: 'Pre-qualified leads convert 3–5x better than cold enquiries from open platforms.',
  },
  {
    icon: '🌍',
    title: 'Pan-India Reach',
    desc: 'Access buyers from across India — Tier-1 metros and Tier-2/3 cities — through our multi-platform presence.',
  },
  {
    icon: '💼',
    title: 'Professional Proposals',
    desc: 'Truvex handles proposal creation and buyer communication — freeing your sales team to close, not pitch.',
  },
];

const supplierOptions = [
  { option: 'Commission Model', gets: 'Pay only on deal closure', cost: '% of order value', bgClass: 'bg-teal-700', textClass: 'text-white' },
  { option: 'Monthly Subscription', gets: 'Priority lead access', cost: 'Fixed monthly fee', bgClass: 'bg-accent', textClass: 'text-accent-foreground' },
  { option: 'Proposal Service', gets: 'Truvex creates proposals', cost: 'Per proposal', bgClass: 'bg-primary', textClass: 'text-primary-foreground' },
];

const stats = [
  { value: '3–5×', label: 'Better lead conversion vs open platforms', colorClass: 'text-teal-700' },
  { value: '₹0', label: 'Upfront cost on commission model', colorClass: 'text-accent' },
  { value: 'Pan-India', label: 'Buyer network coverage', colorClass: 'text-primary' },
];

const supplierFaqs = [
  {
    question: 'How do you verify buyers?',
    answer: 'Every buyer undergoes a strict qualification process where we verify their business registration, purchase history, and current requirement validity before passing the lead to you.',
  },
  {
    question: 'What is the commission percentage?',
    answer: 'Our standard commission ranges from 2% to 5% depending on the industry, order volume, and your chosen supplier tier. There are no hidden charges.',
  },
  {
    question: 'Do I have to pay anything upfront?',
    answer: 'No. On our standard Commission Model, you only pay a success fee when the deal is successfully closed and you receive payment from the buyer.',
  },
  {
    question: 'Can I switch from Commission to a Monthly Subscription?',
    answer: 'Absolutely. You can upgrade to a Monthly Subscription at any time to receive priority access to leads and waive off per-deal commissions.',
  },
];

export default function ForSuppliersPage() {
  const [revenue, setRevenue] = useState(500000);
  const estimatedLeads = Math.round(revenue / 50000 * 3);
  const potentialEarnings = Math.round(revenue * 0.08);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        badge="For Suppliers"
        badgeColor="teal"
        headline="Connect With Real Buyers"
        subtext="Stop chasing spam enquiries. Truvex delivers only verified, intent-strong buyers to your business."
        patternId="geo-suppliers"
      />

      {/* Earnings Estimator */}
      <section className="bg-background py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <div className="inline-block bg-teal-700/10 text-teal-700 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-4">Earnings Estimator</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">See Your Potential with Truvex</h2>
            <p className="text-muted-foreground">Adjust your current monthly revenue to estimate what Truvex can add.</p>
          </FadeIn>

          <FadeIn delay={0.1} className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="font-semibold text-foreground">Current Monthly Revenue</label>
                <span className="text-2xl font-extrabold text-teal-700">₹{revenue.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range" min={50000} max={5000000} step={50000} value={revenue}
                onChange={e => setRevenue(Number(e.target.value))}
                className="w-full h-2 rounded-full accent-teal-600"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>₹50K</span><span>₹50L</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Estimated Qualified Leads/Month', value: `${estimatedLeads}–${estimatedLeads + 5}`, color: 'text-teal-700', bg: 'bg-teal-50' },
                { label: 'Potential Additional Revenue', value: `₹${potentialEarnings.toLocaleString('en-IN')}`, color: 'text-accent', bg: 'bg-amber-50' },
              ].map((stat, i) => (
                <motion.div key={i} className={`${stat.bg} rounded-2xl p-6 text-center`} animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 0.3 }}>
                  <div className={`text-3xl font-extrabold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Join */}
      <section className="relative bg-muted/30 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="inline-block bg-teal-700/10 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Why Join Truvex</div>
            <h2 className="font-serif text-primary text-4xl md:text-5xl font-bold">Built for Serious Suppliers</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyJoin.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-8 flex gap-6 items-start transition-all duration-500 hover:border-teal-700/30 hover:shadow-2xl hover:shadow-teal-700/5 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 bg-teal-700/10 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 group-hover:bg-teal-700/20 transition-all duration-300 shadow-inner">
                  {item.icon}
                </div>
                <div className="relative z-10">
                  <h3 className="text-primary font-bold text-lg mb-3 group-hover:text-teal-700 transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Supplier Options Table */}
      <section className="bg-background py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-primary text-4xl md:text-5xl font-bold mb-4">
              Supplier Options
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Choose the engagement model that works best for your business.
            </p>
          </div>

          <div className="border border-border/60 rounded-2xl overflow-hidden shadow-lg bg-card/50 backdrop-blur-sm">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr_1.5fr] bg-primary/5 border-b border-border/60 p-5 md:px-8 gap-4 hidden md:grid">
              {['Option', 'What You Get', 'Cost Basis'].map((h) => (
                <span key={h} className="text-primary/70 text-xs font-bold uppercase tracking-widest">
                  {h}
                </span>
              ))}
            </div>
            
            <div className="divide-y divide-border/60">
              {supplierOptions.map((row) => (
                <div
                  key={row.option}
                  className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr_1.5fr] p-6 md:px-8 gap-4 md:items-center transition-all duration-300 hover:bg-muted/40 group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-125 ${row.bgClass}`} />
                    <span className="text-primary text-base font-semibold">{row.option}</span>
                  </div>
                  
                  <div className="flex flex-col md:block">
                    <span className="md:hidden text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">What You Get</span>
                    <span className="text-muted-foreground text-sm">{row.gets}</span>
                  </div>
                  
                  <div className="flex flex-col md:block items-start mt-2 md:mt-0">
                    <span className="md:hidden text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Cost Basis</span>
                    <span className={`${row.bgClass} ${row.textClass} px-4 py-1.5 rounded-full text-xs font-bold inline-block shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5`}>
                      {row.cost}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-muted/50 py-20 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label} className="bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-10 shadow-sm hover:shadow-xl hover:border-border transition-all duration-500 hover:-translate-y-2 group">
                <div className={`font-serif ${s.colorClass} text-5xl md:text-6xl font-bold leading-none mb-6 group-hover:scale-105 transition-transform duration-500`}>
                  {s.value}
                </div>
                <div className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplier FAQs */}
      <section className="bg-background py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-primary text-3xl md:text-4xl font-bold mb-4">
              Supplier FAQs
            </h2>
            <p className="text-muted-foreground">
              Common questions about partnering with Truvex.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {supplierFaqs.map((faq, i) => (
              <AccordionItem value={`item-${i}`} key={i} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl px-6">
                <AccordionTrigger className="text-base font-semibold hover:no-underline hover:text-teal-700 transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
        <div className="absolute -top-[50%] -left-[10%] w-[50%] h-[200%] bg-white/5 rotate-12 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-serif text-primary-foreground text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
            Join as a Verified Supplier
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-light">
            Start receiving qualified buyer leads. No spam, no cold calls — only genuine purchase intent delivered to your inbox.
          </p>
          <Link
            to="/contact"
            className="group relative inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-10 py-5 rounded-xl text-lg font-bold shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative">Join as Supplier</span>
            <svg className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

