import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Confirm your account",
	robots: { index: false, follow: false },
};

export default function ConfirmationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
