import { useState } from 'react';
import { HeroSection } from '../HeroSection';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    icon: '💰',
    title: 'Supplier Commission',
    badge: 'Charged to Supplier',
    badgeColor: 'bg-secondary',
    desc: 'We earn a percentage of every successful order value. Suppliers only pay when deals actually close — performance-aligned pricing with zero upfront risk.',
  },
  {
    icon: '📊',
    title: 'Buyer Consultation Fee',
    badge: 'Charged to Buyer',
    badgeColor: 'bg-accent',
    desc: 'Optional fee for detailed sourcing reports, multi-vendor comparisons, and expert recommendations for complex procurement needs.',
  },
  {
    icon: '📅',
    title: 'Platform Subscription',
    badge: 'Charged to Supplier',
    badgeColor: 'bg-secondary',
    desc: 'Monthly listing for suppliers to receive priority lead access, early notifications, and preferred placement in buyer proposals.',
  },
  {
    icon: '📝',
    title: 'Proposal Services',
    badge: 'Buyer / Supplier',
    badgeColor: 'bg-primary',
    desc: 'Paid service for preparing detailed technical or commercial proposals with spec sheets, pricing matrices, and compliance documentation.',
  },
];

const tableRows = [
  { stream: 'Supplier Commission', desc: 'Earn % on every closed deal', chargedTo: 'Supplier', color: 'bg-secondary' },
  { stream: 'Buyer Consultation', desc: 'Detailed sourcing & comparison reports', chargedTo: 'Buyer', color: 'bg-accent' },
  { stream: 'Platform Subscription', desc: 'Priority lead access, monthly plan', chargedTo: 'Supplier', color: 'bg-secondary' },
  { stream: 'Proposal Services', desc: 'Custom proposals with specs & pricing', chargedTo: 'Both', color: 'bg-primary' },
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

function PricingSection() {
  const [activeTab, setActiveTab] = useState<'supplier' | 'buyer'>('supplier');

  const plans = {
    supplier: [
      {
        name: 'Pay-Per-Deal',
        price: 'Commission',
        period: '',
        description: 'Zero upfront cost. We only earn when you close a deal.',
        features: ['Access to basic RFQs', 'Standard email support', 'Pay % only on closed deals', 'Standard profile listing'],
        isPopular: false,
        buttonText: 'Start for Free'
      },
      {
        name: 'Platform Subscription',
        price: '$199',
        period: '/month',
        description: 'Monthly listing for priority lead access and visibility.',
        features: ['Priority lead access', 'Early RFQ notifications', 'Preferred placement in proposals', 'Dedicated account manager'],
        isPopular: true,
        buttonText: 'Subscribe Now'
      }
    ],
    buyer: [
      {
        name: 'Self-Service Sourcing',
        price: 'Free',
        period: '',
        description: 'Post RFQs and connect directly with our supplier network.',
        features: ['Post unlimited RFQs', 'Basic supplier matching', 'Access to supplier directory', 'Platform messaging'],
        isPopular: false,
        buttonText: 'Post an RFQ'
      },
      {
        name: 'Managed Procurement',
        price: 'Consultation',
        period: ' Fee',
        description: 'Expert recommendations and full-service procurement.',
        features: ['Detailed sourcing reports', 'Multi-vendor comparisons', 'Proposal preparation', 'End-to-end negotiation'],
        isPopular: true,
        buttonText: 'Consult an Expert'
      }
    ]
  };

  return (
    <section className="py-24 px-6 relative z-10 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-primary text-4xl font-bold mb-6"
          >
            Flexible Pricing Options
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto mb-10"
          >
            Choose the model that best aligns with your business goals. Transparent fees, zero hidden costs.
          </motion.p>
          
          {/* Animated Toggle */}
          <div className="flex justify-center mb-4">
            <div className="relative flex p-1.5 bg-slate-200/50 backdrop-blur-sm rounded-full border border-slate-200 shadow-inner">
              {(['supplier', 'buyer'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-8 py-3 text-sm font-bold rounded-full transition-colors duration-300 ${
                    activeTab === tab ? 'text-white' : 'text-slate-600 hover:text-primary'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="pricingTabBubble"
                      className="absolute inset-0 bg-primary rounded-full shadow-md"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 capitalize">For {tab}s</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Comparison Cards */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {plans[activeTab].map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className={`relative bg-white/70 backdrop-blur-xl border rounded-3xl p-8 md:p-10 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    plan.isPopular 
                      ? 'border-accent/40 shadow-xl shadow-accent/5 ring-1 ring-accent/10' 
                      : 'border-white shadow-lg shadow-black/5'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-accent/80 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg shadow-accent/20">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-primary mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-black text-primary">{plan.price}</span>
                    <span className="text-slate-500 font-medium">{plan.period}</span>
                  </div>
                  <p className="text-slate-600 mb-8 h-12">{plan.description}</p>
                  
                  <div className="flex-grow space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                    plan.isPopular 
                      ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20' 
                      : 'bg-primary/5 text-primary hover:bg-primary/10'
                  }`}>
                    {plan.buttonText}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PricingPhilosophySection() {
  return (
    <section className="py-24 px-6 relative z-10 bg-slate-50/50">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-primary text-4xl font-bold mb-6">Our Pricing Philosophy</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-16 max-w-3xl mx-auto">
            At Truvex, we believe in transparent, performance-aligned pricing. We don't believe in hidden fees or complex structures that confuse our partners. Our success is directly tied to yours.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🎯',
              title: 'Performance First',
              desc: 'We win when you win. Our core revenue is tied directly to successful transactions.',
            },
            {
              icon: '🔍',
              title: 'Complete Transparency',
              desc: 'Clear fee structures upfront. No surprises or hidden costs in any of our agreements.',
            },
            {
              icon: '🤝',
              title: 'Shared Risk',
              desc: 'Low entry barriers ensure you can experience our value before committing heavily.',
            },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.2 }}
              className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {item.icon}
              </div>
              <h4 className="font-bold text-primary mb-3 text-xl">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <HeroSection
        badge="Revenue Streams"
        headline="Our Services"
        subtext="Multiple value streams keep Truvex lean, scalable, and aligned with both buyer and supplier success."
        patternId="geo-services"
      />

      {/* Service Cards */}
      <section className="py-24 px-6 relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={cardVariants}
                className="group relative bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-10 transition-all duration-500 hover:bg-white hover:border-accent/30 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 overflow-hidden"
              >
                {/* Decorative gradient blob */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-14 h-14 bg-white shadow-sm rounded-xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {s.icon}
                  </div>
                  <span className={`${s.badgeColor} text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm`}>
                    {s.badge}
                  </span>
                </div>
                <h3 className="font-playfair text-primary text-2xl font-bold mb-4 relative z-10">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed relative z-10">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <PricingSection />

      {/* Pricing Philosophy Section */}
      <PricingPhilosophySection />

      {/* Summary Table */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-primary text-4xl font-bold mb-4">
              Revenue Summary
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">A transparent breakdown of how each service stream operates within our ecosystem.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-lg border border-slate-200/60 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/40"
          >
            {/* Header */}
            <div className="grid grid-cols-[1.5fr_2fr_1fr] bg-primary/5 border-b border-primary/10 p-5 px-8 gap-6">
              {['Stream', 'Description', 'Charged To'].map((h) => (
                <span key={h} className="text-primary text-sm font-bold uppercase tracking-wider">
                  {h}
                </span>
              ))}
            </div>
            <div className="divide-y divide-slate-100">
              {tableRows.map((row) => (
                <div
                  key={row.stream}
                  className="grid grid-cols-[1.5fr_2fr_1fr] p-5 px-8 gap-6 items-center transition-colors duration-300 hover:bg-primary/[0.02]"
                >
                  <span className="text-primary text-base font-bold">{row.stream}</span>
                  <span className="text-slate-600 text-base leading-snug">{row.desc}</span>
                  <span
                    className={`${row.color} text-white px-4 py-1.5 rounded-full text-xs font-bold inline-block text-center justify-self-start shadow-sm`}
                  >
                    {row.chargedTo}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 overflow-hidden bg-primary mt-12">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl translate-x-[-20%] translate-y-[-20%] animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl translate-x-[20%] translate-y-[20%] animate-blob animation-delay-2000" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto text-center z-10"
        >
          <h2 className="font-playfair text-white text-4xl md:text-5xl font-bold mb-6">
            Start With Truvex Today
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you're a buyer seeking products or a supplier looking for real leads — Truvex has a plan for you.
          </p>
          <Link
            to="/contact"
            className="group relative inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:shadow-[0_0_30px] hover:shadow-accent/40 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get in Touch 
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
