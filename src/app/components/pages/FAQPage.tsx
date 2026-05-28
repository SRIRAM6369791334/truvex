import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../AnimationUtils';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Truvex verify suppliers?",
      a: "We conduct a rigorous 5-point verification process including GST validation, physical/virtual site inspections, trade reference checks, production capacity audits, and financial stability assessments before onboarding any supplier to our active network."
    },
    {
      q: "Is there any cost for buyers to post a requirement?",
      a: "No, our core sourcing service is completely free for buyers. You can post your requirements and receive tailored proposals at zero cost. We earn our revenue primarily through supplier commissions upon successful deal closures."
    },
    {
      q: "What is the typical turnaround time for a proposal?",
      a: "For standard requirements in our core categories, you will receive a curated proposal within 24 to 48 hours. Highly specialized or custom manufacturing requirements may take up to 72 hours."
    },
    {
      q: "Does Truvex handle the payment processing?",
      a: "Currently, Truvex acts as the trusted sourcing intermediary. Final purchase orders and payments are typically executed directly between the buyer and the verified supplier, though we assist in negotiating secure payment terms."
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Support & FAQ</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Common Questions</h1>
          <p className="text-lg text-muted-foreground">Everything you need to know about sourcing with Truvex.</p>
        </FadeIn>

        <StaggerContainer className="space-y-4">
          {faqs.map((faq, i) => (
            <StaggerItem key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="font-semibold text-lg text-foreground pr-8">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-5 pt-0 text-muted-foreground">
                  {faq.a}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
