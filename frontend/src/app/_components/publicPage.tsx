import { ReactNode } from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
import LandingNavbar from "../landing/navbarComponent";
import SiteFooter from "./siteFooter";
import Styles from "../_styles/PublicPage.module.scss";

type Action = {
	href: string;
	label: string;
};

type PublicPageProps = {
	eyebrow: string;
	title: string;
	intro: string;
	primaryAction?: Action;
	secondaryAction?: Action;
	children: ReactNode;
};

const PublicPage = ({
	eyebrow,
	title,
	intro,
	primaryAction,
	secondaryAction,
	children,
}: PublicPageProps) => (
	<div className={Styles.page}>
		<LandingNavbar />
		<header className={Styles.hero}>
			<Container className={Styles.heroInner}>
				<span className={Styles.eyebrow}>{eyebrow}</span>
				<h1>{title}</h1>
				<p>{intro}</p>
				{(primaryAction || secondaryAction) && (
					<div className={Styles.actions}>
						{primaryAction && (
							<Link href={primaryAction.href} className={Styles.primaryAction}>
								{primaryAction.label}
							</Link>
						)}
						{secondaryAction && (
							<Link href={secondaryAction.href} className={Styles.secondaryAction}>
								{secondaryAction.label}
							</Link>
						)}
					</div>
				)}
			</Container>
		</header>
		<main className={Styles.content}>
			<Container>{children}</Container>
		</main>
		<SiteFooter />
	</div>
);

export default PublicPage;
