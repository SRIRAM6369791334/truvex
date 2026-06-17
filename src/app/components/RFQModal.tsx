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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

          <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
            <Field label="Product Name" required>
              <input required className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="e.g. Industrial steel pipes" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Quantity Required" required>
                <input required className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="e.g. 500 pieces" />
              </Field>
              <Field label="Delivery City" required>
                <input required className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="e.g. Mumbai" />
              </Field>
            </div>
            <Field label="Mobile Number" required hint="Why we need this: suppliers respond fastest by phone or WhatsApp.">
              <input required type="tel" className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="+91 XXXXX XXXXX" />
            </Field>
            <Field label="Specifications">
              <textarea rows={4} className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-accent" placeholder="Mention grade, size, brand preference, timeline, or certifications." />
            </Field>
            <div className="flex justify-end gap-2 border-t border-border pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-md">
                Cancel
              </Button>
              <Button type="submit" className="gap-2 rounded-md bg-accent text-white hover:bg-accent/90">
                <Send size={16} /> Submit RFQ
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
