import clsx from "clsx";

export interface ProgressBarProps {
	currentStep: number;
	totalSteps: number;
	className?: string;
	hideLabels?: boolean;
}

export const MobileStepProgressBar = ({
	currentStep,
	totalSteps,
	className,
	hideLabels = false,
}: ProgressBarProps) => {
	const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

	return (
		<div className={clsx("w-full", className)}>
			{!hideLabels && (
				<div className="flex items-center justify-between mb-2">
					<span className="text-sm font-medium text-gray-700">
						Step {currentStep} of {totalSteps}
					</span>
					<span className="text-sm font-medium text-primary">
						{Math.round(percentage)}%
					</span>
				</div>
			)}
			<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shrink-0">
				<div
					className="h-full bg-primary transition-all duration-300 ease-in-out rounded-full"
					style={{ width: `${percentage}%` }}
					role="progressbar"
					aria-valuenow={percentage}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label={`Step ${currentStep} of ${totalSteps}`}
				/>
			</div>
		</div>
	);
};
