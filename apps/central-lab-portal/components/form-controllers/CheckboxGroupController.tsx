"use client";

import type React from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { FieldWrapper } from "@/components/form-controllers/FieldWrapper";
import { FieldGroup } from "@/components/ui/field";

interface CheckboxGroupControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  description?: string;
  children:
    | React.ReactNode
    | ((props: {
        value: string[] | undefined;
        onChange: (value: string, checked: boolean) => void;
      }) => React.ReactNode);
  className?: string;
}

/**
 * CheckboxGroupController - Controller layer wrapping Checkbox with react-hook-form
 * Handles multi-select checkbox validation and state management
 */
export const CheckboxGroupController = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  description,
  children,
  className,
}: CheckboxGroupControllerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const handleCheckedChange = (value: string, checked: boolean) => {
    const currentValue = Array.isArray(field.value) ? field.value : [];
    const valueSet = new Set<string>(currentValue);

    if (checked) {
      valueSet.add(value);
    } else {
      valueSet.delete(value);
    }

    field.onChange(Array.from(valueSet));
  };

  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error?.message}
      description={description}
      invalid={!!error}
    >
      <FieldGroup className={className}>
        {typeof children === "function"
          ? children({
              value: field.value,
              onChange: handleCheckedChange,
            })
          : children}
      </FieldGroup>
    </FieldWrapper>
  );
};
