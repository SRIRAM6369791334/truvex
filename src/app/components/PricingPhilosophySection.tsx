"use client";

import React, { useEffect, useRef, useState } from "react";

// Custom hook to handle scroll reveal animation via Intersection Observer
function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

const PricingCard = ({
  title,
  description,
  icon,
  delay,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-primary/50 transition-all duration-700 ease-out group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: delay }}
    >
      {/* Micro-animation glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <h3 className="text-2xl font-semibold text-foreground mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default function PricingPhilosophySection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent font-medium tracking-wider uppercase text-sm mb-4 block">
            Pricing Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transparent & Value-Driven
          </h2>
          <p className="text-lg text-muted-foreground">
            Our pricing model is engineered to align with your success. Whether you are
            sourcing globally or supplying locally, we ensure clear value at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="100% Free for Buyers"
            description="Source top-tier suppliers globally without paying any platform fees. Your success is our priority, and finding the right partner shouldn't come with hidden costs."
            delay="100ms"
            icon={
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />

          <PricingCard
            title="Success-Based Commission"
            description="Suppliers only pay a fair commission when a deal is successfully closed. We bear the risk of match-making so you can focus entirely on delivering quality."
            delay="300ms"
            icon={
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />

          <PricingCard
            title="Premium Subscription"
            description="Unlock priority listings, advanced analytics, and verified badges. A dedicated tier for suppliers looking to scale their operations and stand out."
            delay="500ms"
            icon={
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}
