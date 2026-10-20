"use client";

import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import Styles from "../_styles/LandingPage/navbarComponent.module.scss";

const LandingNavbar = () => {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setMenuOpen(false);
		};
		const onResize = () => {
			if (window.innerWidth > 768) setMenuOpen(false);
		};

		window.addEventListener("scroll", onScroll);
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<nav className={`${Styles.navBar} ${scrolled ? Styles.scrolled : ""}`}>
			<Container className={Styles.navbarContainer}>
				{/* ── Logo Block ───────────────────────────────────── */}
				<Link href="/" className={Styles.logoBlock}>
					<span className={Styles.logoIcon}>JE</span>
					<div className={Styles.logoText}>
						<span className={Styles.logoMain}>JOURNAL</span>
						<span className={Styles.logoSub}>ENTRY</span>
					</div>
				</Link>

				{/* ── Desktop Links ────────────────────────────────── */}
				<div className={Styles.navLinks}>
					<Link href="/about" className={Styles.navLink}>About</Link>
					<Link href="/feed" className={Styles.navLink}>Stories</Link>
					<Link href="/community" className={Styles.navLink}>Community</Link>
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
					onClick={() => setMenuOpen((isOpen) => !isOpen)}
					type="button"
					aria-label="Toggle menu"
					aria-expanded={menuOpen}
					aria-controls="mobile-navigation"
				>
					<span /><span /><span />
				</button>
			</Container>

			{/* ── Mobile Menu ─────────────────────────────────────── */}
			<div
				id="mobile-navigation"
				className={`${Styles.mobileMenu} ${menuOpen ? Styles.mobileMenuOpen : ""}`}
				aria-hidden={!menuOpen}
			>
				<Link href="/about" className={Styles.mobileLink} onClick={() => setMenuOpen(false)}>About</Link>
				<Link href="/feed" className={Styles.mobileLink} onClick={() => setMenuOpen(false)}>Stories</Link>
				<Link href="/community" className={Styles.mobileLink} onClick={() => setMenuOpen(false)}>Community</Link>
				<Link href="/signin" className={Styles.mobileLink} onClick={() => setMenuOpen(false)}>Sign in</Link>
				<Link href="/signin">
					<button className={Styles.mobileCta} onClick={() => setMenuOpen(false)}>Get Started Free</button>
				</Link>
			</div>
		</nav>
	);
};

export default LandingNavbar;
