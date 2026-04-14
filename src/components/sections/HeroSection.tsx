"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { SocialLinks } from "../portfolio/SocialLinks";
import { PageIndicator } from "../portfolio/PageIndicator";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* God ray / gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top radial glow */}
        <div className="absolute left-1/2 top-[-30%] h-[80%] w-[120%] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-white/[0.03] to-transparent blur-[80px]" />
        {/* Bottom gradient bar */}
        <div className="absolute bottom-[15%] left-1/2 h-[160px] w-[80%] -translate-x-1/2 bg-gradient-to-t from-white/[0.04] to-transparent blur-[120px]" />
        <div className="absolute bottom-[12%] left-1/2 h-[316px] w-[75%] -translate-x-1/2 bg-gradient-to-t from-[#393939]/20 to-transparent blur-[200px]" />
      </div>

      {/* Page indicator - left side */}
      <PageIndicator />

      {/* Social links - right side */}
      <div className="fixed right-10 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <SocialLinks direction="vertical" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* "hello" handwritten + "I'm" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-1 flex items-baseline gap-2"
        >
          <span className="font-handwriting text-[36px] text-text-tertiary/50 md:text-[48px]">
            hello
          </span>
          <span className="text-[28px] font-extralight tracking-[-0.96px] text-text-tertiary/40 md:text-[48px]">
            {t("greeting")}
          </span>
        </motion.div>

        {/* MATHEUS BATISTA */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
          className="text-[56px] font-bold uppercase leading-[0.86] tracking-[-1.5px] text-text-primary sm:text-[80px] md:text-[110px] lg:text-[140px] lg:tracking-[-2.8px]"
        >
          {t("name")}
        </motion.h1>

        {/* a software engineer based in Brazil */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4 text-[20px] font-extralight tracking-[-0.5px] text-text-tertiary/40 md:mt-6 md:text-[36px] lg:text-[48px] lg:tracking-[-0.96px]"
        >
          {t("role")}
        </motion.p>

        {/* Available tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-20 flex items-center gap-2.5 md:mt-28"
        >
          <span className="relative flex size-[24px] items-center justify-center">
            <span className="absolute inline-flex size-[12px] animate-ping rounded-full bg-success opacity-40" />
            <span className="relative inline-flex size-[12px] rounded-full bg-success" />
          </span>
          <span className="text-[13px] tracking-[0.5px] text-text-secondary">
            Available for <strong className="font-semibold text-text-primary">roles</strong> and <strong className="font-semibold text-text-primary">projects</strong>.
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator - bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-12 left-10 hidden xl:flex"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="-rotate-90 text-[14px] uppercase tracking-[0.56px] text-[#7e7e7e]">
            {t("scroll")}
          </span>
          <svg
            width="11"
            height="15"
            viewBox="0 0 11 15"
            fill="none"
            className="mt-4 animate-bounce text-[#7e7e7e]"
          >
            <path
              d="M5.5 0V12M1 7.5L5.5 12L10 7.5"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
      </motion.div>

      {/* Mobile social links */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 xl:hidden">
        <SocialLinks direction="horizontal" />
      </div>
    </section>
  );
}
