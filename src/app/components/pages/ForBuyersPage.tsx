import { HeroSection } from '../HeroSection';
import { Link } from 'react-router';
import { Zap, Target, ShieldCheck, X, Quote, TrendingDown, Clock, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../AnimationUtils';

const problems = [
  { title: 'Wasted Hours Searching', desc: 'Buyers waste hours searching directories — Truvex does the search and delivers a curated shortlist instantly.' },
  { title: 'Unverified Suppliers', desc: 'Too many unverified leads on open platforms — Truvex filters and qualifies every supplier before connecting.' },
  { title: 'No Pricing Transparency', desc: 'Getting quotes with no standard format — Truvex prepares structured proposals with clear itemised pricing.' },
  { title: 'No Procurement Team', desc: "Small businesses can't afford procurement staff — Truvex acts as your on-demand sourcing partner at low cost." },
];

const benefits = [
  { icon: Zap, title: 'Fast Response', bgClass: 'bg-accent', iconColor: 'text-accent', gradient: 'from-accent/20 to-accent/5', desc: 'Hours, not days' },
  { icon: Target, title: 'Tailored Proposals', bgClass: 'bg-teal-500', iconColor: 'text-teal-500', gradient: 'from-teal-500/20 to-teal-500/5', desc: 'Exact specification, not catalogue' },
  { icon: ShieldCheck, title: 'Verified Suppliers Only', bgClass: 'bg-primary', iconColor: 'text-primary', gradient: 'from-primary/20 to-primary/5', desc: 'Pre-qualified network' },
];

const trustBadges = [
  { label: '500+ Verified Suppliers', color: 'text-teal-600 bg-teal-50 border-teal-200' },
  { label: 'Zero Cost for Buyers', color: 'text-accent bg-amber-50 border-amber-200' },
  { label: 'Pan-India Coverage', color: 'text-primary bg-blue-50 border-blue-200' },
  { label: '48hr Response SLA', color: 'text-teal-600 bg-teal-50 border-teal-200' },
];

const successStories = [
  { quote: "Truvex delivered a shortlist of 3 verified manufacturers within 48 hours. We saved weeks of searching and negotiation.", author: "Rajesh Kumar", role: "Procurement Manager, TechBuild Inc." },
  { quote: "The transparency in pricing and the pre-qualified supplier network gave us the confidence to scale our operations.", author: "Priya Desai", role: "Director of Operations, Global Supply Co." },
];

export default function ForBuyersPage() {
  const [spend, setSpend] = useState(100000);
  const hoursSaved = Math.round(spend / 10000 * 4);
  const costSaved = Math.round(spend * 0.12);

  return (
    <div className="bg-background min-h-screen">
      <HeroSection
        badge="For Buyers"
        badgeColor="gold"
        headline="Sourcing Made Effortless"
        subtext="Stop spending hours searching directories. Let Truvex do the work and deliver a curated shortlist to your inbox."
        patternId="geo-buyers"
      />

      {/* Trust Badges */}
      <section className="bg-card border-b border-border py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-3">
          {trustBadges.map((badge, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`text-sm font-semibold px-4 py-2 rounded-full border ${badge.color}`}
            >
              ✓ {badge.label}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="bg-background py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <div className="inline-block bg-accent/10 text-primary px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-4">ROI Calculator</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">See What You Could Save</h2>
            <p className="text-muted-foreground">Adjust your monthly sourcing spend to see estimated savings.</p>
          </FadeIn>

          <FadeIn delay={0.1} className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="font-semibold text-foreground">Monthly Sourcing Spend</label>
                <span className="text-2xl font-extrabold text-accent">₹{spend.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={10000}
                max={1000000}
                step={10000}
                value={spend}
                onChange={e => setSpend(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 rounded-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>₹10K</span><span>₹10L</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Clock, label: 'Hours Saved/Month', value: `${hoursSaved} hrs`, color: 'text-teal-600', bg: 'bg-teal-50' },
                { icon: IndianRupee, label: 'Estimated Cost Savings', value: `₹${costSaved.toLocaleString('en-IN')}`, color: 'text-accent', bg: 'bg-amber-50' },
                { icon: TrendingDown, label: 'Avg. Price Reduction', value: '8–15%', color: 'text-primary', bg: 'bg-primary/10' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className={`${stat.bg} rounded-2xl p-6 text-center`}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className={`text-2xl font-extrabold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="bg-muted py-24 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="inline-block bg-destructive/10 text-destructive px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6">Problems We Solve</div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {problems.map((p) => (
              <StaggerItem key={p.title} className="bg-card/80 backdrop-blur-lg border border-border rounded-2xl p-8 flex gap-6 items-start transition-all duration-300 hover:border-destructive hover:shadow-lg hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center shrink-0 group-hover:bg-destructive group-hover:border-destructive transition-all duration-300 group-hover:rotate-12">
                  <X className="w-6 h-6 text-destructive group-hover:text-white transition-colors duration-300" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-primary font-bold text-xl mb-3">{p.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Buyer Benefits */}
      <section className="bg-background py-24 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="inline-block bg-accent/10 text-primary px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6">Buyer Benefits</div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <StaggerItem key={b.title} className="relative h-full bg-card/60 backdrop-blur-xl rounded-3xl p-10 border border-border/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group">
                <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${b.bgClass} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-border/50 bg-background group-hover:scale-110 transition-transform duration-500">
                    <b.icon className={`w-8 h-8 ${b.iconColor}`} />
                  </div>
                  <h3 className="text-primary font-bold text-2xl mb-4">{b.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{b.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-muted/50 py-24 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6">Success Stories</div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mt-2 mb-6">Trusted by Buyers</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <StaggerItem key={index} className="bg-card/80 backdrop-blur-lg border border-border rounded-3xl p-10 relative group shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col">
                <Quote className="w-12 h-12 text-accent/20 absolute top-8 right-8 group-hover:text-accent/40 transition-colors" />
                <p className="text-xl text-primary font-medium leading-relaxed mb-8 relative z-10 flex-grow">"{story.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">{story.author.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-primary">{story.author}</h4>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[50%] h-[150%] bg-accent/20 rotate-12 blur-[100px] rounded-full mix-blend-screen transform -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-[50%] h-[150%] bg-teal-500/20 -rotate-12 blur-[100px] rounded-full mix-blend-screen transform translate-y-1/2"></div>
        </div>
        <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
          <FadeIn>
            <Link to="/contact" className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-primary-foreground px-12 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Post Your Requirement
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
