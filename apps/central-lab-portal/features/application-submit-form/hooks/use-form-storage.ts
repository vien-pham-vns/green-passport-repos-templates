"use client";

import { useCallback, useRef, useState } from "react";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";

const STORAGE_KEY = "central-lab-application-draft";
const DEBOUNCE_DELAY = 500;

export const useFormStorage = () => {
  const [formData, setFormData] = useState<Partial<CentralLabApplicationData>>(
    () => {
      if (typeof window === "undefined") return {};
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : {};
      } catch (error) {
        console.error("Error loading form data from localStorage:", error);
        return {};
      }
    },
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Save data to localStorage
  const saveToStorage = useCallback(
    (data: Partial<CentralLabApplicationData>) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Error saving form data to localStorage:", error);
      }
    },
    [],
  );

  // Update form data and save to storage
  const updateFormData = useCallback(
    (data: Partial<CentralLabApplicationData>) => {
      setFormData((prev) => {
        const updated = { ...prev, ...data };

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          saveToStorage(updated);
        }, DEBOUNCE_DELAY);

        return updated;
      });
    },
    [saveToStorage],
  );

  // Clear storage
  const clearStorage = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
      setFormData({});
    } catch (error) {
      console.error("Error clearing form data from localStorage:", error);
    }
  }, []);

  // Get data for a specific step
  const getStepData = useCallback(
    <T extends keyof CentralLabApplicationData>(stepKey: T) => {
      return formData[stepKey];
    },
    [formData],
  );

  // Update data for a specific step
  const updateStepData = useCallback(
    <T extends keyof CentralLabApplicationData>(
      stepKey: T,
      data: CentralLabApplicationData[T],
    ) => {
      updateFormData({ [stepKey]: data } as Partial<CentralLabApplicationData>);
    },
    [updateFormData],
  );

  return {
    formData,
    updateFormData,
    clearStorage,
    getStepData,
    updateStepData,
  };
};
