import clsx from "clsx";
import type * as React from "react";

interface StepContainerProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
}

export const StepContainer = ({
	title,
	description,
	children,
	className,
}: StepContainerProps) => {
	return (
		<div className={clsx("w-full", className)}>
			<div className="mb-6">
				<h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
				{description && (
					<p className="text-base text-gray-600">{description}</p>
				)}
			</div>
			<div className="space-y-10">{children}</div>
		</div>
	);
};
