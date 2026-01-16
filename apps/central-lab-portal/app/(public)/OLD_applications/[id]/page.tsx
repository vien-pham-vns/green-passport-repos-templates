import { notFound } from "next/navigation";
import DownloadPdfButton from "@/components/application-detail/download-pdf-button";
import ApplicationDetail from "@/features/application-detail";
import { getApplicationById } from "@/features/application-detail/action";
import type { ApplicationContent } from "@/types/application";

export default async function ApplicationPage({
  params,
}: PageProps<"/OLD_applications/[id]">) {
  const paramItems = await params;
  const { id } = paramItems;

  const applicationData = await getApplicationById(id);
  if (!applicationData?.content) {
    return notFound();
  }

  const data: ApplicationContent = applicationData.content;

  return (
    <main className="min-h-screen min-w-[1312px] bg-gray-100 py-8 px-4">
      <DownloadPdfButton />
      <ApplicationDetail data={data} />
    </main>
  );
}
