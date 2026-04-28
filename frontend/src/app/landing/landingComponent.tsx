"use client";
import LandingNavbar from "./navbarComponent";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Styles from "../_styles/LandingPage/LandingComponent.module.scss";
import Image from "next/image";
import { FaChartLine, FaUsers, FaPenNib, FaArrowRight } from "react-icons/fa";
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
					<p className={Styles.eyebrow}>Economics · Finance · Ideas</p>
					<h1>
						Where Great <em>Economic</em> Ideas
						Find Their Voice
					</h1>
					<p>
						Econ Journal Entry connects writers and readers passionate
						about economics, finance, and evidence-based thinking.
					</p>
					<div className={Styles.heroButtons}>
						<Link href="/signin">
							<Button className={Styles.landingButton}>
								Start Reading &nbsp;<FaArrowRight />
							</Button>
						</Link>
						<Link href="/signin">
							<Button className={Styles.outlineButton}>
								Write an Article
							</Button>
						</Link>
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
							<span className={Styles.statLabel}>Categories</span>
						</div>
					</div>
				</Container>
			</div>

			{/* ── About ────────────────────────────────────────────────────── */}
			<div className={Styles.aboutSection}>
				<Container className={Styles.aboutSectionContainer}>
					<Row className={`${Styles.aboutSectionRow} align-items-center`}>
						<Col className={Styles.aboutSectionCol1} lg="6" md="6" sm="12">
							<span className={Styles.sectionTag}>About the Platform</span>
							<h1>A Haven for Text-Based Economic Thought</h1>
							<p>
								Econ Journal Entry is a multi-functional platform where
								economists, analysts, students, and curious minds can
								publish and discover rigorous, well-written content.
								Our vision is a community where insight is celebrated
								and ideas travel far.
							</p>
						</Col>

						<Col className={Styles.aboutSectionCol2} lg="6" md="6" sm="12">
							<div className={Styles.aboutImage}>
								{/* Unsplash: economics library reading */}
								<img
									src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
									alt="Economist reading in a modern library"
								/>
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			{/* ── Why Join ─────────────────────────────────────────────────── */}
			<div className={Styles.whyJoinSection}>
				<Container className={Styles.whyJoinSectionContainer}>
					<Row className={Styles.headerRow}>
						<span className={Styles.sectionTag}>Platform Features</span>
						<h1>Why Join Econ Journal Entry</h1>
					</Row>
					<Row className={Styles.descriptionRow}>
						<p>
							Built for writers who care about depth and readers who demand quality.
							Your ideas deserve a platform that takes them seriously.
						</p>
					</Row>

					<Row className={`${Styles.cardsRow} g-4`}>
						<Col lg="4" md="6" sm="12">
							<div className={Styles.card}>
								<div className={Styles.iconWrap}><FaChartLine size={28} /></div>
								<p className={Styles.cardTitle}>Analytics</p>
								<p className={Styles.cardText}>
									Track views, likes, and engagement. Understand what
									resonates with your audience over time.
								</p>
							</div>
						</Col>
						<Col lg="4" md="6" sm="12">
							<div className={Styles.card}>
								<div className={Styles.iconWrap}><MdGroups size={28} /></div>
								<p className={Styles.cardTitle}>Community</p>
								<p className={Styles.cardText}>
									Connect with fellow economists, finance professionals,
									and intellectually curious readers worldwide.
								</p>
							</div>
						</Col>
						<Col lg="4" md="6" sm="12">
							<div className={Styles.card}>
								<div className={Styles.iconWrap}><FaPenNib size={28} /></div>
								<p className={Styles.cardTitle}>Rich Editor</p>
								<p className={Styles.cardText}>
									Write with our markdown editor, embed charts, images,
									and video — publish professional-grade content.
								</p>
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			{/* ── Testimonial ──────────────────────────────────────────────── */}
			<div className={Styles.personSection}>
				<Container className={Styles.personSectionContainer}>
					<Row className={`${Styles.personSectionRow} align-items-center`}>
						<Col className={Styles.col1} lg="4" md="5" sm="12">
							<div className={Styles.avatarWrap}>
								<Image
									className={Styles.image}
									src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
									width={240}
									height={240}
									alt="Featured writer"
								/>
							</div>
						</Col>

						<Col className={Styles.col2} lg="8" md="7" sm="12">
							<blockquote>
								"Econ Journal Entry gave my research a real audience.
								The quality of discourse here is unlike anything else
								I have found online — rigorous, respectful, and genuinely engaging."
							</blockquote>
							<div className={Styles.attribution}>
								<h6>Dr. Amara Osei, <small>Senior Economist at Oxford</small></h6>
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
										src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80"
										alt="Writer at laptop"
									/>
								</div>
								<div className={Styles.gridImg}>
									<img
										src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80"
										alt="Financial charts and data"
									/>
								</div>
								<div className={Styles.gridImg}>
									<img
										src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80"
										alt="Reading and learning"
									/>
								</div>
							</div>
						</Col>

						<Col className={Styles.col2} lg="6" md="6" sm="12">
							<span className={Styles.sectionTag}>Get Started Today</span>
							<h1>Write, Read and Connect with Great Minds</h1>
							<p>
								Share your analysis, discover perspectives that challenge
								your thinking, and build relationships with people who
								take ideas as seriously as you do.
							</p>
							<Link href="/signin">
								<Button className={Styles.getStartedButton}>
									Get Started Free &nbsp;<FaArrowRight />
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
									A platform for rigorous economic thought,
									connecting writers and readers who believe
									ideas can change the world.
								</p>
							</div>
						</Col>

						<Col lg="2" md="3" sm="6">
							<div className={Styles.footerCol}>
								<h4>Explore</h4>
								<p>Community</p>
								<p>Trending Posts</p>
								<p>Teams</p>
							</div>
						</Col>

						<Col lg="2" md="3" sm="6">
							<div className={Styles.footerCol}>
								<h4>Support</h4>
								<p>Documentation</p>
								<p>Join Slack</p>
								<p>Contact Us</p>
							</div>
						</Col>

						<Col lg="2" md="2" sm="6">
							<div className={Styles.footerCol}>
								<h4>Blog</h4>
								<p>Official Blog</p>
								<p>Engineering</p>
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