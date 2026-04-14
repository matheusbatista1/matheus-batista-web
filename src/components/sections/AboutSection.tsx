"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

type Props = {
  onContactOpen?: () => void;
};

export function AboutSection({ onContactOpen }: Props) {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative bg-bg-primary py-32">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
          {/* Left - title + bio */}
          <div className="lg:w-[60%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-4"
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
              className="mb-8 flex items-center gap-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
                <span className="relative flex size-[12px] items-center justify-center">
                  <span className="size-[4px] rounded-full bg-success" />
                </span>
                <span className="text-[14px] tracking-wide text-text-secondary">
                  {t("available")}
                </span>
              </div>
            </motion.div>

            {/* Bio text - loaded from DB in future */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="text-[16px] leading-[1.9] text-text-secondary md:text-[18px]"
            >
              I design and implement scalable APIs and web systems, from
              code to technical documentation. I&apos;ve worked with ERPs, POS
              systems, e-commerce platforms, and other custom
              applications for medium and large companies.{" "}
              <strong className="font-medium text-text-primary">
                Currently, I&apos;m focused on backend development using the .NET ecosystem,
                C#, SQL Server, along with Angular and Azure.
              </strong>
            </motion.p>
          </div>

          {/* Right - greeting + send message */}
          <div className="relative lg:w-[40%]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="text-[28px]">{t("greeting")}</span>
              <span className="text-[28px]">&#x1F91F;</span>
            </motion.div>

            {/* Send me message button */}
            {onContactOpen && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                onClick={onContactOpen}
                className="mt-4 rounded-full border border-border px-6 py-2.5 text-[14px] text-text-secondary transition-all hover:border-text-secondary hover:text-text-primary"
              >
                Send me message
              </motion.button>
            )}

            {/* Decorative text - vertical on right */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -right-4 top-0 hidden text-[160px] font-bold uppercase leading-none text-text-primary/[0.03] lg:block"
              style={{ writingMode: "vertical-rl" }}
            >
              {t("decorativeText")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
