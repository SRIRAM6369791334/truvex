import { useState } from 'react';
import { ImageUpload } from '../LeadCaptureComponents';
import { categories } from '../MarketplaceComponents';
import AnimatedIcon from '../AnimatedIcon';
import { registerSupplier } from '../../../services/supplierService';

export default function SupplierRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [coreProductSegment, setCoreProductSegment] = useState('');
  const [companyDetails, setCompanyDetails] = useState('');
  const [factoryImages, setFactoryImages] = useState<File[]>([]);

  // UI state
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmitAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSubmitError(null);

    // Rigorous Validation
    if (!companyName.trim()) {
      setValidationError('Company Name is required.');
      return;
    }
    if (!contactPerson.trim()) {
      setValidationError('Contact Person is required.');
      return;
    }
    if (!mobile.trim()) {
      setValidationError('Mobile Number is required.');
      return;
    }
    // Mobile number validation (exactly 10 digits)
    if (mobile.length !== 10) {
      setValidationError('Mobile Number must be exactly 10 digits.');
      return;
    }
    // Email validation (if provided)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Email must match a valid email format (e.g. name@domain.com).');
      return;
    }
    if (!coreProductSegment.trim()) {
      setValidationError('Core Product Segment is required.');
      return;
    }
    if (!companyDetails.trim()) {
      setValidationError('Company Details are required.');
      return;
    }

    // If valid, open OTP modal
    handleOTPVerify();
  };

  const handleOTPVerify = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      await registerSupplier({
        company_name: companyName,
        contact_person: contactPerson,
        mobile: mobile,
        email: email || undefined,
        core_product_segment: coreProductSegment,
        company_details: companyDetails,
        factory_images: factoryImages,
      });

      // Clear the form
      setCompanyName('');
      setContactPerson('');
      setMobile('');
      setEmail('');
      setCoreProductSegment('');
      setCompanyDetails('');
      setFactoryImages([]);
      
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.response?.data?.message || 'Failed to register supplier. Please check details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa]">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0A1A30] pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" alt="" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A30] via-[#0A1A30]/95 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid lg:grid-cols-[1fr_500px] gap-12 items-center">
            
            {/* Left Side: Headline & Benefits */}
            <div className="text-white text-left">
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
                     <AnimatedIcon icon="trending" size={36} className="text-accent" />
                   </div>
                   <span className="font-bold text-white drop-shadow-sm">Grow your Business</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex h-14 w-14 items-center justify-center bg-primary border-b-4 border-accent">
                     <AnimatedIcon icon="rupee" size={36} className="text-accent" />
                   </div>
                   <span className="font-bold text-white drop-shadow-sm">Zero Registration Cost</span>
                </div>
              </div>
            </div>

            {/* Right Side: The Full Form */}
            <div className="bg-white p-6 sm:p-8 rounded-none border-t-4 border-t-accent shadow-2xl relative text-left">
              <h2 className="text-2xl font-bold text-primary mb-2">Free Registration</h2>
              <p className="text-sm text-muted-foreground mb-6">Complete your profile to start receiving RFQs immediately.</p>
              
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-700">✓</div>
                  <h3 className="font-serif text-2xl font-bold text-primary">Submitted for Review</h3>
                  <p className="mx-auto mt-2 text-sm text-muted-foreground">Your profile is captured. Admin will activate your account shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-accent font-bold uppercase hover:underline"
                  >
                    Register Another Company
                  </button>
                </div>
              ) : (
                <form className="grid gap-4" onSubmit={handleFormSubmitAttempt}>
                  {validationError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-600 rounded-none">
                      {validationError}
                    </div>
                  )}
                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-600 rounded-none">
                      {submitError}
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field 
                      label="Company Name" 
                      required 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <Field 
                      label="Contact Person" 
                      required 
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                    />
                    <Field 
                      label="Mobile Number" 
                      required 
                      type="text" 
                      value={mobile}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ''); // only allow digits
                        if (value.length <= 10) {
                          setMobile(value);
                        }
                      }}
                    />
                    <Field 
                      label="Email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Field 
                    label="Core Product Segment" 
                    required 
                    value={coreProductSegment}
                    onChange={(e) => setCoreProductSegment(e.target.value)}
                  />
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-primary/80">
                      Company Details <span className="text-accent">*</span>
                    </label>
                    <textarea 
                      required 
                      rows={3} 
                      value={companyDetails}
                      onChange={(e) => setCompanyDetails(e.target.value)}
                      className="w-full rounded-none border border-border bg-[#f8f9fa] px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary resize-none" 
                      placeholder="Describe manufacturing capacity, certifications, etc." 
                    />
                  </div>
                  <ImageUpload 
                    label="Upload Factory/Product Images" 
                    multiple 
                    onChange={(files) => setFactoryImages(files)}
                  />
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="market-button mt-2 min-h-12 w-full rounded-none bg-accent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary disabled:opacity-50"
                  >
                    {submitting ? 'Registering...' : 'Register'}
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
                   <AnimatedIcon icon={step.iconName as any} size={48} className="text-accent" />
                 </div>
                 <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function Field({ 
  label, 
  required, 
  type = 'text', 
  value, 
  onChange 
}: { 
  label: string; 
  required?: boolean; 
  type?: string; 
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-primary/80">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input 
        required={required} 
        type={type} 
        value={value}
        onChange={onChange}
        className="w-full rounded-none border border-border bg-[#f8f9fa] px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary" 
        placeholder={label} 
      />
    </div>
  );
}
