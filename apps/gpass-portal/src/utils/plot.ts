/**
  * Formats plot ID with pattern xxxxxxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xx 
      (8-4-4-4-4-4-2)
  * @param str - Plot ID string to format (max 30 chars)
  * @returns Formatted plot ID string
*/

const formatPlotId = (str: string | null) => {
  if (!str) {
    return '';
  }

  if (str.length > 30 || str.length <= 8) {
    return str;
  }

  return [
    str.slice(0, 8),
    str.slice(8, 12),
    str.slice(12, 16),
    str.slice(16, 20),
    str.slice(20, 24),
    str.slice(24, 28),
    str.slice(28, 30),
  ]
    .filter((segment) => segment.length > 0)
    .join('-');
};

export { formatPlotId };
