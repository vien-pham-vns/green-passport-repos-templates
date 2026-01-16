"use client";

import type React from "react";
import { createContext, useContext } from "react";

interface CentralLabFormContextType {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onStepClick?: (step: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isSubmitting?: boolean;
}

const CentralLabFormContext = createContext<
  CentralLabFormContextType | undefined
>(undefined);

export const useCentralLabFormContext = () => {
  const context = useContext(CentralLabFormContext);
  if (!context) {
    throw new Error(
      "useCentralLabFormContext must be used within CentralLabForm",
    );
  }
  return context;
};

interface CentralLabFormProps {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (event: React.FormEvent<HTMLFormElement>) => void;
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onStepClick?: (step: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

/**
 * CentralLabForm - Root compound component with context provider
 * Provides form state and navigation to child components
 */
export const CentralLabFormRoot = ({
  children,
  onSubmit,
  onChange,
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  onStepClick,
  onPrevious,
  onNext,
  isSubmitting,
  className,
}: CentralLabFormProps) => {
  return (
    <CentralLabFormContext.Provider
      value={{
        currentStep,
        totalSteps,
        isFirstStep,
        isLastStep,
        onStepClick,
        onPrevious,
        onNext,
        isSubmitting,
      }}
    >
      <form onSubmit={onSubmit} onChange={onChange} className={className}>
        {children}
      </form>
    </CentralLabFormContext.Provider>
  );
};
