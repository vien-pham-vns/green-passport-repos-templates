import { useFormContext } from "react-hook-form";
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import {
  CheckboxGroupController,
  InputController,
  RadioGroupController,
} from "@/components/form-controllers";
import { FormGrid } from "@/components/form-grid";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldLabel } from "@/components/ui/field";
import { RadioGroupItem } from "@/components/ui/radio-group";
import {
  byPostOptions,
  requiredReportInOptions,
  trInformOptions,
} from "@/features/application-submit-form/form-options";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";

export const DeliverySection = () => {
  const { control, watch } = useFormContext<CentralLabApplicationData>();
  const byPost = watch("step1LabTestInformation.byPost");

  return (
    <CollapsibleSection title="Test Report" defaultOpen>
      <div className="space-y-4">
        <FormGrid columns={2}>
          <CheckboxGroupController
            name="step1LabTestInformation.requiredReportIn"
            control={control}
            label="Required Report In"
            description="(กรณีรายงานผล 2 ภาษา คิดค่าบริการ 100฿ / ฉลากโภชนาการ 100฿ (ไม่รวม VAT))"
            required
            className="sm:flex-row sm:gap-8"
          >
            {({ value, onChange }) => {
              const valueSet = new Set(value);
              return (
                <>
                  {requiredReportInOptions.map((option) => (
                    <FieldLabel
                      key={option.value}
                      className="cla-field-value flex items-center cursor-pointer font-normal"
                    >
                      <Checkbox
                        value={option.value}
                        checked={valueSet.has(option.value)}
                        onCheckedChange={(checked) =>
                          onChange(option.value, checked as boolean)
                        }
                      />
                      {option.label}
                    </FieldLabel>
                  ))}
                </>
              );
            }}
          </CheckboxGroupController>

          <RadioGroupController
            name="step1LabTestInformation.trInform"
            control={control}
            label="Test Report Inform via"
            required
            className="sm:flex-row sm:gap-8"
          >
            {trInformOptions.map((option) => (
              <FieldLabel
                key={option.value}
                className="cla-field-value flex items-center gap-2 cursor-pointer font-normal"
              >
                <RadioGroupItem value={option.value} />
                {option.label}
              </FieldLabel>
            ))}
          </RadioGroupController>

          <RadioGroupController
            name="step1LabTestInformation.originalTRTransfer"
            control={control}
            label="Original TR Transfer"
            required
          >
            <FieldLabel className="cla-field-value flex items-center gap-2 cursor-pointer font-normal">
              <RadioGroupItem value={true as any} />
              By hand
            </FieldLabel>
          </RadioGroupController>

          <RadioGroupController
            name="step1LabTestInformation.byPost"
            control={control}
            label="By Post"
            required
          >
            {byPostOptions.map((option) => (
              <FieldLabel
                key={option.value}
                className="cla-field-value flex items-center gap-2 cursor-pointer font-normal"
              >
                <RadioGroupItem value={option.value} />
                {option.label}
              </FieldLabel>
            ))}
          </RadioGroupController>
        </FormGrid>

        {byPost === "other" && (
          <InputController
            name="step1LabTestInformation.byPostAddress"
            control={control}
            label="Other Address"
            required
            placeholder="Enter other address"
          />
        )}
      </div>
    </CollapsibleSection>
  );
};
