"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Trash2, Check, ExternalLink } from "lucide-react";
import { ErrorModal } from "@/components/ui/ErrorModal";

type Resume = {
  id: string;
  locale: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  active: boolean;
  createdAt: string;
};

type Props = {
  resumes: Resume[];
};

const locales = [
  { code: "PT", label: "Portuguese", flag: "🇧🇷" },
  { code: "EN", label: "English", flag: "🇺🇸" },
  { code: "ES", label: "Spanish", flag: "🇪🇸" },
];

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ResumeManager({ resumes }: Props) {
  const router = useRouter();
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState<{ open: boolean; title?: string; description?: string }>({
    open: false,
  });

  async function handleUpload(locale: string, file: File) {
    if (file.type !== "application/pdf") {
      setError({
        open: true,
        title: "Invalid File",
        description: "Only PDF files are accepted for resumes.",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError({
        open: true,
        title: "File Too Large",
        description: "Maximum file size is 10MB.",
      });
      return;
    }

    setUploading(locale);

    try {
      // 1. Upload do arquivo para R2
      const formData = new FormData();
      formData.set("file", file);
      formData.set("category", "resumes");

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload failed");
      }

      const { url } = await uploadRes.json();

      // 2. Registrar no banco
      const res = await fetch("/api/admin/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          fileUrl: url,
          fileName: file.name,
          fileSize: file.size,
        }),
      });

      if (!res.ok) throw new Error("Failed to save resume");

      router.refresh();
    } catch {
      setError({
        open: true,
        title: "Upload Failed",
        description: "Could not upload the resume. Please try again.",
      });
    } finally {
      setUploading(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this resume?")) return;

    try {
      const res = await fetch(`/api/admin/resume/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.refresh();
    } catch {
      setError({
        open: true,
        title: "Delete Failed",
        description: "Could not remove the resume. Please try again.",
      });
    }
  }

  async function handleSetActive(id: string) {
    try {
      const res = await fetch(`/api/admin/resume/${id}/activate`, { method: "PUT" });
      if (!res.ok) throw new Error("Activate failed");
      router.refresh();
    } catch {
      setError({
        open: true,
        title: "Activation Failed",
        description: "Could not set this resume as active.",
      });
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {locales.map((loc) => {
          const localeResumes = resumes
            .filter((r) => r.locale === loc.code)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

          const activeResume = localeResumes.find((r) => r.active);

          return (
            <div key={loc.code} className="rounded-xl bg-[#1a1a1a] p-6">
              {/* Header */}
              <div className="mb-5 flex items-center gap-2">
                <span className="text-[20px]">{loc.flag}</span>
                <h3 className="text-[15px] font-medium text-[#f5f5f7]">
                  {loc.label}
                </h3>
              </div>

              {/* Active resume */}
              {activeResume ? (
                <div className="mb-4 rounded-lg bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <FileText size={20} className="mt-0.5 flex-shrink-0 text-[#2997ff]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-[#f5f5f7]">
                        {activeResume.fileName}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#6e6e73]">
                        {formatFileSize(activeResume.fileSize)} &middot;{" "}
                        {new Date(activeResume.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="rounded bg-[#30d158]/15 px-1.5 py-0.5 text-[10px] text-[#30d158]">
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <a
                      href={activeResume.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-[11px] text-[#8c8c8c] transition-colors hover:bg-white/10 hover:text-[#f5f5f7]"
                    >
                      <ExternalLink size={12} />
                      View
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(activeResume.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-[11px] text-[#ff453a] transition-colors hover:bg-[#ff453a]/10"
                    >
                      <Trash2 size={12} />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-4 rounded-lg border border-dashed border-white/10 p-6 text-center">
                  <FileText size={24} className="mx-auto mb-2 text-[#4a4a4e]" />
                  <p className="text-[12px] text-[#6e6e73]">No resume uploaded</p>
                </div>
              )}

              {/* Upload button */}
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/5 py-3 text-[13px] text-[#a1a1a6] transition-colors hover:bg-white/8 hover:text-[#f5f5f7]">
                <Upload size={14} />
                {uploading === loc.code ? "Uploading..." : "Upload new PDF"}
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  disabled={uploading === loc.code}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(loc.code, file);
                    e.target.value = "";
                  }}
                />
              </label>

              {/* Previous versions */}
              {localeResumes.filter((r) => !r.active).length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-[11px] text-[#4a4a4e]">Previous versions</p>
                  {localeResumes
                    .filter((r) => !r.active)
                    .map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between py-2 text-[11px]"
                      >
                        <span className="truncate text-[#6e6e73]">{r.fileName}</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleSetActive(r.id)}
                            className="text-[#2997ff] hover:underline"
                          >
                            <Check size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(r.id)}
                            className="text-[#ff453a] hover:underline"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ErrorModal
        isOpen={error.open}
        onClose={() => setError((prev) => ({ ...prev, open: false }))}
        type="generic"
        title={error.title}
        description={error.description}
      />
    </>
  );
}
