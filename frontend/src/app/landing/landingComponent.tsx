"use client";
import LandingNavbar from "./navbarComponent";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Styles from "../_styles/LandingPage/LandingComponent.module.scss";
import Image from "next/image";
import { FaChartLine, FaPenNib, FaArrowRight, FaLightbulb } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import Link from "next/link";

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
						From economics to everyday ideas — Econ Journal Entry is a
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

			{/* ── Stats Bar ────────────────────────────────────────────────── */}
			<div className={Styles.statsBar}>
				<Container>
					<div className={Styles.statsContainer}>
						<div className={Styles.stat}>
							<span className={Styles.statNumber}>12K+</span>
							<span className={Styles.statLabel}>Readers</span>
						</div>
						<div className={Styles.stat}>
							<span className={Styles.statNumber}>800+</span>
							<span className={Styles.statLabel}>Articles</span>
						</div>
						<div className={Styles.stat}>
							<span className={Styles.statNumber}>340+</span>
							<span className={Styles.statLabel}>Writers</span>
						</div>
						<div className={Styles.stat}>
							<span className={Styles.statNumber}>50+</span>
							<span className={Styles.statLabel}>Topics</span>
						</div>
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
								Econ Journal Entry is built for people who believe
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

			{/* ── Testimonial ──────────────────────────────────────────────── */}
			<div className={Styles.personSection} id="community">
				<Container className={Styles.personSectionContainer}>
					<Row className={`${Styles.personSectionRow} align-items-center`}>
						<Col className={Styles.col1} lg="4" md="5" sm="12">
							<div className={Styles.avatarWrap}>
								<Image
									className={Styles.image}
									src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
									width={240}
									height={240}
									alt="Featured community member"
								/>
							</div>
						</Col>

						<Col className={Styles.col2} lg="8" md="7" sm="12">
							<blockquote>
								"I came for the economics articles and stayed for
								everything else. This platform introduced me to ideas
								across science, philosophy and tech that I never would
								have found otherwise. Genuinely life-changing reading."
							</blockquote>
							<div className={Styles.attribution}>
								<h6>Amara Mensah, <small>Reader & Contributor</small></h6>
							</div>
							<Link href="/signin">
								<Button className={Styles.joinButton}>Join the Community</Button>
							</Link>
						</Col>
					</Row>
				</Container>
			</div>

			{/* ── Write / Read / Connect ────────────────────────────────────── */}
			<div className={Styles.writeSection}>
				<Container className={Styles.writeSectionContainer}>
					<Row className={`${Styles.writeSectionRow} align-items-center`}>
						<Col className={Styles.col1} lg="6" md="6" sm="12">
							<div className={Styles.imageGrid}>
								<div className={Styles.gridImg}>
									<img
										src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80"
										alt="Student studying and taking notes"
									/>
								</div>
								<div className={Styles.gridImg}>
									<img
										src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80"
										alt="People discussing ideas"
									/>
								</div>
								<div className={Styles.gridImg}>
									<img
										src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80"
										alt="Reading and research"
									/>
								</div>
							</div>
						</Col>

						<Col className={Styles.col2} lg="6" md="6" sm="12">
							<span className={Styles.sectionTag}>Get Started Today</span>
							<h1>Read, Write & Share What You Know</h1>
							<p>
								Your perspective matters. Share your analysis, your
								research, your discoveries. Find people who geek out
								over the same things you do. Let ideas travel.
							</p>
							<Link href="/signin">
								<Button className={Styles.getStartedButton}>
									Start for Free &nbsp;<FaArrowRight />
								</Button>
							</Link>
						</Col>
					</Row>
				</Container>
			</div>

			{/* ── Footer ───────────────────────────────────────────────────── */}
			<div className={Styles.footer}>
				<Container>
					<Row className="g-4">
						<Col lg="4" md="4" sm="12">
							<div className={Styles.footerBrand}>
								<h4>Econ Journal Entry</h4>
								<p>
									A platform for curious minds — from economics and
									finance to science, tech, culture and beyond.
									Ideas that move the world live here.
								</p>
							</div>
						</Col>

						<Col lg="2" md="3" sm="6">
							<div className={Styles.footerCol}>
								<h4>Explore</h4>
								<p>Community</p>
								<p>Trending Posts</p>
								<p>All Topics</p>
							</div>
						</Col>

						<Col lg="2" md="3" sm="6">
							<div className={Styles.footerCol}>
								<h4>Support</h4>
								<p>Documentation</p>
								<p>Contact Us</p>
							</div>
						</Col>

						<Col lg="2" md="2" sm="6">
							<div className={Styles.footerCol}>
								<h4>Write</h4>
								<p>Start Writing</p>
								<p>Editor Guide</p>
							</div>
						</Col>
					</Row>

					<hr className={Styles.footerDivider} />
					<p className={Styles.footerBottom}>
						© {new Date().getFullYear()} Econ Journal Entry. All rights reserved.
					</p>
				</Container>
			</div>
		</div>
	);
};

export default LandingComponent;