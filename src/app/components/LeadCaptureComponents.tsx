import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { MessageCircle, Phone, UploadCloud, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const serviceCategories = [
  {
    title: 'Hotel Supplies',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    desc: 'Linens, amenities, housekeeping materials, and daily operating supplies for hotels.',
  },
  {
    title: 'Kitchen Equipment',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600',
    desc: 'Commercial kitchen machines, storage, preparation, and service equipment.',
  },
  {
    title: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
    desc: 'Office, hotel, restaurant, and institutional furniture from verified vendors.',
  },
  {
    title: 'Safety Equipment',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
    desc: 'PPE, safety shoes, gloves, helmets, signage, and industrial protection products.',
  },
  {
    title: 'Gym Equipment',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
    desc: 'Fitness machines, accessories, flooring, and wellness setup supplies.',
  },
  {
    title: 'Industrial Products',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
    desc: 'Machinery, spares, tools, pumps, panels, and bulk industrial requirements.',
  },
];

export function openEnquiryPopup() {
  window.dispatchEvent(new CustomEvent('truvex:open-enquiry'));
}

export function ImageUpload({
  label,
  multiple = true,
}: {
  label: string;
  multiple?: boolean;
}) {
  const [files, setFiles] = useState<Array<{ name: string; url: string }>>([]);
  const objectUrls = useRef<string[]>([]);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = Array.from(incoming).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    objectUrls.current.push(...next.map((file) => file.url));
    setFiles((prev) => (multiple ? [...prev, ...next] : next.slice(0, 1)));
  };

  return (
    <div>
      <label className="mb-2 block text-[12px] font-bold text-primary">{label}</label>
      <label
        onDrop={(event) => {
          event.preventDefault();
          addFiles(event.dataTransfer.files);
        }}
        onDragOver={(event) => event.preventDefault()}
        className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-accent/40 bg-accent/5 p-5 text-center transition hover:border-accent hover:bg-accent/10"
      >
        <UploadCloud className="mb-2 text-accent" size={28} />
        <span className="text-sm font-bold text-primary">Drag/drop images or click to upload</span>
        <span className="mt-1 text-xs text-muted-foreground">PNG, JPG, WebP supported. Preview before submit.</span>
        <input type="file" accept="image/*" multiple={multiple} className="hidden" onChange={(event) => addFiles(event.target.files)} />
      </label>
      {files.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {files.map((file) => (
            <div key={file.url} className="relative overflow-hidden rounded-xl border border-border bg-white">
              <img src={file.url} alt={file.name} className="h-24 w-full object-cover" />
              <button
                type="button"
                onClick={() => setFiles((current) => current.filter((item) => item.url !== file.url))}
                className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white"
                aria-label={`Remove ${file.name}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function OTPModal({
  open,
  onClose,
  onVerify,
  title = 'OTP Verification',
}: {
  open: boolean;
  onClose: () => void;
  onVerify: () => void;
  title?: string;
}) {
  const [otp, setOtp] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-primary/70 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Secure step</div>
        <h2 className="font-serif text-2xl font-bold text-primary">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">Enter demo OTP sent to the submitted mobile number. Use any 4 digits.</p>
        <input
          value={otp}
          onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 4))}
          className="mt-5 w-full rounded-xl border-2 border-accent/30 px-4 py-3 text-center text-2xl font-bold tracking-[0.4em] text-primary outline-none focus:border-accent"
          placeholder="0000"
        />
        <div className="mt-5 flex gap-2">
          <button type="button" onClick={onClose} className="min-h-12 flex-1 rounded-xl border border-border px-4 py-3 text-sm font-bold text-primary">
            Cancel
          </button>
          <button type="button" onClick={onVerify} disabled={otp.length < 4} className="market-button min-h-12 flex-1 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white disabled:opacity-50">
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export function ServiceCard({ service }: { service: (typeof serviceCategories)[number] }) {
  return (
    <div className="market-card group overflow-hidden border-t-2 border-t-accent">
      <div className="h-44 overflow-hidden border-b border-border">
        <img src={service.image} alt={service.title} width={600} height={300} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-primary">{service.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.desc}</p>
        <button type="button" onClick={openEnquiryPopup} className="market-button mt-4 min-h-12 bg-accent px-4 py-2 text-sm font-bold text-white">
          Send Enquiry
        </button>
      </div>
    </div>
  );
}

export function EnquiryPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-primary/70 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Quick enquiry</div>
            <h2 className="font-serif text-2xl font-bold text-primary">Submit Requirement</h2>
            <p className="mt-1 text-sm text-muted-foreground">Share basic details. Truvex will route this to the right supplier category.</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary">
            <X size={18} />
          </button>
        </div>
        <form
          className="mt-5 grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <input required className="min-h-12 rounded-xl border border-border px-4 py-3 text-base outline-none focus:border-accent" placeholder="Product or service required" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input required className="min-h-12 rounded-xl border border-border px-4 py-3 text-base outline-none focus:border-accent" placeholder="Quantity / budget" />
            <input required className="min-h-12 rounded-xl border border-border px-4 py-3 text-base outline-none focus:border-accent" placeholder="+91 mobile number" />
          </div>
          <textarea rows={3} className="rounded-xl border border-border px-4 py-3 text-base outline-none focus:border-accent" placeholder="Requirement details" />
          <button className="market-button min-h-12 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white">Generate Lead</button>
        </form>
      </div>
    </div>
  );
}

export function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-44 right-4 z-50 h-14 w-14 md:bottom-28 md:right-8">
      {/* Continuous Wave rings (3 Staggered Rings, duration 3s, delay 1s) */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#25D366]/60 shadow-[0_0_15px_rgba(37,211,102,0.4)]"
        animate={{
          scale: [1, 2.2],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1], // easeOutExpo
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full border border-[#25D366]/40 shadow-[0_0_10px_rgba(37,211,102,0.2)]"
        animate={{
          scale: [1, 2.2],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 3,
          delay: 1,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full border border-[#25D366]/20 shadow-[0_0_5px_rgba(37,211,102,0.1)]"
        animate={{
          scale: [1, 2.2],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 3,
          delay: 2,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      
      {/* Button */}
      <motion.a
        href="https://wa.me/919876543210?text=Hello%20Truvex%2C%20I%20want%20to%20submit%20a%20requirement"
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-full w-full items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] transition-colors duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          className="h-7 w-7 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.99C16.558 1.874 14.09 .842 11.458.842 6.022.842 1.6 5.263 1.597 10.7c-.001 1.702.443 3.366 1.293 4.837l-.999 3.649 3.753-.984zm11.085-7.514c-.302-.15-1.785-.882-2.062-.983-.277-.1-.478-.15-.679.15-.2.3-.777.983-.95 1.183-.175.2-.349.226-.651.075-1.204-.6-2.015-1.096-2.825-2.483-.215-.367.215-.341.616-1.139.075-.15.037-.282-.019-.383-.056-.1-.478-1.156-.656-1.58-.173-.418-.348-.362-.478-.369-.124-.007-.267-.009-.409-.009-.143 0-.376.053-.572.267-.197.214-.751.734-.751 1.79 0 1.057.77 2.079.877 2.223.107.144 1.516 2.314 3.67 3.244.513.222.914.355 1.226.454.514.163.982.14 1.352.085.412-.06 1.785-.73 2.037-1.436.252-.705.252-1.31.176-1.436-.076-.127-.277-.202-.579-.352z" />
        </svg>
      </motion.a>
    </div>
  );
}

export function CallFloatingButton() {
  return (
    <div className="fixed bottom-24 right-4 z-50 h-14 w-14 md:bottom-8 md:right-8">
      {/* Continuous Wave rings (3 Staggered Rings, duration 3s, delay 1s) */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-blue-600/60 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        animate={{
          scale: [1, 2.2],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1], // easeOutExpo
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full border border-blue-600/40 shadow-[0_0_10px_rgba(37,99,235,0.2)]"
        animate={{
          scale: [1, 2.2],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 3,
          delay: 1,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full border border-blue-600/20 shadow-[0_0_5px_rgba(37,99,235,0.1)]"
        animate={{
          scale: [1, 2.2],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 3,
          delay: 2,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      
      {/* Button */}
      <motion.a
        href="tel:+919876543210"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-full w-full items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_8px_30px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-colors duration-300"
        aria-label="Call us"
      >
        <Phone size={24} className="stroke-[2.5]" />
      </motion.a>
    </div>
  );
}

export function SupplierBuyerCTA() {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
        <div className="market-card border-t-2 border-t-accent p-6">
          <h3 className="font-serif text-2xl font-bold text-primary">Become a Verified Supplier</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Register your company, upload products, verify mobile OTP, and wait for admin review.</p>
          <Link to="/suppliers" className="market-button mt-5 inline-flex min-h-12 items-center bg-accent px-5 py-3 text-sm font-bold text-white">
            Become Supplier
          </Link>
        </div>
        <div className="market-card border-t-2 border-t-accent p-6">
          <h3 className="font-serif text-2xl font-bold text-primary">Submit a Buyer Requirement</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Tell us what you need, upload a reference image, and generate a verified sourcing lead.</p>
          <Link to="/buyers" className="market-button mt-5 inline-flex min-h-12 items-center bg-primary px-5 py-3 text-sm font-bold text-white">
            Submit Requirement
          </Link>
        </div>
      </div>
    </section>
  );
}

export function MiniFAQ() {
  const items = useMemo(() => [
    ['Do buyers see supplier contact details?', 'No. Truvex hides direct supplier contact details and routes enquiries through the platform.'],
    ['Is OTP real?', 'This frontend uses a local demo OTP flow. Backend verification can be connected later.'],
    ['Who reviews supplier registration?', 'The supplier flow ends in an admin review state after OTP verification.'],
  ], []);

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">FAQ</div>
        <div className="grid gap-3">
          {items.map(([q, a]) => (
            <div key={q} className="market-card p-4">
              <h3 className="text-sm font-bold text-primary">{q}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
