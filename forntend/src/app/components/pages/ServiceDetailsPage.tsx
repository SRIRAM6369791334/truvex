import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { ChevronRight, ShieldCheck, CheckCircle2, Truck, ArrowRight } from 'lucide-react';
import { CategoryCard, categories } from '../MarketplaceComponents';
import { getServiceById, getServices } from '../../../services/serviceService';
import { submitServiceLead } from '../../../services/leadService';

export default function ServiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [activeImage, setActiveImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarServices, setSimilarServices] = useState<any[]>([]);

  // Form states
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [requirementDetails, setRequirementDetails] = useState('');
  const [quantity, setQuantity] = useState('100');
  const [unit, setUnit] = useState('Pieces');
  const [deliveryPincode, setDeliveryPincode] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getServiceById(id)
      .then((res) => {
        const data = res.data;
        setService(data);
        if (data.image) {
          setActiveImage(data.image);
        } else if (Array.isArray(data.images) && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }

        if (data.category_id) {
          getServices({ category: data.category_id })
            .then((simRes) => {
              const allSim = simRes.data || [];
              const filteredSim = allSim.filter((s: any) => String(s.id) !== String(data.id)).slice(0, 4);
              setSimilarServices(filteredSim);
            })
            .catch((err) => console.error("Failed to fetch similar services", err));
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch service details.');
        setLoading(false);
      });
  }, [id]);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobile.trim()) {
      setFormError('Full Name and Mobile Number are required.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setFormError('Mobile number must be a valid 10-digit Indian number.');
      return;
    }
    
    setFormSubmitting(true);
    setFormError(null);

    try {
      await submitServiceLead({
        service_id: service?.id,
        full_name: fullName,
        mobile: mobile,
        email: email || undefined,
        requirement_details: requirementDetails || `Interested in ${service?.title}`,
        quantity: quantity,
        unit: unit,
        delivery_pincode: deliveryPincode || undefined,
      });
      setFormSuccess(true);
      setFullName('');
      setMobile('');
      setEmail('');
      setRequirementDetails('');
      setQuantity('100');
      setUnit('Pieces');
      setDeliveryPincode('');
    } catch (err: any) {
      console.error(err);
      setFormError('Failed to submit enquiry. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#f0f2f5] min-h-screen py-20 text-center">
        <p className="text-muted-foreground font-bold">Loading service details...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="bg-[#f0f2f5] min-h-screen py-20 text-center">
        <p className="text-red-600 font-bold">{error || 'Service not found'}</p>
        <Link to="/services" className="mt-4 inline-block text-accent font-bold hover:underline">
          &larr; Back to Services
        </Link>
      </div>
    );
  }

  // Handle images gallery
  const galleryImages = Array.isArray(service.images) && service.images.length > 0
    ? service.images
    : [service.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'];

  // Handle specifications
  const specsList = Array.isArray(service.specs) ? service.specs : [];

  return (
    <div className="bg-[#f0f2f5] min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center gap-2 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/services" className="hover:text-accent transition-colors">Services</Link>
          <ChevronRight size={12} />
          <span className="text-muted-foreground">{service.category_name || 'Category'}</span>
          <ChevronRight size={12} />
          <span className="text-primary">{service.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Main Product Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Product Card */}
            <div className="bg-white rounded-none border border-border shadow-sm p-5 md:p-8">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">{service.title}</h1>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50 text-sm font-medium">
                <span className="text-[#c68c3e] text-xl md:text-2xl font-bold">
                  {service.price ? `₹ ${service.price} ` : 'Price on Request'}
                  {service.price && <span className="text-sm font-normal text-slate-500">/ {service.price_unit || 'Piece'}</span>}
                </span>
                <span className="h-4 w-px bg-border"></span>
                <span className="text-teal-600 flex items-center gap-1">
                  <CheckCircle2 size={16} /> {service.in_stock ? 'Available' : 'Contact for Sourcing'}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="border border-border/50 rounded-none bg-slate-50 aspect-square flex items-center justify-center overflow-hidden">
                    <img src={activeImage || galleryImages[0]} alt={service.title} className="w-full h-full object-contain" />
                  </div>
                  {galleryImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {galleryImages.map((img: string, idx: number) => (
                        <button 
                          key={idx} 
                          onClick={() => setActiveImage(img)}
                          className={`aspect-square border rounded-none overflow-hidden ${activeImage === img ? 'border-accent ring-2 ring-accent/20' : 'border-border/50 hover:border-primary/30'} transition-all`}
                        >
                          <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Specs Overview */}
                <div>
                  <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider border-b border-border pb-2">Product Specifications</h3>
                  {specsList.length > 0 ? (
                    <table className="w-full text-sm">
                      <tbody>
                        {specsList.map((spec: any, idx: number) => {
                          const label = spec.label || spec.name || spec.key || '';
                          const val = spec.value || spec.val || '';
                          return (
                            <tr key={idx} className="border-b border-border/30 last:border-0">
                              <td className="py-2.5 text-muted-foreground font-medium w-1/2">{label}</td>
                              <td className="py-2.5 text-primary font-semibold">{val}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-sm text-muted-foreground">Contact us for custom specifications and sourcing details.</p>
                  )}
                  
                  <div className="mt-6 space-y-3 border-t border-border/50 pt-5 text-left">
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <Truck size={18} className="text-accent shrink-0 mt-0.5" />
                      <span>{service.delivery_info || 'Delivery all over India. Fast turnaround and transit support.'}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <ShieldCheck size={18} className="text-teal-600 shrink-0 mt-0.5" />
                      <span>100% Quality Checked before dispatch. MOQ: {service.moq || 1} units.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-white rounded-none border border-border shadow-sm p-5 md:p-8 text-left">
              <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider border-b border-border pb-2">Product Description</h3>
              <div className="prose prose-sm max-w-none text-slate-600 space-y-4">
                <p>{service.long_description || service.description}</p>
                
                {Array.isArray(service.features) && service.features.length > 0 && (
                  <div>
                    <p className="text-primary font-bold">Key Features:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {service.features.map((feat: string, idx: number) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {Array.isArray(service.benefits) && service.benefits.length > 0 && (
                  <div>
                    <p className="text-primary font-bold">Benefits:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {service.benefits.map((benefit: string, idx: number) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Lead Form Sidebar */}
          <div className="lg:col-span-1 text-left">
            <div className="bg-white rounded-none border-2 border-primary/5 shadow-xl sticky top-24">
              <div className="bg-primary p-6 text-center border-b-4 border-accent">
                <h3 className="font-serif text-2xl font-bold text-white mb-1">Get Best Quote</h3>
                <p className="text-[13px] text-white/70">Fill out the form for the latest price</p>
              </div>
              
              <div className="p-6 bg-slate-50/50">
                {formSuccess ? (
                  <div className="text-center py-6">
                    <div className="text-emerald-500 mb-3 flex justify-center">
                      <ShieldCheck size={50} />
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg">Enquiry Submitted!</h4>
                    <p className="text-sm text-slate-500 mt-2">Thank you for submitting your sourcing enquiry. Our team will contact you with details shortly.</p>
                    <button 
                      onClick={() => setFormSuccess(false)}
                      className="mt-6 text-xs text-accent font-bold uppercase hover:underline"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitLead} className="space-y-4">
                    {formError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-600 rounded-none">
                        {formError}
                      </div>
                    )}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name / Company *</label>
                      <input 
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your name or company" 
                        className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Mobile Number *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 border border-r-0 border-slate-200 bg-slate-100 text-sm text-slate-500 font-bold">+91</span>
                        <input 
                          type="tel" 
                          required
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="Enter Mobile Number" 
                          className="flex-1 rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Requirement Details</label>
                      <textarea 
                        rows={2}
                        value={requirementDetails}
                        onChange={(e) => setRequirementDetails(e.target.value)}
                        placeholder="I am interested in this product. Please send quote." 
                        className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm resize-none"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Quantity</label>
                        <input 
                          type="text" 
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" 
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Unit</label>
                        <select 
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
                        >
                          <option>Pieces</option>
                          <option>Kilograms</option>
                          <option>Tons</option>
                          <option>Sets</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Delivery Pincode</label>
                      <input 
                        type="text" 
                        value={deliveryPincode}
                        onChange={(e) => setDeliveryPincode(e.target.value)}
                        placeholder="E.g. 400001" 
                        className="w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" 
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={formSubmitting}
                      className="w-full bg-accent text-white font-bold text-sm uppercase tracking-wider py-4 rounded-none hover:bg-[#b07b32] hover:shadow-md transition-all mt-5 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {formSubmitting ? 'Sending...' : 'Send Enquiry'}
                    </button>
                  </form>
                )}

                <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  <ShieldCheck size={14} className="text-teal-500" /> Safe & Secure
                </div>
              </div>
            </div>
          </div>
 
        </div>
      </div>

      {/* Explore Similar Products Section */}
      {similarServices.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 mt-8">
          <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
            <h2 className="font-serif text-2xl font-bold text-primary">Explore Similar Products</h2>
            <Link to="/services" className="text-sm font-bold text-accent hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarServices.map((simService) => (
              <div key={simService.id} className="group flex flex-col bg-white border border-slate-100 rounded-none shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-300">
                <div className="w-full h-48 bg-slate-50 rounded-none overflow-hidden relative">
                  <img src={simService.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300'} alt={simService.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-5 text-left flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[11px] font-bold text-accent uppercase tracking-wider">{simService.category_name}</span>
                    <h3 className="font-bold text-primary text-base mb-1 group-hover:text-accent transition-colors mt-0.5 line-clamp-2">
                      <Link to={`/service/${simService.id || simService.slug}`}>{simService.title}</Link>
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                    {simService.price ? (
                      <span className="text-sm font-bold text-slate-700">₹ {simService.price}</span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400">Price on request</span>
                    )}
                    <Link to={`/service/${simService.id || simService.slug}`} className="text-xs font-bold text-accent hover:underline">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
