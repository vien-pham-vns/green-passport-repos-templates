"use client";

import { useFormContext } from "react-hook-form";
import {
  InputController,
  NumberFieldController,
  RadioGroupController,
} from "@/components/form-controllers";
import { FormGrid } from "@/components/form-grid";
import { FieldLabel } from "@/components/ui/field";
import { RadioGroupItem } from "@/components/ui/radio-group";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";

const sampleConditionOptions = [
  { value: "normal", label: "Normal" },
  { value: "special", label: "Special" },
];

interface SampleListItemProps {
  index: number;
  onRemove: () => void;
}

export const SampleListItem = ({ index, onRemove }: SampleListItemProps) => {
  const { control } = useFormContext<CentralLabApplicationData>();

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-neutral-100">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-semibold text-gray-900">
          ตัวอย่างที่ {index + 1}
        </h4>
        {index > 0 && (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            ลบ / Remove
          </button>
        )}
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
      <FormGrid columns={3}>
        {/* Sample Name */}
        <InputController
          name={`step2Sample.sampleList.${index}.sampleName` as any}
          control={control}
          label="Sample Name"
          required
          placeholder="Enter sample name"
        />

        {/* Customer Code */}
        <InputController
          name={`step2Sample.sampleList.${index}.customerCode` as any}
          control={control}
          label="Customer Code"
          required
          placeholder="Enter customer code"
        />

        {/* Quantity per Container */}
        <NumberFieldController
          name={`step2Sample.sampleList.${index}.quantityPerContainer` as any}
          control={control}
          label="Qty/Container"
          required
          min={1}
          className="bg-white"
        />

        {/* Container Unit */}
        <InputController
          name={`step2Sample.sampleList.${index}.containerUnit` as any}
          control={control}
          label="Container Unit"
          required
          placeholder="Enter container unit"
        />

        {/* Total Container */}
        <NumberFieldController
          name={`step2Sample.sampleList.${index}.totalContainer` as any}
          control={control}
          label="Total"
          required
          min={1}
          className="bg-white"
        />

        {/* Sample Condition */}
        <RadioGroupController
          name={`step2Sample.sampleList.${index}.sampleCondition` as any}
          control={control}
          label="Condition"
          required
          className="sm:flex-row sm:gap-6"
        >
          {sampleConditionOptions.map((option) => (
            <FieldLabel
              key={option.value}
              className="cla-field-value flex items-center cursor-pointer font-normal"
            >
              <RadioGroupItem value={option.value} />
              {option.label}
            </FieldLabel>
          ))}
        </RadioGroupController>
      </FormGrid>
      {/* Test Items - Full width */}
      <div className="mt-4">
        <InputController
          name={`step2Sample.sampleList.${index}.testItem` as any}
          control={control}
          label="Test Items"
          required
          placeholder="Enter test items"
        />
      </div>
    </div>
  );
};
