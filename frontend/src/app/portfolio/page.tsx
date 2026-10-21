import Link from "next/link";
import styles from "./portfolio.module.scss";

export const metadata = { title: "Daniel Romeo Mamphekgo — Portfolios", description: "Explore Daniel Romeo Mamphekgo’s work in data, software and teaching." };

export default function Page() {
	return <main className={`${styles.shell} ${styles.selector}`}><Link className={styles.wordmark} href="/">journal<span>entry</span><i>.</i></Link><div className={styles.selectorInner}><p className={styles.eyebrow}>Two lenses / one maker</p><h1>Choose a way into the work.</h1><p>Daniel Romeo Mamphekgo builds products, works with data and teaches what he learns. Explore the perspective that fits what brought you here.</p><div className={styles.selectorGrid}><Link href="/portfolio/romeo"><span>01 / FULL STACK</span><h2>Meet Romeo</h2><p>Product-minded engineering, from interface to API and deployment.</p><b>Explore portfolio ↗</b></Link><Link href="/portfolio/daniel"><span>02 / DATA</span><h2>Meet Daniel</h2><p>Analytics, data-informed questions and software with a purpose.</p><b>Explore portfolio ↗</b></Link></div></div></main>;
}
