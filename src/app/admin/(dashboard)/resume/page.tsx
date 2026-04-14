import { getResumeRepository } from "@/infrastructure/container";
import { ResumeManager } from "./ResumeManager";

export default async function AdminResumePage() {
  const repo = getResumeRepository();
  const resumes = await repo.findAll();

  const serialized = resumes.map((r) => ({
    id: r.id,
    locale: r.locale as string,
    fileName: r.fileName,
    fileSize: r.fileSize,
    fileUrl: r.fileUrl,
    active: r.active,
    createdAt: new Date(r.createdAt).toISOString(),
  }));

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-semibold">Resume / CV</h1>
      <p className="mb-8 text-[13px] text-[#6e6e73]">
        Upload your CV for each language. The active resume will be available
        for download on the portfolio footer and social links.
      </p>
      <ResumeManager resumes={serialized} />
    </div>
  );
}
