// API Version Type for Type Safety
export type ApiVersion = 'v1' | 'v2';

/**
 * Create versioned API endpoint URL
 * @param path - The endpoint path (e.g., 'dashboard/chart/total-shipment')
 * @param version - The API version ('v1' or 'v2')
 * @returns Full API URL with version prefix
 *
 * @example
 * api('dashboard/chart/total-shipment', 'v1')
    Returns: '<domain>/api/v1/dashboard/chart/total-shipment'
 *
 * api('doa/request-reset-password', 'v2')
    Returns: '<domain>/api/v2/doa/request-reset-password'
 */
export const api = (path: string, version: ApiVersion): string => {
  const cleanPath = path.replace(/^\//, '');
  return `${process.env.API_CORE_DOMAIN}/api/${version}/${cleanPath}`;
};

export const apiCore = (path: string, version: ApiVersion): string => {
  const cleanPath = path.replace(/^\//, '');
  return `${process.env.API_CORE_DOMAIN}/${version}/${cleanPath}`;
};
