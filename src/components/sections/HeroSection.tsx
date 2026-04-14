"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { SocialLinks } from "../portfolio/SocialLinks";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Background gradient effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[316px] w-[1450px] -translate-x-1/2 bg-gradient-to-b from-[#565656] to-white opacity-[0.08] blur-[200px]" />
        <div className="absolute bottom-0 left-1/2 h-[200px] w-[1450px] -translate-x-1/2 bg-gradient-to-b from-[#393939] to-[#4c4c4c] opacity-[0.12] blur-[200px]" />
      </div>

      {/* Social links - right side */}
      <div className="absolute right-10 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
        <SocialLinks direction="vertical" />
      </div>

      {/* Page navigation dots - left side */}
      <div className="absolute left-10 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex">
        <span className="h-[3px] w-9 rounded-full bg-text-primary" />
        <span className="h-[3px] w-6 rounded-full bg-text-tertiary/40" />
        <span className="h-[3px] w-6 rounded-full bg-text-tertiary/40" />
        <span className="h-[3px] w-6 rounded-full bg-text-tertiary/40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* "hello" + "I'm" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-baseline gap-3"
        >
          <span className="font-serif text-4xl italic text-text-tertiary/60 md:text-5xl">
            hello
          </span>
          <span className="text-3xl font-extralight tracking-tight text-text-tertiary/40 md:text-5xl">
            {t("greeting")}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 100 }}
          className="mt-2 text-7xl font-bold uppercase leading-[0.86] tracking-[-2.8px] text-text-primary sm:text-8xl md:text-[140px]"
        >
          {t("name")}
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-2xl font-extralight tracking-tight text-text-tertiary/40 md:text-5xl md:tracking-[-0.96px]"
        >
          {t("role")}
        </motion.p>

        {/* Available tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 flex items-center gap-3"
        >
          <span className="relative flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-success" />
          </span>
          <span className="text-sm tracking-wide text-text-secondary">
            {t("available")}
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-10 hidden items-end gap-10 lg:flex"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="-rotate-90 text-xs uppercase tracking-[0.56px] text-text-tertiary">
            {t("scroll")}
          </span>
          <svg
            width="11"
            height="15"
            viewBox="0 0 11 15"
            fill="none"
            className="rotate-90 text-text-tertiary"
          >
            <path
              d="M1 7.5L5.5 12L10 7.5M5.5 0V12"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
      </motion.div>

      {/* Mobile social links */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:hidden">
        <SocialLinks direction="horizontal" />
      </div>
    </section>
  );
}
