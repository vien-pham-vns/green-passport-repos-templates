import { useFormContext } from "react-hook-form";
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import { InputController } from "@/components/form-controllers";
import { FormGrid } from "@/components/form-grid";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";

interface TestReportSectionProps {
  sameCompanyForTaxReport: boolean;
  setSameCompanyForTaxReport: (value: boolean) => void;
}

export const TestReportSection = ({
  sameCompanyForTaxReport,
  setSameCompanyForTaxReport,
}: TestReportSectionProps) => {
  const { control } = useFormContext<CentralLabApplicationData>();

  return (
    <CollapsibleSection title="For Test Report" defaultOpen>
      <div className="space-y-4">
        <FormGrid columns={2}>
          <InputController
            name="step1LabTestInformation.companyNameTh"
            control={control}
            label="Company Name (Thai)"
            required
            placeholder="Enter company name in Thai"
          />

          <InputController
            name="step1LabTestInformation.companyNameEn"
            control={control}
            label="Company Name (English)"
            placeholder="Enter company name in English"
          />

          <InputController
            name="step1LabTestInformation.companyAddressTh"
            control={control}
            label="Company Address (Thai)"
            required
            placeholder="Enter company address in Thai"
          />

          <InputController
            name="step1LabTestInformation.companyAddressEn"
            control={control}
            label="Company Address (English)"
            placeholder="Enter company address in English"
          />
        </FormGrid>

        <Field>
          <FieldLabel className="cla-field-value flex items-center gap-2 cursor-pointer w-fit font-normal">
            <Checkbox
              checked={sameCompanyForTaxReport}
              onCheckedChange={(checked) =>
                setSameCompanyForTaxReport(checked as boolean)
              }
            />
            Same company for tax report
          </FieldLabel>
        </Field>
      </div>
    </CollapsibleSection>
  );
};
