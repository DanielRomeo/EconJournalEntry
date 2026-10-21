import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Styles from "../_styles/LandingPage/LandingComponent.module.scss";

const SiteFooter = () => (
	<footer className={Styles.footer}>
		<Container>
			<Row className="g-4">
				<Col lg="4" md="4" sm="12">
					<div className={Styles.footerBrand}>
						<h4>Journal Entry</h4>
						<p>
							Independent writing on economics, finance, technology,
							science, culture, and the ideas connecting them.
						</p>
					</div>
				</Col>
				<Col lg="2" md="3" sm="6">
					<div className={Styles.footerCol}>
						<h4>Explore</h4>
						<Link href="/about">About</Link>
						<Link href="/community">Community</Link>
						<Link href="/trending">Trending Posts</Link>
						<Link href="/topics">All Topics</Link>
						<Link href="/portfolio">Daniel’s Portfolio</Link>
					</div>
				</Col>
				<Col lg="2" md="3" sm="6">
					<div className={Styles.footerCol}>
						<h4>Support</h4>
						<Link href="/documentation">Documentation</Link>
						<Link href="/contact">Contact Us</Link>
					</div>
				</Col>
				<Col lg="2" md="2" sm="6">
					<div className={Styles.footerCol}>
						<h4>Write</h4>
						<Link href="/start-writing">Start Writing</Link>
						<Link href="/editor-guide">Editor Guide</Link>
					</div>
				</Col>
			</Row>
			<hr className={Styles.footerDivider} />
			<p className={Styles.footerBottom}>
				© {new Date().getFullYear()} Journal Entry. All rights reserved.
			</p>
		</Container>
	</footer>
);

export default SiteFooter;
