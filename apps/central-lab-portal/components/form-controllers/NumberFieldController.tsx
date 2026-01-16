"use client";

import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import * as NumberField from "@/components/ui/number-field";
import { FieldWrapper } from "@/components/form-controllers/FieldWrapper";

interface NumberFieldControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

/**
 * NumberFieldController - Controller layer wrapping NumberField with react-hook-form
 * Handles number input validation and state management
 */
export const NumberFieldController = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  description,
  min,
  max,
  step,
  className,
}: NumberFieldControllerProps<T>) => {
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
      <NumberField.Root
        name={field.name}
        value={field.value}
        onValueChange={(value) => field.onChange(value)}
        min={min}
        max={max}
        step={step}
      >
        <NumberField.Group>
          <NumberField.Decrement>-</NumberField.Decrement>
          <NumberField.Input className={className} />
          <NumberField.Increment>+</NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
    </FieldWrapper>
  );
};
