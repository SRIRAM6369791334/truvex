import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { HelpCircle, Send } from 'lucide-react';
import { submitRFQ } from '../../services/leadService';

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
      <label className="mb-1 block text-[12px] font-bold text-primary">
        {label} {required && <span className="text-accent">*</span>}
        {hint && <HelpCircle size={13} className="ml-1 inline cursor-help text-muted-foreground" title={hint} />}
      </label>
      {children}
    </div>
  );
}

export function RFQModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setProductName('');
    setQuantity('');
    setDeliveryCity('');
    setMobile('');
    setSpecifications('');
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate mobile number: must be exactly 10 digits
    if (mobile.length !== 10) {
      setError('Mobile number must be exactly 10 digits.');
      return;
    }

    setLoading(true);
    try {
      await submitRFQ({
        product_name: productName,
        quantity,
        delivery_city: deliveryCity,
        mobile,
        specifications: specifications || undefined,
      });
      setSuccess(true);
      setProductName('');
      setQuantity('');
      setDeliveryCity('');
      setMobile('');
      setSpecifications('');
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit RFQ. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
      <DialogTrigger asChild>
        {trigger || <Button className="bg-accent text-white hover:bg-accent/90">Post Requirement</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] rounded-md border-border bg-white p-0 shadow-2xl">
        <div className="border-t-4 border-accent p-5">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold text-primary">Request for Quotation</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Step 1 of 2: share product basics. Truvex will route the RFQ to verified suppliers.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 h-2 bg-muted">
            <div className="h-2 w-1/2 bg-accent" />
          </div>

          {success ? (
            <div className="mt-6 flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 text-5xl">✅</div>
              <h3 className="font-serif text-xl font-bold text-primary">RFQ Submitted!</h3>
              <p className="mt-2 text-sm text-muted-foreground">Our team will route your requirement to verified suppliers shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
              {error && (
                <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              <Field label="Product Name" required>
                <input
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="e.g. Industrial steel pipes"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Quantity Required" required>
                  <input
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                    placeholder="e.g. 500 pieces"
                  />
                </Field>
                <Field label="Delivery City" required>
                  <input
                    required
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                    placeholder="e.g. Mumbai"
                  />
                </Field>
              </div>
              <Field label="Mobile Number" required hint="Why we need this: suppliers respond fastest by phone or WhatsApp.">
                <input
                  required
                  type="text"
                  value={mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // only allow digits
                    if (value.length <= 10) {
                      setMobile(value);
                    }
                  }}
                  className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="Enter 10-digit mobile number (e.g., 9876543210)"
                />
              </Field>
              <Field label="Specifications">
                <textarea
                  rows={4}
                  value={specifications}
                  onChange={(e) => setSpecifications(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                  placeholder="Mention grade, size, brand preference, timeline, or certifications."
                />
              </Field>
              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-md">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="gap-2 rounded-md bg-accent text-white hover:bg-accent/90 disabled:opacity-60"
                >
                  <Send size={16} /> {loading ? 'Submitting...' : 'Submit RFQ'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
