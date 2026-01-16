import { Edit2 } from "lucide-react";
import type { Step3OptionData } from "@/features/application-submit-form/steps/step3-option/schema";
import { SummaryField } from "@/features/application-submit-form/steps/step4-summary-and-submit/summary-field";

interface SummarySectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SummarySection = ({
  title,
  children,
  className = "",
}: SummarySectionProps) => (
  <div className={className}>
    <h4 className="text-lg font-medium text-gray-900 mb-2">{title}</h4>
    <div>{children}</div>
  </div>
);

interface SummaryStep3Props {
  onHandleEdit: (step: number) => void;
  step3Option: Step3OptionData;
}

export const SummaryStep3 = ({
  onHandleEdit,
  step3Option,
}: SummaryStep3Props) => {
  return (
    <div className="border border-gray-200 rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary">Option</h3>
        <button
          type="button"
          onClick={() => onHandleEdit(3)}
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
        >
          <Edit2 className="size-4" />
          Edit
        </button>
      </div>
      <div className="space-y-10 text-base">
        {step3Option && (
          <SummarySection title="Test Options">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <SummaryField
                label="Test Method"
                value={step3Option.testMethod}
              />
              <SummaryField label="Payment" value={step3Option.payment} />
              {step3Option.remark && (
                <SummaryField
                  label="Remark"
                  value={step3Option.remark}
                  colSpan={2}
                  className="wrap-break-word"
                />
              )}
            </div>
          </SummarySection>
        )}
      </div>
    </div>
  );
};
