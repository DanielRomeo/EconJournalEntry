"use client";
import { Container } from "react-bootstrap";
import Styles from "../_styles/Feed/FeedComponent.module.scss";
import PostComponent from "./postComponent";
import TopNavbar from "../_components/topNavbar";
import { useState } from "react";

const FeedComponent = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	return (
		<div className={Styles.mainDiv}>
			<TopNavbar searchTerm={searchTerm} onSearchChange={setSearchTerm}></TopNavbar>
			
			<Container className={Styles.mainContainer}>
				<header className={Styles.hero}>
					<div className={Styles.issueLine}><span>The daily journal</span><span>Ideas · Perspective · Practice</span></div>
					<div className={Styles.heroCopy}>
						<div className={Styles.eyebrow}>Journal Entry</div>
						<h1>Read beyond<br />the obvious.</h1>
						<p>Essays, analysis, and lived experience from writers who take their subject—and their reader—seriously.</p>
					</div>
				</header>

				<section className={Styles.featuredSection} aria-labelledby="featured-heading">
					<div className={Styles.sectionHeading}>
						<div><span className={Styles.sectionLabel}>Editor&apos;s selection</span><h2 id="featured-heading">Featured stories</h2></div>
						<p>A considered place to begin.</p>
					</div>
					<PostComponent searchTerm={searchTerm} featuredOnly />
				</section>

				<section className={Styles.feedSection} aria-labelledby="feed-heading">
					<div className={Styles.sectionHeading}>
						<div>
							<span className={Styles.sectionLabel}>The latest</span>
							<h2 id="feed-heading">All stories</h2>
						</div>
						{searchTerm && <p>Results for “{searchTerm}”</p>}
					</div>
					<PostComponent searchTerm={searchTerm} />
				</section>
			</Container>
		</div>
	);
};

export default FeedComponent;
