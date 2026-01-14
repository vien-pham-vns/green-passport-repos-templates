'server only';

import chalk from 'chalk';

/**
 * Simple Logger for HTTP Request Logging (only work for server fetching API)
 */

const isProduction = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'production';

/**
 * Helper: Log HTTP requests in Next.js style with colors
 * Example: 2025-11-17 17:35:45 [dt-dashboard-webapp] [development] [service api] GET https://dt-dev.vnsilicon.cloud/api/core/v1/doa/feedback/dashboard?page=1&size=20&status=all 200 in 6ms
 */
export const logHttpRequest = (
  method: string,
  url: string,
  status: number,
  duration: number,
  serviceName?: string
) => {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const environment = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV || 'development';
  const serviceApiName = serviceName ? `[${serviceName}]` : '';
  const serviceInfo = `[${environment}] ${serviceApiName}`.trim();

  if (isProduction) {
    // Production: Simple plain text
    // eslint-disable-next-line no-console
    console.log(
      `${timestamp} ${serviceInfo} ${method} ${url} ${status} in ${duration}ms`
    );
  } else {
    // Development: Colorful output with accessibility-friendly colors
    const statusColor = status >= 500 ? 'red' : status >= 400 ? 'yellow' : 'green';
    const methodColor =
      method === 'GET'
        ? 'blue'
        : method === 'POST'
          ? 'green'
          : method === 'PUT'
            ? 'yellow'
            : method === 'DELETE'
              ? 'red'
              : 'white';

    // eslint-disable-next-line no-console
    console.log(
      chalk.dim(timestamp),
      chalk.blackBright.bold(serviceInfo),
      chalk[methodColor].bold(method),
      chalk.whiteBright(url),
      chalk[statusColor].bold(status),
      chalk.dim(`in ${duration}ms`)
    );
  }
};
