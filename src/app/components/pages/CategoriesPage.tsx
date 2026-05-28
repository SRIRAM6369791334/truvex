import { HeroSection } from '../HeroSection';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Cpu, 
  HardHat, 
  Package, 
  Monitor, 
  Car, 
  Sprout, 
  FlaskConical,
  Send,
  CheckCircle2,
  Search
} from 'lucide-react';

const categories = [
  { icon: Factory, name: 'Industrial Machinery & Equipment', group: 'Industrial', count: '12k+' },
  { icon: Cpu, name: 'Electrical & Electronics Components', group: 'Tech', count: '8.5k+' },
  { icon: HardHat, name: 'Construction Materials & Hardware', group: 'Construction', count: '15k+' },
  { icon: Package, name: 'Packaging Materials', group: 'Industrial', count: '4.2k+' },
  { icon: Monitor, name: 'Office & IT Supplies', group: 'Tech', count: '9.1k+' },
  { icon: Car, name: 'Automotive Parts & Accessories', group: 'Automotive', count: '6.7k+' },
  { icon: Sprout, name: 'Agricultural Inputs & Equipment', group: 'Agriculture', count: '3.4k+' },
  { icon: FlaskConical, name: 'Chemical & Raw Materials', group: 'Industrial', count: '5.8k+' },
];

const filterOptions = ['All', 'Industrial', 'Tech', 'Construction', 'Automotive', 'Agriculture'];

export default function CategoriesPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  const filteredCategories = categories.filter((cat) => {
    const matchesFilter = activeFilter === 'All' || cat.group === activeFilter;
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-background min-h-screen pb-0">
      <HeroSection
        badge="Industries We Serve"
        headline="Product Categories"
        subtext="Truvex focuses on high-demand verticals with large active buyer populations across India."
        patternId="geo-cat"
      />

      {/* Categories Grid */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-8"
            >
              8 Core Verticals
            </motion.h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-card/50 p-4 rounded-2xl border border-border/50 backdrop-blur-sm shadow-sm mb-12">
              {/* Search Input */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent rounded-xl text-sm transition-all outline-none"
                />
              </div>

              {/* Animated Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {filterOptions.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === filter
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
                    }`}
                  >
                    {activeFilter === filter && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-accent rounded-full -z-10 shadow-md shadow-accent/20"
                        initial={false}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{filter}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid with AnimatePresence */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px] content-start"
          >
            <AnimatePresence mode="popLayout">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key={cat.name}
                    className="bg-card border border-border rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 group flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden"
                  >
                    {/* Dynamic Count Badge */}
                    <div className="absolute top-4 right-4 bg-accent/10 text-accent text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-colors group-hover:bg-accent group-hover:text-accent-foreground z-10">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 group-hover:bg-accent-foreground"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent group-hover:bg-accent-foreground"></span>
                      </span>
                      {cat.count}
                    </div>

                    <div className="flex justify-center mb-6 relative z-10">
                      <cat.icon 
                        className="w-12 h-12 text-muted-foreground group-hover:text-accent transition-colors duration-300" 
                        strokeWidth={1.5} 
                      />
                    </div>
                    <h3 className="text-card-foreground font-semibold leading-snug relative z-10">
                      {cat.name}
                    </h3>

                    {/* Glassmorphism Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground"
                >
                  <Search className="w-12 h-12 mb-4 opacity-20" />
                  <p>No categories found matching your search.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Interactive Form Section */}
      <section className="bg-primary py-24 px-4 text-center relative overflow-hidden">
        {/* Subtle geometric background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V0H40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern-cta)" />
          </svg>
        </div>
        
        <div className="relative max-w-3xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground font-serif mb-6">
              Request a New Category
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Truvex is expanding rapidly. If your product falls outside these verticals, tell us what you're looking for, and we'll tap into our extensive supplier network.
            </p>
            
            <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 space-y-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-400" />
                  <h3 className="text-2xl font-bold text-primary-foreground">Request Received!</h3>
                  <p className="text-primary-foreground/80">Our team will evaluate your request and get back to you shortly.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="mt-4 px-6 py-2 bg-white/10 text-primary-foreground hover:bg-white/20 rounded-lg transition-colors border border-white/10"
                  >
                    Submit Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left relative z-10">
                  <div>
                    <label htmlFor="categoryName" className="block text-sm font-medium text-primary-foreground/90 mb-1">
                      Proposed Category Name
                    </label>
                    <input
                      type="text"
                      id="categoryName"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg text-primary-foreground placeholder:text-primary-foreground/40 transition-colors outline-none"
                      placeholder="e.g. Sustainable Textiles"
                    />
                  </div>
                  <div>
                    <label htmlFor="details" className="block text-sm font-medium text-primary-foreground/90 mb-1">
                      Additional Details
                    </label>
                    <textarea
                      id="details"
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg text-primary-foreground placeholder:text-primary-foreground/40 transition-colors resize-none outline-none"
                      placeholder="Briefly describe the products you are looking for..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full bg-accent text-accent-foreground px-6 py-4 rounded-lg font-bold flex items-center justify-center space-x-2 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span>{formState === 'submitting' ? 'Submitting...' : 'Submit Request'}</span>
                    {!formState.includes('submitting') && <Send className="w-5 h-5" />}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
