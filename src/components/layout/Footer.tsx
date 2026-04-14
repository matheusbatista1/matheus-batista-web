"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative bg-bg-primary pb-8 pt-32">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        {/* Available tag */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 flex justify-center"
        >
          <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            <span className="text-xs tracking-wide text-text-secondary">
              {t("available")}
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-4xl font-bold uppercase leading-tight text-text-primary md:text-7xl">
            {t("cta")}
          </h2>
        </motion.div>

        {/* Email button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-20 flex justify-center"
        >
          <a
            href="mailto:matheusbatista.tech@gmail.com"
            className="flex items-center gap-3 rounded-full border border-border px-8 py-5 text-text-secondary transition-all hover:border-border-hover hover:text-text-primary"
          >
            <span className="text-sm md:text-base">
              matheusbatista.tech@gmail.com
            </span>
            <ArrowUpRight size={20} />
          </a>
        </motion.div>

        {/* Social links + download CV */}
        <div className="mb-12 flex items-center justify-center gap-5">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:text-text-primary"
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a
            href="https://github.com/matheusbatista1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:text-text-primary"
            aria-label="GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 border-b border-text-tertiary pb-1 text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-text-primary"
          >
            {t("downloadCv")}
          </a>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Copyright */}
        <p className="mt-6 text-center text-xs text-text-tertiary">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
