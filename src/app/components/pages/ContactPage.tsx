import { useState } from 'react';
import type React from 'react';
import { CheckCircle2, HelpCircle, Mail, MapPin, MessageCircle, PhoneCall } from 'lucide-react';
import { EnquiryTicker, MarketplacePageHeader, TrustSignalsBar } from '../MarketplaceComponents';
import { openEnquiryPopup } from '../LeadCaptureComponents';

const categories = [
  'Industrial Machinery',
  'Electrical & Electronics',
  'Construction Materials',
  'Packaging Materials',
  'Automotive Parts',
  'Chemicals & Raw Materials',
  'Other',
];

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-bold text-primary">
        {label} {required && <span className="text-accent">*</span>}
        {hint && (
          <span title={hint} className="ml-1 inline-flex cursor-help align-middle text-muted-foreground">
            <HelpCircle size={13} />
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="RFQ desk"
        title="Post Your Buy Requirement"
        subtext="Share product, quantity, mobile number, and delivery city. Truvex will shortlist verified suppliers and respond within 4 hours."
        imageUrl="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200"
      />
      <EnquiryTicker />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <div className="border border-border border-t-2 border-t-accent bg-card p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Step 1 of 2</div>
                <h2 className="font-serif text-2xl font-bold text-primary">Requirement Details</h2>
              </div>
              <div className="hidden w-40 overflow-hidden bg-muted sm:block">
                <div className="h-2 w-1/2 bg-accent" />
              </div>
            </div>

            {submitted ? (
              <div className="border border-teal-200 bg-teal-50 p-8 text-center">
                <CheckCircle2 className="mx-auto mb-3 text-teal-700" size={44} />
                <h3 className="text-xl font-bold text-primary">Requirement Received</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                  Truvex will verify the product details and contact you with supplier options. Keep your phone available for faster callbacks.
                </p>
                <button onClick={() => setSubmitted(false)} className="market-button mt-5 border border-primary px-4 py-2 text-sm font-bold text-primary">
                  Submit Another Requirement
                </button>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
                className="grid gap-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full Name" required>
                    <input required className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="Buyer contact name" />
                  </Field>
                  <Field label="Company / Business" required>
                    <input required className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="Registered business name" />
                  </Field>
                  <Field label="Mobile Number" required hint="Why we need this: verified suppliers respond fastest by phone or WhatsApp.">
                    <input required type="tel" className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="+91 XXXXX XXXXX" />
                  </Field>
                  <Field label="Email Address">
                    <input type="email" className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="business@example.com" />
                  </Field>
                  <Field label="Product Category" required>
                    <select required className="w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-accent">
                      <option value="">Select category</option>
                      {categories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </Field>
                  <Field label="Delivery City" required>
                    <input required className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="e.g. Pune" />
                  </Field>
                  <Field label="Quantity Required" required>
                    <input required className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="e.g. 500 pieces" />
                  </Field>
                  <Field label="Expected Purchase Timeline">
                    <select className="w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-accent">
                      <option>Immediate</option>
                      <option>Within 7 days</option>
                      <option>Within 30 days</option>
                      <option>Planning stage</option>
                    </select>
                  </Field>
                </div>
                <Field label="Requirement Details" required>
                  <textarea required rows={5} className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="Mention specs, brand preference, grade, size, delivery terms, or certifications." />
                </Field>
                <button className="market-button bg-accent px-5 py-3 text-sm font-bold text-white hover:bg-accent/90">Submit Requirement</button>
              </form>
            )}
          </div>

          <aside className="grid content-start gap-4">
            <img
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600"
              alt="Customer support"
              width={600}
              height={420}
              loading="lazy"
              className="h-64 w-full rounded-2xl border border-border object-cover shadow-sm"
            />
            <div className="border border-border border-t-2 border-t-accent bg-card p-5">
              <h3 className="text-lg font-bold text-primary">Buyer Support</h3>
              <p className="mt-2 text-sm text-muted-foreground">Call the RFQ desk for urgent product requirements and supplier verification.</p>
              <div className="mt-4 flex items-center gap-3 bg-primary p-4 text-white">
                <PhoneCall className="text-accent" />
                <div>
                  <div className="text-[12px] text-white/60">Phone</div>
                  <div className="font-bold">+91 98765 43210</div>
                </div>
              </div>
            </div>
            <div className="border border-border bg-card p-5">
              <h3 className="text-lg font-bold text-primary">What happens next?</h3>
              <ol className="mt-3 grid gap-3 text-sm text-muted-foreground">
                <li><span className="font-bold text-primary">1.</span> Requirement checked for product, quantity, and city.</li>
                <li><span className="font-bold text-primary">2.</span> Matching suppliers shortlisted from verified categories.</li>
                <li><span className="font-bold text-primary">3.</span> Quotes or callbacks shared within the response window.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="market-card border-t-2 border-t-accent p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Contact details</div>
            <h2 className="mt-2 font-serif text-2xl font-bold text-primary">Talk to Truvex sourcing desk</h2>
            <div className="mt-5 grid gap-3 text-sm">
              <a href="tel:+919876543210" className="flex min-h-12 items-center gap-3 rounded-xl border border-border px-4 py-3 text-primary">
                <PhoneCall className="text-accent" size={18} /> +91 98765 43210
              </a>
              <a href="mailto:hello@truvex.in" className="flex min-h-12 items-center gap-3 rounded-xl border border-border px-4 py-3 text-primary">
                <Mail className="text-accent" size={18} /> hello@truvex.in
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex min-h-12 items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-bold text-green-700">
                <MessageCircle size={18} /> WhatsApp Truvex
              </a>
              <button type="button" onClick={openEnquiryPopup} className="market-button min-h-12 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white">
                Open Enquiry Popup
              </button>
            </div>
          </div>
          <div className="market-card overflow-hidden border-t-2 border-t-accent">
            <div className="flex min-h-[320px] items-center justify-center bg-[linear-gradient(135deg,#eef2ff,#f8fafc)] p-6 text-center">
              <div>
                <MapPin className="mx-auto mb-3 text-accent" size={36} />
                <h3 className="font-serif text-2xl font-bold text-primary">Pan-India Supplier Network</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Map placeholder for Truvex coverage across Mumbai, Delhi, Pune, Bangalore, Chennai, Ahmedabad, Surat and Coimbatore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
