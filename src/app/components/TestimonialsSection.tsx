"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    company: "TechFlow Solutions",
    quote: "The seamless integration and intuitive design have transformed how our team collaborates. It's been an absolute game-changer for our productivity.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: 2,
    name: "Marcus Chen",
    company: "Elevate Digital",
    quote: "Unparalleled performance. We've tried dozens of platforms, but nothing comes close to the elegance, speed, and reliability this provides.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    company: "InnovateX",
    quote: "A masterclass in user experience. The attention to detail in every interaction makes our daily enterprise workflows an absolute breeze.",
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
];

// Duplicate the items to allow for a seamless infinite scroll loop
const carouselItems = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Subtle Background Glow/Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 mb-16 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
        >
          Trusted by Innovators
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          See what industry leaders are saying about their experience with our platform.
        </motion.p>
      </div>

      <div className="flex w-full relative z-10">
        {/* Left & Right gradient masks for a smooth fade-in/out effect */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-6 md:gap-8 px-6 md:px-8"
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{ 
            ease: "linear", 
            duration: 25, 
            repeat: Infinity 
          }}
        >
          {carouselItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[320px] md:w-[450px] shrink-0 p-8 rounded-3xl bg-white/5 dark:bg-black/10 border border-white/10 dark:border-white/5 backdrop-blur-xl shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between group cursor-default"
            >
              <div className="mb-8 relative">
                <svg 
                  className="w-10 h-10 text-primary/20 absolute -top-4 -left-3 z-0 group-hover:text-primary/30 transition-colors duration-300" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-foreground/90 text-lg relative z-10 font-medium leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5 dark:border-white/5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full ring-2 ring-primary/20 object-cover group-hover:ring-primary/50 transition-all duration-300"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground font-medium">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
