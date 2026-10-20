"use client";
import { Container, Col, Tab, Nav } from "react-bootstrap";
import SignupComponent from "./_signupComponent";
import SigninComponent from "./_signinComponent";
// import Styles from "../_styles/SigninPage/SigninPage.module.scss";
import Styles from './signinPage.module.scss';
import Link from "next/link";

const SigninPage = () => {
	return (
		<div className={Styles.signinPage}>
			{/* Illustration panel */}
			<div className={Styles.imagePanel}>
				<Link href="/" className={Styles.brandLogo}><span>JE</span> Journal Entry</Link>
				<div className={Styles.journalGraphic} aria-hidden="true">
					<div className={Styles.orbitOne} />
					<div className={Styles.orbitTwo} />
					<div className={Styles.journalCard}>
						<div className={Styles.journalBinding} />
						<div className={Styles.journalLine} />
						<div className={Styles.journalLine} />
						<div className={Styles.journalLineShort} />
					</div>
				</div>
				<div className={Styles.tagline}>
					<h2>A home for ideas<br />worth returning to.</h2>
					<p>
						Write with clarity, discover fresh perspectives, and build a thoughtful reading habit.
					</p>
				</div>
			</div>

			{/* ── Right form panel ─────────────────────────────── */}
			<div className={Styles.formPanel}>
				<div className={Styles.formContainer}>
					<div className={Styles.mobileBrand}><span>JE</span> Journal Entry</div>
					<Tab.Container defaultActiveKey="register">
						<Nav variant="tabs" className="mb-4">
							<Nav.Item>
								<Nav.Link eventKey="register">Register</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="login">Login</Nav.Link>
							</Nav.Item>
						</Nav>
						<Tab.Content>
							<Tab.Pane eventKey="register">
								<SignupComponent />
							</Tab.Pane>
							<Tab.Pane eventKey="login">
								<SigninComponent />
							</Tab.Pane>
						</Tab.Content>
					</Tab.Container>
				</div>
			</div>
		</div>
	);
};

export default SigninPage;
