"use client";

import type React from "react";
import { createContext, useContext } from "react";
import {
	FormProvider as RHFFormProvider,
	type UseFormReturn,
} from "react-hook-form";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";

interface FormContextValue {
	methods: UseFormReturn<CentralLabApplicationData>;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

export const useFormContext = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("useFormContext must be used within FormProvider");
	}
	return context;
};

interface FormProviderProps {
	children: React.ReactNode;
	methods: UseFormReturn<CentralLabApplicationData>;
}

/**
 * FormProvider - Wraps react-hook-form's FormProvider
 * Provides form methods to all child components
 */
export const FormProvider = ({ children, methods }: FormProviderProps) => {
	const value: FormContextValue = {
		methods,
	};

	return (
		<FormContext.Provider value={value}>
			<RHFFormProvider {...methods}>{children}</RHFFormProvider>
		</FormContext.Provider>
	);
};
