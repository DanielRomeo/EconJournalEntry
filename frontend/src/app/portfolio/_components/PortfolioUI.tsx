import Image from "next/image";
import Link from "next/link";
import type { PublicPost } from "@/lib/firestorePosts";
import { postExcerpt } from "@/lib/firestorePosts";
import { orderedProjects, profiles, projectById, type Persona, type PortfolioProject } from "@/lib/portfolio";
import type { PortfolioVideo } from "@/lib/portfolioVideos";
import { ToolMarquee } from "./ToolMarquee";
import styles from "../portfolio.module.scss";

const arrow = <span aria-hidden="true">↗</span>;
const homepageScreenshots: Record<string, string> = {
	studentin: "/portfolio/screenshots/studentin.png",
	ivybrilliance: "/portfolio/screenshots/ivybrilliance.png",
	journalentry: "/portfolio/screenshots/journalentry.png",
	fakeiec: "/portfolio/screenshots/fakeiec.png",
};

export function PortfolioShell({ persona, children }: { persona: Persona; children: React.ReactNode }) {
	return <div className={`${styles.shell} ${persona === "romeo" ? styles.romeo : styles.daniel}`}>
		<header className={styles.header}>
			<Link className={styles.wordmark} href="/">journal<span>entry</span><i>.</i></Link>
			<nav aria-label="Portfolio navigation" className={styles.nav}>
				<Link href={`/portfolio/${persona}`}>Overview</Link>
				<Link href={`/portfolio/${persona}/projects`}>Projects</Link>
				<Link href={`/portfolio/${persona}/writing`}>Writing</Link>
				<Link href={persona === "daniel" ? "/portfolio/romeo" : "/portfolio/daniel"} className={styles.switch}>Meet {persona === "daniel" ? "Romeo" : "Daniel"} ↗</Link>
			</nav>
		</header>
		{children}
		<footer className={styles.footer}>
			<div><span className={styles.eyebrow}>Keep the conversation going</span><h2>Good work starts with a good question.</h2></div>
			<div className={styles.footerLinks}><a href="https://github.com/danielromeo" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.youtube.com/@danielromeo99" target="_blank" rel="noopener noreferrer">YouTube ↗</a><Link href="/">Journal Entry ↗</Link></div>
		</footer>
	</div>;
}

export function ProjectCard({ project, showHomepage = false }: { project: PortfolioProject; showHomepage?: boolean }) {
	const screenshot = showHomepage ? homepageScreenshots[project.id] : undefined;
	return <article className={styles.projectCard}>
		{screenshot && project.link ? <Link href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined} className={styles.projectScreenshot} aria-label={`Visit ${project.title} homepage`}><Image src={screenshot} alt={`${project.title} homepage screenshot`} fill sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 30vw" className={styles.screenshotImage} /><span className={styles.screenshotLabel}>Visit homepage ↗</span></Link> : <div className={`${styles.projectArt} ${styles[project.tone]}`}><span className={styles.artOrbit} /><span className={styles.artMark}>{project.mark}</span><span className={styles.artIndex}>{project.kind}</span></div>}
		<div className={styles.projectBody}><p className={styles.cardType}>{project.kind}</p><h3>{project.title}</h3><p>{project.summary}</p><div className={styles.tags}>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
			{(project.link || project.source) && <div className={styles.cardLinks}>{project.link && <Link href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}>{project.link.startsWith("/") ? "Visit site" : "View project"} {arrow}</Link>}{project.source && <a href={project.source} target="_blank" rel="noopener noreferrer">Source {arrow}</a>}</div>}
		</div>
	</article>;
}

function PostCard({ post }: { post: PublicPost }) {
	const dateValue = post.created || post.createTime || post.updated || post.updateTime;
	const date = dateValue && !Number.isNaN(Date.parse(dateValue)) ? new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "short", year: "numeric" }).format(new Date(dateValue)) : "Journal Entry";
	return <Link href={`/post/${post.id}`} className={styles.postCard}><span className={styles.eyebrow}>{post.category || "Writing"} · {date}</span><h3>{post.title || "Untitled article"}</h3><p>{postExcerpt(post.post || "", 135)}</p><div className={styles.postFooter}><div className={styles.authorMini}><span className={styles.authorAvatarFrame}><Image src="/portfolio/daniel-romeo-portrait.png" alt="" width={84} height={84} className={styles.authorAvatar} /></span><span>Daniel Romeo Mamphekgo<small>Author</small></span></div><span className={styles.readMore}>Read ↗</span></div></Link>;
}

export function PostGrid({ posts }: { posts: PublicPost[] }) {
	return posts.length ? <div className={styles.postGrid}>{posts.map((post) => <PostCard key={post.id} post={post} />)}</div> : <div className={styles.emptyPosts}>Daniel’s articles will appear here when his published Journal Entry posts are available.</div>;
}

function VideoGrid({ videos }: { videos: PortfolioVideo[] }) {
	return <div className={styles.videoGrid}>{videos.map((video) => <a href={`https://www.youtube.com/watch?v=${video.id}${video.startSeconds ? `&t=${video.startSeconds}s` : ""}`} target="_blank" rel="noopener noreferrer" className={styles.videoCard} key={video.id} aria-label={`Watch ${video.title} on YouTube`}>
		<div className={styles.videoThumb}><Image src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" width={480} height={360} unoptimized /><span className={styles.playIcon} aria-hidden="true">▶</span></div>
		<div className={styles.videoInfo}><span className={styles.eyebrow}>From my YouTube channel</span><h3>{video.title}</h3><span className={styles.readMore}>Watch video ↗</span></div>
	</a>)}</div>;
}

export function PortfolioHome({ persona, posts, videos }: { persona: Persona; posts: PublicPost[]; videos: PortfolioVideo[] }) {
	const profile = profiles[persona];
	return <PortfolioShell persona={persona}>
		<main>
			<section className={styles.hero}>
				<div className={styles.heroCopy}><p className={styles.eyebrow}>Daniel Romeo Mamphekgo / {profile.angle}</p><h1>{profile.role}</h1><p className={styles.heroLead}>{profile.intro}</p><div className={styles.heroActions}><Link className={styles.primaryButton} href={`/portfolio/${persona}/projects`}>Explore my work <span>↗</span></Link><Link className={styles.textButton} href={`/portfolio/${persona}/writing`}>View blog <span>↗</span></Link></div><p className={styles.heroNote}>Final-year Computer Science student · Economics degree holder</p></div>
				<div className={styles.portraitWrap}><div className={styles.portraitHalo} /><Image src="/portfolio/daniel-romeo-portrait.png" alt="Daniel Romeo smiling while working at a laptop" width={1268} height={1240} priority className={styles.portrait} /><span className={styles.portraitLabel}>CURIOUS BY DESIGN&nbsp; / &nbsp;BUILT TO LEARN</span></div>
			</section>
			<div className={styles.ticker}><span>Software</span><b>✳</b><span>Data</span><b>✳</b><span>Education</span><b>✳</b><span>Storytelling</span></div>
			<section className={styles.section} id="work"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Selected work / 01</p><h2>Ideas made tangible.</h2></div><Link href={`/portfolio/${persona}/projects`} className={styles.textButton}>View all projects ↗</Link></div><div className={styles.projectGrid}>{profile.featured.map((id) => <ProjectCard key={id} project={projectById(id)} showHomepage />)}</div></section>
			<section className={styles.aboutBand}><div><p className={styles.eyebrow}>The person behind the projects / 02</p><h2>A builder who likes the whole picture.</h2><p>{profile.about}</p><p>I’ve tutored I.T. and Economics, which sharpened how I explain difficult ideas. Object Pascal is part of that teaching story: I used it mainly for high-school I.T., not as the centre of my professional stack.</p></div><div className={styles.strengthPanel}><span className={styles.panelLabel}>Working knowledge</span>{profile.strengths.map((item, index) => <div key={item}><b>0{index + 1}</b><span>{item}</span></div>)}</div></section>
			<section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>The toolkit / 03</p><h2>From query to deployment.</h2></div></div><div className={styles.toolGrid}><div><span>01 / BUILD</span><h3>Interfaces & systems</h3><p>TypeScript, JavaScript, React, Next.js, NestJS, C#, ASP.NET Core, C++ and Qt.</p></div><div><span>02 / UNDERSTAND</span><h3>Data & databases</h3><p>Python, Pandas, NumPy and SQL across Oracle, MySQL and PostgreSQL; Firebase for NoSQL-backed publishing.</p></div><div><span>03 / DELIVER</span><h3>Infrastructure & communication</h3><p>Cloud deployment, API integration, testing, documentation and teaching what I learn.</p></div></div></section>
			<section className={styles.learningBand}><div><p className={styles.eyebrow}>Beyond the code / 04</p><h2>Learning out loud.</h2><p>I teach I.T. and Economics, share development lessons on YouTube and write about the ideas behind the work. The aim is simple: make useful things, then make them understandable.</p><a href="https://www.youtube.com/@danielromeo99" target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>Visit my YouTube channel ↗</a></div><div className={styles.learningGraphic}><span>LEARN</span><span>BUILD</span><span>TEACH</span></div></section>
			<section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>On the channel / 05</p><h2>Watch the lessons.</h2></div><a href="https://www.youtube.com/@danielromeo99/videos" target="_blank" rel="noopener noreferrer" className={styles.textButton}>All videos ↗</a></div><VideoGrid videos={videos} /></section>
			<section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Recent writing / 06</p><h2>Notes from the journey.</h2></div><Link href={`/portfolio/${persona}/writing`} className={styles.textButton}>View blog ↗</Link></div><PostGrid posts={posts.slice(0, 3)} /></section>
		</main>
	</PortfolioShell>;
}

export function ProjectsPage({ persona }: { persona: Persona }) {
	return <PortfolioShell persona={persona}><main className={styles.archive}><div className={styles.archiveIntro}><p className={styles.eyebrow}>Selected & extended work</p><h1>The work, in more detail.</h1><p>A collection across products, data, backend systems and teaching. The first three projects are the focus of this {profiles[persona].angle.toLowerCase()} portfolio; the full range is here too.</p></div><ToolMarquee /><div className={styles.archiveToolbar}><span>{orderedProjects(persona).length} projects & explorations</span><Link href={`/portfolio/${persona}`}>← Back to overview</Link></div><div className={styles.projectGrid}>{orderedProjects(persona).map((project) => <ProjectCard key={project.id} project={project} />)}</div></main></PortfolioShell>;
}

export function WritingPage({ persona, posts }: { persona: Persona; posts: PublicPost[] }) {
	return <PortfolioShell persona={persona}><main className={styles.archive}><div className={styles.archiveIntro}><p className={styles.eyebrow}>Daniel’s writing / Journal Entry</p><h1>Ideas, lessons and stories worth sharing.</h1><p>My own published articles, gathered in one place. I write about the things I’m learning, building and questioning.</p></div><div className={styles.archiveToolbar}><span>{posts.length} published {posts.length === 1 ? "article" : "articles"}</span><Link href={`/portfolio/${persona}`}>← Back to overview</Link></div><PostGrid posts={posts} /></main></PortfolioShell>;
}
