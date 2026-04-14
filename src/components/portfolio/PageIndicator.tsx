"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const sections = [
  { id: "hero", index: 0 },
  { id: "projects", index: 1 },
  { id: "about", index: 2 },
  { id: "skills", index: 3 },
  { id: "contact", index: 4 },
];

export function PageIndicator() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex(
              (s) => s.id === entry.target.id,
            );
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="fixed left-10 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start gap-2.5 xl:flex">
      {sections.map((section, i) => (
        <button
          key={section.id}
          type="button"
          onClick={() => scrollTo(section.id)}
          className="group flex items-center py-1"
          aria-label={`Go to ${section.id}`}
        >
          <motion.span
            animate={{
              width: activeSection === i ? 37 : 24,
              opacity: activeSection === i ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
            className="block h-[2px] rounded-full bg-text-primary"
          />
        </button>
      ))}
    </div>
  );
}
