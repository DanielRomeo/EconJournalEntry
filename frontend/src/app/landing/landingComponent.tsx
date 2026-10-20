"use client";
import LandingNavbar from "./navbarComponent";
import { Button, Container, Row, Col } from "react-bootstrap";
import Styles from "../_styles/LandingPage/LandingComponent.module.scss";
import { FaPenNib, FaArrowRight, FaLightbulb } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import Link from "next/link";
import SiteFooter from "../_components/siteFooter";

const LandingComponent = () => {
	return (
		<div>
			<LandingNavbar />

			{/* ── Hero ─────────────────────────────────────────────────────── */}
			<div className={Styles.landingSection}>
				<Container className={Styles.landingSectionContainer}>
					<p className={Styles.eyebrow}>Ideas · Knowledge · Community</p>
					<h1>
						Where Curious Minds<br />
						Come to <em>Learn & Share</em>
					</h1>
					<p>
						From economics to everyday ideas — Journal Entry is a
						platform built for thinkers who want to read deeply,
						write boldly, and connect with minds that inspire them.
					</p>
					<div className={Styles.heroButtons}>
						<Link href="/feed">
							<Button className={Styles.landingButton}>
								Explore Articles &nbsp;<FaArrowRight />
							</Button>
						</Link>
						<Link href="/signin">
							<Button className={Styles.outlineButton}>
								Start Writing
							</Button>
						</Link>
					</div>

					{/* Floating category pills */}
					<div className={Styles.heroPills}>
						<span className={Styles.pill}>📈 Economics</span>
						<span className={Styles.pill}>🔬 Science</span>
						<span className={Styles.pill}>💡 Technology</span>
						<span className={Styles.pill}>🌍 Society</span>
						<span className={Styles.pill}>📚 Finance</span>
						<span className={Styles.pill}>🎨 Culture</span>
					</div>
				</Container>
			</div>

			{/* ── About ────────────────────────────────────────────────────── */}
			<div className={Styles.aboutSection} id="about">
				<Container className={Styles.aboutSectionContainer}>
					<Row className={`${Styles.aboutSectionRow} align-items-center`}>
						<Col className={Styles.aboutSectionCol1} lg="6" md="6" sm="12">
							<span className={Styles.sectionTag}>About the Platform</span>
							<h1>A Space for Ideas That Actually Matter</h1>
							<p>
								Journal Entry is built for people who believe
								knowledge shouldn't be gatekept. Whether you're an
								economist, a student, a developer, or just endlessly
								curious — there's a place for your voice and your
								perspective here.
							</p>
							<p>
								Write about what excites you. Discover ideas that
								change how you see the world. Build connections with
								readers and writers who take thinking seriously.
							</p>
						</Col>

						<Col className={Styles.aboutSectionCol2} lg="6" md="6" sm="12">
							<div className={Styles.aboutImage}>
								{/* Library / learning / knowledge image */}
								<img
									src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80"
									alt="Books and knowledge"
								/>
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			{/* ── Why Join ─────────────────────────────────────────────────── */}
			<div className={Styles.whyJoinSection} id="features">
				<Container className={Styles.whyJoinSectionContainer}>
					<Row className={Styles.headerRow}>
						<span className={Styles.sectionTag}>Platform Features</span>
						<h1>Everything You Need to Think Bigger</h1>
					</Row>
					<Row className={Styles.descriptionRow}>
						<p>
							A platform that respects your intellect and empowers your
							curiosity — whether you're here to read, write, or both.
						</p>
					</Row>

					<Row className={`${Styles.cardsRow} g-4`}>
						<Col lg="4" md="6" sm="12">
							<div className={Styles.card}>
								<div className={Styles.iconWrap}><FaLightbulb size={28} /></div>
								<p className={Styles.cardTitle}>Discover Ideas</p>
								<p className={Styles.cardText}>
									Explore articles across economics, science, tech,
									culture and more. Find perspectives that challenge
									and expand your worldview.
								</p>
							</div>
						</Col>
						<Col lg="4" md="6" sm="12">
							<div className={Styles.card}>
								<div className={Styles.iconWrap}><MdGroups size={28} /></div>
								<p className={Styles.cardTitle}>Connect & Grow</p>
								<p className={Styles.cardText}>
									Build a following, engage with readers, and become
									part of a community that values substance over noise.
								</p>
							</div>
						</Col>
						<Col lg="4" md="6" sm="12">
							<div className={Styles.card}>
								<div className={Styles.iconWrap}><FaPenNib size={28} /></div>
								<p className={Styles.cardTitle}>Write Powerfully</p>
								<p className={Styles.cardText}>
									Our markdown editor supports images, video, code
									blocks and more. Publish professional, long-form
									content with ease.
								</p>
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			<SiteFooter />
		</div>
	);
};

export default LandingComponent;
