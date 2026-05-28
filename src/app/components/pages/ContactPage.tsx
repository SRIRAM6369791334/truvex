"use client";

import { HeroSection } from '../HeroSection';
import { useState } from 'react';
import { motion } from 'framer-motion';

const categories = [
  'Industrial Machinery',
  'Electrical & Electronics',
  'Construction Materials',
  'Packaging Materials',
  'IT & Office Supplies',
  'Automotive Parts',
  'Chemicals & Raw Materials',
  'Agricultural Products',
];

const roles = ['Buyer', 'Supplier', 'Both'];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

function EnquiryForm() {
  const [form, setForm] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    category: '',
    requirement: '',
    role: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-secondary/5 border border-secondary/20 rounded-2xl p-10 text-center backdrop-blur-md shadow-inner"
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="text-5xl mb-6"
        >
          ✅
        </motion.div>
        <h3 className="font-serif text-primary text-3xl font-bold mb-3">
          Enquiry Received!
        </h3>
        <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-md mx-auto">
          Thank you for reaching out. Our team will review your requirement and respond within a few hours with a tailored proposal.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: '', business: '', phone: '', email: '', category: '', requirement: '', role: '' });
          }}
          className="bg-transparent border-2 border-secondary text-secondary px-8 py-3 rounded-xl cursor-pointer text-sm font-semibold font-sans hover:bg-secondary hover:text-white transition-all duration-300"
        >
          Submit Another Enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 relative"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-primary ml-1">Full Name <span className="text-accent">*</span></label>
          <input
            name="name"
            id="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-primary outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 hover:border-gray-300"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <label htmlFor="business" className="text-sm font-semibold text-primary ml-1">Business Name <span className="text-accent">*</span></label>
          <input
            name="business"
            id="business"
            type="text"
            required
            value={form.business}
            onChange={handleChange}
            placeholder="Acme Corp"
            className="w-full rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-primary outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 hover:border-gray-300"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-semibold text-primary ml-1">
            Phone Number <span className="text-accent">*</span> <span className="text-gray-400 font-normal">(+91 XXXXX XXXXX)</span>
          </label>
          <input
            name="phone"
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-primary outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 hover:border-gray-300"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-primary ml-1">Email Address</label>
          <input
            name="email"
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-primary outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 hover:border-gray-300"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-sm font-semibold text-primary ml-1">Product Category <span className="text-accent">*</span></label>
          <div className="relative">
            <select
              name="category"
              id="category"
              required
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-primary outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 hover:border-gray-300 appearance-none cursor-pointer"
            >
              <option value="" disabled hidden>Select a vertical</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <label htmlFor="role" className="text-sm font-semibold text-primary ml-1">I am a...</label>
          <div className="relative">
            <select
              name="role"
              id="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-primary outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 hover:border-gray-300 appearance-none cursor-pointer"
            >
              <option value="" disabled hidden>Select your role</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
        <label htmlFor="requirement" className="text-sm font-semibold text-primary ml-1">Your Requirement <span className="text-accent">*</span></label>
        <textarea
          name="requirement"
          id="requirement"
          required
          value={form.requirement}
          onChange={handleChange}
          rows={5}
          placeholder="Please describe what you are looking for..."
          className="w-full rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-primary outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 hover:border-gray-300 resize-y"
        />
      </motion.div>

      <motion.button
        variants={itemVariants}
        type="submit"
        className="w-full mt-2 bg-accent text-white py-4 px-6 rounded-xl text-lg font-bold font-sans shadow-[0_4px_20px_rgba(201,151,58,0.3)] transition-all duration-300 hover:brightness-105 hover:shadow-[0_8px_25px_rgba(201,151,58,0.4)] hover:-translate-y-1 active:translate-y-0"
      >
        Submit Enquiry →
      </motion.button>
    </motion.form>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50 overflow-hidden">
      <HeroSection
        badge="Get In Touch"
        headline="Start Sourcing Today"
        subtext="Tell us what you need — our team will respond within hours with a tailored proposal."
        patternId="geo-contact"
      />

      <section className="py-24 px-4 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: Form */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-gray-200/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[80px] -z-10 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] -z-10 transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
                
                <div className="mb-8">
                  <h2 className="font-serif text-primary text-3xl md:text-4xl font-bold mb-3">
                    Submit Your Enquiry
                  </h2>
                  <p className="text-gray-500 text-base md:text-lg">
                    Fill in the details below and our sourcing team will prepare a tailored response.
                  </p>
                </div>

                <EnquiryForm />
              </div>
            </div>

            {/* RIGHT COLUMN: Trust Signals + Find Us On */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8 sticky top-32">
              
              {/* Trust Points */}
              <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
                <h3 className="font-serif text-primary text-2xl font-bold mb-8">
                  Why Enquire With Truvex?
                </h3>
                
                <div className="flex flex-col gap-6">
                  {[
                    { icon: '⚡', title: 'Hours Not Days', desc: 'Response within hours', colorClass: 'bg-accent/10 text-accent border-accent/20' },
                    { icon: '🎯', title: 'Zero Cost to Enquire', desc: 'Free for buyers', colorClass: 'bg-secondary/10 text-secondary border-secondary/20' },
                    { icon: '🔒', title: 'Confidential', desc: 'Requirements kept strictly private', colorClass: 'bg-primary/10 text-primary border-primary/20' },
                  ].map((t) => (
                    <div key={t.title} className="flex gap-5 items-start group">
                      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm ${t.colorClass}`}>
                        {t.icon}
                      </div>
                      <div className="pt-1">
                        <p className="text-primary text-base font-bold mb-1">{t.title}</p>
                        <p className="text-gray-500 text-sm">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial snippet */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mt-8 border border-gray-200 relative">
                  <div className="absolute top-4 left-4 text-4xl text-gray-300 font-serif leading-none opacity-50">"</div>
                  <p className="text-gray-600 text-sm leading-relaxed italic relative z-10 pl-6 pr-2">
                    Truvex delivered a complete sourcing proposal within 4 hours of our enquiry. Exactly what we needed.
                  </p>
                  <p className="text-primary text-xs font-bold mt-4 pl-6">— Industrial Buyer, Pune</p>
                </div>
              </div>

              {/* Find Us On - Dark Navy Box */}
              <div className="bg-primary rounded-3xl p-8 shadow-2xl shadow-primary/30 relative overflow-hidden group">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150 pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150 pointer-events-none"></div>
                
                <h3 className="text-accent text-sm font-bold mb-6 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-px bg-accent/50"></span>
                  Also Find Us On
                </h3>
                
                <div className="flex flex-col gap-5 relative z-10">
                  {[
                    { platform: 'Justdial', icon: '📞', instruction: 'Search "Truvex" in your city' },
                    { platform: 'IndiaMart', icon: '🏭', instruction: 'Post your buy lead & tag Truvex' },
                  ].map((p) => (
                    <div key={p.platform} className="flex gap-5 items-center p-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:translate-x-1 hover:border-white/20 cursor-default">
                      <span className="text-3xl drop-shadow-md">{p.icon}</span>
                      <div>
                        <p className="text-white text-base font-bold tracking-wide">{p.platform}</p>
                        <p className="text-white/60 text-sm mt-1">{p.instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>

          {/* WHAT HAPPENS NEXT SECTION */}
          <div className="mt-20 md:mt-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h3 className="font-serif text-primary text-3xl md:text-4xl font-bold mb-4">What Happens Next?</h3>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">Our streamlined process ensures you get exactly what you need, quickly and reliably.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'We Review', desc: 'Our experts analyze your requirements instantly to understand your unique sourcing needs.' },
                { step: '02', title: 'We Match', desc: 'We identify the best verified suppliers in our network that perfectly align with your criteria.' },
                { step: '03', title: 'You Transact', desc: 'Receive tailored quotes, finalize terms, and securely close the deal with confidence.' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-200/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-300 group"
                >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full rounded-tr-3xl -z-10 transition-transform duration-500 group-hover:scale-110"></div>
                   <div className="text-6xl font-black text-secondary/5 mb-6 transition-colors duration-300 group-hover:text-secondary/10">{item.step}</div>
                   <h4 className="text-primary text-xl font-bold mb-3">{item.title}</h4>
                   <p className="text-gray-500 text-base leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}


