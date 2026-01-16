import { EMPTY_VALUE } from "@/lib/constants";

interface SummaryFieldProps {
  label: string;
  value: string | number | boolean | string[] | undefined | null;
  isOptional?: boolean;
  formatter?: (value: any) => string;
  className?: string;
  colSpan?: 1 | 2;
}

export const SummaryField = ({
  label,
  value,
  isOptional = false,
  formatter,
  className = "",
  colSpan = 1,
}: SummaryFieldProps) => {
  const displayValue = () => {
    if (value === undefined || value === null || value === "") {
      return isOptional ? EMPTY_VALUE : "";
    }

    if (formatter) {
      return formatter(value);
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    return String(value);
  };

  const colSpanClass = colSpan === 2 ? "md:col-span-2" : "";

  return (
    <div className={`${colSpanClass} ${className}`.trim()}>
      <span>{label}: </span>
      {displayValue()}
    </div>
  );
};
