import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Link from "next/link";
import Styles from "../_styles/LandingPage/navbarComponent.module.scss";

const LandingNavbar = () => {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<nav className={`${Styles.navBar} ${scrolled ? Styles.scrolled : ""}`}>
			<Container className={Styles.navbarContainer}>
				{/* ── Logo Block ───────────────────────────────────── */}
				<Link href="/" className={Styles.logoBlock}>
					<span className={Styles.logoIcon}>EJE</span>
					<div className={Styles.logoText}>
						<span className={Styles.logoMain}>ECON JOURNAL</span>
						<span className={Styles.logoSub}>ENTRY</span>
					</div>
				</Link>

				{/* ── Desktop Links ────────────────────────────────── */}
				<div className={Styles.navLinks}>
					<a href="#about" className={Styles.navLink}>About</a>
					<a href="#features" className={Styles.navLink}>Features</a>
					<a href="#community" className={Styles.navLink}>Community</a>
				</div>

				{/* ── CTA Block ────────────────────────────────────── */}
				<div className={Styles.ctaGroup}>
					<Link href="/signin" className={Styles.loginLink}>Sign in</Link>
					<Link href="/signin">
						<button className={Styles.ctaButton}>
							<span>Get Started</span>
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
								<path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</button>
					</Link>
				</div>

				{/* ── Mobile Hamburger ────────────────────────────── */}
				<button
					className={`${Styles.hamburger} ${menuOpen ? Styles.open : ""}`}
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
				>
					<span /><span /><span />
				</button>
			</Container>

			{/* ── Mobile Menu ─────────────────────────────────────── */}
			<div className={`${Styles.mobileMenu} ${menuOpen ? Styles.mobileMenuOpen : ""}`}>
				<a href="#about" className={Styles.mobileLink} onClick={() => setMenuOpen(false)}>About</a>
				<a href="#features" className={Styles.mobileLink} onClick={() => setMenuOpen(false)}>Features</a>
				<a href="#community" className={Styles.mobileLink} onClick={() => setMenuOpen(false)}>Community</a>
				<Link href="/signin" className={Styles.mobileLink} onClick={() => setMenuOpen(false)}>Sign in</Link>
				<Link href="/signin">
					<button className={Styles.mobileCta} onClick={() => setMenuOpen(false)}>Get Started Free</button>
				</Link>
			</div>
		</nav>
	);
};

export default LandingNavbar;