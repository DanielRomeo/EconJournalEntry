import {
	SiCplusplus, SiCsharp, SiDotnet, SiFirebase, SiGit, SiJavascript, SiMysql,
	SiNestjs, SiNextdotjs, SiNodedotjs, SiNumpy, SiOracle, SiPandas,
	SiPostgresql, SiPowerbi, SiPython, SiQt, SiReact, SiStreamlit,
	SiTypescript, SiVercel,
} from "react-icons/si";
import styles from "../portfolio.module.scss";

const firstRow = [
	{ name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
	{ name: "React", Icon: SiReact, color: "#39a9c7" },
	{ name: "Next.js", Icon: SiNextdotjs, color: "#676d78" },
	{ name: "C#", Icon: SiCsharp, color: "#9a4993" },
	{ name: ".NET", Icon: SiDotnet, color: "#7044aa" },
	{ name: "NestJS", Icon: SiNestjs, color: "#df465e" },
	{ name: "Node.js", Icon: SiNodedotjs, color: "#5f9544" },
	{ name: "JavaScript", Icon: SiJavascript, color: "#ad8b17" },
	{ name: "C++", Icon: SiCplusplus, color: "#4d80b8" },
	{ name: "Qt", Icon: SiQt, color: "#42a55c" },
];

const secondRow = [
	{ name: "PostgreSQL", Icon: SiPostgresql, color: "#44759e" },
	{ name: "MySQL", Icon: SiMysql, color: "#3a83a3" },
	{ name: "Oracle", Icon: SiOracle, color: "#cf443c" },
	{ name: "Firebase", Icon: SiFirebase, color: "#eaa91e" },
	{ name: "Python", Icon: SiPython, color: "#437a9e" },
	{ name: "Pandas", Icon: SiPandas, color: "#565277" },
	{ name: "NumPy", Icon: SiNumpy, color: "#4f84b9" },
	{ name: "Power BI", Icon: SiPowerbi, color: "#c8a71d" },
	{ name: "Streamlit", Icon: SiStreamlit, color: "#e96565" },
	{ name: "Vercel", Icon: SiVercel, color: "#5b6068" },
	{ name: "Git", Icon: SiGit, color: "#df6543" },
];

function Row({ items, reverse = false }: { items: typeof firstRow; reverse?: boolean }) {
	return <div className={styles.marqueeViewport}>
		<div className={`${styles.marqueeTrack} ${reverse ? styles.marqueeReverse : ""}`}>
			{[0, 1].map((copy) => <div className={styles.marqueeGroup} key={copy} aria-hidden={copy === 1 ? true : undefined}>
				{items.map(({ name, Icon, color }) => <div className={styles.toolPill} key={`${copy}-${name}`}><Icon aria-hidden="true" style={{ color }} /><span>{name}</span></div>)}
			</div>)}
		</div>
	</div>;
}

export function ToolMarquee() {
	return <section className={styles.marqueeSection} aria-label="Technologies and tools">
		<div className={styles.marqueeHeading}><span className={styles.eyebrow}>The toolbox</span><h2>Built with curiosity. Shipped with the right tools.</h2><p>Languages, frameworks and data tools from across my work and teaching.</p></div>
		<div className={styles.marqueeRows}><Row items={firstRow} /><Row items={secondRow} reverse /></div>
	</section>;
}
