import { useState } from 'react';
import { MarketplacePageHeader, TrustSignalsBar } from '../MarketplaceComponents';
import { ImageUpload, OTPModal } from '../LeadCaptureComponents';

export default function BuyerFormPage() {
  const [otpOpen, setOtpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="Buyer Requirement"
        title="Submit Your Business Requirement"
        subtext="Create a lead with buyer details, requirement, budget, reference image, and OTP verification."
        imageUrl="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200"
      />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="market-card border-t-2 border-t-accent p-6">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-700">✓</div>
                <h2 className="font-serif text-3xl font-bold text-primary">Lead Generated</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">Your buyer requirement is captured. Truvex will review it and route it to relevant supplier categories.</p>
              </div>
            ) : (
              <form
                className="grid gap-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setOtpOpen(true);
                }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Buyer Name" required />
                  <Field label="Phone Number" required type="tel" />
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-[12px] font-bold text-primary">Address <span className="text-accent">*</span></label>
                    <textarea required rows={3} className="w-full rounded-xl border border-border px-4 py-3 text-base outline-none focus:border-accent" placeholder="Delivery address / city" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-[12px] font-bold text-primary">Requirement <span className="text-accent">*</span></label>
                    <textarea required rows={4} className="w-full rounded-xl border border-border px-4 py-3 text-base outline-none focus:border-accent" placeholder="What products, quantity, specs, or services do you need?" />
                  </div>
                  <Field label="Budget" />
                </div>
                <ImageUpload label="Upload Reference Image" multiple={false} />
                <button className="market-button min-h-12 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white">Verify OTP & Generate Lead</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <OTPModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerify={() => {
          setOtpOpen(false);
          setSubmitted(true);
        }}
        title="Buyer OTP Verification"
      />
    </div>
  );
}

function Field({ label, required, type = 'text' }: { label: string; required?: boolean; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-bold text-primary">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input required={required} type={type} className="min-h-12 w-full rounded-xl border border-border px-4 py-3 text-base outline-none focus:border-accent" placeholder={label} />
    </div>
  );
}
