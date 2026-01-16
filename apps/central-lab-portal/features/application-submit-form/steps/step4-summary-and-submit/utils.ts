import {
  byPostOptions,
  centralLabBranchOptions,
  containerAfterTestedOptions,
  moreInformationOptions,
  objectivesOptions,
  sampleConditionOptions,
  sampleDeliveryMeansOptions,
  temperatureAtSampleReceivedOptions,
  trInformOptions,
} from "@/features/application-submit-form/form-options";
import { EMPTY_VALUE } from "@/lib/constants";

// Generic utility function to get display name from options array
export const getDisplayNameFromOptions = <
  T extends { value: string; label: string },
>(
  options: readonly T[],
  value: string,
): string => {
  const option = options.find((opt) => opt.value === value);
  return option?.label || value;
};

// Re-export options for convenience in summary components
export {
  byPostOptions,
  centralLabBranchOptions,
  containerAfterTestedOptions,
  moreInformationOptions,
  objectivesOptions,
  sampleConditionOptions,
  sampleDeliveryMeansOptions,
  temperatureAtSampleReceivedOptions,
  trInformOptions,
};

// Helper function to format required report in languages
export const formatRequiredReportIn = (languages: string[]): string => {
  if (!languages || languages.length === 0) return EMPTY_VALUE;
  const formatted = languages
    .map((lang) => (lang === "th" ? "Thai" : "English"))
    .join(", ");
  return formatted;
};
