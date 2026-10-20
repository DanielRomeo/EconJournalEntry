import type { Metadata } from "next";
import PublicPage from "../_components/publicPage";
import Styles from "../_styles/PublicPage.module.scss";

export const metadata: Metadata = {
	title: "Start Writing",
	description: "Turn an idea, lesson, book review, or lived experience into a clear and useful Journal Entry article.",
	alternates: { canonical: "/start-writing" },
};

export default function StartWritingPage() {
	return (
		<PublicPage eyebrow="Start writing" title="Turn a clear idea into a useful article." intro="You do not need a finished essay before you begin. Start with the point you want a reader to understand, then build the evidence around it." primaryAction={{ href: "/createpost", label: "Open the editor" }} secondaryAction={{ href: "/editor-guide", label: "Read the editor guide" }}>
			<section className={Styles.section}>
				<h2>A practical way to begin</h2>
				<ul className={Styles.list}>
					<li><strong>1. State the point.</strong> Write one sentence explaining what the article is really about.</li>
					<li><strong>2. Gather support.</strong> Keep the facts, examples, links, and counterarguments that make the piece trustworthy.</li>
					<li><strong>3. Give it shape.</strong> Use headings to move from the question, through the reasoning, to a clear conclusion.</li>
					<li><strong>4. Edit for the reader.</strong> Remove repetition, explain unfamiliar terms, and check every link before publishing.</li>
				</ul>
			</section>
			<section className={Styles.section}>
				<div className={Styles.note}>The editor requires a signed-in account. If your session has expired, you will be asked to sign in before publishing.</div>
			</section>
		</PublicPage>
	);
}
