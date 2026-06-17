import { useState } from 'react';
import { ImageUpload, OTPModal } from '../LeadCaptureComponents';
import AnimatedIcon from '../AnimatedIcon';
import { submitBuyerForm } from '../../../services/buyerService';

export default function BuyerFormPage() {
  const [otpOpen, setOtpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [buyerName, setBuyerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [requirementDetails, setRequirementDetails] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [referenceImage, setReferenceImage] = useState<File | null>(null);

  // UI state
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmitAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSubmitError(null);

    // Rigorous Validation
    if (!buyerName.trim()) {
      setValidationError('Buyer Name is required.');
      return;
    }
    if (!phone.trim()) {
      setValidationError('Phone Number is required.');
      return;
    }
    // Mobile number validation (10 digit Indian format)
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setValidationError('Phone Number must be a valid 10-digit Indian number.');
      return;
    }
    if (!address.trim()) {
      setValidationError('Address / City is required.');
      return;
    }
    if (!requirementDetails.trim()) {
      setValidationError('Requirement Details are required.');
      return;
    }

    // Open OTP modal if validation passes
    setOtpOpen(true);
  };

  const handleOTPVerify = async () => {
    setOtpOpen(false);
    setSubmitting(true);
    setSubmitError(null);

    try {
      await submitBuyerForm({
        buyer_name: buyerName,
        phone: phone,
        address: address,
        requirement_details: requirementDetails,
        estimated_budget: estimatedBudget || undefined,
        reference_image: referenceImage,
      });

      // Clear the form
      setBuyerName('');
      setPhone('');
      setAddress('');
      setRequirementDetails('');
      setEstimatedBudget('');
      setReferenceImage(null);

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.response?.data?.message || 'Failed to submit buy requirement. Please check details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa]">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0A1A30] pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" alt="" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A30] via-[#0A1A30]/95 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid lg:grid-cols-[1fr_500px] gap-12 items-center">
            
            {/* Left Side: Headline & Benefits */}
            <div className="text-white text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-none border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Source on Truvex
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-md">
                Post your buy requirements and get quotes instantly.
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-xl drop-shadow-md">
                Connect with thousands of verified manufacturers, wholesalers, and distributors across India. Sourcing has never been this easy.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <div className="flex items-center gap-3">
                   <div className="flex h-14 w-14 items-center justify-center bg-primary border-b-4 border-accent">
                     <AnimatedIcon icon="shield" size={36} className="text-accent" />
                   </div>
                   <span className="font-bold text-white drop-shadow-sm">Verified Suppliers</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex h-14 w-14 items-center justify-center bg-primary border-b-4 border-accent">
                     <AnimatedIcon icon="clock" size={36} className="text-accent" />
                   </div>
                   <span className="font-bold text-white drop-shadow-sm">Fast Responses</span>
                </div>
              </div>
            </div>

            {/* Right Side: The Full Form */}
            <div className="bg-white p-6 sm:p-8 rounded-none border-t-4 border-t-accent shadow-2xl relative text-left">
              <h2 className="text-2xl font-bold text-primary mb-2">Tell us what you need</h2>
              <p className="text-sm text-muted-foreground mb-6">Fill out the form below to receive competitive quotes.</p>
              
              {submitted ? (
                <div className="py-10 text-center">
                   <div className="mx-auto mb-4 w-16 h-16 bg-primary border-b-4 border-accent flex items-center justify-center">
                     <AnimatedIcon icon="success" size={40} className="text-accent" />
                   </div>
                  <h3 className="font-serif text-2xl font-bold text-primary">Requirement Submitted</h3>
                  <p className="mx-auto mt-2 text-sm text-muted-foreground">Your requirement has been sent to verified suppliers. You will receive quotes shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-accent font-bold uppercase hover:underline"
                  >
                    Submit Another Requirement
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
                      label="Buyer Name" 
                      required 
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                    />
                    <Field 
                      label="Phone Number" 
                      required 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-primary/80">
                      Address / City <span className="text-accent">*</span>
                    </label>
                    <textarea 
                      required 
                      rows={2} 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-none border border-border bg-[#f8f9fa] px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary resize-none" 
                      placeholder="Where do you need delivery?" 
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-primary/80">
                      Requirement Details <span className="text-accent">*</span>
                    </label>
                    <textarea 
                      required 
                      rows={3} 
                      value={requirementDetails}
                      onChange={(e) => setRequirementDetails(e.target.value)}
                      className="w-full rounded-none border border-border bg-[#f8f9fa] px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary resize-none" 
                      placeholder="Describe the products, quantity, and specifications you need." 
                    />
                  </div>
                  <Field 
                    label="Estimated Budget" 
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                  />
                  <ImageUpload 
                    label="Upload Reference Image (Optional)" 
                    multiple={false} 
                    onChange={(files) => setReferenceImage(files.length > 0 ? files[0] : null)}
                  />
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="market-button mt-2 min-h-12 w-full rounded-none bg-accent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Verify OTP & Post Requirement'}
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Sourcing made simple in 3 steps</h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
             <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-border border-dashed z-0" />
             
             {[
               { iconName: 'target', title: '1. Post Requirement', desc: 'Tell us exactly what you need, including quantity and budget.' },
               { iconName: 'document', title: '2. Receive Quotes', desc: 'Get competitive quotes directly from verified sellers.' },
               { iconName: 'handshake', title: '3. Finalize Deal', desc: 'Compare quotes, negotiate, and close the best deal.' }
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

      <OTPModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerify={handleOTPVerify}
        title="Buyer OTP Verification"
      />
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
