import { ArrowRight, Calendar, User } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../AnimationUtils';

export default function BlogPage() {
  const posts = [
    {
      title: "The Shift to Digital Procurement in India's SMEs",
      excerpt: "How tier-2 manufacturers are leveraging digital platforms to source raw materials faster and cheaper than traditional broker networks.",
      category: "Industry Trends",
      author: "Rahul V.",
      date: "Oct 12, 2026",
      image: "bg-slate-800" // placeholder for real image
    },
    {
      title: "5 Red Flags When Selecting a New Supplier",
      excerpt: "Protect your supply chain by knowing exactly what to look for during the vendor qualification process.",
      category: "Best Practices",
      author: "Sneha M.",
      date: "Oct 05, 2026",
      image: "bg-teal-900"
    },
    {
      title: "Understanding B2B Payment Terms in 2026",
      excerpt: "A comprehensive guide to negotiating credit periods, LC, and advance payments in the Indian manufacturing sector.",
      category: "Finance",
      author: "Priya S.",
      date: "Sep 28, 2026",
      image: "bg-slate-700"
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Insights & Resources</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Truvex Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Expert advice, industry trends, and sourcing strategies for the modern Indian business.</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <StaggerItem key={i} className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm group hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className={`h-48 w-full ${post.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold tracking-wider uppercase text-accent mb-3">{post.category}</div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{post.excerpt}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  </div>
                  <button className="text-primary hover:text-accent transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
