"use client";

import { forwardRef, type InputHTMLAttributes, type RefObject } from "react";
import { IMaskInput } from "react-imask";
import { cn } from "@/lib/utils";

const INPUT_CLASSES =
	"h-12 w-full min-w-0 px-2.5 py-1 text-base dark:bg-input/30 border-input bg-white focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] file:text-foreground placeholder:text-muted-foreground outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const PREFIX_CLASSES =
	"pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-base peer-disabled:opacity-50";
interface MaskedInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	mask: string | RegExp | ((value: string) => boolean) | any;
	onAccept?: (value: string, mask: any) => void;
	unmask?: boolean | "typed";
	// Add onChange to support react-hook-form if needed, but onAccept is preferred
	onChange?: (event: { target: { name?: string; value: string } }) => void;
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
	({ className, mask, onAccept, onChange, unmask = true, ...props }, ref) => {
		const handleAccept = (
			value: string,
			maskRef: { unmaskedValue: string },
		) => {
			if (onAccept) {
				onAccept(value, maskRef);
			}
			if (onChange) {
				onChange({
					target: {
						name: props.name,
						value: unmask === true ? maskRef.unmaskedValue : value,
					},
				});
			}
		};

		return (
			<IMaskInput
				mask={mask}
				onAccept={handleAccept}
				unmask={unmask}
				className={cn(INPUT_CLASSES, className)}
				inputRef={(el) => {
					if (typeof ref === "function") ref(el as HTMLInputElement);
					else if (ref)
						(ref as RefObject<HTMLInputElement | null>).current =
							el as HTMLInputElement;
				}}
				{...(props as any)}
			/>
		);
	},
);

/**
 * MaskedPhoneNumberInput - Phone number field with (+66) prefix
 * Supports 8 or 9 digits after prefix
 */
export const MaskedPhoneNumberInput = forwardRef<
	HTMLInputElement,
	Omit<MaskedInputProps, "mask">
>((props, ref) => (
	<div className="relative">
		<MaskedInput
			{...props}
			ref={ref}
			mask="000 000 000"
			className="peer pl-16"
		/>
		<span className={PREFIX_CLASSES}>(+66)</span>
	</div>
));

/**
 * MaskedTaxIdInput - 13-digit Thailand Tax ID field
 * Format: 0-0000-00000-00-0
 */
export const MaskedTaxIdInput = forwardRef<
	HTMLInputElement,
	Omit<MaskedInputProps, "mask">
>((props, ref) => (
	<MaskedInput {...props} ref={ref} mask="0 - 0000 - 00000 - 00 - 0" />
));

/**
 * MaskedFaxNumberInput - Fax number field with (+66) prefix
 * Format: (+66) XX XXXX XXXX
 */
export const MaskedFaxNumberInput = forwardRef<
	HTMLInputElement,
	Omit<MaskedInputProps, "mask">
>((props, ref) => (
	<div className="relative">
		<MaskedInput
			{...props}
			ref={ref}
			mask="0 000 0000"
			className="peer pl-16"
		/>
		<span className={PREFIX_CLASSES}>(+66)</span>
	</div>
));
