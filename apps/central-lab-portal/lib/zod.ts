import type { ZodError } from "zod";

/**
 * Utility to format Zod errors into a flat object
 */
export function formatZodErrors(error: ZodError): Record<string, string> {
	const formattedErrors: Record<string, string> = {};

	error.issues.forEach((issue) => {
		if (issue.path && issue.path.length > 0) {
			const path = issue.path.join(".");
			formattedErrors[path] = issue.message;
		}
	});

	return formattedErrors;
}
