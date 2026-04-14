"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ContactForm } from "../contact/ContactForm";

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="relative bg-bg-primary py-32">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <span className="text-xs uppercase tracking-[3px] text-text-tertiary">
            / {t("sectionTitle")}
          </span>
        </motion.div>

        <div className="flex flex-col gap-16 lg:flex-row">
          {/* Left - CTA text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold leading-tight text-text-primary md:text-6xl">
              {t("cta")}
            </h2>
          </motion.div>

          {/* Right - Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/2"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
