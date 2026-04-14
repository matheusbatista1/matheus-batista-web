"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { InfiniteMarquee } from "../portfolio/InfiniteMarquee";
import { ArrowRight } from "lucide-react";

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="relative bg-bg-projects py-12">
      {/* Infinite Marquee */}
      <InfiniteMarquee text={t("marquee")} className="mb-16" />

      {/* Section title */}
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

        {/* Projects placeholder - will be dynamic from DB */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-8 md:flex-row"
        >
          {/* Thumbnail area */}
          <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg bg-bg-secondary md:w-[60%]">
            <div className="flex size-full items-center justify-center text-text-tertiary">
              <p className="text-lg">Project thumbnails from database</p>
            </div>
          </div>

          {/* Project info card */}
          <div className="flex w-full flex-col justify-between rounded-lg bg-bg-secondary p-8 md:w-[40%]">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                  Featured
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-text-primary md:text-3xl">
                Project Name
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                Project description will be loaded from the database.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <span>{t("viewProject")}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
