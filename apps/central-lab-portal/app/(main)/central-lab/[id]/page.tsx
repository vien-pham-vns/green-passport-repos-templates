import { Suspense } from "react";
import { notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { ApplicationDetailContent } from "@/features/portal/components/application-detail-content";
import { getApplicationById } from "@/features/actions/detail";

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params;

  let application;
  try {
    application = await getApplicationById(id);
  } catch (error) {
    console.error("Failed to fetch application:", error);
    notFound();
  }

  if (!application) {
    notFound();
  }

  return (
    <div className="w-full p-6">
      <Suspense fallback={<ApplicationDetailSkeleton />}>
        <ApplicationDetailContent application={application} />
      </Suspense>
    </div>
  );
}

function ApplicationDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      {/* Left column skeleton - 70% */}
      <div className="lg:col-span-7">
        <Skeleton className="h-[80vh] w-full rounded-lg" />
      </div>

      {/* Right column skeleton - 30% */}
      <div className="lg:col-span-3">
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  );
}
