import type React from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

interface FieldWrapperProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  error?: string;
  description?: string;
  invalid?: boolean;
  className?: string;
}

/**
 * FieldWrapper - Reusable wrapper for form fields
 * Provides consistent label, error display, and required indicator
 */
export const FieldWrapper = ({
  children,
  label,
  required,
  error,
  description,
  invalid,
  className,
}: FieldWrapperProps) => {
  return (
    <Field data-invalid={invalid || !!error} className={className}>
      {label && (
        <FieldLabel>
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      {description && <FieldDescription>{description}</FieldDescription>}
      {children}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};
