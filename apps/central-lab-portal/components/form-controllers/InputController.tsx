"use client";

import type React from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { FieldWrapper } from "@/components/form-controllers/FieldWrapper";
import { Input } from "@/components/ui/input";

interface InputControllerProps<T extends FieldValues> extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name"
> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  description?: string;
}

/**
 * InputController - Controller layer wrapping Input with react-hook-form
 * Handles validation state and error display automatically
 */
export const InputController = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  description,
  className,
  ...props
}: InputControllerProps<T>) => {
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
      <Input
        {...field}
        {...props}
        className={className}
        value={field.value ?? ""}
      />
    </FieldWrapper>
  );
};
