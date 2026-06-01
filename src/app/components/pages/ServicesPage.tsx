import { Link } from 'react-router';
import { EnquiryTicker, TrustSignalsBar } from '../MarketplaceComponents';
import { Search, ChevronRight } from 'lucide-react';
import AnimatedIcon from '../AnimatedIcon';
const directoryCategories = [
  {
    title: 'Industrial Machinery',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300',
    subcategories: ['Packaging Machines', 'Food Processing Machinery', 'CNC Machines', 'Construction Machinery']
  },
  {
    title: 'Building & Construction',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300',
    subcategories: ['Cement & Concrete', 'Steel & Metal Alloys', 'Pipes & Fittings', 'Tiles & Marbles']
  },
  {
    title: 'Hospitality & Commercial',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
    subcategories: ['Commercial Kitchen Equipment', 'Hotel Furniture', 'Housekeeping Supplies', 'Linens & Bedding']
  },
  {
    title: 'Apparel & Textiles',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300',
    subcategories: ['Cotton Yarns', 'Uniforms & Workwear', 'Fashion Fabrics', 'Textile Machinery']
  },
  {
    title: 'Electronics & Electrical',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300',
    subcategories: ['Transformers & Stabilizers', 'LED Lighting', 'Industrial Cables', 'Generators & Motors']
  },
  {
    title: 'Chemicals & Materials',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300',
    subcategories: ['Industrial Chemicals', 'Plastics & Polymers', 'Adhesives & Sealants', 'Paints & Coatings']
  },
  {
    title: 'Agriculture & Farming',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300',
    subcategories: ['Tractors & Implements', 'Irrigation Systems', 'Fertilizers', 'Agro Chemicals']
  },
  {
    title: 'Packaging & Paper',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=300',
    subcategories: ['Corrugated Boxes', 'Packaging Films', 'Paper Products', 'Glass Bottles']
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-[#f0f2f5] min-h-screen">
      
      {/* 1. ADVANCED B2B FUNCTIONAL HEADER */}
      <section className="bg-primary pt-24 pb-16 relative border-b-4 border-accent">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
        <div className="mx-auto max-w-7xl px-4 relative z-10 flex flex-col items-center justify-center text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Home / Services / Categories</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Explore B2B Categories</h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10">Find verified suppliers across 10,000+ industrial and commercial categories.</p>
          
          <div className="w-full max-w-3xl flex flex-col gap-4">
             {/* Massive Search Bar Container */}
             <div className="flex flex-col sm:flex-row bg-white rounded-none overflow-hidden shadow-2xl p-1.5 focus-within:ring-4 focus-within:ring-accent/20 transition-shadow">
               
               {/* Category Dropdown */}
               <div className="relative flex items-center bg-slate-50 border-r border-slate-200 rounded-none hover:bg-slate-100 transition-colors w-full sm:w-[200px]">
                 <select className="w-full h-14 bg-transparent pl-5 pr-10 text-sm text-slate-700 font-bold outline-none cursor-pointer appearance-none">
                   <option>All Categories</option>
                   <option>Machinery & Equipment</option>
                   <option>Building Materials</option>
                   <option>Chemicals</option>
                   <option>Textiles & Apparel</option>
                 </select>
                 <div className="absolute right-4 pointer-events-none text-slate-400 text-xs">
                   ▼
                 </div>
               </div>

               {/* Product Search */}
               <div className="flex-1 relative flex items-center bg-white">
                 <Search size={20} className="absolute left-4 text-slate-400" />
                 <input type="text" placeholder="What are you looking for?" className="w-full h-14 pl-12 pr-4 text-base text-slate-800 outline-none bg-transparent placeholder:text-slate-400 font-medium" />
               </div>

               {/* Search Button */}
               <button className="bg-accent text-white h-14 px-10 font-bold uppercase tracking-wider text-sm hover:bg-yellow-600 transition-colors rounded-none flex items-center justify-center mt-2 sm:mt-0">
                 Search
               </button>
             </div>
             
             {/* Trending Tags */}
             <div className="flex flex-wrap items-center justify-center gap-2 text-sm mt-3">
                <span className="text-white/50 font-bold uppercase tracking-wider text-[11px] mr-2">Trending Searches:</span>
                <Link to="/services" className="border border-white/20 hover:bg-white/10 text-white px-4 py-1.5 rounded-none transition-colors text-xs font-medium">Solar Panels</Link>
                <Link to="/services" className="border border-white/20 hover:bg-white/10 text-white px-4 py-1.5 rounded-none transition-colors text-xs font-medium">CNC Machines</Link>
                <Link to="/services" className="border border-white/20 hover:bg-white/10 text-white px-4 py-1.5 rounded-none transition-colors text-xs font-medium">Cotton Yarn</Link>
             </div>
          </div>
        </div>
      </section>

      {/* <EnquiryTicker /> */}

      {/* 2. MAIN LAYOUT: DIRECTORY GRID + RFQ BANNER */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-4 gap-8">
           
           {/* LEFT COLUMN: Premium RFQ Lead Form */}
           <div className="lg:col-span-1">
              <div className="bg-white rounded-none shadow-lg sticky top-24 overflow-hidden border-2 border-primary/5">
                 <div className="bg-primary p-6 text-center border-b-4 border-accent flex flex-col items-center">
                    <div className="mb-2">
                       <AnimatedIcon icon="document" size={50} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white">Post Requirement</h3>
                    <p className="text-sm text-white/70 mt-2">Get quotes from verified suppliers</p>
                 </div>
                 
                 <div className="p-6 bg-slate-50/50">
                   <form className="flex flex-col gap-4">
                     <div>
                       <input type="text" placeholder="Product / Service Name" className="w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" />
                     </div>
                     <div>
                       <input type="text" placeholder="Estimated Quantity" className="w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" />
                     </div>
                     <div>
                       <input type="tel" placeholder="Mobile Number" className="w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm" />
                     </div>
                     <button type="button" className="w-full bg-accent text-white font-bold text-sm uppercase tracking-wider py-4 rounded-none hover:bg-yellow-600 hover:shadow-md transition-all mt-2">
                       Get Quotes Now
                     </button>
                   </form>

                   <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
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

           {/* RIGHT COLUMN: Directory Categories */}
           <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-primary">Browse Categories</h2>
                <Link to="/buyers" className="text-sm font-bold text-accent hover:underline hidden sm:block">View All Categories &rarr;</Link>
              </div>
                
              <div className="grid md:grid-cols-2 gap-6">
                {directoryCategories.map((category, idx) => (
                  <div key={idx} className="group flex flex-col sm:flex-row gap-5 bg-white border border-slate-100 rounded-none p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-300">
                     <div className="w-full sm:w-28 h-40 sm:h-28 flex-shrink-0 bg-slate-50 rounded-none overflow-hidden relative">
                        <img src={category.image} alt={category.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                     </div>
                     <div className="flex-1">
                        <h3 className="font-bold text-primary text-lg mb-3 group-hover:text-accent transition-colors">{category.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.map((sub, sIdx) => (
                            <span key={sIdx} className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-none hover:bg-primary hover:text-white cursor-pointer transition-colors">
                              {sub}
                            </span>
                          ))}
                        </div>
                        <Link to="/buyers" className="text-xs font-bold text-accent mt-4 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          View {category.title} Suppliers <ChevronRight size={14} />
                        </Link>
                     </div>
                  </div>
                ))}
              </div>
           </div>

        </div>
      </section>

      {/* <TrustSignalsBar /> */}
      
    </div>
  );
}
