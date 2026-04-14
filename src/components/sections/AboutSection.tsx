"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative bg-bg-primary py-32">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
          {/* Left side - title + content */}
          <div className="lg:w-[60%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-8"
            >
              <span className="text-xs uppercase tracking-[3px] text-text-tertiary">
                / {t("sectionTitle")}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
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

            {/* Bio text - placeholder, will come from DB */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="text-base leading-[1.8] text-text-secondary md:text-lg"
            >
              About content will be loaded from the database based on the
              current locale.
            </motion.p>
          </div>

          {/* Right side - decorative */}
          <div className="relative lg:w-[40%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-3"
            >
              <div className="flex size-16 items-center justify-center rounded-full bg-bg-secondary">
                <span className="text-2xl">{t("greeting")}</span>
              </div>
              <span className="text-4xl">&#x1F91F;</span>
            </motion.div>

            {/* Decorative text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.05 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-20 right-0 text-right text-[160px] font-bold leading-none text-text-primary"
            >
              {t("decorativeText")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
