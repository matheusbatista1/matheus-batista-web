"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  { key: "home", href: "#hero" },
  { key: "projects", href: "#projects" },
  { key: "skills", href: "#skills" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
] as const;

export function MenuOverlay({ isOpen, onClose }: Props) {
  const t = useTranslations("nav");

  function handleNavClick(href: string) {
    onClose();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-bg-primary/80 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[70] w-full md:w-[60%] bg-bg-secondary/95 backdrop-blur-2xl flex flex-col justify-center px-16 md:px-24"
          >
            <button
              onClick={onClose}
              className="absolute top-10 right-10 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col gap-4">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-5xl md:text-7xl font-light text-text-secondary hover:text-text-primary transition-colors capitalize"
                >
                  {t(item.key)}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
