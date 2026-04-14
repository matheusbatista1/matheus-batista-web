"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { InfiniteMarquee } from "../portfolio/InfiniteMarquee";
import { ArrowRight } from "lucide-react";
import { ProjectModal } from "../portfolio/ProjectModal";

export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  techStack: string[];
};

type Props = {
  projects?: ProjectItem[];
};

export function ProjectsSection({ projects = [] }: Props) {
  const t = useTranslations("projects");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedProject = selectedIndex !== null ? projects[selectedIndex] : null;

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

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl bg-bg-secondary/50 p-16 text-center"
          >
            <p className="text-lg text-text-tertiary">{t("noProjects")}</p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="group flex cursor-pointer flex-col gap-6 rounded-xl bg-bg-secondary/30 p-4 transition-colors hover:bg-bg-secondary/50 md:flex-row md:p-0"
                onClick={() => setSelectedIndex(index)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg bg-bg-secondary md:w-[55%]">
                  {project.thumbnailUrl ? (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-text-tertiary">
                      <span className="text-6xl font-bold opacity-20">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between py-2 md:py-8 md:pr-8">
                  <div>
                    {project.techStack.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="mb-3 text-2xl font-semibold text-text-primary md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <span className="flex items-center gap-2 text-sm text-text-secondary transition-colors group-hover:text-text-primary">
                      {t("viewProject")}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project detail modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedIndex(null)}
        onPrev={() => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
        onNext={() => setSelectedIndex((i) => (i !== null && i < projects.length - 1 ? i + 1 : i))}
        hasPrev={selectedIndex !== null && selectedIndex > 0}
        hasNext={selectedIndex !== null && selectedIndex < projects.length - 1}
      />
    </section>
  );
}
