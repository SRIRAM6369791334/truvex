import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { EnquiryTicker, TrustSignalsBar } from '../MarketplaceComponents';
import { Search, ChevronRight } from 'lucide-react';
import AnimatedIcon from '../AnimatedIcon';
import { getServices } from '../../../services/serviceService';
import { getCategories } from '../../../services/categoryService';
import { submitServiceLead } from '../../../services/leadService';
import { getImageUrl } from '../../../lib/api';

export default function ServicesPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Quick RFQ form states
  const [allServicesList, setAllServicesList] = useState<any[]>([]);
  const [rfqServiceId, setRfqServiceId] = useState('');
  const [rfqQty, setRfqQty] = useState('');
  const [rfqMobile, setRfqMobile] = useState('');
  const [rfqSubmitting, setRfqSubmitting] = useState(false);
  const [rfqSuccess, setRfqSuccess] = useState(false);
  const [rfqError, setRfqError] = useState<string | null>(null);

  useEffect(() => {
    getServices()
      .then((res) => {
        setAllServicesList(res.data || []);
      })
      .catch((err) => console.error('Error fetching services for dropdown:', err));
  }, []);

  useEffect(() => {
    // Fetch categories for dropdown
    getCategories()
      .then((res) => {
        setCategories(res.data || []);
      })
      .catch((err) => console.error('Error fetching categories:', err));

    // Fetch initial services using parameters if present!
    const params: any = {};
    if (initialCategory !== 'All') {
      params.category = initialCategory;
    }
    if (initialSearch.trim()) {
      params.search = initialSearch.trim();
    }

    setLoading(true);
    getServices(params)
      .then((res) => {
        setServices(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching services:', err);
        setError('Failed to load services.');
        setLoading(false);
      });
  }, [initialCategory, initialSearch]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    setLoading(true);
    setError(null);

    const params: any = {};
    if (selectedCategory !== 'All') {
      params.category = selectedCategory;
    }
    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    getServices(params)
      .then((res) => {
        setServices(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error searching services:', err);
        setError('Failed to load search results.');
        setLoading(false);
      });
  };

  const handleQuickRFQSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqServiceId || !rfqMobile.trim()) {
      setRfqError('Service and Mobile Number are required.');
      return;
    }

    // Basic mobile validation
    if (rfqMobile.length !== 10) {
      setRfqError('Mobile number must be exactly 10 digits.');
      return;
    }

    setRfqSubmitting(true);
    setRfqError(null);

    try {
      const selectedService = allServicesList.find(s => String(s.id) === String(rfqServiceId));
      await submitServiceLead({
        full_name: 'Quick RFQ Buyer',
        mobile: rfqMobile,
        service_id: Number(rfqServiceId),
        quantity: rfqQty || undefined,
        requirement_details: `Quick RFQ for Service: ${selectedService ? selectedService.title : 'Unknown'}.`
      });
      setRfqSuccess(true);
      setRfqServiceId('');
      setRfqQty('');
      setRfqMobile('');
    } catch (err: any) {
      console.error(err);
      setRfqError('Failed to submit RFQ. Please try again.');
    } finally {
      setRfqSubmitting(false);
    }
  };

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const currentServices = services.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen">
      
      {/* 1. ADVANCED B2B FUNCTIONAL HEADER */}
      <section className="bg-primary pt-24 pb-16 relative border-b-4 border-accent">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
        <div className="mx-auto max-w-7xl px-4 relative z-10 flex flex-col items-center justify-center text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Home / Services / Categories</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Explore B2B Services & Products</h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10">Find verified suppliers across industrial and commercial services.</p>
          
          <form onSubmit={handleSearch} className="w-full max-w-3xl flex flex-col gap-4">
             {/* Massive Search Bar Container */}
             <div className="flex flex-col sm:flex-row bg-white rounded-none overflow-hidden shadow-2xl p-1.5 focus-within:ring-4 focus-within:ring-accent/20 transition-shadow">
               
               {/* Category Dropdown */}
               <div className="relative flex items-center bg-slate-50 border-r border-slate-200 rounded-none hover:bg-slate-100 transition-colors w-full sm:w-[220px]">
                 <select 
                   value={selectedCategory}
                   onChange={(e) => setSelectedCategory(e.target.value)}
                   className="w-full h-14 bg-transparent pl-5 pr-10 text-sm text-slate-700 font-bold outline-none cursor-pointer appearance-none"
                 >
                   <option value="All">All Categories</option>
                   {categories.map((cat) => (
                     <option key={cat.id} value={cat.id || cat.slug}>
                       {cat.name}
                     </option>
                   ))}
                 </select>
                 <div className="absolute right-4 pointer-events-none text-slate-400 text-xs">
                   ▼
                 </div>
               </div>

               {/* Product Search */}
               <div className="flex-1 relative flex items-center bg-white">
                 <Search size={20} className="absolute left-4 text-slate-400" />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="What service or product are you looking for?" 
                   className="w-full h-14 pl-12 pr-4 text-base text-slate-800 outline-none bg-transparent placeholder:text-slate-400 font-medium" 
                 />
               </div>

               {/* Search Button */}
               <button type="submit" className="bg-accent text-white h-14 px-10 font-bold uppercase tracking-wider text-sm hover:bg-[#b07b32] transition-colors rounded-none flex items-center justify-center mt-2 sm:mt-0">
                 Search
               </button>
             </div>
             
             {/* Trending Tags */}
             <div className="flex flex-wrap items-center justify-center gap-2 text-sm mt-3">
                <span className="text-white/50 font-bold uppercase tracking-wider text-[11px] mr-2">Trending:</span>
                <button 
                  type="button" 
                  onClick={() => { setSearchQuery('CNC'); handleSearch(); }}
                  className="border border-white/20 hover:bg-white/10 text-white px-4 py-1.5 rounded-none transition-colors text-xs font-medium"
                >
                  CNC Machines
                </button>
                <button 
                  type="button" 
                  onClick={() => { setSearchQuery('Packaging'); handleSearch(); }}
                  className="border border-white/20 hover:bg-white/10 text-white px-4 py-1.5 rounded-none transition-colors text-xs font-medium"
                >
                  Packaging Machinery
                </button>
             </div>
          </form>
        </div>
      </section>


      {/* 3. MAIN LAYOUT: DIRECTORY GRID + RFQ BANNER */}
      <section className="px-4 py-20 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl text-center mb-16">
           <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#c68c3e] mb-4">What We Supply</h2>
           <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1A30] mb-6">Our Sourcing Services</h3>
           <p className="text-lg text-slate-500 max-w-3xl mx-auto">
             We source across a wide range of product categories — always from trusted manufacturers, always at the best price.
           </p>
        </div>
        <div className="mx-auto max-w-7xl grid lg:grid-cols-4 gap-8">
           
           {/* LEFT COLUMN: Premium RFQ Lead Form */}
           <div className="lg:col-span-1">
              <div className="bg-white rounded-none shadow-lg sticky top-24 overflow-hidden border-2 border-primary/5">
                 <div className="bg-primary p-6 text-center border-b-4 border-accent flex flex-col items-center">
                    <div className="mb-2 text-accent">
                       <AnimatedIcon icon="document" size={50} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white">Post Requirement</h3>
                    <p className="text-sm text-white/70 mt-2">Get quotes from verified suppliers</p>
                 </div>
                 
                 <div className="p-6 bg-slate-50/50">
                    {rfqSuccess ? (
                      <div className="text-center py-6">
                        <div className="text-emerald-500 mb-3 flex justify-center">
                          <AnimatedIcon icon="success" size={50} />
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg">Thank You!</h4>
                        <p className="text-sm text-slate-500 mt-2">Our sourcing team will contact you shortly.</p>
                        <button 
                          onClick={() => setRfqSuccess(false)}
                          className="mt-6 text-xs text-accent font-bold uppercase hover:underline"
                        >
                          Submit Another
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleQuickRFQSubmit} className="flex flex-col gap-4">
                        {rfqError && (
                          <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-600 rounded-none text-left">
                            {rfqError}
                          </div>
                        )}
                        <div>
                          <select 
                            required
                            value={rfqServiceId}
                            onChange={(e) => setRfqServiceId(e.target.value)}
                            className="w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm cursor-pointer text-slate-700 font-medium" 
                          >
                            <option value="" className="text-slate-400">Select Service *</option>
                            {allServicesList.map((service) => (
                              <option key={service.id} value={service.id} className="text-slate-800">
                                {service.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <input 
                            type="text" 
                            value={rfqQty}
                            onChange={(e) => setRfqQty(e.target.value)}
                            placeholder="Estimated Quantity" 
                            className="w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" 
                          />
                        </div>
                        <div>
                          <input 
                            type="text" 
                            required
                            value={rfqMobile}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, ''); // only allow digits
                              if (value.length <= 10) {
                                setRfqMobile(value);
                              }
                            }}
                            placeholder="Mobile Number *" 
                            className="w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" 
                          />
                        </div>
                        <button 
                          type="submit" 
                          disabled={rfqSubmitting}
                          className="w-full bg-accent text-white font-bold text-sm uppercase tracking-wider py-4 rounded-none hover:bg-[#b07b32] hover:shadow-md transition-all mt-2 disabled:opacity-50"
                        >
                          {rfqSubmitting ? 'Submitting...' : 'Get Quotes Now'}
                        </button>
                      </form>
                    )}

                    <div className="mt-6 pt-5 border-t border-slate-200 space-y-3 text-left">
                       <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                         <AnimatedIcon icon="success" size={24} /> 5x Faster Responses
                       </div>
                       <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                         <AnimatedIcon icon="success" size={24} /> 100% Free Service for Buyers
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* RIGHT COLUMN: Directory Services */}
           <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-primary">Dynamic Sourcing Directory</h2>
                <Link to="/categories" className="text-sm font-bold text-accent hover:underline hidden sm:block">View Categories &rarr;</Link>
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="h-40 bg-slate-50 border border-slate-100 rounded-none animate-pulse"></div>
                  ))}
                </div>
              ) : error ? (
                <div className="p-8 border border-dashed border-red-200 bg-red-50 text-center">
                  <p className="text-red-600 font-bold">{error}</p>
                </div>
              ) : services.length === 0 ? (
                <div className="p-8 border border-dashed border-slate-200 text-center">
                  <p className="text-slate-500 font-bold">No sourcing services found matching the search criteria.</p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentServices.map((service: any) => (
                      <div key={service.id} className="group flex flex-col sm:flex-row gap-5 bg-white border border-slate-100 rounded-none p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-300">
                         <div className="w-full sm:w-28 h-40 sm:h-28 flex-shrink-0 bg-slate-50 rounded-none overflow-hidden relative">
                            <img src={getImageUrl(service.image) || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300'} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                         </div>
                         <div className="flex-1 text-left flex flex-col justify-between">
                            <div>
                              <span className="text-[11px] font-bold text-accent uppercase tracking-wider">{service.category_name}</span>
                              <h3 className="font-bold text-primary text-[17px] mb-1 group-hover:text-accent transition-colors mt-0.5">
                                <Link to={`/service/${service.id || service.slug}`}>{service.title}</Link>
                              </h3>
                              <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">{service.description}</p>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                              {service.price ? (
                                <span className="text-xs font-bold text-slate-700">₹ {service.price} / {service.price_unit || 'Piece'}</span>
                              ) : (
                                <span className="text-[11px] font-bold text-slate-400">Price on request</span>
                              )}
                              <Link to={`/service/${service.id || service.slug}`} className="text-xs font-bold text-accent inline-flex items-center gap-0.5 hover:underline">
                                View Details <ChevronRight size={12} />
                              </Link>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                      <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-none"
                      >
                        Previous
                      </button>
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 flex items-center justify-center text-sm font-bold transition-colors rounded-none ${
                              currentPage === page
                                ? 'bg-accent text-white border-accent'
                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-none"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#c68c3e] mb-4">Simple Process</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1A30] mb-6">How It Works</h3>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-16">
            Getting manufacturer-direct products for your business is simple when you work with Truvex.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative mt-8">
            {/* Horizontal Connecting line (hidden on mobile) */}
            <div className="absolute top-[45px] left-[12.5%] right-[12.5%] h-[2px] bg-[#c68c3e]/30 hidden lg:block -z-0"></div>
            
            {[
              {
                id: 1,
                title: 'Share Your Requirement',
                desc: 'Tell us what products you need — category, quantity, quality standards, and delivery location. A quick call or WhatsApp is enough to get started.'
              },
              {
                id: 2,
                title: 'We Source & Quote',
                desc: 'We tap our manufacturer network, finalise the right source, and send you a competitive quote — usually within 24–48 hours.'
              },
              {
                id: 3,
                title: 'Confirm & We Deliver',
                desc: 'Once you approve the quote, we handle production coordination, quality checks, and delivery to your location. Fully documented with GST invoicing.'
              },
              {
                id: 4,
                title: 'Long-Term Partnership',
                desc: 'Most of our clients come back for more. We build a sourcing profile for your business so repeat orders get faster and easier every time.'
              }
            ].map((step) => (
              <div key={step.id} className="group flex flex-col items-center relative z-10 text-center transition-all duration-300 hover:-translate-y-2">
                <div className="w-[90px] h-[90px] rounded-full bg-[#FDFBF7] p-2 flex items-center justify-center mb-6 relative">
                  <div className="w-full h-full rounded-full bg-[#c68c3e]/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <div className="w-[52px] h-[52px] rounded-full bg-[#c68c3e] flex items-center justify-center shadow-lg shadow-[#c68c3e]/30">
                      <span className="font-serif text-2xl font-bold text-[#0A1A30]">{step.id}</span>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-serif font-bold text-[#0A1A30] mb-3">{step.title}</h4>
                <p className="text-[15px] text-slate-600 max-w-sm mx-auto leading-relaxed px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
