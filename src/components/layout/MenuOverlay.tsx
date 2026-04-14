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
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Left blur panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-bg-primary/60 backdrop-blur-2xl"
            onClick={onClose}
          />

          {/* Right menu panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed inset-y-0 right-0 z-[70] w-full bg-bg-secondary/95 backdrop-blur-3xl md:w-[55%]"
          >
            {/* Close button */}
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="absolute right-10 top-10 text-[#8c8c8c] transition-colors hover:text-text-primary"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9L9 15M9 9l6 6" />
              </svg>
            </motion.button>

            {/* Navigation links */}
            <nav className="flex h-full flex-col justify-center gap-2 px-16 md:px-24">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item.key}
                  type="button"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{
                    delay: 0.15 + i * 0.06,
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-[48px] font-light capitalize text-[#8c8c8c] transition-colors hover:text-text-primary md:text-[64px] lg:text-[75px]"
                >
                  {t(item.key)}
                </motion.button>
              ))}
            </nav>

            {/* Decorative line at top */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute left-16 right-16 top-[70px] h-px origin-left bg-[#8c8c8c]/20 md:left-24 md:right-24"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
