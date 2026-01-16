export const formatCurrency = (
  amount: number = 0,
  decimalPlaces?: number,
  currency?: string,
) => {
  return `${formatNumber(amount, decimalPlaces)} ${currency}`.trim();
};

export const formatNumber = (number: number = 0, decimalPlaces = 0) => {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(number);
};

export const kgToTon = (kg: number = 0, decimalPlaces = 1) => {
  return formatNumber(kg / 1000, decimalPlaces);
};

export const getRandomInRange = (
  [min, max]: [number, number],
  step: number = 1,
) => {
  const range = max - min;
  const randomOffset = Math.floor(Math.random() * (range / step + 1)) * step;
  return min + randomOffset;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
