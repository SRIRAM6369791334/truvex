import { Link } from 'react-router';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { MarketplacePageHeader, SectionHeader, TrustSignalsBar } from '../MarketplaceComponents';
import { VideoExplainer } from '../VisualSections';

const steps = [
  {
    number: '01',
    title: 'Capture Leads',
    description: 'Potential buyers post requirements on Justdial or IndiaMart. Truvex actively monitors and collects these enquiries across multiple product categories in real-time.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300',
  },
  {
    number: '02',
    title: 'Qualify Leads',
    description: 'Our team reviews each enquiry to separate genuine buyers from spam. We assess buyer intent, urgency, and legitimacy before investing further resources.',
    image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=300',
  },
  {
    number: '03',
    title: 'Analyse Requirements',
    description: 'We deep-dive into exact specification, quantity, location preference, and budget to ensure every recommendation is precise.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300',
  },
  {
    number: '04',
    title: 'Create Proposal',
    description: 'Truvex prepares a professional proposal: product specs, supplier credentials, competitive pricing, delivery timelines, and payment terms.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300',
  },
  {
    number: '05',
    title: 'Present to Buyer',
    description: 'We reach out directly to the buyer, present curated options, and answer questions as a trusted sourcing advisor.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300',
  },
  {
    number: '06',
    title: 'Close the Deal',
    description: 'Truvex facilitates order confirmation, handles last-mile coordination, and earns service fee only on successful closure.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300',
  },
];

const faqs = [
  {
    question: 'How long does the entire process take?',
    answer: 'Typically, we can go from capturing a lead to presenting a tailored proposal within 24-48 hours, depending on the complexity of the requirements.',
  },
  {
    question: 'Do you guarantee order closures?',
    answer: 'While we have a high conversion rate due to our rigorous qualification process, final closures depend on mutual agreement between the buyer and supplier. We only charge our service fee on successful closures.',
  },
  {
    question: 'What types of products do you handle?',
    answer: 'We specialise in B2B industrial, manufacturing, and bulk commodity sourcing across multiple categories.',
  },
  {
    question: 'How do you verify buyers?',
    answer: 'We use a multi-point verification process including company background checks, assessing past procurement history, and direct communication to gauge intent and urgency.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-background">
      <MarketplacePageHeader
        eyebrow="The Process"
        title="How Truvex Works"
        subtext="Six steps from buyer enquiry to confirmed order - transparent, fast, and managed end-to-end."
        imageUrl="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200"
      />
      <TrustSignalsBar />
      <div className="border-b border-border bg-white px-4 py-2">
        <div className="mx-auto max-w-7xl text-[12px] text-muted-foreground">
          <Link to="/">Home</Link>
          <span className="mx-1">/</span> How It Works
        </div>
      </div>
      <VideoExplainer />

      <section className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader eyebrow="Step by step" title="The 6-step sourcing workflow" />
          <div className="relative">
            <div className="absolute left-[35px] top-0 bottom-0 hidden w-[2px] bg-border md:block" />
            <div className="grid gap-4">
              {steps.map((step, i) => (
                <div key={step.number} className="flex items-start gap-4">
                  <div className="relative z-10 h-18 w-18 shrink-0 overflow-hidden rounded-2xl border-2 border-accent bg-primary">
                    <img src={step.image} alt={step.title} width={300} height={300} loading="lazy" className="h-full w-full object-cover opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/50 font-serif text-lg font-bold text-accent">{step.number}</div>
                  </div>
                  <div className="market-card flex-1 border-t-2 border-t-accent p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="text-base font-bold text-primary">{step.title}</h3>
                      <span className="bg-accent/10 px-2 py-0.5 text-[11px] font-bold uppercase text-accent">
                        {i < 2 ? 'Platform' : i < 4 ? 'Human-led' : 'Managed'}
                      </span>
                    </div>
                    <p className="text-[13px] leading-5 text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader eyebrow="Quick FAQ" title="Common process questions" />
          <div className="market-card p-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`} className="border-border px-5">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Start now</div>
            <h2 className="font-serif text-2xl font-bold text-white">Turn one requirement into verified proposals</h2>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/contact" className="market-button bg-accent px-5 py-3 text-sm font-bold text-white">Post Requirement</Link>
            <Link to="/services" className="market-button border border-white/30 px-5 py-3 text-sm font-bold text-white">Find Supplier</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
