"use client";

import type React from "react";

interface FormContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * FormContent - Container for step content
 */
export const FormContent = ({ children, className }: FormContentProps) => {
  return <div className={className || "mb-8"}>{children}</div>;
};
