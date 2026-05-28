import { useState } from 'react';
import { Link } from 'react-router';
import { Filter, Search } from 'lucide-react';
import {
  CategoryCard,
  EnquiryTicker,
  MarketplacePageHeader,
  PopularSearchStrip,
  SectionHeader,
  SupplierCard,
  TrustSignalsBar,
  categories,
  suppliers,
} from '../MarketplaceComponents';

const filters = ['All', 'Industrial', 'Construction', 'Electrical', 'Packaging', 'Automotive'];

export default function CategoriesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="Supplier directory"
        title="Product Categories and Verified Supplier Listings"
        subtext="Browse dense B2B categories, compare supplier availability, and post an RFQ when your product is not listed."
      />
      <EnquiryTicker label="Live RFQs" />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Browse categories"
            title="Find suppliers by product segment"
            subtext="Use filters and popular searches to move quickly from category discovery to supplier quote requests."
          />

          <div className="mb-4 grid gap-3 border border-border bg-card p-3 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex border border-border">
              <Search className="ml-3 mt-2.5 text-muted-foreground" size={17} />
              <input className="min-w-0 flex-1 px-3 py-2 text-sm outline-none" placeholder="Search categories, products, supplier types..." />
              <button className="bg-accent px-4 py-2 text-sm font-bold text-white">Search</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-1 border px-3 py-2 text-[12px] font-bold ${
                    activeFilter === filter ? 'border-primary bg-primary text-white' : 'border-border bg-white text-primary hover:border-accent'
                  }`}
                >
                  <Filter size={13} /> {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => <CategoryCard key={category.name} category={category} />)}
          </div>
          <div className="mt-4">
            <PopularSearchStrip />
          </div>
        </div>
      </section>

      <TrustSignalsBar compact />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Supplier tiles"
            title="Active suppliers by city and category"
            subtext="Each card is designed for quick scanning: verification, location, category, and direct quote action."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {suppliers.map((supplier) => <SupplierCard key={supplier.name} supplier={supplier} />)}
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
          <Link to="/contact" className="bg-accent px-5 py-3 text-center text-sm font-bold text-white">Post New Requirement</Link>
        </div>
      </section>
    </div>
  );
}
