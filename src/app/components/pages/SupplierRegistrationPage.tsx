import { useState } from 'react';
import { MarketplacePageHeader, TrustSignalsBar } from '../MarketplaceComponents';
import { ImageUpload, OTPModal } from '../LeadCaptureComponents';

export default function SupplierRegistrationPage() {
  const [otpOpen, setOtpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="Supplier Registration"
        title="Register as a Verified Supplier"
        subtext="Add company details, upload product images, verify mobile OTP, and send your profile for admin review."
        imageUrl="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200"
      />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="market-card border-t-2 border-t-accent p-6">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-700">✓</div>
                <h2 className="font-serif text-3xl font-bold text-primary">Submitted for Admin Review</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">Your supplier profile is captured. Truvex admin will review product details and activate qualified suppliers.</p>
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
                  <Field label="Company Name" required />
                  <Field label="Contact Person" required />
                  <Field label="Mobile Number" required type="tel" />
                  <Field label="Email" type="email" />
                  <Field label="Product Name" required />
                  <div>
                    <label className="mb-1.5 block text-[12px] font-bold text-primary">Product Details <span className="text-accent">*</span></label>
                    <textarea required rows={4} className="w-full rounded-xl border border-border px-4 py-3 text-base outline-none focus:border-accent" placeholder="Describe products, MOQ, capacity, delivery cities" />
                  </div>
                </div>
                <ImageUpload label="Upload Product Images" multiple />
                <button className="market-button min-h-12 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white">Verify OTP & Submit</button>
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
        title="Supplier OTP Verification"
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
