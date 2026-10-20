import type { Metadata } from "next";
import PublicPage from "../_components/publicPage";
import Styles from "../_styles/PublicPage.module.scss";

export const metadata: Metadata = { title: "Community | Journal Entry" };

export default function CommunityPage() {
	return (
		<PublicPage
			eyebrow="Community"
			title="Good writing starts better conversations."
			intro="Follow the people behind the ideas, read across disciplines, and contribute when you have something useful to add."
			primaryAction={{ href: "/feed", label: "Browse the feed" }}
			secondaryAction={{ href: "/signin", label: "Join the community" }}
		>
			<section className={Styles.section}>
				<h2>How to take part</h2>
				<div className={Styles.grid}>
					<article className={Styles.card}><h3>Read with intention</h3><p>Explore beyond familiar subjects and spend time with arguments that make you reconsider your own.</p></article>
					<article className={Styles.card}><h3>Know the writer</h3><p>Author profiles keep the person, their background, and their body of work close to every article.</p></article>
					<article className={Styles.card}><h3>Publish something useful</h3><p>Share clear analysis, practical lessons, or a well-supported point of view—not content for its own sake.</p></article>
				</div>
			</section>
			<section className={Styles.section}>
				<h2>A simple standard</h2>
				<p>Disagreement is welcome. Personal attacks, copied work, deliberate misinformation, and spam are not. Challenge the idea and give other people enough context to understand your reasoning.</p>
			</section>
		</PublicPage>
	);
}
