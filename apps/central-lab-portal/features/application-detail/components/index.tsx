import ApplicationDetailBranches from "@/features/application-detail/components/branches";
import ApplicationDetailDocumentNumber from "@/features/application-detail/components/document-number";
import ApplicationDetailFooter from "@/features/application-detail/components/footer";
import ApplicationDetailHeader from "@/features/application-detail/components/header";
import ApplicationDetailInfoGrid from "@/features/application-detail/components/info-grid";
import ApplicationDetailSampleDeliveryMeans from "@/features/application-detail/components/sample-delivery-means";
import ApplicationDetailSampleTable from "@/features/application-detail/components/sample-table";
import ApplicationDetailSection from "@/features/application-detail/components/section";
import ApplicationDetailTitle from "@/features/application-detail/components/title";
import { cn } from "@/lib/utils";

export default function ApplicationDetail({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"application-root w-[1280px] mx-auto p-8 bg-white shadow-lg border border-black text-sm font-sans min-h-[1414px]",
				className,
			)}
		>
			{children}
		</div>
	);
}

// Attach sub-components
ApplicationDetail.Header = ApplicationDetailHeader;
ApplicationDetail.Title = ApplicationDetailTitle;
ApplicationDetail.Branches = ApplicationDetailBranches;
ApplicationDetail.InfoGrid = ApplicationDetailInfoGrid;
ApplicationDetail.Section = ApplicationDetailSection;
ApplicationDetail.SampleDeliveryMeans = ApplicationDetailSampleDeliveryMeans;
ApplicationDetail.SampleTable = ApplicationDetailSampleTable;
ApplicationDetail.Footer = ApplicationDetailFooter;
ApplicationDetail.DocumentNumber = ApplicationDetailDocumentNumber;
