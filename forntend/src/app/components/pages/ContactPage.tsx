import { useState } from 'react';
import type React from 'react';
import { MessageCircle, ArrowRight, Phone } from 'lucide-react';
import { TrustSignalsBar } from '../MarketplaceComponents';
import AnimatedIcon from '../AnimatedIcon';
import { submitContactForm } from '../../../services/leadService';

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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    
    // Rigorous Validation
    if (!fullName.trim()) {
      setError('Your Name is required.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Valid Email Address is required.');
      return;
    }
    if (!inquiryType.trim()) {
      setError('Inquiry Type is required.');
      return;
    }
    if (!message.trim()) {
      setError('Your Message is required.');
      return;
    }

    setLoading(true);
    try {
      await submitContactForm({
        full_name: fullName,
        email,
        phone: phone || undefined,
        inquiry_type: inquiryType,
        message,
      });
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setInquiryType('');
      setMessage('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
                     <a href="tel:+919080722602" className="inline-flex items-center justify-center gap-5 rounded-none bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-accent hover:text-primary transition-colors active:scale-95">
                        <Phone size={18} /> 90807 22602
                     </a>
                     <a href="https://wa.me/919080722602" className="inline-flex items-center justify-center gap-2 rounded-none bg-green-50 text-green-800 border border-green-200 px-6 py-4 text-sm font-bold uppercase tracking-wider hover:bg-green-600 hover:text-white transition-colors active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg> WhatsApp Us
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
                     <a href="mailto:admin@truvexsourcingnetworking.com" className="block group/link">
                       <div className="text-[11px] font-bold uppercase tracking-widest text-white/50 mb-1">General Inquiries</div>
                       <div className="text-sm font-bold text-white flex items-center gap-2 group-hover/link:text-accent transition-colors break-all">
                         admin@truvexsourcingnetworking.com <ArrowRight size={16} className="opacity-0 -ml-2 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all shrink-0" />
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.150758111068!2d80.2101911!3d13.003731700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6e81f3c3f9183079%3A0xb9a82906031f1b69!2sCOLLABOR8%20%E2%80%93%20Coworking%20Space%20In%20Guindy%20Chennai!5e1!3m2!1sen!2sin!4v1782386613863!5m2!1sen!2sin" 
                      className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 mix-blend-multiply contrast-125" 
                      allowFullScreen={false} 
                      loading="lazy" 
                      referrerPolicy="strict-origin-when-cross-origin"
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
                      No.9,10 chakrapani street, <br/>
                      Guindy, <br/>
                      Chennai 600032
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
                  <form onSubmit={handleSubmit} className="grid gap-6 animate-in fade-in duration-700">
                    {error && (
                      <div className="rounded-none border border-red-300 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                        {error}
                      </div>
                    )}
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field label="Your Name" required>
                        <input
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full rounded-none border border-border bg-white px-5 py-4 text-[15px] text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </Field>
                      <Field label="Email Address" required>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-none border border-border bg-white px-5 py-4 text-[15px] text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                          placeholder="john@company.com"
                        />
                      </Field>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field label="Phone Number">
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded-none border border-border bg-white px-5 py-4 text-[15px] text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                          placeholder="+91 99999 99999"
                        />
                      </Field>
                      <Field label="Inquiry Type" required>
                        <select
                          required
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full rounded-none border border-border bg-white px-5 py-4 text-[15px] text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select a topic</option>
                          <option>General Support</option>
                          <option>Partnerships &amp; Alliances</option>
                          <option>Press &amp; Media</option>
                          <option>Other</option>
                        </select>
                      </Field>
                    </div>
                    <Field label="Your Message" required>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-none border border-border bg-white px-5 py-4 text-[15px] text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-y"
                        placeholder="Tell us how we can help..."
                      />
                    </Field>
                    
                    <div className="mt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="market-button inline-flex items-center justify-center gap-2 rounded-none bg-accent px-8 py-4 text-[15px] font-bold uppercase tracking-wider text-white hover:bg-primary transition-colors w-full md:w-auto shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Sending...' : <> Send Message <ArrowRight size={18} /></>}
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

