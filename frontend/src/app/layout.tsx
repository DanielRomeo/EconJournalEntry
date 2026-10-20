import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import { absoluteUrl, getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
	metadataBase: new URL(getSiteUrl()),
	title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
	description: SITE_DESCRIPTION,
	applicationName: SITE_NAME,
	keywords: ["public journal", "independent writing", "personal essays", "learning journal", "book reviews", "technology", "economics", "culture"],
	authors: [{ name: "Daniel Mamphekgo" }],
	creator: "Daniel Mamphekgo",
	publisher: SITE_NAME,
	category: "Writing and publishing",
	referrer: "origin-when-cross-origin",
	formatDetection: { email: false, address: false, telephone: false },
	icons: { icon: "/icon.svg" },
	openGraph: { type: "website", locale: "en_ZA", siteName: SITE_NAME, title: SITE_NAME, description: SITE_DESCRIPTION },
	twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION },
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const websiteJsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": `${getSiteUrl()}/#website`,
				url: getSiteUrl(),
				name: SITE_NAME,
				description: SITE_DESCRIPTION,
				inLanguage: "en-ZA",
				publisher: { "@id": `${getSiteUrl()}/#organization` },
			},
			{
				"@type": "Organization",
				"@id": `${getSiteUrl()}/#organization`,
				name: SITE_NAME,
				url: getSiteUrl(),
				logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") },
				founder: { "@type": "Person", name: "Daniel Mamphekgo" },
			},
		],
	};

	return (
		<html lang="en" data-theme="light" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem('journal-entry-theme')||'light'}catch(e){document.documentElement.dataset.theme='light'}` }} />
			</head>
			<body>
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }} />
				{children}
			</body>
		</html>
	);
}
