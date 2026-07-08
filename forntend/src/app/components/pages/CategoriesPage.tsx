import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Filter, Search, Tag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SectionHeader,
  categories as staticCategories,
} from '../MarketplaceComponents';
import { getCategories } from '../../../services/categoryService';
import { getImageUrl } from '../../../lib/api';

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

function CategoryCard({ category, onSelect }: { category: any; onSelect: (name: string) => void }) {
  const imageUrl = category.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80';

  return (
    <div className="bg-white border border-border shadow-sm rounded-none hover:shadow-md transition-shadow group flex flex-col h-full">
      {/* Thumbnail / Header Area */}
      <div className="h-[140px] w-full border-b border-border/50 overflow-hidden relative bg-slate-100">
        <img 
          src={imageUrl} 
          alt={category.name} 
          className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-[15px] text-primary group-hover:text-accent transition-colors line-clamp-1">
            <button 
              onClick={() => onSelect(category.name)} 
              className="text-left font-bold text-primary group-hover:text-accent transition-colors"
            >
              {category.name}
            </button>
          </h3>
          <p className="text-[12.5px] text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
            {category.description || `Explore leading subcategories, wholesale suppliers, and pricing for ${category.name.toLowerCase()}.`}
          </p>
        </div>
        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
          <button 
            onClick={() => onSelect(category.name)}
            className="text-[11px] font-bold text-accent uppercase tracking-wide flex items-center gap-1 group-hover:underline text-left"
          >
            Explore Subcategories <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SubcategoryCard({ subcategory }: { subcategory: any }) {
  const imageUrl = getImageUrl(subcategory.image) || imageFallbacks[subcategory.slug] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80';

  return (
    <div className="bg-white border border-border shadow-sm rounded-none hover:shadow-md transition-shadow group flex flex-col h-full">
      {/* Thumbnail / Header Area */}
      <div className="h-[140px] w-full border-b border-border/50 overflow-hidden relative bg-slate-100">
        <img 
          src={imageUrl} 
          alt={subcategory.name} 
          className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-2.5 right-2.5 bg-[#0f172a]/95 text-white text-[10px] font-bold uppercase tracking-wider h-6 px-2 flex flex-row-reverse items-center gap-1.5 shadow-sm rounded-md transition-all duration-300 max-w-[28px] md:group-hover:max-w-[250px] overflow-hidden whitespace-nowrap group-active:max-w-[250px] cursor-pointer">
          <Tag size={11} className="text-accent shrink-0" />
          <span className="opacity-0 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 font-semibold select-none">
            {subcategory.categoryName}
          </span>
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
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat');

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
              image: getImageUrl(cat.image) || (staticCat ? staticCat.image : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300'),
              subList: (cat.subcategories || []).map((sub: any) => sub.name),
            };
          });
          
          // Deduplicate categories by name
          const uniqueMapped: any[] = [];
          mapped.forEach((cat: any) => {
            if (!uniqueMapped.find(c => c.name === cat.name)) {
              uniqueMapped.push(cat);
            }
          });
          
          setCategoriesList(uniqueMapped);
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

  useEffect(() => {
    if (catParam && categoriesList.length > 0) {
      const isCategory = categoriesList.find(c => c.slug === catParam || c.name === catParam);
      if (isCategory) {
        setActiveFilter(isCategory.name);
        setSearchQuery('');
      } else {
        setActiveFilter('All');
        setSearchQuery(catParam);
      }
      setCurrentPage(1);
    } else if (!catParam && categoriesList.length > 0) {
      setActiveFilter('All');
      setSearchQuery('');
    }
  }, [catParam, categoriesList]);

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) return;
    setActiveFilter(filter);
    setSearchQuery('');
    
    // Find category to set slug in URL if possible
    const cat = categoriesList.find(c => c.name === filter);
    if (cat) {
      setSearchParams({ cat: cat.slug || cat.name });
    } else {
      setSearchParams({});
    }
    
    setCurrentPage(1);
    
    // Smooth scroll to top of the page when changing category filters
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (newPage: number | ((p: number) => number)) => {
    setCurrentPage(newPage);
    
    // Smooth scroll to top of the page when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const itemsPerPage = 12; // 12 items per page

  // If activeFilter is 'All' and there's no search query, we show Categories.
  // Otherwise, we show Subcategories.
  const showCategories = activeFilter === 'All' && !searchQuery.trim();

  // Filter categories if showCategories is true
  const filteredCategories = categoriesList.filter(cat => {
    if (!showCategories) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        cat.name.toLowerCase().includes(q) ||
        (cat.description && cat.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Filter subcategories if showCategories is false
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
        (sub.slug && sub.slug.toLowerCase().includes(q)) ||
        (sub.description && sub.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const totalItems = showCategories ? filteredCategories.length : filteredSubcategories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = showCategories 
    ? filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredSubcategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-[#f8fafc]">

      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Browse segments"
            title={showCategories ? "Find suppliers by product category" : "Find suppliers by product subcategory"}
            subtext={showCategories ? "Use dynamic filters and search to drill down directly to the exact product categories." : "Use dynamic filters and search to drill down directly to the exact product subcategories and request quotes."}
          />

          <div className="mb-6 grid gap-3 border border-border bg-white p-3 shadow-sm rounded-none lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex border border-border rounded-none">
              <Search className="ml-3 mt-2.5 text-muted-foreground" size={17} />
              <input 
                className="min-w-0 flex-1 px-3 py-2 text-sm outline-none" 
                placeholder="Search categories, subcategories, materials..." 
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
                        className={`transition-all duration-200 block py-2 px-3 text-left w-full border-l-2 ${
                          activeFilter === 'All' 
                            ? 'border-accent bg-accent/5 text-accent font-semibold' 
                            : 'border-transparent text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-slate-50'
                        }`}
                      >
                        All Segments
                      </button>
                    </li>
                    {categoriesList.map(c => (
                      <li key={c.name}>
                        <button 
                          onClick={() => handleFilterChange(c.name)}
                          className={`transition-all duration-200 block py-2 px-3 text-left w-full border-l-2 ${
                            activeFilter === c.name 
                              ? 'border-accent bg-accent/5 text-accent font-semibold' 
                              : 'border-transparent text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-slate-50'
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
                  <p className="text-muted-foreground font-bold">
                    {showCategories ? "Loading categories dynamically..." : "Loading subcategories dynamically..."}
                  </p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-20 border border-dashed border-red-300 bg-red-50">
                  <p className="text-red-600 font-bold">{error}</p>
                </div>
              ) : (showCategories ? filteredCategories.length === 0 : filteredSubcategories.length === 0) ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center py-20 border border-dashed border-border/70 bg-white"
                >
                  <p className="text-muted-foreground font-bold">
                    {showCategories ? "No categories found matching your criteria." : "No subcategories found matching your criteria."}
                  </p>
                </motion.div>
              ) : (
                <div>
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <AnimatePresence mode="popLayout">
                      {showCategories ? (
                        currentItems.map((cat, index) => (
                          <motion.div
                            layout
                            key={cat.name}
                            initial={{ opacity: 0, y: 15, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
                          >
                            <CategoryCard category={cat} onSelect={handleFilterChange} />
                          </motion.div>
                        ))
                      ) : (
                        currentItems.map((sub, index) => (
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
                        ))
                      )}
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
