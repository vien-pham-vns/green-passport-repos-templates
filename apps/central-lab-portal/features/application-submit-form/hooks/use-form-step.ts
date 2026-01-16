"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const TOTAL_STEPS = 4;
const DEFAULT_STEP = 1;

export const useFormStep = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStep = useMemo(() => {
    const stepParam = searchParams.get("step");
    const step = stepParam ? Number.parseInt(stepParam, 10) : DEFAULT_STEP;
    return step >= 1 && step <= TOTAL_STEPS ? step : DEFAULT_STEP;
  }, [searchParams]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= TOTAL_STEPS) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", step.toString());
        router.push(`?${params.toString()}`);
      }
    },
    [router, searchParams],
  );

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, goToStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === TOTAL_STEPS;

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    goToStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
  };
};
