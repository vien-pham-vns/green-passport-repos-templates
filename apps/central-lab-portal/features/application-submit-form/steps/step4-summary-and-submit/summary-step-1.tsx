import { Edit2 } from "lucide-react";
import type { Step1LabTestInformationData } from "@/features/application-submit-form/steps/step1-lab-test-information/schema";
import { SummaryField } from "@/features/application-submit-form/steps/step4-summary-and-submit/summary-field";
import {
	byPostOptions,
	centralLabBranchOptions,
	formatRequiredReportIn,
	getDisplayNameFromOptions,
	trInformOptions,
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

interface SummaryStep1Props {
	onHandleEdit: (step: number) => void;
	step1LabTestInformation: Step1LabTestInformationData;
}

export const SummaryStep1 = ({
	onHandleEdit,
	step1LabTestInformation,
}: SummaryStep1Props) => {
	return (
		<div className="border border-gray-200 rounded-lg p-8">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-xl font-semibold text-primary">
					Lab Test Information
				</h3>
				<button
					type="button"
					onClick={() => onHandleEdit(1)}
					className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
				>
					<Edit2 className="size-4" />
					Edit
				</button>
			</div>
			<div className="space-y-10 text-base">
				{step1LabTestInformation && (
					<>
						{/* Central Lab Selection */}
						<SummarySection title="Central Lab">
							<SummaryField
								label="Selected Branch"
								value={step1LabTestInformation.centralLabBranch}
								formatter={(value) =>
									getDisplayNameFromOptions(centralLabBranchOptions, value)
								}
							/>
						</SummarySection>

						{/* Company Information for Test Report */}
						<SummarySection title="Company Information (For Test Report)">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								<SummaryField
									label="Company Name (Thai)"
									value={step1LabTestInformation.companyNameTh}
								/>
								<SummaryField
									label="Company Name (English)"
									value={step1LabTestInformation.companyNameEn}
									isOptional
								/>
								<SummaryField
									label="Company Address (Thai)"
									value={step1LabTestInformation.companyAddressTh}
									colSpan={2}
								/>
								<SummaryField
									label="Company Address (English)"
									value={step1LabTestInformation.companyAddressEn}
									isOptional
									colSpan={2}
								/>
							</div>
						</SummarySection>

						{/* Tax Invoice Information */}
						<SummarySection title="Tax Invoice Information">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								<SummaryField
									label="Company Name"
									value={step1LabTestInformation.taxCompanyName}
								/>
								<SummaryField
									label="Branch"
									value={step1LabTestInformation.branchName}
								/>
								<SummaryField
									label="Company Address"
									value={step1LabTestInformation.taxCompanyAddress}
									colSpan={2}
								/>
								<SummaryField
									label="Tax ID"
									value={step1LabTestInformation.taxIdentificationNumber}
								/>
							</div>
						</SummarySection>

						{/* Test Report Delivery */}
						<SummarySection title="Test Report Delivery">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								<SummaryField
									label="Required Report In"
									value={step1LabTestInformation.requiredReportIn}
									formatter={formatRequiredReportIn}
								/>
								<SummaryField
									label="Report Delivery Method"
									value={step1LabTestInformation.trInform}
									formatter={(value) =>
										getDisplayNameFromOptions(trInformOptions, value)
									}
								/>
								<SummaryField
									label="Original TR Transfer"
									value={
										step1LabTestInformation.originalTRTransfer
											? "By hand"
											: "Other"
									}
								/>
								<SummaryField
									label="By Post"
									value={step1LabTestInformation.byPost}
									formatter={(value) =>
										getDisplayNameFromOptions(byPostOptions, value)
									}
								/>
								{step1LabTestInformation.byPost === "other" && (
									<SummaryField
										label="Other Address"
										value={step1LabTestInformation.byPostAddress}
										isOptional
										colSpan={2}
									/>
								)}
							</div>
						</SummarySection>

						{/* Contact Person */}
						<SummarySection title="Contact Person">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								<SummaryField
									label="Name"
									value={step1LabTestInformation.contactPersonName}
								/>
								<SummaryField
									label="Position"
									value={step1LabTestInformation.contactPersonPotision}
									isOptional
								/>
								<SummaryField
									label="Tel"
									value={step1LabTestInformation.contactPersonTel}
								/>
								<SummaryField
									label="Mobile"
									value={step1LabTestInformation.contactPersonMobile}
									isOptional
								/>
								<SummaryField
									label="Fax"
									value={step1LabTestInformation.contactPersonFax}
									isOptional
								/>
								<SummaryField
									label="LINE ID"
									value={step1LabTestInformation.contactPersonLineId}
									isOptional
								/>
								<SummaryField
									label="Email"
									value={step1LabTestInformation.contactPersonEmail}
									isOptional
									colSpan={2}
								/>
							</div>
						</SummarySection>
					</>
				)}
			</div>
		</div>
	);
};
