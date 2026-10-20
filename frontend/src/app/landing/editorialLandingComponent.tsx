import Link from "next/link";
import { Container } from "react-bootstrap";
import { HiArrowRight } from "react-icons/hi2";
import LandingNavbar from "./navbarComponent";
import PostComponent from "../feed/postComponent";
import SiteFooter from "../_components/siteFooter";
import Styles from "../_styles/LandingPage/EditorialLanding.module.scss";

const EditorialLandingComponent = () => (
	<div className={Styles.page}>
		<LandingNavbar />
		<main>
			<header className={Styles.hero}>
				<Container>
					<div className={Styles.issueLine}><span>Journal Entry</span><span>Independent ideas, clearly expressed</span></div>
					<div className={Styles.heroGrid}>
						<div className={Styles.heroCopy}>
							<p className={Styles.kicker}>A publication for curious people</p>
							<h1>Writing worth<br />returning to.</h1>
							<p className={Styles.intro}>Read considered perspectives across economics, technology, science, culture, and the questions that sit between them.</p>
							<div className={Styles.actions}>
								<Link href="/feed" className={Styles.primaryAction}>Read the journal <HiArrowRight /></Link>
								<Link href="/start-writing" className={Styles.secondaryAction}>Write with us</Link>
							</div>
						</div>
						<aside className={Styles.cover}>
							<div className={Styles.coverTop}><span>JE</span><span>Vol. 01</span></div>
							<div className={Styles.coverStatement}>Ideas do not need more noise.<br />They need room.</div>
							<div className={Styles.coverBottom}><span>Read deeply</span><span>Write honestly</span><span>Stay curious</span></div>
						</aside>
					</div>
				</Container>
			</header>

			<section className={Styles.selectedStories}>
				<Container>
					<div className={Styles.sectionHeading}><div><span>From the journal</span><h2>Selected stories</h2></div><Link href="/feed">View every article <HiArrowRight /></Link></div>
					<PostComponent featuredOnly />
				</Container>
			</section>

			<section className={Styles.editorialSection}>
				<Container className={Styles.editorialGrid}>
					<div><span className={Styles.sectionNumber}>01</span><h2>Not one subject.<br />One standard.</h2></div>
					<div className={Styles.editorialCopy}>
						<p>Journal Entry is a place for useful arguments, careful observation, and experience made legible. The subject can change. The standard of thought should not.</p>
						<div className={Styles.topicGrid}>
							<Link href="/topics">Economics & finance</Link><Link href="/topics">Technology & science</Link><Link href="/topics">Society & culture</Link><Link href="/community">Writers & community</Link>
						</div>
					</div>
				</Container>
			</section>
		</main>
		<SiteFooter />
	</div>
);

export default EditorialLandingComponent;
