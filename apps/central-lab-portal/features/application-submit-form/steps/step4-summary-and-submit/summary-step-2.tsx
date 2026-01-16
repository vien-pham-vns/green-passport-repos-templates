import { Edit2 } from "lucide-react";
import type { Step2SampleData } from "@/features/application-submit-form/steps/step2-sample/schema";
import { SummaryField } from "@/features/application-submit-form/steps/step4-summary-and-submit/summary-field";
import {
	containerAfterTestedOptions,
	getDisplayNameFromOptions,
	moreInformationOptions,
	objectivesOptions,
	sampleConditionOptions,
	sampleDeliveryMeansOptions,
	temperatureAtSampleReceivedOptions,
} from "@/features/application-submit-form/steps/step4-summary-and-submit/utils";

interface SummarySectionProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

const SummarySection = ({
	title,
	children,
	className = "",
}: SummarySectionProps) => (
	<div className={className}>
		<h4 className="text-lg font-medium text-gray-900 mb-2">{title}</h4>
		<div>{children}</div>
	</div>
);

interface SummaryStep2Props {
	onHandleEdit: (step: number) => void;
	step2Sample: Step2SampleData;
}

export const SummaryStep2 = ({
	onHandleEdit,
	step2Sample,
}: SummaryStep2Props) => {
	return (
		<div className="border border-gray-200 rounded-lg p-8">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-xl font-semibold text-primary">Sample</h3>
				<button
					type="button"
					onClick={() => onHandleEdit(2)}
					className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
				>
					<Edit2 className="size-4" />
					Edit
				</button>
			</div>
			<div className="space-y-10 text-base">
				{step2Sample && (
					<>
						{/* Objective */}
						<SummarySection title="Objective">
							<SummaryField
								label="Selected Objective"
								value={step2Sample.objectives}
								formatter={(value) =>
									getDisplayNameFromOptions(objectivesOptions, value)
								}
							/>
							{step2Sample.objectives === "other" && (
								<SummaryField
									label="Other Objective"
									value={step2Sample.objectivesOther}
									isOptional
									className="mt-2"
								/>
							)}
						</SummarySection>

						{/* More Information */}
						{step2Sample.moreInformation && (
							<SummarySection title="More Information">
								<SummaryField
									label="Selected Option"
									value={step2Sample.moreInformation}
									formatter={(value) =>
										getDisplayNameFromOptions(moreInformationOptions, value)
									}
								/>
								{step2Sample.moreInformation === "show-standard-limitation" && (
									<SummaryField
										label="Standard Limitation"
										value={step2Sample.standardLimitation}
										isOptional
										className="mt-2"
									/>
								)}
							</SummarySection>
						)}

						{/* Container After Tested */}
						<SummarySection title="Container After Tested">
							<SummaryField
								label="Selected Option"
								value={step2Sample.containerAfterTested}
								formatter={(value) =>
									getDisplayNameFromOptions(containerAfterTestedOptions, value)
								}
							/>
						</SummarySection>

						{/* Temperature at Sample Received */}
						<SummarySection title="Temperature at Sample Received">
							<SummaryField
								label="Temperature"
								value={step2Sample.temperatureAtSampleReceived}
								formatter={(value) =>
									getDisplayNameFromOptions(
										temperatureAtSampleReceivedOptions,
										value,
									)
								}
							/>
						</SummarySection>

						{/* Sample Delivery Means */}
						<SummarySection title="Sample Delivery Means">
							<SummaryField
								label="Delivery Method"
								value={step2Sample.sampleDeliveryMeans}
								formatter={(value) =>
									getDisplayNameFromOptions(sampleDeliveryMeansOptions, value)
								}
							/>
							{step2Sample.sampleDeliveryMeans === "other" && (
								<SummaryField
									label="Other Method"
									value={step2Sample.sampleDeliveryMeansOther}
									isOptional
									className="mt-2"
								/>
							)}
						</SummarySection>

						{/* Sample List */}
						<SummarySection
							title={`Sample List (${step2Sample.sampleList?.length || 0} sample${
								(step2Sample.sampleList?.length || 0) !== 1 ? "s" : ""
							})`}
							className="space-y-4"
						>
							{step2Sample.sampleList?.map((sample, index) => (
								<div
									key={`${sample.sampleName}-${sample.customerCode}-${index}`}
									className="border border-gray-100 rounded-lg p-3 bg-gray-50 not-first:mt-4"
								>
									<h5 className="font-medium text-gray-800 mb-2">
										Sample {index + 1}
									</h5>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
										<SummaryField
											label="Sample Name"
											value={sample.sampleName}
										/>
										<SummaryField
											label="Customer Code"
											value={sample.customerCode}
										/>
										<SummaryField
											label="Qty/Container"
											value={sample.quantityPerContainer}
										/>
										<SummaryField
											label="Container Unit"
											value={sample.containerUnit}
										/>
										<SummaryField
											label="Total Containers"
											value={sample.totalContainer}
										/>
										<SummaryField
											label="Condition"
											value={sample.sampleCondition}
											formatter={(value) =>
												getDisplayNameFromOptions(sampleConditionOptions, value)
											}
										/>
										<SummaryField
											label="Test Items"
											value={sample.testItem}
											colSpan={2}
										/>
									</div>
								</div>
							))}
						</SummarySection>
					</>
				)}
			</div>
		</div>
	);
};
