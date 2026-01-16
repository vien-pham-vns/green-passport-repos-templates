import { useFormContext } from "react-hook-form";
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import {
  InputController,
  MaskedInputController,
} from "@/components/form-controllers";
import { FormGrid } from "@/components/form-grid";
import {
  MaskedFaxNumberInput,
  MaskedPhoneNumberInput,
} from "@/components/ui/masked-input";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";

export const ContactPersonSection = () => {
  const { control, watch } = useFormContext<CentralLabApplicationData>();
  const trInform = watch("step1LabTestInformation.trInform");

  return (
    <CollapsibleSection title="Contact Person" defaultOpen>
      <FormGrid columns={2}>
        <InputController
          name="step1LabTestInformation.contactPersonName"
          control={control}
          label="Name"
          required
          placeholder="Enter contact person name"
        />

        <InputController
          name="step1LabTestInformation.contactPersonPotision"
          control={control}
          label="Position"
          placeholder="Enter position (optional)"
        />

        <MaskedInputController
          name="step1LabTestInformation.contactPersonTel"
          control={control}
          component={MaskedPhoneNumberInput}
          label="Tel"
          required
          placeholder="Enter phone number"
        />

        <MaskedInputController
          name="step1LabTestInformation.contactPersonFax"
          control={control}
          component={MaskedFaxNumberInput}
          label="Fax"
          required={trInform === "fax"}
          placeholder="Enter fax number"
        />

        <MaskedInputController
          name="step1LabTestInformation.contactPersonMobile"
          control={control}
          component={MaskedPhoneNumberInput}
          label="Mobile"
          placeholder="Enter mobile number (optional)"
        />

        <InputController
          name="step1LabTestInformation.contactPersonLineId"
          control={control}
          label="LINE ID"
          required={trInform === "line"}
          placeholder="Enter LINE ID"
        />

        <InputController
          name="step1LabTestInformation.contactPersonEmail"
          control={control}
          label="E-mail"
          required={trInform === "email"}
          type="email"
          placeholder="Enter email address"
        />
      </FormGrid>
    </CollapsibleSection>
  );
};
