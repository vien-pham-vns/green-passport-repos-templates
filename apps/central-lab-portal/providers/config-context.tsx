"use client";

import React from "react";
import type { AppConfig } from "@/types/config";

const ConfigContext = React.createContext<AppConfig | null>(null);

/**
 * ConfigProvider - Provides runtime config to client components
 */
export function ConfigProvider({
	config,
	children,
}: {
	config: AppConfig;
	children: React.ReactNode;
}) {
	return (
		<ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
	);
}

/**
 * Hook to access runtime configuration in client components
 * Config is read from env vars at runtime on server, then passed to client
 */
export function useConfig(): AppConfig {
	const context = React.useContext(ConfigContext);
	if (!context) {
		throw new Error("useConfig must be used within ConfigProvider");
	}
	return context;
}
