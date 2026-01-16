"use client";

import { useEffect, useRef, useState } from "react";
import { MobileStepProgressBar } from "@/components/central-lab-application-form/mobile-step-progress-bar";
import { Stepper } from "@/components/stepper";
import { cn } from "@/lib/utils";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const steps = [
  { id: 1, label: "Lab Test Info" },
  { id: 2, label: "Sample" },
  { id: 3, label: "Option" },
  { id: 4, label: "Summary" },
];

export const FormNavigation = ({
  currentStep,
  totalSteps,
  onStepClick,
}: FormNavigationProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We want to stick when the original progress bar is scrolled past the top
        // entry.isIntersecting is false when it's out of view
        // entry.boundingClientRect.top < 0 confirms it's above the viewport
        setIsSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      {
        threshold: 0,
        // Use rootMargin to trigger slightly before/after it hits the edge for smoothness
        rootMargin: "-1px 0px 0px 0px",
      },
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, []);

  return (
    <>
      {/* Desktop/Tablet Stepper - hidden on mobile */}
      <div className="hidden md:block mb-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={onStepClick}
        />
      </div>

      {/* Mobile Progress Bar - hidden on desktop/tablet */}
      <div className="block md:hidden mb-6" ref={sentinelRef}>
        <MobileStepProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          className={cn(
            "transition-opacity duration-300",
            isSticky ? "opacity-0 invisible" : "opacity-100 visible",
          )}
        />
      </div>

      <div
        className={cn(
          "md:hidden fixed top-0 left-0 right-0 z-50 p-0 transition-all duration-300 ease-in-out",
          isSticky
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible pointer-events-none",
        )}
      >
        <div className="bg-white border-none shadow-[0_0_3px_6px_rgba(255,255,255,0.3)] p-1">
          <MobileStepProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            hideLabels
            className="rounded-none"
          />
        </div>
      </div>
    </>
  );
};
