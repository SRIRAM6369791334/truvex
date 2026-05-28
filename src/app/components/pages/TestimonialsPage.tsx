import { Star, Quote } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../AnimationUtils';

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "TechBuild Industries",
      role: "Procurement Head",
      content: "Truvex completely changed how we source raw materials. What used to take weeks of calling unverified suppliers now takes days. Their proposals are highly detailed.",
      rating: 5
    },
    {
      name: "Anjali Desai",
      company: "Desai Manufacturing",
      role: "Founder",
      content: "We were struggling to find reliable packaging vendors in Tier 2 cities. Truvex connected us with 3 verified options within 48 hours. Excellent service.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      company: "Singh Auto Parts",
      role: "Operations Manager",
      content: "The transparent pricing model is a breath of fresh air. No hidden fees, just straight-up quality suppliers.",
      rating: 5
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Client Success</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">What Our Partners Say</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Hear from businesses across India who have transformed their sourcing operations with Truvex.</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <StaggerItem key={i} className="bg-card p-8 rounded-2xl shadow-sm border border-border relative overflow-hidden group hover:border-accent transition-colors">
              <Quote className="absolute top-4 right-4 text-primary/5 w-24 h-24 -z-10 group-hover:text-accent/10 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 mb-8 italic">"{t.content}"</p>
              <div>
                <h4 className="font-bold text-primary">{t.name}</h4>
                <p className="text-sm text-muted-foreground">{t.role}, <span className="font-medium text-foreground">{t.company}</span></p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
