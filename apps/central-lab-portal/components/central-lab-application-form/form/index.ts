import { CentralLabFormRoot } from "@/components/central-lab-application-form/form/central-lab-form";
import { FormActions } from "@/components/central-lab-application-form/form/form-actions";
import { FormContent } from "@/components/central-lab-application-form/form/form-content";

export { useCentralLabFormContext } from "@/components/central-lab-application-form/form/central-lab-form";

/**
 * CentralLabForm - Compound component for the Central Lab Application form
 * Usage:
 * <CentralLabForm {...props}>
 *   <CentralLabForm.Content>...</CentralLabForm.Content>
 *   <CentralLabForm.Actions />
 * </CentralLabForm>
 */
export const CentralLabForm = Object.assign(CentralLabFormRoot, {
	Content: FormContent,
	Actions: FormActions,
});
