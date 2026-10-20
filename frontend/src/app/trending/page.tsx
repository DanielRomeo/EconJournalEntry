import type { Metadata } from "next";
import PublicPage from "../_components/publicPage";
import Styles from "../_styles/PublicPage.module.scss";

export const metadata: Metadata = {
	title: "Trending Posts",
	description: "Find timely articles and active ideas from writers across the Journal Entry community.",
	alternates: { canonical: "/trending" },
};

export default function TrendingPage() {
	return (
		<PublicPage
			eyebrow="Trending posts"
			title="See what readers are opening now."
			intro="The live feed is where new articles and active discussions appear. Use topics and hashtags to move quickly between subjects."
			primaryAction={{ href: "/feed", label: "Open the live feed" }}
			secondaryAction={{ href: "/topics", label: "Browse topics" }}
		>
			<section className={Styles.section}>
				<h2>Find the signal</h2>
				<div className={`${Styles.grid} ${Styles.gridTwo}`}>
					<article className={Styles.card}><h3>Start with the latest work</h3><p>The feed brings recently published writing into one place, with author, topic, and reading context visible before you open it.</p></article>
					<article className={Styles.card}><h3>Use tags as a trail</h3><p>When an article is close to what you need, its category and hashtags are the quickest way to discover related work.</p></article>
				</div>
			</section>
		</PublicPage>
	);
}
