import type React from "react";
import { getConfig } from "@/lib/config";
import { ConfigProvider } from "./config-context";

export default async function ConfigWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const config = getConfig();
	return <ConfigProvider config={config}>{children}</ConfigProvider>;
}
