import type { Control } from "react-hook-form";
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import {
  InputController,
  MaskedInputController,
} from "@/components/form-controllers";
import { FormGrid } from "@/components/form-grid";
import { MaskedTaxIdInput } from "@/components/ui/masked-input";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";
import { cn } from "@/lib/utils";

interface TaxInvoiceSectionProps {
  control: Control<CentralLabApplicationData>;
  sameCompanyForTaxReport: boolean;
  isTaxInfoRequired: boolean;
}

export const TaxInvoiceSection = ({
  control,
  sameCompanyForTaxReport,
  isTaxInfoRequired,
}: TaxInvoiceSectionProps) => {
  return (
    <CollapsibleSection title="For Tax Invoice" defaultOpen>
      <FormGrid columns={2}>
        <InputController
          name="step1LabTestInformation.taxCompanyName"
          control={control}
          label="Company Name"
          required={isTaxInfoRequired}
          placeholder="Enter company name for tax invoice"
          disabled={sameCompanyForTaxReport}
          className={cn(
            sameCompanyForTaxReport && "bg-gray-200 italic cursor-not-allowed",
          )}
        />

        <InputController
          name="step1LabTestInformation.taxCompanyAddress"
          control={control}
          label="Company Address"
          required={isTaxInfoRequired}
          placeholder="Enter company address for tax invoice"
          disabled={sameCompanyForTaxReport}
          className={cn(
            sameCompanyForTaxReport && "bg-gray-200 italic cursor-not-allowed",
          )}
        />

        <MaskedInputController
          name="step1LabTestInformation.taxIdentificationNumber"
          control={control}
          component={MaskedTaxIdInput}
          label="Taxpayer Identification Number"
          required={isTaxInfoRequired}
          placeholder="Enter 13-digit tax ID"
        />

        <InputController
          name="step1LabTestInformation.branchName"
          control={control}
          label="Branch"
          required={isTaxInfoRequired}
          placeholder="Enter branch name"
        />
      </FormGrid>
    </CollapsibleSection>
  );
};
