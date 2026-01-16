"use client";

import { CentralLabForm } from "@/components/central-lab-application-form/form";
import { FormNavigation } from "@/components/central-lab-application-form/form-navigation";
import { FormProvider } from "@/features/application-submit-form/context";
import { useApplicationSubmitForm } from "@/features/application-submit-form/hooks/use-application-submit-form";
import { Step1LabTestInformation } from "@/features/application-submit-form/steps/step1-lab-test-information";
import { Step2Sample } from "@/features/application-submit-form/steps/step2-sample";
import { Step3Option } from "@/features/application-submit-form/steps/step3-option";
import { Step4SummaryAndSubmit } from "@/features/application-submit-form/steps/step4-summary-and-submit";
import { FormHeader } from "./components/form-header";

export default function CentralLabApplicationForm() {
  const {
    methods,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    optimisticSubmissions,
    handleNext,
    prevStep,
    goToStep,
    handleFormChange,
    onSubmit,
    isSubmitting,
  } = useApplicationSubmitForm();
  return (
    <FormProvider methods={methods}>
      <div className="min-h-screen bg-gray-50 py-4 px-4 md:py-8 md:px-6">
        <div className="mx-auto max-w-4xl">
          <FormHeader submissionCount={optimisticSubmissions.length} />

          <div className="bg-white rounded-lg shadow-sm p-5 md:p-6 mb-6">
            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onStepClick={(step) => step < currentStep && goToStep(step)}
            />
          </div>

          <CentralLabForm
            onSubmit={
              isLastStep
                ? onSubmit
                : (e) => {
                    e.preventDefault();
                    handleNext();
                  }
            }
            onChange={handleFormChange}
            currentStep={currentStep}
            totalSteps={totalSteps}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            onPrevious={prevStep}
            onNext={handleNext}
            isSubmitting={isSubmitting}
            className="bg-white rounded-lg shadow-sm p-5 md:p-6"
          >
            <CentralLabForm.Content>
              {currentStep === 1 && <Step1LabTestInformation />}
              {currentStep === 2 && <Step2Sample />}
              {currentStep === 3 && <Step3Option />}
              {currentStep === 4 && (
                <Step4SummaryAndSubmit onEditStep={goToStep} />
              )}
            </CentralLabForm.Content>
            <CentralLabForm.Actions />
          </CentralLabForm>
        </div>
      </div>
    </FormProvider>
  );
}
