import { Link } from 'react-router';
import { ShieldCheck, Target, Zap, FileText, Handshake, TrendingUp, Search, Quote, Star, ArrowRight, UserCheck, BarChart3, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { RFQModal } from '../RFQModal';
import { ParticleBackground } from '../ParticleBackground';
import { AnimatedCounter } from '../AnimatedCounter';
import { ScrollReveal } from '../ScrollReveal';
import { FadeIn, StaggerContainer, StaggerItem } from '../AnimationUtils';
export default function HomePage() {
  return (
    <div className="w-full bg-background min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-[#0B1F3A] text-white py-28 px-4 relative overflow-hidden">
        {/* Subtle geometric circle pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,#ffffff_1px,_transparent_0)] bg-[length:32px_32px]"></div>
        <ParticleBackground />
        
        {/* Premium radial glowing gradients */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8 backdrop-blur-sm shadow-sm"
          >
            <ShieldCheck size={16} className="text-accent" />
            Smart Sourcing. Right Products. Right Leads.
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Right Product. Right Supplier. <span className="text-accent">Fast.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          >
            Truvex bridges buyers and verified suppliers across India — capturing real-time enquiries from Justdial & IndiaMart and turning them into tailored proposals.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <RFQModal trigger={
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,151,58,0.3)] active:scale-95 w-full sm:w-auto shadow-lg shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                Get a Quote
              </button>
            } />
            <Link to="/how-it-works" className="border-2 border-white/20 hover:border-white/50 hover:bg-white/5 text-white px-8 py-4 rounded-full font-bold text-lg transition-all w-full sm:w-auto text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2">
              How It Works
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="glass-panel py-12 px-4 border-b border-border/40 shadow-sm relative z-20 transition-colors duration-300">
        <StaggerContainer className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:divide-x divide-border/30">
          <StaggerItem className="flex flex-col items-center justify-center px-4 group">
            <AnimatedCounter value={2} className="text-4xl font-extrabold text-foreground mb-1 group-hover:text-accent transition-colors duration-300" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors duration-300">Lead Platforms</span>
          </StaggerItem>
          <StaggerItem className="flex flex-col items-center justify-center px-4 group">
            <AnimatedCounter value={8} suffix="+" className="text-4xl font-extrabold text-foreground mb-1 group-hover:text-accent transition-colors duration-300" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors duration-300">Categories</span>
          </StaggerItem>
          <StaggerItem className="flex flex-col items-center justify-center px-4 group">
            <AnimatedCounter value={3} className="text-4xl font-extrabold text-foreground mb-1 group-hover:text-accent transition-colors duration-300" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors duration-300">Simple Steps</span>
          </StaggerItem>
          <StaggerItem className="flex flex-col items-center justify-center px-4 group">
            <AnimatedCounter value={100} suffix="%" className="text-4xl font-extrabold text-foreground mb-1 group-hover:text-accent transition-colors duration-300" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors duration-300">B2B Focused</span>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* 4-Feature Cards Row */}
      <section className="py-24 px-4 bg-muted/20 border-b border-border/20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">How Truvex Accelerates Your Sourcing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-light">From raw leads to signed deals, our platform optimizes every step of the B2B matchmaking process.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-8 group h-full gold-glow-hover">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">Lead Capture</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  Automatically aggregate high-intent requirements from premium platforms.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 2 */}
            <ScrollReveal delay={0.2}>
              <div className="glass-card p-8 group h-full gold-glow-hover">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">Smart Analysis</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  Instantly match buyer needs with the right supplier capabilities and pricing.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 3 */}
            <ScrollReveal delay={0.3}>
              <div className="glass-card p-8 group h-full gold-glow-hover">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">Professional Proposals</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  Generate tailored, branded quotations that stand out to buyers.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 4 */}
            <ScrollReveal delay={0.4}>
              <div className="glass-card p-8 group h-full gold-glow-hover">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  <Handshake size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">Deal Closure</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  Streamline communication and negotiation for faster conversions.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Platform Badges Section */}
      <section className="py-20 px-4 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-12 uppercase tracking-widest text-primary/80">Powered by India's Top Platforms</h2>
          </ScrollReveal>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
            <ScrollReveal delay={0.1} className="flex flex-col items-center group cursor-default">
              <div className="w-24 h-24 bg-card shadow-sm border border-border rounded-full flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-accent/50 group-hover:shadow-lg transition-all duration-300">
                <Search size={40} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Justdial</h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">Direct API integration for localized B2B service and product enquiries.</p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="hidden sm:block">
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3} className="flex flex-col items-center group cursor-default">
              <div className="w-24 h-24 bg-card shadow-sm border border-border rounded-full flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-accent/50 group-hover:shadow-lg transition-all duration-300">
                <TrendingUp size={40} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">IndiaMart</h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">Real-time webhook sync for high-volume wholesale requirement leads.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-24 px-4 bg-muted/20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Process Preview</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Our streamlined workflow ensures you never miss a verified lead.</p>
            </div>
          </FadeIn>
          
          <StaggerContainer className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 lg:gap-8">
            <StaggerItem className="flex-1 w-full max-w-xs">
              <div className="glass-card p-8 text-center group gold-glow-hover">
                <div className="w-20 h-20 mx-auto bg-accent/5 dark:bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300">
                  <UserCheck size={32} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">1. Connect</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">Integrate your Justdial & IndiaMart accounts seamlessly.</p>
              </div>
            </StaggerItem>

            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              className="hidden md:block text-muted-foreground/30"
            >
              <ArrowRight size={32} className="text-accent/50" />
            </motion.div>

            <StaggerItem className="flex-1 w-full max-w-xs">
              <div className="glass-card p-8 text-center group gold-glow-hover">
                <div className="w-20 h-20 mx-auto bg-accent/5 dark:bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300">
                  <BarChart3 size={32} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">2. Analyze</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">AI filters & matches the absolute best leads for your niche.</p>
              </div>
            </StaggerItem>

            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              className="hidden md:block text-muted-foreground/30"
            >
              <ArrowRight size={32} className="text-accent/50" />
            </motion.div>

            <StaggerItem className="flex-1 w-full max-w-xs">
              <div className="glass-card p-8 text-center group gold-glow-hover">
                <div className="w-20 h-20 mx-auto bg-accent/5 dark:bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300">
                  <CheckCircle2 size={32} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">3. Convert</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">Send auto-proposals and close deals significantly faster.</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-background border-t border-border/40 relative transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(201,151,58,0.04)_0%,_transparent_70%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Trusted by Industry Leaders</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-light">See how businesses are scaling their B2B sales with Truvex.</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="glass-card p-8 flex flex-col relative h-full group gold-glow-hover">
                <Quote className="absolute top-6 right-6 text-accent/5 w-12 h-12 group-hover:text-accent/20 transition-colors duration-300" />
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="fill-accent text-accent" />)}
                </div>
                <p className="text-foreground/90 italic mb-8 leading-relaxed font-light">"Truvex cut our lead response time by 80%. We're closing 3x more deals from IndiaMart now since we can send customized proposals instantly."</p>
                <div className="flex items-center gap-4 mt-auto border-t border-border/40 pt-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold shrink-0 shadow-inner">AS</div>
                  <div>
                    <h4 className="font-bold text-foreground">Amit Sharma</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5 font-semibold">Director, TechNova Solutions</p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="glass-card p-8 flex flex-col relative h-full group gold-glow-hover">
                <Quote className="absolute top-6 right-6 text-accent/5 w-12 h-12 group-hover:text-accent/20 transition-colors duration-300" />
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="fill-accent text-accent" />)}
                </div>
                <p className="text-foreground/90 italic mb-8 leading-relaxed font-light">"The unified dashboard is a game-changer. Tracking our Justdial enquiries in the same place with detailed buyer intents has scaled our wholesale operations seamlessly."</p>
                <div className="flex items-center gap-4 mt-auto border-t border-border/40 pt-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 font-bold shrink-0 shadow-inner">PR</div>
                  <div>
                    <h4 className="font-bold text-foreground">Priya Reddy</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5 font-semibold">Operations Head, GlobalTrade</p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="glass-card p-8 flex flex-col relative h-full group gold-glow-hover">
                <Quote className="absolute top-6 right-6 text-accent/5 w-12 h-12 group-hover:text-accent/20 transition-colors duration-300" />
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="fill-accent text-accent" />)}
                </div>
                <p className="text-foreground/90 italic mb-8 leading-relaxed font-light">"We love the seamless quotation builder. Being able to fire off a branded, accurate proposal in seconds from a raw lead gives us a massive edge over competitors."</p>
                <div className="flex items-center gap-4 mt-auto border-t border-border/40 pt-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 font-bold shrink-0 shadow-inner">MK</div>
                  <div>
                    <h4 className="font-bold text-foreground">Manish Kumar</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5 font-semibold">CEO, Apex Industrial</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-24 px-4 bg-[#0B1F3A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,#ffffff_1px,_transparent_0)] bg-[length:32px_32px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,151,58,0.08)_0%,transparent_80%)] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to streamline your sourcing?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Stop chasing unqualified leads. Let Truvex bring verified buyers straight to your inbox.
            </p>
            <RFQModal trigger={
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 rounded-full text-lg font-bold transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,151,58,0.4)] inline-block shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                Start Sourcing Today
              </button>
            } />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}


