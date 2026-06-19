import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Filter, Search, Tag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SectionHeader,
  categories as staticCategories,
} from '../MarketplaceComponents';
import { getCategories } from '../../../services/categoryService';

// Unsplash fallback mapping for beautiful, professional visual representation of subcategories
const imageFallbacks: Record<string, string> = {
  'cement-concrete': 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=500&q=80',
  'tmt-bars': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80',
  'bricks-blocks': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80',
  'cnc-machines': 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=500&q=80',
  'packaging-machinery': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&q=80',
  'cotton-yarn': 'https://images.unsplash.com/photo-1528896977841-39a2947c319f?w=500&q=80',
  'denim-fabrics': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80'
};

function SubcategoryCard({ subcategory }: { subcategory: any }) {
  const imageUrl = subcategory.image || imageFallbacks[subcategory.slug] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80';

  return (
    <div className="bg-white border border-border shadow-sm rounded-none hover:shadow-md transition-shadow group flex flex-col h-full">
      {/* Thumbnail / Header Area */}
      <div className="h-[140px] w-full border-b border-border/50 overflow-hidden relative bg-slate-100">
        <img 
          src={imageUrl} 
          alt={subcategory.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-2.5 left-2.5 bg-[#0f172a]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 flex items-center gap-1 shadow-sm">
          <Tag size={10} className="text-accent animate-pulse" /> {subcategory.categoryName}
        </div>
      </div>
      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-[15px] text-primary group-hover:text-accent transition-colors line-clamp-1">
            <Link to={`/services?category=${subcategory.categorySlug}&search=${encodeURIComponent(subcategory.name)}`}>
              {subcategory.name}
            </Link>
          </h3>
          <p className="text-[12.5px] text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
            {subcategory.description || `Explore leading wholesale suppliers, pricing, and bulk catalogs for ${subcategory.name.toLowerCase()}.`}
          </p>
        </div>
        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
          <Link 
            to={`/services?category=${subcategory.categorySlug}&search=${encodeURIComponent(subcategory.name)}`}
            className="text-[11px] font-bold text-accent uppercase tracking-wide flex items-center gap-1 group-hover:underline"
          >
            Explore Products <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getCategories()
      .then((res) => {
        if (active) {
          const data = res.data || [];
          const mapped = data.map((cat: any) => {
            const staticCat = staticCategories.find(sc => 
              cat.name.toLowerCase().includes(sc.name.toLowerCase()) || 
              sc.name.toLowerCase().includes(cat.name.toLowerCase()) ||
              (cat.name.toLowerCase().includes('textile') && sc.name.toLowerCase().includes('textile'))
            );
            return {
              ...cat,
              image: cat.image || (staticCat ? staticCat.image : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300'),
              subList: (cat.subcategories || []).map((sub: any) => sub.name),
            };
          });
          setCategoriesList(mapped);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          console.error(err);
          setError('Failed to fetch categories. Please try again.');
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) return;
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number | ((p: number) => number)) => {
    setCurrentPage(newPage);
  };
  
  const itemsPerPage = 12; // 12 items per page

  // Calculate filters list dynamically from categories in database
  const filters = ['All', ...categoriesList.map(c => c.name)];

  // Aggregate and filter subcategories
  const filteredSubcategories = categoriesList.flatMap(cat => 
    (cat.subcategories || []).map((sub: any) => ({
      ...sub,
      categoryName: cat.name,
      categorySlug: cat.slug,
    }))
  ).filter(sub => {
    const matchesTab = activeFilter === 'All' || sub.categoryName === activeFilter;
    if (!matchesTab) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        sub.name.toLowerCase().includes(q) ||
        sub.categoryName.toLowerCase().includes(q) ||
        (sub.description && sub.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredSubcategories.length / itemsPerPage);
  const currentSubcategories = filteredSubcategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-[#f8fafc]">

      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Browse segments"
            title="Find suppliers by product subcategory"
            subtext="Use dynamic filters and search to drill down directly to the exact product subcategories and request quotes."
          />

          <div className="mb-6 grid gap-3 border border-border bg-white p-3 shadow-sm rounded-none lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex border border-border rounded-none">
              <Search className="ml-3 mt-2.5 text-muted-foreground" size={17} />
              <input 
                className="min-w-0 flex-1 px-3 py-2 text-sm outline-none" 
                placeholder="Search subcategories, materials, machinery..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <button 
                onClick={() => setCurrentPage(1)}
                className="bg-accent px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-primary"
              >
                Search
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`flex items-center gap-1 border px-4 py-2 text-[12px] font-bold rounded-none transition-colors ${
                    activeFilter === filter 
                    ? 'border-primary bg-primary text-white shadow-sm' 
                    : 'border-border bg-[#f8f9fa] text-primary hover:border-accent hover:bg-white'
                  }`}
                >
                  <Filter size={13} /> {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar */}
            <div className="w-full lg:w-[240px] shrink-0">
              <div className="bg-white border border-border shadow-sm rounded-none p-4 sticky top-[80px]">
                <h3 className="font-bold text-[13px] text-primary mb-3 uppercase tracking-wider border-b border-border/50 pb-2">All Categories</h3>
                {loading ? (
                  <p className="text-[12px] text-muted-foreground">Loading categories...</p>
                ) : error ? (
                  <p className="text-[12px] text-red-600">Error loading categories</p>
                ) : (
                  <ul className="flex flex-col gap-1 text-[13px]">
                    <li>
                      <button 
                        onClick={() => handleFilterChange('All')}
                        className={`transition-colors block py-1.5 text-left w-full font-medium ${
                          activeFilter === 'All' ? 'text-accent font-bold' : 'text-muted-foreground hover:text-accent'
                        }`}
                      >
                        All Segments
                      </button>
                    </li>
                    {categoriesList.map(c => (
                      <li key={c.name}>
                        <button 
                          onClick={() => handleFilterChange(c.name)}
                          className={`transition-colors block py-1.5 text-left w-full font-medium ${
                            activeFilter === c.name ? 'text-accent font-bold' : 'text-muted-foreground hover:text-accent'
                          }`}
                        >
                          {c.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            {/* Main Grid */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="flex items-center justify-center py-20 border border-dashed border-border/70 bg-white animate-pulse">
                  <p className="text-muted-foreground font-bold">Loading subcategories dynamically...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-20 border border-dashed border-red-300 bg-red-50">
                  <p className="text-red-600 font-bold">{error}</p>
                </div>
              ) : filteredSubcategories.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center py-20 border border-dashed border-border/70 bg-white"
                >
                  <p className="text-muted-foreground font-bold">No subcategories found matching your criteria.</p>
                </motion.div>
              ) : (
                <div>
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <AnimatePresence mode="popLayout">
                      {currentSubcategories.map((sub, index) => (
                        <motion.div
                          layout
                          key={sub.name}
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                          transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
                        >
                          <SubcategoryCard subcategory={sub} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <motion.div layout className="mt-8 flex justify-center gap-2">
                      <button 
                        onClick={() => handlePageChange(p => Math.max(1, (typeof p === 'number' ? p : 1) - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-border bg-white text-sm font-bold text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-colors rounded-none"
                      >
                        Prev
                      </button>
                      
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`w-9 h-9 flex items-center justify-center border text-sm font-bold rounded-none transition-colors ${
                            currentPage === i + 1 
                            ? 'border-primary bg-primary text-white' 
                            : 'border-border bg-white text-primary hover:border-primary'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      
                      <button 
                        onClick={() => handlePageChange(p => Math.min(totalPages, (typeof p === 'number' ? p : 1) + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-border bg-white text-sm font-bold text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-colors rounded-none"
                      >
                        Next
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              <div className="mt-8">
                {/* <PopularSearchStrip /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Not found?</div>
            <h2 className="font-serif text-2xl font-bold text-white">Request a supplier category</h2>
            <p className="mt-1 text-sm text-white/70">Tell us the product and city. Truvex will route the RFQ to relevant suppliers.</p>
          </div>
          <Link to="/contact" className="market-button bg-accent px-5 py-3 text-center text-sm font-bold text-white">Post New Requirement</Link>
        </div>
      </section>
    </div>
  );
}
