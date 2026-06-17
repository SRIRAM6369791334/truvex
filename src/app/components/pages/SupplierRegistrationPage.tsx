import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageUpload, OTPModal } from '../LeadCaptureComponents';
import { categories } from '../MarketplaceComponents';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import AnimatedIcon from '../AnimatedIcon';

export default function SupplierRegistrationPage() {
  const [otpOpen, setOtpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#f8f9fa]">
      {/* 1. HERO SECTION (Split Layout with Full Form) */}
      <section className="relative bg-[#0A1A30] pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" alt="" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A30] via-[#0A1A30]/95 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid lg:grid-cols-[1fr_500px] gap-12 items-center">
            
            {/* Left Side: Headline & Benefits */}
            <div className="text-white">
              <div className="mb-4 inline-flex items-center gap-2 rounded-none border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Sell on Truvex
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-md">
                Grow your business on India's premier B2B marketplace.
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-xl drop-shadow-md">
                Join thousands of verified suppliers. Get higher visibility, authentic business enquiries, and a dedicated local manager.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <div className="flex items-center gap-3">
                   <div className="flex h-14 w-14 items-center justify-center bg-primary border-b-4 border-accent">
                     <AnimatedIcon icon="trending" size={36} />
                   </div>
                   <span className="font-bold text-white drop-shadow-sm">Grow your Business</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex h-14 w-14 items-center justify-center bg-primary border-b-4 border-accent">
                     <AnimatedIcon icon="rupee" size={36} />
                   </div>
                   <span className="font-bold text-white drop-shadow-sm">Zero Registration Cost</span>
                </div>
              </div>
            </div>

            {/* Right Side: The Full Form */}
            <div className="bg-white p-6 sm:p-8 rounded-none border-t-4 border-t-accent shadow-2xl relative">
              <h2 className="text-2xl font-bold text-primary mb-2">Free Registration</h2>
              <p className="text-sm text-muted-foreground mb-6">Complete your profile to start receiving RFQs immediately.</p>
              
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-700">✓</div>
                  <h3 className="font-serif text-2xl font-bold text-primary">Submitted for Review</h3>
                  <p className="mx-auto mt-2 text-sm text-muted-foreground">Your profile is captured. Admin will activate your account shortly.</p>
                </div>
              ) : (
                <form
                  className="grid gap-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setOtpOpen(true);
                  }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Company Name" required />
                    <Field label="Contact Person" required />
                    <Field label="Mobile Number" required type="tel" />
                    <Field label="Email" type="email" />
                  </div>
                  <Field label="Core Product Segment" required />
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-primary/80">Company Details <span className="text-accent">*</span></label>
                    <textarea required rows={3} className="w-full rounded-none border border-border bg-[#f8f9fa] px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary" placeholder="Describe manufacturing capacity, certifications, etc." />
                  </div>
                  <ImageUpload label="Upload Factory/Product Images" multiple />
                  <button className="market-button mt-2 min-h-12 w-full rounded-none bg-accent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary">
                    Verify OTP & Register
                  </button>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. THREE SIMPLE STEPS */}
      <section className="py-20 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Get a free listing in 3 simple steps</h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
             <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-border border-dashed z-0" />
             
             {[
               { iconName: 'users', title: '1. Create Account', desc: 'Add your basic details and verify your mobile number' },
               { iconName: 'document', title: '2. Add Business Details', desc: 'Provide your company name, address, and GST info' },
               { iconName: 'box', title: '3. Upload Products', desc: 'Add high-quality photos and detailed specifications' }
             ].map((step, i) => (
               <div key={i} className="relative z-10 flex flex-col items-center text-center bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-transparent hover:border-border">
                 <div className="w-24 h-24 bg-primary text-white border-4 border-white shadow-xl flex items-center justify-center rounded-none mb-6 border-b-4 border-b-accent">
                   <AnimatedIcon icon={step.iconName as any} size={48} />
                 </div>
                 <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. CTA STRIP */}
      {/* <section className="py-8 bg-accent text-white text-center">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-center gap-6">
           <h2 className="text-xl font-bold">Start selling for free. It only takes 5 minutes.</h2>
           <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-6 py-2.5 bg-white text-accent font-bold text-sm hover:bg-primary hover:text-white transition-colors rounded-none border border-white">
             Register Now
           </button>
        </div>
      </section> */}

      {/* 4. BUSINESS HAPPENING ON TRUVEX */}
      {/* <section className="py-24 bg-[#f4f6f8]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Business happening right now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Witness the massive scale of industrial transactions taking place across India on the Truvex platform.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '1,800+', label: 'Tonnes of Steel', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600' },
              { num: '4,500+', label: 'Solar Panels', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600' },
              { num: '2,500+', label: 'Litres of Chemicals', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600' },
              { num: '1.2 Lakh', label: 'Industrial Tools', img: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600' },
            ].map((stat, i) => (
              <div key={i} className="relative h-64 border border-border rounded-none p-6 flex flex-col justify-end overflow-hidden group">
                 <div className="absolute inset-0 z-0">
                   <img src={stat.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                 </div>
                 <div className="relative z-10 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                   <div className="text-4xl font-bold text-accent mb-2">{stat.num}</div>
                   <div className="text-sm font-bold uppercase tracking-widest text-white/90">{stat.label}</div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 5. WHAT CAN YOU SELL */}
      {/* <section className="py-24 bg-white border-t border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Top Categories to Sell</h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
          </div>
          
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {categories.map((c, i) => (
                <CarouselItem key={i} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <div className="group flex flex-col items-center gap-3 cursor-pointer p-2">
                    <div className="w-full aspect-square rounded-none overflow-hidden border border-border bg-[#f8f9fa] group-hover:border-accent transition-colors relative">
                      <img src={c.image} alt="" className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                    </div>
                    <span className="text-[11px] font-bold text-center text-primary uppercase tracking-wider group-hover:text-accent transition-colors">{c.name}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex rounded-none border-border hover:bg-accent hover:text-white hover:border-accent -left-12" />
            <CarouselNext className="hidden md:flex rounded-none border-border hover:bg-accent hover:text-white hover:border-accent -right-12" />
          </Carousel>
        </div>
      </section> */}

      {/* 6. ADVANTAGE PROGRAM */}
      {/* <section className="py-20 bg-[#0A1A30] text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Truvex Advantage Program</h2>
            <p className="text-white/70">Premium services designed to exponentially increase your B2B sales.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { iconName: 'trending', title: 'Higher Visibility', desc: 'Get top slots on category pages and search results when buyers look for your products.' },
              { iconName: 'users', title: 'More Business Enquiries', desc: 'Directly receive requirements and RFQs from verified buyers across India.' },
              { iconName: 'chat', title: 'Dedicated Manager', desc: 'A dedicated account manager to optimize your catalog and close deals faster.' }
            ].map((adv, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 p-8 text-center rounded-none hover:bg-white/10 transition-colors">
                 <div className="inline-flex w-16 h-16 bg-primary border-b-4 border-accent items-center justify-center rounded-none mb-6 group-hover:bg-accent/90 transition-colors duration-300">
                   <AnimatedIcon icon={adv.iconName as any} size={38} />
                 </div>
                 <h3 className="text-xl font-bold mb-3">{adv.title}</h3>
                 <p className="text-sm text-white/60 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <OTPModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerify={() => {
          setOtpOpen(false);
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        title="Supplier OTP Verification"
      />
    </div>
  );
}

function Field({ label, required, type = 'text' }: { label: string; required?: boolean; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-primary/80">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input 
        required={required} 
        type={type} 
        className="w-full rounded-none border border-border bg-[#f8f9fa] px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary" 
        placeholder={label} 
      />
    </div>
  );
}
