"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-4 text-left focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75 transition-colors hover:text-primary"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-gray-500 dark:text-gray-400"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600 dark:text-gray-300">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface FAQAccordionProps {
  items: { question: string; answer: React.ReactNode }[];
  allowMultiple?: boolean;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, allowMultiple = false }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 sm:p-8">
      {items.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndices.includes(index)}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
