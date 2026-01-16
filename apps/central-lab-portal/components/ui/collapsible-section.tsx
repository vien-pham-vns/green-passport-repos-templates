import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const CollapsibleSection = ({
  title,
  children,
  defaultOpen = true,
  className,
}: CollapsibleSectionProps) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={clsx("border border-gray-200 rounded-lg", className)}
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between bg-gray-50 px-5 py-3 text-left hover:bg-gray-100 transition-colors rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <ChevronDown
          className={clsx(
            "size-6 text-gray-600 transition-transform duration-300",
            {
              "rotate-180": open,
            },
          )}
          aria-hidden="true"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="p-5 space-y-5">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};
