"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { MenuOverlay } from "./MenuOverlay";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-8 md:px-16">
        <nav className="flex items-center justify-between">
          {/* Languages */}
          <LanguageSelector />

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="text-5xl font-light capitalize text-text-tertiary tracking-wide">
              LOGO
            </span>
          </div>

          {/* Right side: Theme Toggle + Menu */}
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <div className="h-[51px] w-px bg-text-tertiary/30" />
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-3 group"
              aria-label="Open menu"
            >
              <span className="text-xl uppercase tracking-[0.8px] text-text-secondary group-hover:text-text-primary transition-colors">
                {t("menu")}
              </span>
              <div className="flex flex-col gap-[3px]">
                <span className="block h-[2px] w-7 bg-text-secondary group-hover:bg-text-primary transition-colors" />
                <span className="block h-[2px] w-7 bg-text-secondary group-hover:bg-text-primary transition-colors" />
              </div>
            </button>
          </div>
        </nav>
      </header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
