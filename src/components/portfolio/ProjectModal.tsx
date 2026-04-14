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
          {/* Backdrop with blur - z-[80] above header z-50 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-modal-backdrop backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal - centered, side-by-side layout, 16/9 image */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 top-[160px] bottom-0 z-[90] flex items-center justify-center px-4 pb-4 md:px-12 md:pb-12 lg:px-20 lg:pb-20"
          >
            <div
              className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl md:flex-row md:h-[70vh] md:min-h-[480px]"
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

              {/* Thumbnail - 16:9, left side on desktop */}
              <div className="relative aspect-[16/9] w-full shrink-0 bg-bg-secondary md:aspect-auto md:h-auto md:w-[58%]">
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

              {/* Details - right side */}
              <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6 md:p-8">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-text-primary md:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  {project.techStack.length > 0 && (
                    <div className="mb-6">
                      <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-tertiary">
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
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm text-text-secondary transition-all hover:border-text-primary hover:text-text-primary"
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
                      className="flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm text-text-secondary transition-all hover:border-text-primary hover:text-text-primary"
                    >
                      {t("viewCode")}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Navigation arrows - over the image */}
              {hasPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg-secondary/80 text-text-secondary transition-colors hover:text-text-primary"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {hasNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg-secondary/80 text-text-secondary transition-colors hover:text-text-primary md:left-[55%] right-4 md:right-auto"
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
