import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

const steps = [
  {
    number: "01",
    title: "Capture Leads",
    description: "Potential buyers post requirements on Justdial or IndiaMart. Truvex actively monitors and collects these enquiries across multiple product categories in real-time."
  },
  {
    number: "02",
    title: "Qualify Leads",
    description: "Our team reviews each enquiry to separate genuine buyers from spam. We assess buyer intent, urgency, and legitimacy before investing further resources."
  },
  {
    number: "03",
    title: "Analyse Requirements",
    description: "We deep-dive into exact specification, quantity, location preference, and budget to ensure every recommendation is precise — not a generic catalogue response."
  },
  {
    number: "04",
    title: "Create Proposal",
    description: "Truvex prepares a professional proposal: product specs, supplier credentials, competitive pricing, delivery timelines, and payment terms."
  },
  {
    number: "05",
    title: "Present to Buyer",
    description: "We reach out directly to the buyer, present curated options, and answer questions — acting as a trusted advisor."
  },
  {
    number: "06",
    title: "Close the Deal",
    description: "Truvex facilitates order confirmation, handles last-mile coordination, and earns service fee only on successful closure."
  }
];

const faqs = [
  {
    question: "How long does the entire process take?",
    answer: "Typically, we can go from capturing a lead to presenting a tailored proposal within 24-48 hours, depending on the complexity of the requirements."
  },
  {
    question: "Do you guarantee order closures?",
    answer: "While we have a high conversion rate due to our rigorous qualification process, final closures depend on mutual agreement between the buyer and supplier. We only charge our service fee on successful closures."
  },
  {
    question: "What types of products do you handle?",
    answer: "We specialise in B2B industrial, manufacturing, and bulk commodity sourcing across multiple categories."
  },
  {
    question: "How do you verify buyers?",
    answer: "We use a multi-point verification process including company background checks, assessing past procurement history, and direct communication to gauge intent and urgency."
  }
];

export default function HowItWorksPage() {
  return (
    <section className="relative min-h-screen bg-background py-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <ScrollReveal className="text-center mb-24 max-w-3xl mx-auto">
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary text-accent text-xs font-bold tracking-widest uppercase mb-6 shadow-sm hover:scale-105 transition-transform duration-300">
            The Process
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            How Truvex Works
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            Three simple but powerful steps that take you from enquiry to confirmed order.
          </p>
        </ScrollReveal>

        {/* PROCESS CARDS SECTION */}
        <div className="relative mb-32 -mx-4 sm:mx-0">
          <div className="flex overflow-x-auto pb-12 pt-4 px-4 sm:px-0 hide-scrollbar snap-x snap-mandatory gap-6 md:gap-8">
            {steps.map((step, index) => (
              <ScrollReveal 
                key={step.number} 
                delay={index * 0.1} 
                className="relative min-w-[280px] md:min-w-[340px] max-w-[340px] flex-shrink-0 snap-center group cursor-pointer"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/25 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                
                {/* Card Container */}
                <div className="relative h-full bg-card/40 backdrop-blur-xl p-8 rounded-3xl border border-border/50 shadow-sm group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col">
                  
                  {/* Accent Top Border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary transition-all duration-500" />

                  {/* Step Number */}
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary text-lg font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    {step.number}
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Faded edges for horizontal scroll indication */}
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-background to-transparent pointer-events-none hidden sm:block" />
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-background to-transparent pointer-events-none hidden sm:block" />
        </div>

        {/* QUICK FAQ SECTION */}
        <ScrollReveal delay={0.2} className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick FAQ</h2>
            <p className="text-muted-foreground">Common questions about our sourcing process.</p>
          </div>
          <div className="bg-card/60 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-sm border border-border/50">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

