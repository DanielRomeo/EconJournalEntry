import type { Metadata } from "next";
import PublicPage from "../_components/publicPage";
import Styles from "../_styles/PublicPage.module.scss";

export const metadata: Metadata = {
	title: "Contact",
	description: "Get help with your Journal Entry account, report a problem, or share editorial feedback.",
	alternates: { canonical: "/contact" },
};

export default function ContactPage() {
	return (
		<PublicPage eyebrow="Contact us" title="Tell us what you need help with." intro="A little context helps the right person understand the issue and respond properly." secondaryAction={{ href: "/documentation", label: "Read the documentation" }}>
			<section className={Styles.section}>
				<h2>Before you get in touch</h2>
				<div className={Styles.grid}>
					<article className={Styles.card}><h3>Account help</h3><p>Include the email used for your account, but never send a password or verification code.</p></article>
					<article className={Styles.card}><h3>Report a problem</h3><p>Share the page you were on, what you expected, and what happened instead.</p></article>
					<article className={Styles.card}><h3>Editorial feedback</h3><p>Include the article link and explain the correction, rights concern, or feedback clearly.</p></article>
				</div>
			</section>
			<section className={Styles.section}>
				<div className={Styles.note}><strong>Contact channel:</strong> the project still needs its official support email connected. Once that address is confirmed, this page is ready for the direct email link or contact form.</div>
			</section>
		</PublicPage>
	);
}
