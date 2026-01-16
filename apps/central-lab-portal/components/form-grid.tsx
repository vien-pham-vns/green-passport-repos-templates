import clsx from "clsx";
import type * as React from "react";

interface FormGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

export const FormGrid = ({
  children,
  columns = 2,
  className,
}: FormGridProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-x-8 gap-y-6",
        {
          "md:grid-cols-2": columns === 2,
          "md:grid-cols-3": columns === 3,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};
