import type { Metadata } from "next";
import PublicPage from "../_components/publicPage";
import Styles from "../_styles/PublicPage.module.scss";

export const metadata: Metadata = { title: "About | Journal Entry" };

export default function AboutPage() {
	return (
		<PublicPage
			eyebrow="Our story"
			title="A public journal built for follow-through."
			intro="Daniel started Journal Entry with a simple promise to himself: publish at least one thoughtful post every week."
			primaryAction={{ href: "/start-writing", label: "Start your journal" }}
			secondaryAction={{ href: "/feed", label: "Read the latest" }}
		>
			<section className={Styles.section}>
				<h2>Why Daniel started it</h2>
				<p>
					Learning something is easy; retaining it and putting it into your own words is harder. Daniel created Journal Entry to keep himself accountable. Publishing every week means revisiting what he has learned, explaining it clearly, and showing up for the people who expect him to follow through.
				</p>
				<p>
					That personal habit revealed a bigger idea: writing can help anyone remember more. A post becomes both a record of what you understood and a place to return when the details fade. Sharing it may also help somebody else who is learning the same thing.
				</p>
			</section>

			<section className={Styles.section}>
				<h2>A journal can hold more than lessons</h2>
				<div className={`${Styles.grid} ${Styles.gridTwo}`}>
					<article className={Styles.card}>
						<h3>Remember what shaped you</h3>
						<p>Write about a book, a new skill, an idea from work, or what a visit to Brazil taught you. The subject matters less than taking time to notice and record it.</p>
					</article>
					<article className={Styles.card}>
						<h3>Build accountability in public</h3>
						<p>Let a weekly publishing habit become your accountability partner. Readers can see the work, while your own archive shows the progress you have made.</p>
					</article>
				</div>
			</section>

			<section className={Styles.section}>
				<div className={Styles.note}>
					<strong>The idea is simple:</strong> learn something, make sense of it, and leave yourself a useful entry to return to.
				</div>
			</section>
		</PublicPage>
	);
}
