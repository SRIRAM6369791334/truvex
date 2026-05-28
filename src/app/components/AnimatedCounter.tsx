import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ value, suffix = '', className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 25,
    stiffness: 80,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString();
      }
    });
  }, [springValue]);

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
