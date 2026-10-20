const LOCAL_SITE_URL = "http://localhost:3000";

const normalizeUrl = (value: string) => value.replace(/\/$/, "");

export const getSiteUrl = () => {
	const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
	if (configuredUrl) return normalizeUrl(configuredUrl);

	const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
	if (vercelProductionUrl) return normalizeUrl(`https://${vercelProductionUrl}`);

	const vercelUrl = process.env.VERCEL_URL?.trim();
	if (vercelUrl) return normalizeUrl(`https://${vercelUrl}`);

	return LOCAL_SITE_URL;
};

export const absoluteUrl = (path = "/") => new URL(path, `${getSiteUrl()}/`).toString();

export const SITE_NAME = "Journal Entry";
export const SITE_DESCRIPTION =
	"A public journal for thoughtful writing, shared learning, and the ideas worth returning to.";
