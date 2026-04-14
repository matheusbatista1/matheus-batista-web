"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProjectAction } from "@/actions/projects";
import { Save } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

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
      await createProjectAction(formData);
      router.push("/admin/projects");
    } catch (err) {
      alert("Error creating project. Check the form fields.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-semibold">New Project</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Slug */}
        <Field label="Slug" name="slug" placeholder="my-project" required />

        {/* Thumbnail URL */}
        <Field label="Thumbnail URL (cover image)" name="thumbnailUrl" placeholder="https://..." />

        {/* Titles per locale */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field label="Title (PT)" name="titlePt" placeholder="Titulo do projeto" required />
          <Field label="Title (EN)" name="titleEn" placeholder="Project title" />
          <Field label="Title (ES)" name="titleEs" placeholder="Titulo del proyecto" />
        </div>

        {/* Descriptions per locale */}
        <TextArea label="Description (PT)" name="descPt" placeholder="Descricao do projeto..." required />
        <TextArea label="Description (EN)" name="descEn" placeholder="Project description..." />
        <TextArea label="Description (ES)" name="descEs" placeholder="Descripcion del proyecto..." />

        {/* URLs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Live URL" name="liveUrl" placeholder="https://..." />
          <Field label="Repository URL" name="repoUrl" placeholder="https://github.com/..." />
        </div>

        {/* Options */}
        <div className="flex items-center gap-6">
          <Field label="Sort Order" name="sortOrder" type="number" placeholder="0" />
          <label className="flex items-center gap-2 text-[13px] text-[#a1a1a6]">
            <input type="checkbox" name="featured" className="rounded" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-[13px] text-[#a1a1a6]">
            <input type="checkbox" name="published" className="rounded" />
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
          {saving ? "Saving..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label, name, placeholder, required, type = "text",
}: {
  label: string; name: string; placeholder?: string; required?: boolean; type?: string;
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
        className="h-[40px] rounded-lg bg-white/5 px-3 text-[13px] text-[#f5f5f7] outline-none placeholder:text-[#4a4a4e] focus:ring-1 focus:ring-[#2997ff]"
      />
    </div>
  );
}

function TextArea({
  label, name, placeholder, required,
}: {
  label: string; name: string; placeholder?: string; required?: boolean;
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
        className="rounded-lg bg-white/5 p-3 text-[13px] text-[#f5f5f7] outline-none placeholder:text-[#4a4a4e] focus:ring-1 focus:ring-[#2997ff]"
      />
    </div>
  );
}
