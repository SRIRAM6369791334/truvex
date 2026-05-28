import { ArrowRight, Calendar, User } from 'lucide-react';
import { MarketplacePageHeader, TrustSignalsBar } from '../MarketplaceComponents';

const posts = [
  {
    title: "The Shift to Digital Procurement in India's SMEs",
    excerpt: 'How tier-2 manufacturers are leveraging digital platforms to source raw materials faster and cheaper than traditional broker networks.',
    category: 'Industry Trends',
    author: 'Rahul V.',
    date: 'Oct 12, 2026',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600',
  },
  {
    title: '5 Red Flags When Selecting a New Supplier',
    excerpt: 'Protect your supply chain by knowing exactly what to look for during vendor qualification.',
    category: 'Best Practices',
    author: 'Sneha M.',
    date: 'Oct 05, 2026',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600',
  },
  {
    title: 'Understanding B2B Payment Terms in 2026',
    excerpt: 'A guide to negotiating credit periods, LC, and advance payments in the Indian manufacturing sector.',
    category: 'Finance',
    author: 'Priya S.',
    date: 'Sep 28, 2026',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="Insights & Resources"
        title="Truvex Blog"
        subtext="Sourcing strategy, industry trends, and B2B guides for Indian businesses."
      />
      <TrustSignalsBar />

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="market-card group flex flex-col overflow-hidden border-t-2 border-t-accent">
              <div className="h-48 w-full overflow-hidden border-b border-border">
                <img src={post.image} alt={post.title} width={600} height={280} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="flex flex-grow flex-col p-6">
                <div className="mb-3 inline-flex self-start bg-primary px-2 py-1 text-[11px] font-bold uppercase text-white">{post.category}</div>
                <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">{post.title}</h3>
                <p className="mb-6 flex-grow text-muted-foreground">{post.excerpt}</p>
                <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                  </div>
                  <button className="market-button text-primary hover:text-accent">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
