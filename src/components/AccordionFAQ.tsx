"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  q: string;
  a: string;
}

export default function AccordionFAQ({ faqs }: { faqs: FAQ[] }) {
  const [abierta, setAbierta] = useState<number | null>(null);

  const toggle = (i: number) => {
    setAbierta(abierta === i ? null : i);
  };

  return (
    <div className="max-w-2xl mx-auto divide-y divide-[var(--border)]">
      {faqs.map((faq, i) => {
        const open = abierta === i;
        return (
          <div key={i} className="py-5">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between text-left font-heading font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              <span className="pr-4">{faq.q}</span>
              <motion.svg
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="h-5 w-5 flex-shrink-0 text-[var(--muted-foreground)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 text-sm text-[var(--muted-foreground)] leading-relaxed pr-8">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
