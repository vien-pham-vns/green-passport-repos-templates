import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";

export const TAX_FIELD_NAMES = [
  "step1LabTestInformation.taxCompanyName",
  "step1LabTestInformation.taxCompanyAddress",
  "step1LabTestInformation.taxIdentificationNumber",
  "step1LabTestInformation.branchName",
] as const;

export const useTaxInvoiceLogic = () => {
  const { control, watch, trigger, setValue } =
    useFormContext<CentralLabApplicationData>();
  const [sameCompanyForTaxReport, setSameCompanyForTaxReport] =
    useState<boolean>(false);

  // Watch source fields for sync
  const companyNameTh = watch("step1LabTestInformation.companyNameTh");
  const companyAddressTh = watch("step1LabTestInformation.companyAddressTh");

  // Watch tax fields for "required" calculation
  const taxCompanyName = watch("step1LabTestInformation.taxCompanyName");
  const taxCompanyAddress = watch("step1LabTestInformation.taxCompanyAddress");
  const taxIdentificationNumber = watch(
    "step1LabTestInformation.taxIdentificationNumber",
  );
  const branchName = watch("step1LabTestInformation.branchName");

  const isTaxInfoRequired = Boolean(
    taxCompanyName?.trim() ||
    taxCompanyAddress?.trim() ||
    taxIdentificationNumber?.trim() ||
    branchName?.trim(),
  );

  // Sync logic
  useEffect(() => {
    if (sameCompanyForTaxReport) {
      setValue("step1LabTestInformation.taxCompanyName", companyNameTh, {
        shouldValidate: true,
      });
      setValue("step1LabTestInformation.taxCompanyAddress", companyAddressTh, {
        shouldValidate: true,
      });
    }
  }, [sameCompanyForTaxReport, companyNameTh, companyAddressTh, setValue]);

  // Validation logic
  useEffect(() => {
    const subscription = watch((_, { name }) => {
      // Trigger group validation
      if (
        name &&
        TAX_FIELD_NAMES.some((fieldName) => name.startsWith(fieldName))
      ) {
        trigger(TAX_FIELD_NAMES);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  return {
    control,
    sameCompanyForTaxReport,
    setSameCompanyForTaxReport,
    isTaxInfoRequired,
  };
};
