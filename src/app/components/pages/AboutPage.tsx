import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import AnimatedIcon from '../AnimatedIcon';

export default function AboutPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0A1A30] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" alt="" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A30] via-[#0A1A30]/80 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 relative z-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-none border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 bg-accent" />
            Our Story
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-white drop-shadow-lg max-w-4xl mx-auto">
            Empowering India's B2B Ecosystem.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Truvex is on a mission to make doing business easy. We connect buyers and sellers across the country, fostering a transparent digital economy.
          </p>
        </div>
      </section>

      {/* 2. WHAT IS TRUVEX? (Overview) */}
      <section className="py-24 bg-white border-b border-border">
        <div className="mx-auto max-w-4xl px-4 text-center">
           <h2 className="text-[11px] font-bold uppercase tracking-widest text-primary/60 mb-4 border-b-2 border-accent inline-block pb-1">About The Platform</h2>
           <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8">India's Fastest-Growing Online B2B Marketplace</h3>
           <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
             Truvex is designed to connect verified manufacturers with bulk buyers, wholesalers, and retailers across the country. We focus on providing a seamless platform to Small & Medium Enterprises (SMEs), Large Enterprises, as well as individual entrepreneurs. By leveraging technology, we bridge the gap between supply and demand, ensuring that finding the right product or partner is never hard.
           </p>
        </div>
      </section>

      {/* 3. MISSION & VISION (Split Layout) */}
      <section className="py-24 bg-[#f4f6f8] border-b border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative">
              <div className="absolute -inset-4 bg-white z-0 transform -skew-y-2 border border-border shadow-sm"></div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800"
                alt="Truvex Team"
                className="relative z-10 w-full h-[500px] object-cover rounded-none border-4 border-white shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 z-20 bg-accent p-8 text-white max-w-xs shadow-xl hidden sm:block">
                <p className="font-serif text-2xl italic leading-snug">
                  "Because doing business should be effortless and transparent."
                </p>
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="mb-16">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-primary/60 mb-2 border-b-2 border-accent inline-block pb-1">Our Mission</h2>
                <h3 className="text-3xl font-serif font-bold text-primary mb-6 mt-4">To make doing business easy</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We saw businesses wasting hours searching directories, getting irrelevant leads, and dealing with unverified suppliers. Our mission is to eliminate this friction by providing a highly vetted, transparent, and ultra-fast sourcing marketplace that empowers every Indian SME.
                </p>
              </div>

              <div>
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-primary/60 mb-2 border-b-2 border-accent inline-block pb-1">Our Vision</h2>
                <h3 className="text-3xl font-serif font-bold text-primary mb-6 mt-4">A Transparent Digital Economy</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A future where any business in India — regardless of size or geographic location — can source any product with absolute confidence, speed, and complete pricing transparency.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MAKING BUSINESS EASY (Buyers vs Suppliers) */}
      <section className="py-24 bg-primary text-white border-b border-primary-foreground/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">How we create value</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">We deliver distinct advantages for both sides of the marketplace.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
             <div className="bg-white/5 border border-white/10 p-10 hover:border-accent transition-colors">
                <h3 className="text-2xl font-bold text-accent mb-6 flex items-center gap-3">
                  <AnimatedIcon icon="target" size={32} /> For Buyers
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl mt-1">✓</span>
                    <span className="text-white/80 leading-relaxed"><strong>Convenience:</strong> Connect with sellers anytime, anywhere.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl mt-1">✓</span>
                    <span className="text-white/80 leading-relaxed"><strong>Wider Marketplace:</strong> Access an extensive range of products and services.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl mt-1">✓</span>
                    <span className="text-white/80 leading-relaxed"><strong>Secure Sourcing:</strong> Deal only with 100% verified and authenticated suppliers.</span>
                  </li>
                </ul>
             </div>

             <div className="bg-white/5 border border-white/10 p-10 hover:border-accent transition-colors">
                <h3 className="text-2xl font-bold text-accent mb-6 flex items-center gap-3">
                  <AnimatedIcon icon="trending" size={32} /> For Suppliers
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl mt-1">✓</span>
                    <span className="text-white/80 leading-relaxed"><strong>Enhanced Visibility:</strong> Reach thousands of bulk buyers daily.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl mt-1">✓</span>
                    <span className="text-white/80 leading-relaxed"><strong>Increased Credibility:</strong> Build trust through our strict verification process.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl mt-1">✓</span>
                    <span className="text-white/80 leading-relaxed"><strong>Lead Management:</strong> Manage RFQs and close deals effortlessly on the platform.</span>
                  </li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* 5. PLATFORM CAPABILITIES & REACH */}
      <section className="py-24 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4">
           <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-primary/60 mb-2 border-b-2 border-accent inline-block pb-1">Our Reach</h2>
                <h3 className="text-3xl font-serif font-bold text-primary mb-6 mt-4">Connecting Tier-1 Hubs to Tier-3 Markets</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our robust technological infrastructure bridges the geographical gap in Indian commerce. We enable a manufacturer in a Tier-1 industrial hub to instantly receive and fulfill bulk requirements from a retailer in a remote Tier-3 city.
                </p>
                <div className="flex items-center gap-4 text-primary font-bold bg-[#f4f6f8] p-4 border border-border">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center border-b-2 border-accent flex-shrink-0">
                    <AnimatedIcon icon="users" size={32} />
                  </div>
                  <span>Smart Matchmaking Algorithm routing leads in real-time.</span>
                </div>
              </div>
              <div className="relative h-[400px]">
                 <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800" className="w-full h-full object-cover rounded-none border border-border" alt="Logistics and Network" />
                 <div className="absolute inset-0 border-8 border-white/20"></div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. CORE PILLARS (Why Choose Us) */}
      <section className="py-24 bg-[#f4f6f8]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">The Truvex Standard</h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '100% Verified Network',
                desc: 'Every supplier undergoes a strict multi-point verification process ensuring you only deal with authentic businesses.',
                iconName: 'shield',
              },
              {
                title: 'End-to-End Transparency',
                desc: 'Clear communication, open pricing models, and honest feedback at every step of your sourcing journey.',
                iconName: 'handshake',
              },
              {
                title: 'Unmatched Speed',
                desc: 'Moving fast to keep your business ahead. Receive multiple quotes and close deals in record time.',
                iconName: 'trending',
              }
            ].map((pillar, idx) => (
              <div key={idx} className="group bg-white p-10 border border-border rounded-none hover:border-accent transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Dark bg icon box — Home Page style */}
                <div className="w-16 h-16 bg-primary flex items-center justify-center mb-8 border-b-4 border-accent group-hover:bg-accent/90 transition-colors duration-300">
                  <AnimatedIcon icon={pillar.iconName as any} size={38} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OUR SCALE (Metrics) */}
      <section className="py-24 bg-[#0A1A30] text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { label: 'Founded', value: '2026' },
              { label: 'Verified SMEs', value: '10K+' },
              { label: 'Product Categories', value: '50+' },
              { label: 'Cities Covered', value: '100+' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center p-6 border border-white/10 bg-white/5">
                <span className="text-4xl md:text-5xl font-bold text-accent mb-3">{stat.value}</span>
                <span className="text-white/70 font-bold uppercase tracking-widest text-[11px]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LEADERSHIP TEAM */}
      <section className="py-24 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Meet Our Leadership</h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">The industry veterans and technical innovators driving the Truvex vision forward.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Sriram', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400' },
              { name: 'Aditi Sharma', role: 'Chief Operations Officer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' },
              { name: 'Rahul Verma', role: 'Head of Product', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400' }
            ].map((leader, i) => (
              <div key={i} className="group relative overflow-hidden border border-border">
                <div className="aspect-[4/5] bg-[#f0f2f5] overflow-hidden relative">
                  <img src={leader.img} alt={leader.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A30]/90 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="p-6 bg-white group-hover:bg-[#0A1A30] transition-colors duration-300">
                  <h3 className="text-lg font-bold text-primary group-hover:text-white transition-colors">{leader.name}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. JOIN US (Dual CTA) */}
      <section className="py-24 bg-[#f4f6f8]">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-12 border border-border rounded-none text-center hover:shadow-2xl transition-shadow duration-500">
              <div className="w-20 h-20 bg-primary mx-auto flex items-center justify-center mb-8 border-b-4 border-accent">
                <AnimatedIcon icon="users" size={44} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">Want to Sell?</h3>
              <p className="text-muted-foreground mb-8">Join thousands of verified suppliers and start receiving authentic business enquiries today.</p>
              <Link to="/suppliers" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-accent transition-colors">
                Register as Supplier <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="bg-[#0A1A30] p-12 border border-[#0A1A30] rounded-none text-center hover:shadow-2xl transition-shadow duration-500">
              <div className="w-20 h-20 bg-white/10 mx-auto flex items-center justify-center mb-8 border-b-4 border-accent">
                <AnimatedIcon icon="target" size={44} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Need to Buy?</h3>
              <p className="text-white/70 mb-8">Post your requirements and get competitive quotes from top-rated manufacturers.</p>
              <Link to="/buyers" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-primary transition-colors">
                Post Requirement <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
