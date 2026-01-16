"use server";

import type { ZodError } from "zod";
import {
  type CentralLabApplicationData,
  centralLabApplicationSchema,
} from "@/features/application-submit-form/schema";
import { getConfig } from "@/lib/config";
import { toCamel, toSnake } from "@/utils/transform";

const { apiUrl } = getConfig();

export interface CentralLabApplicationResponse {
  success: boolean;
  message: string;
  data?: {
    id?: string;
  };
  errors?: {
    [key: string]: string;
  };
}

/**
 * Server action to handle Central Lab Application form submission
 * @param data - Form data from react-hook-form
 * @returns Central Lab Application response with success/error status
 */
export async function submitCentralLabApplication(
  data: CentralLabApplicationData,
) {
  try {
    const validatedData = centralLabApplicationSchema.parse(data);

    const payload = {
      content: validatedData,
      contactLineId:
        validatedData.step1LabTestInformation.contactPersonLineId || "",
      status: "waiting",
    };

    const response = await fetch(`${apiUrl}/central-lab/v1/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSnake(payload)),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `API request failed with status ${response.status}`,
      );
    }

    const result = await response.json();
    const formattedResult = toCamel(result) as CentralLabApplicationResponse;

    return {
      success: true,
      message:
        result.message || "Central Lab Application submitted successfully!",
      data: { validatedData },
      id: formattedResult.data?.id,
    };
  } catch (error) {
    console.error("❌ Central Lab Application error:", error);

    // Handle Zod validation errors
    if (error && typeof error === "object" && "issues" in error) {
      const zodError = error as ZodError;
      const { formatZodErrors } = await import("@/lib/zod");
      const formattedErrors = formatZodErrors(zodError);

      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: formattedErrors,
      };
    }

    // Handle network or API errors
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
    };
  }
}
