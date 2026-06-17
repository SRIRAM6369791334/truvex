import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClassicIndiaMartCard,
  SectionHeader,
  categories as staticCategories,
} from '../MarketplaceComponents';
import { getCategories } from '../../../services/categoryService';

const filters = ['All', 'Industrial', 'Construction', 'Electrical', 'Packaging', 'Automotive'];

export default function CategoriesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
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
              // Add a special case for Textile/Textiles
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

  const filteredCategories = categoriesList.filter(c => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Industrial') return c.name.includes('Industrial') || c.name.includes('Machine') || c.name.includes('Tools') || c.name.includes('Hardware') || c.name.includes('Plastic');
    if (activeFilter === 'Construction') return c.name.includes('Construction') || c.name.includes('Hardware');
    if (activeFilter === 'Electrical') return c.name.includes('Electrical') || c.name.includes('Electronics') || c.name.includes('Medical');
    if (activeFilter === 'Packaging') return c.name.includes('Packaging') || c.name.includes('Paper');
    if (activeFilter === 'Automotive') return c.name.includes('Automotive');
    return true;
  });

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const currentCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-[#f0f2f5]">

      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Browse categories"
            title="Find suppliers by product segment"
            subtext="Use filters and popular searches to move quickly from category discovery to supplier quote requests."
          />

          <div className="mb-6 grid gap-3 border border-border bg-white p-3 shadow-sm rounded-none lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex border border-border rounded-none">
              <Search className="ml-3 mt-2.5 text-muted-foreground" size={17} />
              <input className="min-w-0 flex-1 px-3 py-2 text-sm outline-none" placeholder="Search categories, products, supplier types..." />
              <button className="bg-accent px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-primary">Search</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`flex items-center gap-1 border px-4 py-2 text-[12px] font-bold rounded-none transition-colors ${
                    activeFilter === filter ? 'border-primary bg-primary text-white shadow-sm' : 'border-border bg-[#f8f9fa] text-primary hover:border-accent hover:bg-white'
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
                <h3 className="font-bold text-[14px] text-primary mb-3 uppercase tracking-wider border-b border-border/50 pb-2">All Categories</h3>
                {loading ? (
                  <p className="text-[13px] text-muted-foreground">Loading...</p>
                ) : error ? (
                  <p className="text-[13px] text-red-600">Error</p>
                ) : (
                  <ul className="flex flex-col gap-1.5 text-[13px]">
                    {categoriesList.map(c => (
                      <li key={c.name}>
                        <a href="#" className="text-muted-foreground hover:text-accent transition-colors block py-1">{c.name}</a>
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
                  <p className="text-muted-foreground font-bold">Loading categories dynamically...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-20 border border-dashed border-red-300 bg-red-50">
                  <p className="text-red-600 font-bold">{error}</p>
                </div>
              ) : filteredCategories.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center py-20 border border-dashed border-border/70 bg-white"
                >
                  <p className="text-muted-foreground font-bold">No categories found for this filter.</p>
                </motion.div>
              ) : (
                <div>
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <AnimatePresence mode="popLayout">
                      {currentCategories.map((category, index) => (
                        <motion.div
                          layout
                          key={category.name}
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                          transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
                        >
                          <ClassicIndiaMartCard category={category} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <motion.div layout className="mt-8 flex justify-center gap-2">
                      <button 
                        onClick={() => handlePageChange(p => Math.max(1, typeof p === 'number' ? p - 1 : p(currentPage) - 1))}
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
                        onClick={() => handlePageChange(p => Math.min(totalPages, typeof p === 'number' ? p + 1 : p(currentPage) + 1))}
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
