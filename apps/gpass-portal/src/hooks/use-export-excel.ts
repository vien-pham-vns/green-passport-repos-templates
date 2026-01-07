import { useState } from 'react';

interface UseExportExcelConfig {
  defaultFields: string[];
}

/**
 * Reusable hook for managing Excel export field selection
 * @example
 * const { exportFields, setExportFields } = useExportExcel({
 *   defaultFields: ['shipment_name', 'pq7_receiptNumber'],
 * });
 */
export function useExportExcel({ defaultFields }: UseExportExcelConfig) {
  'use memo'; // react compiler opt-in

  const [exportFields, setExportFields] = useState<string[]>(defaultFields);

  return {
    exportFields,
    setExportFields,
  };
}
