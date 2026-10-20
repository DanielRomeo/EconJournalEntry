import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign in or create an account",
	description: "Sign in to Journal Entry or create an account to read, write, and keep a public journal.",
	robots: { index: false, follow: true },
};

export default function SignInLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
