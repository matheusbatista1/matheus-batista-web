"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

type Project = {
  slug: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  techStack: string[];
};

type Props = {
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
};

export function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: Props) {
  const t = useTranslations("projects");

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-modal-backdrop backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-[90] flex items-center justify-center md:inset-12 lg:inset-20"
          >
            <div
              className="relative flex size-full max-h-[80vh] max-w-5xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-bg-secondary/80 text-text-secondary transition-colors hover:text-text-primary"
              >
                <X size={16} />
              </button>

              {/* Thumbnail */}
              <div className="relative h-[200px] w-full bg-bg-secondary md:h-auto md:w-1/2">
                {project.thumbnailUrl ? (
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-text-tertiary">
                    <span className="text-6xl font-bold opacity-20">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between p-8 md:p-10">
                <div>
                  <h2 className="mb-4 text-3xl font-bold text-text-primary">
                    {project.title}
                  </h2>
                  <p className="mb-8 text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  {project.techStack.length > 0 && (
                    <div className="mb-8">
                      <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">
                        {t("techStack")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-bg-secondary px-3 py-1 text-xs text-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-text-secondary transition-all hover:border-text-primary hover:text-text-primary"
                    >
                      {t("visitSite")}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-text-secondary transition-all hover:border-text-primary hover:text-text-primary"
                    >
                      {t("viewCode")}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Navigation arrows */}
              {hasPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg-secondary/80 text-text-secondary transition-colors hover:text-text-primary"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {hasNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg-secondary/80 text-text-secondary transition-colors hover:text-text-primary md:right-auto md:left-[calc(50%-20px)]"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
