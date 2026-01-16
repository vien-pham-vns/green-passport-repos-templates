import clsx from "clsx";
import { Check } from "lucide-react";
import * as React from "react";

export interface Step {
  id: number;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
  className?: string;
}

export const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  className,
}: StepperProps) => {
  const handleStepClick = (stepId: number) => {
    // Only allow clicking on completed steps
    if (stepId < currentStep && onStepClick) {
      onStepClick(stepId);
    }
  };

  return (
    <nav aria-label="Progress" className={clsx("w-full", className)}>
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isPending = step.id > currentStep;
          const isClickable = isCompleted;

          return (
            <li
              key={step.id}
              className={clsx("flex items-center", {
                "flex-1": index < steps.length - 1,
              })}
            >
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  disabled={!isClickable}
                  className={clsx(
                    "flex size-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    {
                      "border-primary bg-primary text-primary-foreground":
                        isCompleted,
                      "border-primary bg-white text-primary ring-2 ring-primary ring-offset-2":
                        isCurrent,
                      "border-gray-300 bg-white text-gray-500": isPending,
                      "cursor-pointer hover:border-primary/80 hover:bg-primary/80":
                        isClickable,
                      "cursor-not-allowed": !isClickable,
                    },
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="size-5" aria-hidden="true" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </button>
                <span
                  className={clsx(
                    "mt-2 text-xs font-medium text-center max-w-[80px]",
                    {
                      "text-primary": isCurrent || isCompleted,
                      "text-gray-500": isPending,
                    },
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={clsx("h-0.5 flex-1 mx-2 transition-colors", {
                    "bg-primary": isCompleted,
                    "bg-gray-300": !isCompleted,
                  })}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
