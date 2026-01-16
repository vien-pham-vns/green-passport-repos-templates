import { cn } from "@/lib/utils";

interface DisplayTextFieldProps {
  label: string;
  value?: string | number | null;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export default function DisplayTextField({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}: DisplayTextFieldProps) {
  return (
    <div
      className={cn(
        // Using items-baseline for proper text alignment in browser
        // Note: html2canvas converts this to items-start during PDF export
        "flex items-baseline gap-1",
        "pdf-display-field", // Marker class for PDF export targeting
        className,
      )}
    >
      <span className={cn("whitespace-nowrap", labelClassName)}>{label} :</span>
      <div
        className={cn(
          // Using pdf-text-underline for consistent PDF export
          // This includes: border-b border-black border-dotted px-1 with proper line-height
          "flex-1 pdf-text-underline min-h-5",
          valueClassName,
        )}
      >
        {value || ""}
      </div>
    </div>
  );
}
