import { cn } from "@/lib/utils";

const colSpanClasses: Record<number, string> = {
	1: "col-span-1",
	2: "col-span-2",
	3: "col-span-3",
	4: "col-span-4",
	5: "col-span-5",
	6: "col-span-6",
	7: "col-span-7",
	8: "col-span-8",
	9: "col-span-9",
	10: "col-span-10",
	11: "col-span-11",
	12: "col-span-12",
};
const rowSpanClasses: Record<number, string> = {
	1: "row-span-1",
	2: "row-span-2",
	3: "row-span-3",
	4: "row-span-4",
	5: "row-span-5",
	6: "row-span-6",
	7: "row-span-7",
	8: "row-span-8",
	9: "row-span-9",
	10: "row-span-10",
};

export default function ApplicationDetailSection({
	title,
	children,
	className,
	colSpan = 12,
	rowSpan = 1,
	layout = "vertical",
}: {
	title: string;
	children: React.ReactNode;
	className?: string;
	colSpan?: number;
	rowSpan?: number;
	layout?: "vertical" | "horizontal";
}) {
	if (layout === "horizontal") {
		return (
			<div
				className={cn(
					"border-r border-b border-black flex items-stretch",
					colSpanClasses[colSpan] || "col-span-12",
					rowSpanClasses[rowSpan] || "row-span-1",
					className,
				)}
			>
				<div
					className={cn(
						"cla-review-form-section-title",
						"p-1 flex justify-center text-center",
					)}
				>
					{title}
				</div>
				<div className="flex-1 p-1 flex items-start">{children}</div>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"border-r border-b border-black p-1",
				colSpanClasses[colSpan] || "col-span-12",
				rowSpanClasses[rowSpan] || "row-span-1",
				className,
			)}
		>
			{title && (
				<div
					className={cn(
						"cla-review-form-section-title",
						"mt-1 mb-2 text-center",
					)}
				>
					{title}
				</div>
			)}
			<div>{children}</div>
		</div>
	);
}
