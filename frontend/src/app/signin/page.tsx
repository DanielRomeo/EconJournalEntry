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
			{/* ── Left image panel ─────────────────────────────── */}
			<div className={Styles.imagePanel}>
				<div className={Styles.brandLogo}>EJE</div>
				<div className={Styles.tagline}>
					<div className={Styles.decorLine} />
					<h2>Economics That<br />Moves the World</h2>
					<p>
						Join thousands of economists, analysts, and curious minds
						sharing ideas that matter.
					</p>
				</div>
			</div>

			{/* ── Right form panel ─────────────────────────────── */}
			<div className={Styles.formPanel}>
				<div className={Styles.formContainer}>
					<div className={Styles.mobileBrand}>EJE</div>
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