/**
 * Simple Configuration Management
 *
 * Usage:
 * - Server: Use getConfig()
 * - Client: Use useConfig() hook which fetches from /api/config
 */

import type { AppConfig } from "@/types/config";

/**
 * Parse boolean from string
 */
function toBool(value: string | undefined): boolean {
	return value === "true" || value === "1";
}

/**
 * Get configuration - reads from environment variables (server-side only)
 */
export function getConfig(): AppConfig {
	return {
		basePath: "/central-lab",
		assetDomain: process.env.GPASS_CENTRAL_LAB_ASSET_DOMAIN || "",
		publicDomain: process.env.GPASS_CENTRAL_LAB_PUBLIC_DOMAIN || "",
		cspAllowedDomain: process.env.GPASS_CENTRAL_LAB_CSP_ALLOWED_DOMAIN || "",
		apiUrl: process.env.GPASS_CENTRAL_LAB_API_DOMAIN || "",
		featureFlags: {
			experimental: toBool(process.env.FEATURE_EXPERIMENTAL),
		},
		isLocalDev: toBool(process.env.GPASS_IS_LOCAL_DEV),
	};
}
