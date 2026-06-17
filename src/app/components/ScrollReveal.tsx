import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  yOffset?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  duration = 0.6,
  yOffset = 30,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // elegant spring-like ease-out curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
