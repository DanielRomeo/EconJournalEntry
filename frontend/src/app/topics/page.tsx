import type { Metadata } from "next";
import PublicPage from "../_components/publicPage";
import Styles from "../_styles/PublicPage.module.scss";

export const metadata: Metadata = { title: "Topics | Journal Entry" };

const topics = [
	["Economics", "Markets, policy, development, incentives, and the choices behind the numbers."],
	["Finance", "Personal finance, investing, business, risk, and how capital moves."],
	["Technology", "Software, products, emerging tools, and the systems shaping daily life."],
	["Science", "Research, evidence, discovery, and careful explanations of how things work."],
	["Society", "Institutions, education, work, communities, and public life."],
	["Culture", "Books, media, design, art, and the ideas reflected in what people make."],
];

export default function TopicsPage() {
	return (
		<PublicPage eyebrow="All topics" title="Follow an idea wherever it leads." intro="Journal Entry is broader than one subject. These are the main areas writers use to organise their work." primaryAction={{ href: "/feed", label: "Explore all articles" }}>
			<section className={Styles.section}>
				<h2>Browse by subject</h2>
				<div className={Styles.grid}>
					{topics.map(([title, description]) => <article className={Styles.card} key={title}><h3>{title}</h3><p>{description}</p></article>)}
				</div>
			</section>
		</PublicPage>
	);
}
