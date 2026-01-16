/**
 * Simple Runtime Configuration
 * Safe to expose to client through /api/config
 */
export interface AppConfig {
	// Base Path
	basePath: string;

	// Asset Domain
	assetDomain: string;

	// Public Domain
	publicDomain: string;

	// CSP Allowed Domain
	cspAllowedDomain: string;

	// API Configuration
	apiUrl: string;

	// Feature Flags
	featureFlags: {
		[key: string]: boolean;
	};

	// Is Local Dev
	isLocalDev: boolean;
}
