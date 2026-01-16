"use client";

import type React from "react";
import {
	type Control,
	type FieldValues,
	type Path,
	useController,
} from "react-hook-form";
import { FieldWrapper } from "@/components/form-controllers/FieldWrapper";
import { RadioGroup } from "@/components/ui/radio-group";

interface RadioGroupControllerProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	required?: boolean;
	description?: string;
	children: React.ReactNode;
	className?: string;
}

/**
 * RadioGroupController - Controller layer wrapping RadioGroup with react-hook-form
 * Handles radio group validation and state management
 */
export const RadioGroupController = <T extends FieldValues>({
	name,
	control,
	label,
	required,
	description,
	children,
	className,
}: RadioGroupControllerProps<T>) => {
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
			<RadioGroup
				name={field.name}
				value={field.value}
				onValueChange={(value) => field.onChange(value)}
				onBlur={field.onBlur}
				className={className}
			>
				{children}
			</RadioGroup>
		</FieldWrapper>
	);
};
