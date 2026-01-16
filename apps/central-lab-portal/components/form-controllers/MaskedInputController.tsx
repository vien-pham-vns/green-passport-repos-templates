"use client";

import type React from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { FieldWrapper } from "@/components/form-controllers/FieldWrapper";

interface MaskedInputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  description?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  component: React.ComponentType<any>;
}

/**
 * MaskedInputController - Controller layer for masked inputs
 * Integrates react-imask components with react-hook-form
 */
export const MaskedInputController = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  description,
  className,
  component: Component,
  ...props
}: MaskedInputControllerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error?.message}
      description={description}
      invalid={!!error}
    >
      <Component
        {...field}
        {...props}
        className={className}
        value={field.value ?? ""}
      />
    </FieldWrapper>
  );
};
