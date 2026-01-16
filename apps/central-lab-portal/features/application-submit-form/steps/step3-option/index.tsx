"use client";

import { useFormContext } from "react-hook-form";
import { StepContainer } from "@/components/central-lab-application-form/step-container";
import {
  RadioGroupController,
  TextareaController,
} from "@/components/form-controllers";
import { FieldLabel } from "@/components/ui/field";
import { RadioGroupItem } from "@/components/ui/radio-group";
import {
  paymentOptions,
  testMethodOptions,
} from "@/features/application-submit-form/form-options";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";

export const Step3Option = () => {
  const { control } = useFormContext<CentralLabApplicationData>();

  return (
    <StepContainer title="Option" description="Please select your preferences">
      <div className="space-y-7">
        {/* Test Method */}
        <RadioGroupController
          name="step3Option.testMethod"
          control={control}
          label="Test Method"
          required
          className="sm:flex-row sm:gap-8"
        >
          {testMethodOptions.map((option) => (
            <FieldLabel
              key={option.value}
              className="cla-field-value flex items-center cursor-pointer font-normal"
            >
              <RadioGroupItem value={option.value} />
              {option.label}
            </FieldLabel>
          ))}
        </RadioGroupController>

        {/* Remark */}
        <TextareaController
          name="step3Option.remark"
          control={control}
          label="Note"
          placeholder="Enter any remarks (max 1000 characters)"
          maxLength={1000}
          rows={6}
        />

        {/* Payment */}
        <RadioGroupController
          name="step3Option.payment"
          control={control}
          label="Payment"
          required
        >
          {paymentOptions.map((option) => (
            <FieldLabel
              key={option.value}
              className="cla-field-value flex items-center cursor-pointer font-normal"
            >
              <RadioGroupItem value={option.value} />
              {option.label}
            </FieldLabel>
          ))}
        </RadioGroupController>
      </div>
    </StepContainer>
  );
};
