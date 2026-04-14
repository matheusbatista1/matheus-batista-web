"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

type Props = {
  github?: string;
  linkedin?: string;
  behance?: string;
  email?: string;
  cvUrl?: string;
  available?: boolean;
};

export function Footer({ github, linkedin, behance, email, cvUrl, available = true }: Props) {
  const t = useTranslations("footer");

  return (
    <footer id="footer" className="relative bg-bg-primary pb-8 pt-40">
      <div className="mx-auto max-w-[1920px] px-8 md:px-16 lg:px-24">
        {/* Available tag */}
        {available && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 flex justify-center"
        >
          <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5">
            <span className="relative flex size-[12px] items-center justify-center">
              <span className="absolute inline-flex size-[4px] rounded-full bg-success" />
            </span>
            <span className="text-[14px] tracking-wide text-text-secondary">
              {t("available")}
            </span>
          </div>
        </motion.div>
        )}

        {/* CTA - "LET'S TALK YOUR PROJECT" */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-[40px] font-bold uppercase leading-[1.1] text-text-primary md:text-[72px] lg:text-[100px] lg:leading-[1.05]">
            LET&apos;S TALK YOUR
            <br />
            <span className="text-text-tertiary">PROJECT</span>
          </h2>
        </motion.div>

        {/* Email button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-24 flex justify-center"
        >
          <a
            href={email ? `mailto:${email}` : "#"}
            className="flex items-center gap-4 rounded-full border border-border px-8 py-5 text-text-secondary transition-all hover:border-text-secondary hover:text-text-primary"
          >
            <span className="text-[14px] uppercase tracking-wider md:text-[16px]">
              {email || "matheusbatista.tech@gmail.com"}
            </span>
            <div className="flex size-[25px] items-center justify-center">
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </div>
          </a>
        </motion.div>

        {/* Social links row */}
        <div className="mb-10 flex items-center justify-center gap-5">
          {/* LinkedIn */}
          <a
            href={linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-[40px] items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:text-text-primary hover:border-text-secondary"
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href={github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-[40px] items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:text-text-primary hover:border-text-secondary"
            aria-label="GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* Behance */}
          <a
            href={behance || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-[40px] items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:text-text-primary hover:border-text-secondary"
            aria-label="Behance"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.63.165-1.27.25-1.94.25H0V4.51h6.938v-.007zM6.545 10.16c.6 0 1.1-.16 1.46-.49.37-.33.555-.79.555-1.38 0-.326-.07-.607-.2-.84-.13-.23-.3-.42-.52-.56-.218-.13-.47-.23-.76-.27-.29-.04-.59-.06-.89-.06H3.22v3.6h3.326zm.185 5.98c.34 0 .655-.03.95-.1.3-.07.56-.18.79-.33.23-.15.41-.36.54-.63.13-.27.19-.61.19-1.02 0-.78-.23-1.35-.69-1.71-.46-.36-1.06-.54-1.81-.54H3.22v4.33h3.51zm9.89-1.05c.36.4.87.6 1.52.6.47 0 .87-.12 1.2-.37.33-.25.53-.5.63-.76h2.09c-.33 1.04-.83 1.79-1.5 2.25-.67.46-1.49.69-2.44.69-.67 0-1.27-.1-1.81-.32-.54-.21-1-.52-1.39-.91-.39-.4-.68-.87-.9-1.43-.2-.56-.31-1.17-.31-1.85 0-.66.11-1.26.33-1.82.22-.56.52-1.04.91-1.44.39-.4.86-.71 1.39-.94.54-.23 1.12-.34 1.76-.34.72 0 1.35.14 1.9.41.54.27 1 .64 1.36 1.12.36.48.62 1.03.8 1.67.17.64.24 1.33.2 2.07h-6.26c.04.74.29 1.35.66 1.73zm2.67-4.2c-.3-.33-.75-.5-1.36-.5-.4 0-.73.07-1 .2-.27.14-.48.31-.65.52-.16.21-.28.43-.34.67-.06.24-.1.46-.1.66h4.07c-.07-.67-.32-1.22-.62-1.55zM18.21 4.91h-4.3v1.44h4.3V4.91z" />
            </svg>
          </a>

          {/* Download CV */}
          <a
            href={cvUrl || "#"}
            className="ml-2 flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[14px] uppercase tracking-wider text-text-secondary transition-colors hover:text-text-primary hover:border-text-secondary"
          >
            {t("downloadCv")}
          </a>
        </div>

        {/* Divider line */}
        <div className="h-px w-full bg-border" />

        {/* Copyright */}
        <p className="mt-6 text-center text-[12px] text-text-tertiary">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
