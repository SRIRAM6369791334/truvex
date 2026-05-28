import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { MarketplacePageHeader, TrustSignalsBar } from '../MarketplaceComponents';

const faqs = [
  {
    category: 'General',
    q: 'How does Truvex verify suppliers?',
    a: 'We use GST checks, trade references, capacity validation, and direct communication before suppliers are shown as active in our network.',
  },
  {
    category: 'For Buyers',
    q: 'Is there any cost for buyers to post a requirement?',
    a: 'No. Buyers can post requirements and receive supplier matches at zero cost. Truvex earns through supplier-side models and managed services.',
  },
  {
    category: 'Process',
    q: 'What is the typical turnaround time for a proposal?',
    a: 'For standard requirements in core categories, supplier responses can begin within 4 hours and structured proposals usually follow within 24 to 48 hours.',
  },
  {
    category: 'Pricing',
    q: 'Does Truvex handle payment processing?',
    a: 'Truvex currently supports sourcing, verification, and coordination. Purchase orders and payments are typically handled directly between buyer and supplier.',
  },
  {
    category: 'For Suppliers',
    q: 'How do suppliers receive leads?',
    a: 'Suppliers receive relevant RFQs based on category, city, capacity, and buyer purchase timeline.',
  },
];

const categories = ['General', 'For Buyers', 'For Suppliers', 'Pricing', 'Process'];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('General');

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === faq.category;
      const term = query.toLowerCase();
      const matchesQuery = !term || faq.q.toLowerCase().includes(term) || faq.a.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="Support & FAQ"
        title="Common Questions"
        subtext="Everything about sourcing with Truvex."
      />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="market-card mb-5 p-4">
            <div className="flex items-center border-2 border-accent/30 bg-white px-4 focus-within:scale-[1.01] focus-within:border-accent">
              <Search className="text-accent" size={18} />
              <input
                placeholder="Search questions... e.g. payment, supplier verification"
                className="min-h-12 flex-1 px-3 py-3 text-base outline-none"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenIndex(0);
                  }}
                  className={`market-button min-h-12 px-3 py-2 text-sm font-bold ${
                    activeCategory === category ? 'bg-primary text-white' : 'border border-border bg-white text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, i) => (
              <div key={faq.q} className="overflow-hidden rounded-2xl border border-border border-t-2 border-t-accent bg-white/80 backdrop-blur-xl">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex min-h-12 w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                >
                  <span className="pr-8 text-lg font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-5 pt-0 text-muted-foreground">{faq.a}</div>
                </div>
              </div>
            ))}
            {filteredFaqs.length === 0 && <div className="market-card p-6 text-sm text-muted-foreground">No FAQs match your search.</div>}
          </div>
        </div>
      </section>
    </div>
  );
}
