import { Square, SquareCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisplayCheckboxFieldProps {
	isSelected: boolean;
	label?: React.ReactNode;
	className?: string;
}

const checkboxClasses = "w-5 h-5 shrink-0 display-checkbox-field";

export default function DisplayCheckboxField({
	label,
	isSelected,
	className,
}: DisplayCheckboxFieldProps) {
	return (
		<div className={cn("flex items-center gap-2", className)}>
			{isSelected ? (
				<SquareCheckBig strokeWidth={3} className={checkboxClasses} />
			) : (
				<Square className={checkboxClasses} />
			)}
			{label && <span className="leading-tight">{label}</span>}
		</div>
	);
}
