"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateProjectAction, deleteProjectAction } from "@/actions/projects";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type ProjectData = {
  id: string;
  slug: string;
  thumbnailUrl?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  translations: { locale: string; title: string; description: string }[];
};

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/admin/projects/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setProject(data);
      } catch {
        router.push("/admin/projects");
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const form = e.currentTarget;
    const formData = new FormData();

    formData.set("slug", (form.elements.namedItem("slug") as HTMLInputElement).value);
    formData.set("thumbnailUrl", (form.elements.namedItem("thumbnailUrl") as HTMLInputElement).value);
    formData.set("liveUrl", (form.elements.namedItem("liveUrl") as HTMLInputElement).value);
    formData.set("repoUrl", (form.elements.namedItem("repoUrl") as HTMLInputElement).value);
    formData.set("featured", (form.elements.namedItem("featured") as HTMLInputElement).checked ? "true" : "false");
    formData.set("published", (form.elements.namedItem("published") as HTMLInputElement).checked ? "true" : "false");
    formData.set("sortOrder", (form.elements.namedItem("sortOrder") as HTMLInputElement).value || "0");

    const translations = [
      {
        locale: "PT",
        title: (form.elements.namedItem("titlePt") as HTMLInputElement).value,
        description: (form.elements.namedItem("descPt") as HTMLTextAreaElement).value,
      },
      {
        locale: "EN",
        title: (form.elements.namedItem("titleEn") as HTMLInputElement).value,
        description: (form.elements.namedItem("descEn") as HTMLTextAreaElement).value,
      },
      {
        locale: "ES",
        title: (form.elements.namedItem("titleEs") as HTMLInputElement).value,
        description: (form.elements.namedItem("descEs") as HTMLTextAreaElement).value,
      },
    ].filter((t) => t.title);

    formData.set("translations", JSON.stringify(translations));

    try {
      await updateProjectAction(id, formData);
      router.push("/admin/projects");
    } catch (err) {
      alert("Error updating project. Check the form fields.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeleting(true);
    try {
      await deleteProjectAction(id);
      router.push("/admin/projects");
    } catch (err) {
      alert("Error deleting project.");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-6 animate-spin rounded-full border-2 border-[#2997ff] border-t-transparent" />
      </div>
    );
  }

  if (!project) return null;

  const getTranslation = (locale: string) =>
    project.translations.find((t) => t.locale === locale) ?? { title: "", description: "" };

  const pt = getTranslation("PT");
  const en = getTranslation("EN");
  const es = getTranslation("ES");

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="flex size-8 items-center justify-center rounded-lg bg-white/5 text-[#6e6e73] transition-colors hover:bg-white/10 hover:text-[#f5f5f7]"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-[24px] font-semibold">Edit Project</h1>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 rounded-lg bg-[#ff453a]/10 px-4 py-2.5 text-[13px] text-[#ff453a] transition-colors hover:bg-[#ff453a]/20 disabled:opacity-50"
        >
          <Trash2 size={14} />
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Slug */}
        <Field label="Slug" name="slug" defaultValue={project.slug} required />

        {/* Thumbnail URL */}
        <Field label="Thumbnail URL (cover image)" name="thumbnailUrl" defaultValue={project.thumbnailUrl ?? ""} placeholder="https://..." />

        {/* Titles per locale */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field label="Title (PT)" name="titlePt" defaultValue={pt.title} required />
          <Field label="Title (EN)" name="titleEn" defaultValue={en.title} />
          <Field label="Title (ES)" name="titleEs" defaultValue={es.title} />
        </div>

        {/* Descriptions per locale */}
        <TextArea label="Description (PT)" name="descPt" defaultValue={pt.description} required />
        <TextArea label="Description (EN)" name="descEn" defaultValue={en.description} />
        <TextArea label="Description (ES)" name="descEs" defaultValue={es.description} />

        {/* URLs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Live URL" name="liveUrl" defaultValue={project.liveUrl ?? ""} placeholder="https://..." />
          <Field label="Repository URL" name="repoUrl" defaultValue={project.repoUrl ?? ""} placeholder="https://github.com/..." />
        </div>

        {/* Options */}
        <div className="flex items-center gap-6">
          <Field label="Sort Order" name="sortOrder" type="number" defaultValue={String(project.sortOrder)} />
          <label className="flex items-center gap-2 text-[13px] text-[#a1a1a6]">
            <input type="checkbox" name="featured" className="rounded" defaultChecked={project.featured} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-[13px] text-[#a1a1a6]">
            <input type="checkbox" name="published" className="rounded" defaultChecked={project.published} />
            Published
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-[#2997ff] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#40a9ff] disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label, name, placeholder, required, type = "text", defaultValue = "",
}: {
  label: string; name: string; placeholder?: string; required?: boolean; type?: string; defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[12px] font-medium text-[#6e6e73]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        className="h-[40px] rounded-lg bg-white/5 px-3 text-[13px] text-[#f5f5f7] outline-none placeholder:text-[#4a4a4e] focus:ring-1 focus:ring-[#2997ff]"
      />
    </div>
  );
}

function TextArea({
  label, name, placeholder, required, defaultValue = "",
}: {
  label: string; name: string; placeholder?: string; required?: boolean; defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[12px] font-medium text-[#6e6e73]">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        className="rounded-lg bg-white/5 p-3 text-[13px] text-[#f5f5f7] outline-none placeholder:text-[#4a4a4e] focus:ring-1 focus:ring-[#2997ff]"
      />
    </div>
  );
}
