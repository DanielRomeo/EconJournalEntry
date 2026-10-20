import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";

export const metadata: Metadata = {
	title: "Journal Entry",
	description: "Social platform for readers and writers of blog content",
	icons: { icon: "/icon.svg" },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="light" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem('journal-entry-theme')||'light'}catch(e){document.documentElement.dataset.theme='light'}` }} />
			</head>
			<body>{children}</body>
		</html>
	);
}
