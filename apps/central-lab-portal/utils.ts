import { getConfig } from "@/lib/config";

const { basePath, assetDomain } = getConfig();

// Returns a URL for an internally hosted asset (e.g. "/images/logo.png" -> "/central-lab/images/logo.png")
export const getInternalAssetUrl = (src: string) => {
	return `${basePath}${src}`;
};

// Returns a URL for a public/external asset given its path (e.g. "assets/photo.jpg" -> "https://directus.com/assets/photo.jpg")
export const getAssetUrl = (src: string) => {
	return `${assetDomain}/${src}`;
};
