'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  badge?: string;
  badgeColor?: 'teal' | 'gold' | 'navy';
  headline: string;
  headlineAccent?: string;
  subtext?: string;
  patternId: string;
  children?: React.ReactNode;
  compact?: boolean;
}

export function HeroSection({
  badge,
  badgeColor = 'teal',
  headline,
  headlineAccent,
  subtext,
  patternId,
  children,
  compact = false,
}: HeroSectionProps) {
  const badgeClasses = {
    teal: 'bg-teal-700/80 border-teal-500/30 text-teal-50',
    gold: 'bg-accent/80 border-accent/30 text-white',
    navy: 'bg-blue-900/80 border-blue-700/30 text-blue-50',
  };

  const badgeClass = badgeClasses[badgeColor] || badgeClasses.teal;

  return (
    <section
      className={`relative w-full overflow-hidden bg-primary ${
        compact ? 'pt-14 pb-16 px-4' : 'pt-20 pb-24 px-4'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={patternId} x="0" y="0" width="130" height="130" patternUnits="userSpaceOnUse">
              <circle cx="65" cy="65" r="55" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="65" cy="65" r="35" fill="none" stroke="white" strokeWidth="0.75" />
              <circle cx="65" cy="65" r="15" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="55" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="130" cy="0" r="55" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="0" cy="130" r="55" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="130" cy="130" r="55" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>

      {/* Animated Gradient Blob for B2B UI */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-accent/20 to-teal-500/20 blur-[100px] rounded-full pointer-events-none" 
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {badge && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
            className={`inline-flex items-center justify-center px-[1.1rem] py-[0.3rem] mb-5 text-xs font-semibold tracking-[0.08em] uppercase rounded-full backdrop-blur-md border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${badgeClass}`}
          >
            {badge}
          </motion.div>
        )}
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`font-serif text-white font-bold leading-[1.2] text-[clamp(1.9rem,5vw,3.5rem)] relative z-10 ${
            subtext || children ? 'mb-5' : 'mb-0'
          }`}
        >
          {headline}
          {headlineAccent && (
            <span className="text-accent inline-block transition-transform duration-300 hover:scale-[1.02]">
              {' '}{headlineAccent}
            </span>
          )}
        </motion.h1>

        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`text-white/80 text-[1.05rem] leading-[1.75] max-w-[640px] mx-auto relative z-10 ${
              children ? 'mb-8' : 'mb-0'
            }`}
          >
            {subtext}
          </motion.p>
        )}

        {children && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.5
                }
              }
            }}
            className="w-full flex justify-center gap-4 relative z-10 flex-wrap"
          >
            {React.Children.map(children, (child) => (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
