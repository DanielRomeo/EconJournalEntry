import type { Metadata } from "next";
import PublicPage from "../_components/publicPage";
import Styles from "../_styles/PublicPage.module.scss";

export const metadata: Metadata = {
	title: "Editor Guide",
	description: "Learn how to structure, format, review, and publish a clear article with the Journal Entry editor.",
	alternates: { canonical: "/editor-guide" },
};

export default function EditorGuidePage() {
	return (
		<PublicPage eyebrow="Editor guide" title="Write cleanly with Markdown." intro="The editor supports straightforward Markdown for structure, emphasis, links, quotations, code, and images. The assisted toolbar can insert the common formats for you." primaryAction={{ href: "/createpost", label: "Open the editor" }}>
			<section className={Styles.section}>
				<h2>Common formatting</h2>
				<ul className={Styles.list}>
					<li><strong>Headings:</strong> use <code>##</code> for a main section and <code>###</code> for a subsection.</li>
					<li><strong>Emphasis:</strong> wrap text in <code>**double asterisks**</code> for bold or <code>*single asterisks*</code> for italics.</li>
					<li><strong>Links:</strong> write <code>[descriptive text](https://example.com)</code>.</li>
					<li><strong>Lists:</strong> start each line with <code>-</code> for bullets or <code>1.</code> for numbered steps.</li>
					<li><strong>Quotes and code:</strong> use <code>&gt;</code> for a quotation and fenced backticks for a code block.</li>
					<li><strong>Images:</strong> use the editor upload control so the image URL is inserted in the correct format.</li>
				</ul>
			</section>
			<section className={Styles.section}>
				<h2>Before publishing</h2>
				<div className={`${Styles.grid} ${Styles.gridTwo}`}>
					<article className={Styles.card}><h3>Check the article</h3><p>Preview the headings, links, lists, and images. Read the introduction and conclusion together to make sure they agree.</p></article>
					<article className={Styles.card}><h3>Check the details</h3><p>Add a clear title, relevant cover image, one useful category, and only the hashtags that genuinely describe the piece.</p></article>
				</div>
			</section>
		</PublicPage>
	);
}
