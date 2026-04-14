"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateAboutAction } from "@/actions/about";
import { Save } from "lucide-react";

type Props = {
  about: {
    bioPt: string;
    bioEn: string;
    bioEs: string;
    headlinePt: string;
    headlineEn: string;
    headlineEs: string;
  };
  social: {
    github: string;
    linkedin: string;
    behance: string;
    email: string;
  };
  available: boolean;
};

export function SettingsForm({ about, social, available }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"about" | "social">("about");

  async function handleSaveAbout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement)?.value ?? "";

    try {
      await updateAboutAction({
        translations: [
          { locale: "PT", title: "Sobre Mim", bio: get("bioPt"), headline: get("headlinePt") },
          { locale: "EN", title: "About Me", bio: get("bioEn"), headline: get("headlineEn") },
          { locale: "ES", title: "Sobre Mí", bio: get("bioEs"), headline: get("headlineEs") },
        ],
      });
      router.refresh();
    } catch (err) {
      alert("Error saving. Check the fields.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveSocial(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.value ?? "";

    try {
      const body = {
        social_github: get("github"),
        social_linkedin: get("linkedin"),
        social_behance: get("behance"),
        social_email: get("emailSocial"),
        available_for_work: (form.elements.namedItem("available") as HTMLInputElement).checked
          ? "true"
          : "false",
      };

      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      router.refresh();
    } catch (err) {
      alert("Error saving social settings.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 flex gap-1 rounded-lg bg-[#1a1a1a] p-1">
        <button
          type="button"
          onClick={() => setTab("about")}
          className={`rounded-md px-4 py-2 text-[13px] transition-colors ${
            tab === "about" ? "bg-white/10 text-[#f5f5f7]" : "text-[#6e6e73] hover:text-[#a1a1a6]"
          }`}
        >
          About Me
        </button>
        <button
          type="button"
          onClick={() => setTab("social")}
          className={`rounded-md px-4 py-2 text-[13px] transition-colors ${
            tab === "social" ? "bg-white/10 text-[#f5f5f7]" : "text-[#6e6e73] hover:text-[#a1a1a6]"
          }`}
        >
          Social & Availability
        </button>
      </div>

      {tab === "about" && (
        <form onSubmit={handleSaveAbout} className="max-w-2xl space-y-6">
          <h2 className="text-[16px] font-medium text-[#f5f5f7]">About Me Content</h2>

          {/* Headlines */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InputField label="Headline (PT)" name="headlinePt" defaultValue={about.headlinePt} />
            <InputField label="Headline (EN)" name="headlineEn" defaultValue={about.headlineEn} />
            <InputField label="Headline (ES)" name="headlineEs" defaultValue={about.headlineEs} />
          </div>

          {/* Bios */}
          <TextAreaField label="Bio (PT)" name="bioPt" defaultValue={about.bioPt} rows={6} />
          <TextAreaField label="Bio (EN)" name="bioEn" defaultValue={about.bioEn} rows={6} />
          <TextAreaField label="Bio (ES)" name="bioEs" defaultValue={about.bioEs} rows={6} />

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#2997ff] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#40a9ff] disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}

      {tab === "social" && (
        <form onSubmit={handleSaveSocial} className="max-w-2xl space-y-6">
          <h2 className="text-[16px] font-medium text-[#f5f5f7]">Social Links</h2>

          <InputField label="GitHub" name="github" defaultValue={social.github} placeholder="https://github.com/..." />
          <InputField label="LinkedIn" name="linkedin" defaultValue={social.linkedin} placeholder="https://linkedin.com/in/..." />
          <InputField label="Behance" name="behance" defaultValue={social.behance} placeholder="https://behance.net/..." />
          <InputField label="Email" name="emailSocial" defaultValue={social.email} placeholder="your@email.com" />

          <label className="flex items-center gap-3 text-[13px] text-[#a1a1a6]">
            <input
              type="checkbox"
              name="available"
              defaultChecked={available}
              className="rounded"
            />
            Available for work
          </label>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#2997ff] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#40a9ff] disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
}

function InputField({
  label, name, defaultValue, placeholder,
}: {
  label: string; name: string; defaultValue?: string; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[12px] font-medium text-[#6e6e73]">{label}</label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-[40px] rounded-lg bg-white/5 px-3 text-[13px] text-[#f5f5f7] outline-none placeholder:text-[#4a4a4e] focus:ring-1 focus:ring-[#2997ff]"
      />
    </div>
  );
}

function TextAreaField({
  label, name, defaultValue, rows = 4,
}: {
  label: string; name: string; defaultValue?: string; rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[12px] font-medium text-[#6e6e73]">{label}</label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="rounded-lg bg-white/5 p-3 text-[13px] text-[#f5f5f7] outline-none placeholder:text-[#4a4a4e] focus:ring-1 focus:ring-[#2997ff]"
      />
    </div>
  );
}
