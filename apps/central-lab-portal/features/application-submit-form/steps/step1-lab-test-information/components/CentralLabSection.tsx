import { useFormContext } from "react-hook-form";
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import { RadioGroupController } from "@/components/form-controllers";
import { FieldLabel } from "@/components/ui/field";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { centralLabBranchOptions } from "@/features/application-submit-form/form-options";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";

export const CentralLabSection = () => {
  const { control } = useFormContext<CentralLabApplicationData>();

  return (
    <CollapsibleSection title="Central Lab" defaultOpen>
      <RadioGroupController
        name="step1LabTestInformation.centralLabBranch"
        control={control}
        label="Select Central Lab"
        required
        className="md:grid md:grid-cols-2 md:gap-x-4"
      >
        {centralLabBranchOptions.map((option) => (
          <FieldLabel
            key={option.value}
            className="cla-field-value flex items-center gap-3 cursor-pointer font-normal"
          >
            <RadioGroupItem value={option.value} />
            {option.label}
          </FieldLabel>
        ))}
      </RadioGroupController>
    </CollapsibleSection>
  );
};
