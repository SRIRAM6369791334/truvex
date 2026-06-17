import { useState } from 'react';
import type React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { TrustSignalsBar } from '../MarketplaceComponents';
import AnimatedIcon from '../AnimatedIcon';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-bold uppercase tracking-wider text-primary ml-1">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#f8f9fa] min-h-screen selection:bg-accent/20 font-sans">
      
      {/* 1. HERO SECTION (Industrial Theme) */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0A1A30]">
        <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:32px_32px] -z-10"></div>
        
        <div className="mx-auto max-w-7xl px-4 relative z-10 text-center flex flex-col items-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-none border border-accent/30 bg-accent/10 px-5 py-2 text-[12px] font-bold text-accent uppercase tracking-widest shadow-sm cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-none h-2 w-2 bg-accent"></span>
            </span>
            Corporate Desk
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl drop-shadow-md">
            Let's start a <span className="text-accent">conversation.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
            Have a question about partnerships, pricing, or our network? Our team is standing by to help you scale your business.
          </p>
        </div>
      </section>

      {/* 2. BENTO GRID CONTACT INFO & MAP */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
              
              {/* Direct Support Card */}
              <div className="md:col-span-2 group relative overflow-hidden rounded-none bg-white border-2 border-border p-8 md:p-10 shadow-sm hover:border-primary transition-all duration-300">
                 <div className="relative z-10">
                   <div className="w-16 h-16 bg-primary flex items-center justify-center mb-8 border-b-4 border-accent group-hover:bg-accent/90 transition-colors duration-300">
                     <AnimatedIcon icon="chat" size={36} />
                   </div>
                   <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">Talk to Sales & Support</h3>
                   <p className="text-muted-foreground mb-8 max-w-md">Immediate assistance for your critical business requirements. Available Mon-Sat, 9AM-7PM IST.</p>
                   
                   <div className="flex flex-wrap gap-4">
                     <a href="tel:+919876543210" className="inline-flex items-center justify-center rounded-none bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-accent hover:text-primary transition-colors active:scale-95">
                        Call +91 98765 43210
                     </a>
                     <a href="https://wa.me/919876543210" className="inline-flex items-center justify-center gap-2 rounded-none bg-green-50 text-green-800 border border-green-200 px-6 py-4 text-sm font-bold uppercase tracking-wider hover:bg-green-600 hover:text-white transition-colors active:scale-95">
                        <MessageCircle size={18} /> WhatsApp Us
                     </a>
                   </div>
                 </div>
              </div>

              {/* Email Card */}
              <div className="group relative overflow-hidden rounded-none bg-[#0A1A30] border border-[#0A1A30] p-8 shadow-sm transition-all duration-300 flex flex-col justify-between">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                 <div className="relative z-10">
                   <div className="w-16 h-16 bg-white/10 flex items-center justify-center mb-6 border-b-4 border-accent group-hover:bg-accent/90 transition-colors duration-300">
                     <AnimatedIcon icon="document" size={36} />
                   </div>
                   <h3 className="font-serif text-2xl font-bold text-white mb-6">Email us</h3>
                   
                   <div className="space-y-6">
                     <a href="mailto:hello@truvex.in" className="block group/link">
                       <div className="text-[11px] font-bold uppercase tracking-widest text-white/50 mb-1">General Inquiries</div>
                       <div className="text-lg font-bold text-white flex items-center gap-2 group-hover/link:text-accent transition-colors">
                         hello@truvex.in <ArrowRight size={16} className="opacity-0 -ml-2 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                       </div>
                     </a>
                     <a href="mailto:partners@truvex.in" className="block group/link">
                       <div className="text-[11px] font-bold uppercase tracking-widest text-white/50 mb-1">Partnerships</div>
                       <div className="text-lg font-bold text-white flex items-center gap-2 group-hover/link:text-accent transition-colors">
                         partners@truvex.in <ArrowRight size={16} className="opacity-0 -ml-2 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                       </div>
                     </a>
                   </div>
                 </div>
              </div>

              {/* Map & Address Card */}
              <div className="md:col-span-3 rounded-none bg-white border-2 border-border shadow-sm overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[450px]">
                 
                 {/* Map Area */}
                 <div className="lg:w-2/3 h-64 lg:h-full relative bg-[#eef2ff]">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120668.64303350156!2d72.82773347962137!3d19.0728988675124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                      className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 mix-blend-multiply contrast-125" 
                      allowFullScreen={false} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Truvex Office Map"
                    ></iframe>
                 </div>

                 {/* Address Area */}
                 <div className="lg:w-1/3 p-8 md:p-10 flex flex-col justify-center bg-white border-l border-border relative">
                    <div className="w-16 h-16 bg-primary flex items-center justify-center mb-6 border-b-4 border-accent">
                       <AnimatedIcon icon="box" size={36} />
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-primary mb-3">Headquarters</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      Level 4, Trade Centre, <br/>
                      Bandra Kurla Complex (BKC),<br/>
                      Mumbai 400051, India
                    </p>
                    <div className="inline-flex items-center gap-2 bg-[#f8f9fa] text-primary px-4 py-3 rounded-none text-[11px] font-bold uppercase tracking-widest border border-border self-start">
                       <AnimatedIcon icon="users" size={20} /> Global Corporate Office
                    </div>
                 </div>

              </div>
           </div>
        </div>
      </section>

      {/* 3. INQUIRY FORM */}
      <section className="px-4 py-20 bg-white border-t border-border">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
             <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Drop us a line</h2>
             <div className="w-24 h-1 bg-accent mx-auto mt-6" />
             <p className="mt-6 text-muted-foreground text-lg">We typically respond within a few hours during business days.</p>
          </div>

          <div className="bg-[#f8f9fa] border-2 border-border shadow-md rounded-none p-8 md:p-12 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              
              <div className="relative z-10">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-primary flex items-center justify-center mb-6 border-b-4 border-accent">
                        <AnimatedIcon icon="success" size={44} />
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-primary mb-3">Message Sent</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-10 text-lg">
                      Thanks for reaching out. We'll be in touch with you shortly.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="market-button border-2 border-primary bg-white px-8 py-4 text-sm font-bold text-primary uppercase tracking-wider hover:bg-primary hover:text-white transition-colors rounded-none">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSubmitted(true);
                    }}
                    className="grid gap-6 animate-in fade-in duration-700"
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field label="Your Name" required>
                        <input required className="w-full rounded-none border border-border bg-white px-5 py-4 text-[15px] text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" placeholder="John Doe" />
                      </Field>
                      <Field label="Email Address" required>
                        <input required type="email" className="w-full rounded-none border border-border bg-white px-5 py-4 text-[15px] text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" placeholder="john@company.com" />
                      </Field>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field label="Phone Number">
                        <input type="tel" className="w-full rounded-none border border-border bg-white px-5 py-4 text-[15px] text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" placeholder="+91 99999 99999" />
                      </Field>
                      <Field label="Inquiry Type" required>
                        <select required className="w-full rounded-none border border-border bg-white px-5 py-4 text-[15px] text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 appearance-none cursor-pointer">
                          <option value="" disabled selected>Select a topic</option>
                          <option>General Support</option>
                          <option>Partnerships & Alliances</option>
                          <option>Press & Media</option>
                          <option>Other</option>
                        </select>
                      </Field>
                    </div>
                    <Field label="Your Message" required>
                      <textarea required rows={5} className="w-full rounded-none border border-border bg-white px-5 py-4 text-[15px] text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-y" placeholder="Tell us how we can help..." />
                    </Field>
                    
                    <div className="mt-2">
                      <button className="market-button inline-flex items-center justify-center gap-2 rounded-none bg-accent px-8 py-4 text-[15px] font-bold uppercase tracking-wider text-white hover:bg-primary transition-colors w-full md:w-auto shadow-md">
                        Send Message <ArrowRight size={18} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
          </div>
        </div>
      </section>

    </div>
  );
}
