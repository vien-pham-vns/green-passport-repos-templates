"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { StepContainer } from "@/components/central-lab-application-form/step-container";
import { InputController } from "@/components/form-controllers";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";
import type { Step1LabTestInformationData } from "@/features/application-submit-form/steps/step1-lab-test-information/schema";
import type { Step2SampleData } from "@/features/application-submit-form/steps/step2-sample/schema";
import type { Step3OptionData } from "@/features/application-submit-form/steps/step3-option/schema";
import FormPreviewDialog from "@/features/application-submit-form/steps/step4-summary-and-submit/form-preview-dialog";
import { ImportantNotice } from "@/features/application-submit-form/steps/step4-summary-and-submit/important-notice";
import { SummaryStep1 } from "@/features/application-submit-form/steps/step4-summary-and-submit/summary-step-1";
import { SummaryStep2 } from "@/features/application-submit-form/steps/step4-summary-and-submit/summary-step-2";
import { SummaryStep3 } from "@/features/application-submit-form/steps/step4-summary-and-submit/summary-step-3";

interface Step4Props {
	onEditStep?: (step: number) => void;
}

export const Step4SummaryAndSubmit = ({ onEditStep }: Step4Props) => {
	const { control } = useFormContext<CentralLabApplicationData>();

	// Watch all form data for display
	const formData = useWatch({ control });

	const onHandleEdit = (step: number) => {
		if (onEditStep) {
			onEditStep(step);
		}
	};

	const { step1LabTestInformation, step2Sample, step3Option } = formData;

	return (
		<StepContainer
			title="Summary and Submit"
			description="Please review your information before submitting"
		>
			<div className="space-y-7">
				<ImportantNotice />

				<FormPreviewDialog />

				<SummaryStep1
					onHandleEdit={onHandleEdit}
					step1LabTestInformation={
						step1LabTestInformation as Step1LabTestInformationData
					}
				/>

				<SummaryStep2
					onHandleEdit={onHandleEdit}
					step2Sample={step2Sample as Step2SampleData}
				/>

				<SummaryStep3
					onHandleEdit={onHandleEdit}
					step3Option={step3Option as Step3OptionData}
				/>

				{/* Send By Field */}
				<InputController
					name="step4SummaryAndSubmit.sendBy"
					control={control}
					label="Send By"
					required
					placeholder="Enter your name (max 50 characters)"
					maxLength={50}
				/>
			</div>
		</StepContainer>
	);
};
