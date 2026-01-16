"use server";

import { getConfig } from "@/lib/config";
import type {
	ApplicationData,
	ApplicationDetailResponse,
} from "@/types/application";
import { toCamel } from "@/utils/transform";

const { apiUrl } = getConfig();

export const getApplicationById = async (
	id: string,
): Promise<ApplicationData | null> => {
	try {
		const response = await fetch(
			`${apiUrl}/central-lab/v1/applications/${id}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				next: {
					revalidate: 60,
					tags: ["application-id"],
				},
			},
		);

		if (!response.ok) {
			console.error(
				`Failed to fetch application ${id}:`,
				response.status,
				response.statusText,
			);
			return null;
		}

		const result = await response.json();
		const formatData = toCamel(result) as ApplicationDetailResponse;

		return formatData.data;
	} catch (error) {
		console.error(`Error in getApplicationById for ID ${id}:`, error);
		return null;
	}
};
