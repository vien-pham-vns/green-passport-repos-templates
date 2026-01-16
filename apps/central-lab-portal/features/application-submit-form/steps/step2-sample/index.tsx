"use client";

import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SampleListItem } from "@/components/central-lab-application-form/sample-list-item";
import { StepContainer } from "@/components/central-lab-application-form/step-container";
import {
  RadioGroupController,
  TextareaController,
} from "@/components/form-controllers";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { RadioGroupItem } from "@/components/ui/radio-group";
import {
  containerAfterTestedOptions,
  moreInformationOptions,
  objectivesOptions,
  sampleDeliveryMeansOptions,
  temperatureAtSampleReceivedOptions,
} from "@/features/application-submit-form/form-options";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";
import { SampleCondition } from "@/types/central-lab-form";

export const Step2Sample = () => {
  const { control, watch } = useFormContext<CentralLabApplicationData>();
  const [isAdding, setIsAdding] = useState(false);

  // Watch conditional fields
  const objectives = watch("step2Sample.objectives");
  const moreInformation = watch("step2Sample.moreInformation");
  const sampleDeliveryMeans = watch("step2Sample.sampleDeliveryMeans");

  // useFieldArray for sample list
  const { fields, append, remove } = useFieldArray({
    control,
    name: "step2Sample.sampleList",
  });

  const handleAddSample = () => {
    if (isAdding) return;

    setIsAdding(true);

    append({
      sampleName: "",
      customerCode: "",
      quantityPerContainer: 1,
      containerUnit: "",
      totalContainer: 1,
      sampleCondition: SampleCondition.NORMAL,
      testItem: "",
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 300);
  };

  const handleRemoveSample = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <StepContainer
      title="Sample"
      description="Please provide sample information"
    >
      {/* Objective */}
      <RadioGroupController
        name="step2Sample.objectives"
        control={control}
        label="Objective"
        required
        className="md:grid md:grid-cols-2 md:gap-x-4"
      >
        {objectivesOptions.map((option) => (
          <FieldLabel
            key={option.value}
            className="cla-field-value flex items-center gap-2 cursor-pointer font-normal"
          >
            <RadioGroupItem value={option.value} />
            {option.label}
          </FieldLabel>
        ))}
      </RadioGroupController>

      {objectives === "other" && (
        <TextareaController
          name="step2Sample.objectivesOther"
          control={control}
          label="Please specify"
          required
          placeholder="Enter other objective (max 500 characters)"
          maxLength={500}
        />
      )}

      {/* More Information */}
      <RadioGroupController
        name="step2Sample.moreInformation"
        control={control}
        label="More Information"
      >
        {moreInformationOptions.map((option) => (
          <FieldLabel
            key={option.value}
            className="cla-field-value flex items-center cursor-pointer font-normal"
          >
            <RadioGroupItem value={option.value} />
            {option.label}
          </FieldLabel>
        ))}
      </RadioGroupController>

      {moreInformation === "show-standard-limitation" && (
        <TextareaController
          name="step2Sample.standardLimitation"
          control={control}
          label="Standard Limitation"
          required
          placeholder="Enter standard limitation (max 500 characters)"
          maxLength={500}
        />
      )}

      {/* Container After Tested */}
      <RadioGroupController
        name="step2Sample.containerAfterTested"
        control={control}
        label="Container After Tested"
        required
      >
        {containerAfterTestedOptions.map((option) => (
          <FieldLabel
            key={option.value}
            className="cla-field-value flex items-center cursor-pointer font-normal"
          >
            <RadioGroupItem value={option.value} />
            {option.label}
          </FieldLabel>
        ))}
      </RadioGroupController>

      {/* Temperature at Sample Received */}
      <RadioGroupController
        name="step2Sample.temperatureAtSampleReceived"
        control={control}
        label="Temperature at Sample Received"
        required
        className="sm:flex-row sm:gap-8"
      >
        {temperatureAtSampleReceivedOptions.map((option) => (
          <FieldLabel
            key={option.value}
            className="cla-field-value flex items-center cursor-pointer font-normal"
          >
            <RadioGroupItem value={option.value} />
            {option.label}
          </FieldLabel>
        ))}
      </RadioGroupController>

      {/* Sample Delivery Means */}
      <RadioGroupController
        name="step2Sample.sampleDeliveryMeans"
        control={control}
        label="Sample Delivery Means"
        required
      >
        {sampleDeliveryMeansOptions.map((option) => (
          <FieldLabel
            key={option.value}
            className="cla-field-value flex items-center cursor-pointer font-normal"
          >
            <RadioGroupItem value={option.value} />
            {option.label}
          </FieldLabel>
        ))}
      </RadioGroupController>

      {sampleDeliveryMeans === "other" && (
        <TextareaController
          name="step2Sample.sampleDeliveryMeansOther"
          control={control}
          label="Please specify"
          required
          placeholder="Enter other delivery means (max 500 characters)"
          maxLength={500}
        />
      )}

      {/* Sample List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Sample List <span className="text-red-500">*</span>
          </h3>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleAddSample}
            disabled={isAdding}
          >
            {isAdding ? (
              <Loader2 className="size-5 mr-2 animate-spin" />
            ) : (
              <Plus className="size-5 mr-2" />
            )}
            Add Sample
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <SampleListItem
              key={field.id}
              index={index}
              onRemove={() => handleRemoveSample(index)}
            />
          ))}
        </div>
      </div>
    </StepContainer>
  );
};
