"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Image from "next/image";
import { SocialLinks } from "../portfolio/SocialLinks";
import { PageIndicator } from "../portfolio/PageIndicator";

type Props = {
  github?: string;
  linkedin?: string;
  email?: string;
  cvUrl?: string;
  available?: boolean;
};

export function HeroSection({ github, linkedin, email, cvUrl, available = true }: Props) {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-hero"
    >
      {/* God ray / gradient background com tons de #404040 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-30%] h-[80%] w-[120%] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-[#404040]/[0.08] to-transparent blur-[80px]" />
        <div className="absolute bottom-[15%] left-1/2 h-[160px] w-[80%] -translate-x-1/2 bg-gradient-to-t from-[#404040]/[0.06] to-transparent blur-[120px]" />
        <div className="absolute bottom-[12%] left-1/2 h-[316px] w-[75%] -translate-x-1/2 bg-gradient-to-t from-[#404040]/20 to-transparent blur-[200px]" />
      </div>

      {/* Page indicator - left side */}
      <PageIndicator />

      {/* Social links - right side */}
      <div className="fixed right-10 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <SocialLinks direction="vertical" github={github} linkedin={linkedin} email={email} cvUrl={cvUrl} />
      </div>

      {/* Main content - bloco centralizado na pagina, texto alinhado a esquerda */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <div className="flex flex-col items-start">
          {/* "hello" handwritten (sempre ingles) + "I'm" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-1 flex items-baseline gap-3"
          >
            <Image
              src="/images/hello.png"
              alt="hello"
              width={150}
              height={48}
              className="relative top-[2px] h-[36px] w-auto md:h-[46px]"
              priority
            />
            <span className="text-[22px] font-extralight tracking-[-0.96px] text-[#8c8c8c]/50 md:text-[38px]">
              {t("greeting")}
            </span>
          </motion.div>

          {/* MATHEUS BATISTA - duas linhas, preto com contorno cinza */}
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
            className="hero-text-outline text-[48px] font-bold uppercase leading-[0.86] tracking-[-1.5px] text-black sm:text-[68px] md:text-[90px] lg:text-[120px] lg:tracking-[-2.4px]"
          >
            MATHEUS
            <br />
            BATISTA
          </motion.h1>

          {/* a software engineer based in Brazil */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-4 text-[16px] font-extralight tracking-[-0.5px] text-[#8c8c8c]/50 md:mt-6 md:text-[28px] lg:text-[36px] lg:tracking-[-0.72px]"
          >
            {t("role")}
          </motion.p>
        </div>

        {/* Available tag - centralizado */}
        {available && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-[110px] flex items-center gap-2.5 md:mt-[140px]"
          >
            <span className="relative flex size-[24px] items-center justify-center">
              <span className="absolute inline-flex size-[12px] animate-ping rounded-full bg-success opacity-40" />
              <span className="relative inline-flex size-[12px] rounded-full bg-success" />
            </span>
            <span className="text-[13px] tracking-[0.5px] text-text-secondary">
              {t("availableFor")} <strong className="font-semibold text-text-primary">{t("roles")}</strong> {t("and")} <strong className="font-semibold text-text-primary">{t("projects")}</strong>.
            </span>
          </motion.div>
        )}
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
        <SocialLinks direction="horizontal" github={github} linkedin={linkedin} email={email} cvUrl={cvUrl} />
      </div>
    </section>
  );
}
