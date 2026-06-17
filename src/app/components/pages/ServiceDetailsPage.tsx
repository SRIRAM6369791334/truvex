import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronRight, ShieldCheck, CheckCircle2, Truck, ArrowRight } from 'lucide-react';
import { CategoryCard, categories } from '../MarketplaceComponents';

const productSpecs = [
  { label: 'Minimum Order Quantity', value: '100 Pieces' },
  { label: 'Material', value: 'Stainless Steel 304' },
  { label: 'Brand', value: 'Industrial Pro' },
  { label: 'Application', value: 'Manufacturing, Automotive' },
  { label: 'Packaging Type', value: 'Corrugated Box' },
  { label: 'Delivery Time', value: '3-5 Working Days' },
];

export default function ServiceDetailsPage() {
  const [activeImage, setActiveImage] = useState('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800');
  const images = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800',
    'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800'
  ];

  return (
    <div className="bg-[#f0f2f5] min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center gap-2 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/services" className="hover:text-accent transition-colors">Services</Link>
          <ChevronRight size={12} />
          <Link to="/categories" className="hover:text-accent transition-colors">Industrial Machinery</Link>
          <ChevronRight size={12} />
          <span className="text-primary">CNC Precision Components</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Main Product Details (Takes up 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Product Card */}
            <div className="bg-white rounded-none border border-border shadow-sm p-5 md:p-8">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">High Precision CNC Machined Components</h1>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50 text-sm font-medium">
                <span className="text-[#c68c3e] text-xl md:text-2xl font-bold">₹ 450 <span className="text-sm font-normal text-slate-500">/ Piece</span></span>
                <span className="h-4 w-px bg-border"></span>
                <span className="text-teal-600 flex items-center gap-1"><CheckCircle2 size={16} /> In Stock</span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="border border-border/50 rounded-none bg-slate-50 aspect-square flex items-center justify-center overflow-hidden">
                    <img src={activeImage} alt="Product" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((img, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveImage(img)}
                        className={`aspect-square border rounded-none overflow-hidden ${activeImage === img ? 'border-accent ring-2 ring-accent/20' : 'border-border/50 hover:border-primary/30'} transition-all`}
                      >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specs Overview */}
                <div>
                  <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider border-b border-border pb-2">Product Specifications</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {productSpecs.map((spec, idx) => (
                        <tr key={idx} className="border-b border-border/30 last:border-0">
                          <td className="py-2.5 text-muted-foreground font-medium w-1/2">{spec.label}</td>
                          <td className="py-2.5 text-primary font-semibold">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="mt-6 space-y-3 border-t border-border/50 pt-5">
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <Truck size={18} className="text-accent shrink-0 mt-0.5" />
                      <span>Delivery all over India within 3-5 days depending on location.</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <ShieldCheck size={18} className="text-teal-600 shrink-0 mt-0.5" />
                      <span>100% Quality Checked before dispatch.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-white rounded-none border border-border shadow-sm p-5 md:p-8">
              <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider border-b border-border pb-2">Product Description</h3>
              <div className="prose prose-sm max-w-none text-slate-600">
                <p>We are a leading manufacturer of High Precision CNC Machined Components. Our components are fabricated using top-grade stainless steel and aluminum, sourced from trusted vendors in the market.</p>
                <p className="mt-4 mb-2 text-primary font-bold">Key Features:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Corrosion resistant finish</li>
                  <li>High tensile strength</li>
                  <li>Dimensional accuracy</li>
                  <li>Durable construction</li>
                </ul>
                <p className="mt-4">Our infrastructure is equipped with the latest VMC and CNC turning centers, allowing us to deliver bulk quantities within the stipulated timeframe without compromising on quality.</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Lead Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-none border-2 border-primary/5 shadow-xl sticky top-24">
              <div className="bg-primary p-6 text-center border-b-4 border-accent">
                <h3 className="font-serif text-2xl font-bold text-white mb-1">Get Best Quote</h3>
                <p className="text-[13px] text-white/70">Fill out the form for the latest price</p>
              </div>
              
              <div className="p-6 bg-slate-50/50">
                <form className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name / Company</label>
                    <input type="text" placeholder="Enter your name or company" className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Mobile Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-slate-200 bg-slate-100 text-sm text-slate-500 font-bold">+91</span>
                      <input type="tel" placeholder="Enter Mobile Number" className="flex-1 rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                    <input type="email" placeholder="Enter your email" className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Requirement Details</label>
                    <textarea 
                      rows={2}
                      placeholder="I am interested in this product. Please send quote." 
                      className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm resize-none"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Quantity</label>
                      <input type="number" defaultValue={100} className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Unit</label>
                      <select className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm">
                        <option>Pieces</option>
                        <option>Kilograms</option>
                        <option>Tons</option>
                        <option>Sets</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Delivery Pincode</label>
                    <input type="text" placeholder="E.g. 400001" className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" />
                  </div>
                  <button type="button" className="w-full bg-accent text-white font-bold text-sm uppercase tracking-wider py-4 rounded-none hover:bg-yellow-600 hover:shadow-md transition-all mt-5 flex items-center justify-center gap-2">
                    Send Enquiry
                  </button>
                </form>

                <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  <ShieldCheck size={14} className="text-teal-500" /> Safe & Secure
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Explore Similar Products Section */}
      <div className="mx-auto max-w-7xl px-4 mt-8">
        <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
          <h2 className="font-serif text-2xl font-bold text-primary">Explore Similar Products</h2>
          <Link to="/categories" className="text-sm font-bold text-accent hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(0, 4).map((cat, idx) => (
            <CategoryCard key={idx} category={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}
