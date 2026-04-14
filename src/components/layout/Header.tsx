"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { MenuOverlay } from "./MenuOverlay";
import { motion } from "motion/react";

type Props = {
  onContactOpen?: () => void;
};

export function Header({ onContactOpen }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-xl shadow-[0_1px_0_var(--color-border)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[140px] max-w-[1920px] items-center justify-between px-10 md:px-16">
          {/* Left: Language Selector */}
          <div className="flex-shrink-0">
            <LanguageSelector />
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="text-[48px] font-light capitalize text-[#d9d9d9]">
              LOGO
            </span>
          </div>

          {/* Right: Theme Toggle | Menu */}
          <div className="flex flex-shrink-0 items-center gap-0">
            <ThemeToggle />

            {/* Vertical separator */}
            <div className="mx-5 h-[51px] w-px bg-[#8c8c8c]/30" />

            {/* Menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="group flex items-center gap-3"
              aria-label="Open menu"
            >
              <span className="text-[20px] font-normal uppercase tracking-[0.8px] text-[#8c8c8c] transition-colors group-hover:text-text-primary">
                {t("menu")}
              </span>
              <div className="flex flex-col gap-[4px]">
                <span className="block h-[2px] w-[28px] bg-[#8c8c8c] transition-colors group-hover:bg-text-primary" />
                <span className="block h-[2px] w-[28px] bg-[#8c8c8c] transition-colors group-hover:bg-text-primary" />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} onContactOpen={onContactOpen} />
    </>
  );
}
