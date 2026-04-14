import Link from "next/link";
import { getProjectRepository } from "@/infrastructure/container";
import { Plus, FolderOpen } from "lucide-react";

export default async function AdminProjectsPage() {
  const repo = getProjectRepository();
  const projects = await repo.findAll({ locale: "PT" as never, publishedOnly: false });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[24px] font-semibold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded-lg bg-[#2997ff] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#40a9ff]"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl bg-[#1a1a1a] p-16 text-center">
          <FolderOpen size={48} className="mx-auto mb-4 text-[#6e6e73]" />
          <p className="text-[16px] text-[#6e6e73]">No projects yet</p>
          <p className="mt-1 text-[13px] text-[#4a4a4e]">
            Create your first project to showcase on the portfolio.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => {
            const ptTitle =
              project.translations.find((t) => t.locale === ("PT" as never))?.title ??
              project.translations[0]?.title ??
              project.slug;

            return (
              <Link
                key={project.id}
                href={`/admin/projects/${project.id}/edit`}
                className="group rounded-xl bg-[#1a1a1a] p-5 transition-colors hover:bg-[#222]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-medium text-[#f5f5f7]">
                      {ptTitle}
                    </h3>
                    <p className="mt-1 text-[12px] text-[#6e6e73]">
                      /{project.slug}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {project.featured && (
                      <span className="rounded bg-[#ff9f0a]/15 px-1.5 py-0.5 text-[10px] text-[#ff9f0a]">
                        Featured
                      </span>
                    )}
                    <span className={`rounded px-1.5 py-0.5 text-[10px] ${
                      project.published
                        ? "bg-[#30d158]/15 text-[#30d158]"
                        : "bg-white/5 text-[#6e6e73]"
                    }`}>
                      {project.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                {project.techStack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 5).map((ts) => (
                      <span
                        key={ts.techItemId}
                        className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-[#8c8c8c]"
                      >
                        {ts.techItem.name}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
