"use client";

import type React from "react";
import {
	type Control,
	type FieldValues,
	type Path,
	useController,
} from "react-hook-form";
import { FieldWrapper } from "@/components/form-controllers/FieldWrapper";
import { Textarea } from "@/components/ui/textarea";

interface TextareaControllerProps<T extends FieldValues>
	extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	required?: boolean;
	description?: string;
}

/**
 * TextareaController - Controller layer wrapping Textarea with react-hook-form
 * Handles validation state and error display automatically
 */
export const TextareaController = <T extends FieldValues>({
	name,
	control,
	label,
	required,
	description,
	className,
	...props
}: TextareaControllerProps<T>) => {
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
			<Textarea
				{...field}
				{...props}
				className={className}
				value={field.value ?? ""}
			/>
		</FieldWrapper>
	);
};
