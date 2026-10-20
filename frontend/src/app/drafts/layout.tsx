import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Drafts",
	robots: { index: false, follow: false },
};

export default function DraftsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
