import { zodResolver } from "@hookform/resolvers/zod";
import { useOptimistic, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useConfig } from "@/providers/config-context";
import { submitCentralLabApplication } from "../action";
import {
  type CentralLabApplicationData,
  centralLabApplicationDefaultValues,
  centralLabApplicationSchema,
} from "../schema";
import { useFormStep } from "./use-form-step";
import { useFormStorage } from "./use-form-storage";

export const useApplicationSubmitForm = () => {
  const { publicDomain } = useConfig();
  const [isPending, startTransition] = useTransition();
  const {
    currentStep,
    totalSteps,
    goToStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
  } = useFormStep();
  const { formData, updateFormData, clearStorage } = useFormStorage();

  const [submissions, setSubmissions] = useState<CentralLabApplicationData[]>(
    [],
  );
  const [optimisticSubmissions, addOptimisticSubmission] = useOptimistic(
    submissions,
    (current, next: CentralLabApplicationData) => [...current, next],
  );

  const methods = useForm<CentralLabApplicationData>({
    resolver: zodResolver(centralLabApplicationSchema),
    mode: "onChange",
    defaultValues: { ...centralLabApplicationDefaultValues, ...formData },
  });

  const { reset, trigger, getValues, handleSubmit } = methods;

  /**
   * Handle form change - saves data to storage on user interaction
   */
  const handleFormChange = () => {
    const currentData = getValues();
    updateFormData(currentData);
  };

  /**
   * Handle Next button click - validates current step before proceeding
   */
  const handleNext = async () => {
    const stepFieldMap: Record<number, string[]> = {
      1: ["step1LabTestInformation"],
      2: ["step2Sample"],
      3: ["step3Option"],
      4: ["step4SummaryAndSubmit"],
    };

    const fieldsToValidate = stepFieldMap[
      currentStep
    ] as (keyof CentralLabApplicationData)[];
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      handleFormChange();
      nextStep();
    } else {
      setTimeout(() => {
        const errorEl = document.querySelector(
          '[data-invalid="true"], .text-red-800',
        );
        errorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  const cleanupAfterSubmission = (applicationId?: string) => {
    startTransition(() => {
      clearStorage();
      reset();
      goToStep(1);
      toast.success("Application submitted successfully", {
        action: {
          label: "View Application",
          onClick: () => {
            if (applicationId) {
              window.open(
                `${publicDomain}/applications/${applicationId}`,
                "_blank",
              );
            }
          },
        },
        duration: 10000,
      });
    });
  };

  const onSubmit = async (data: CentralLabApplicationData) => {
    startTransition(async () => {
      addOptimisticSubmission(data);
      const result = await submitCentralLabApplication(data);

      if (result.success && result.data) {
        setSubmissions((prev) => [
          ...prev,
          result.data.validatedData as CentralLabApplicationData,
        ]);
        cleanupAfterSubmission(result.id);
      } else {
        toast.error(result.message, {
          description: JSON.stringify(result.errors, null, 2),
        });
      }
    });
  };

  return {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    goToStep,
    nextStep,
    prevStep,
    methods,
    optimisticSubmissions,
    handleNext,
    handleFormChange,
    isSubmitting: isPending || methods.formState.isSubmitting,
    onSubmit: handleSubmit(onSubmit),
  };
};
