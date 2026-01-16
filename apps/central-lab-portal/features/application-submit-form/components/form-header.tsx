import CentralLabInfo from "@/components/central-lab-info";

interface FormHeaderProps {
  submissionCount: number;
}

export const FormHeader = ({ submissionCount }: FormHeaderProps) => (
  <div className="bg-white rounded-lg shadow-sm p-5 md:p-6 mb-6">
    <CentralLabInfo className="mb-8" />
    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
      Central Lab Application Form
    </h1>
    <p className="text-base text-gray-600">
      Please complete all required fields marked with an asterisk
      <span className="text-red-500 ml-1">*</span>
    </p>
    {submissionCount > 0 && (
      <p className="text-sm text-green-600 mt-2">
        {`${submissionCount} submission${submissionCount > 1 ? "s" : ""} processed`}
      </p>
    )}
  </div>
);
