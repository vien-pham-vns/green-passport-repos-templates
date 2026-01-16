"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useCentralLabFormContext } from "@/components/central-lab-application-form/form/central-lab-form";
import { cn } from "@/lib/utils";

interface FormActionsProps {
  children?: React.ReactNode;
}

/**
 * FormActions - Navigation buttons for Previous/Next/Submit
 * Uses context to determine which buttons to show
 * Includes sticky behavior when not scrolled to the bottom
 */
export const FormActions = ({ children }: FormActionsProps) => {
  const { pending } = useFormStatus();
  const {
    isFirstStep,
    isLastStep,
    onPrevious,
    isSubmitting: contextSubmitting,
  } = useCentralLabFormContext();

  const isSubmitting = contextSubmitting || pending;

  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // isSticky is true when the natural position is NOT visible in the viewport
        // We use a small threshold and rootMargin to ensure it feels smooth
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 0px 0px",
      },
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const renderButtons = useCallback(
    (isStickyMode = false) => {
      if (children) {
        return (
          <div
            className={cn(
              "flex items-center justify-between",
              !isStickyMode && "pt-6 border-t border-gray-200",
            )}
          >
            {children}
          </div>
        );
      }

      return (
        <div
          className={cn(
            "flex items-center justify-between text-lg gap-6 md:gap-8",
            !isStickyMode && "pt-6 border-t border-gray-200",
          )}
        >
          <button
            type="button"
            onClick={onPrevious}
            className={cn(
              "flex items-center justify-center gap-2 p-3 w-[50%] text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              isFirstStep && "invisible",
            )}
          >
            <ArrowLeft className="size-5" />
            Previous
          </button>

          {!isLastStep ? (
            <button
              type="submit"
              className="flex items-center justify-center gap-2 p-3 w-[50%] border border-primary bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-sm"
            >
              Next
              <ArrowRight className="size-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="p-3 bg-primary border border-primary justify-center text-primary-foreground w-[50%] rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      );
    },
    [children, isFirstStep, isLastStep, onPrevious, isSubmitting],
  );

  return (
    <>
      {/* Static buttons displayed at the bottom of the form */}
      <div ref={containerRef} className="mt-auto">
        <div
          className={cn(
            "transition-all duration-300",
            isSticky ? "opacity-0 invisible" : "opacity-100 visible",
          )}
        >
          {renderButtons(false)}
        </div>
      </div>

      {/* Sticky version - shown when natural buttons are out of view */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 md:pb-4 ",
          "bg-white border-none shadow-[0_0_6px_10px_rgba(255,255,255,0.8)]",
          "transition-all duration-300 ease-in-out",
          isSticky
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-full opacity-0 invisible pointer-events-none",
        )}
      >
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          {renderButtons(true)}
        </div>
      </div>
    </>
  );
};
