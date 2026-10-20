import type { Metadata } from "next";
import Link from "next/link";
import PublicPage from "../_components/publicPage";
import Styles from "../_styles/PublicPage.module.scss";

export const metadata: Metadata = {
	title: "Documentation",
	description: "Learn how to set up your Journal Entry profile, discover articles, and publish your own writing.",
	alternates: { canonical: "/documentation" },
};

export default function DocumentationPage() {
	return (
		<PublicPage eyebrow="Documentation" title="A quick guide to using the journal." intro="Everything you need to set up your profile, find useful writing, and publish your own article." primaryAction={{ href: "/signin", label: "Sign in or create an account" }}>
			<section className={Styles.section}>
				<h2>Getting around</h2>
				<ul className={Styles.list}>
					<li><strong>Your feed:</strong> browse articles, see their topic and author, and open a post to read it in full.</li>
					<li><strong>Your profile:</strong> add a name, biography, profile picture, and the social links you want readers to see.</li>
					<li><strong>Writing:</strong> add a cover image, title, category, hashtags, and article content before publishing.</li>
					<li><strong>Appearance:</strong> the site starts in dark mode; use the sun or moon control in the top bar to switch themes.</li>
				</ul>
			</section>
			<section className={Styles.section}>
				<h2>Writing help</h2>
				<p>For formatting examples and the publishing checklist, read the <Link href="/editor-guide" className={Styles.inlineLink}>editor guide</Link>.</p>
			</section>
		</PublicPage>
	);
}
