export type Persona = "daniel" | "romeo";

export type PortfolioProject = {
	id: string;
	title: string;
	kind: string;
	summary: string;
	tools: string[];
	mark: string;
	tone: "blue" | "orange" | "green" | "ink";
	link?: string;
	source?: string;
	status?: "live" | "in-progress";
};

export const projects: PortfolioProject[] = [
	{ id: "studentin", title: "StudentIn", kind: "Product · proptech", summary: "A student-accommodation platform connecting property listings with the people looking for a place to stay.", tools: ["Web platform", "Product design", "Property listings"], mark: "SI /", tone: "orange", link: "https://studentin.co.za/", status: "live" },
	{ id: "ivybrilliance", title: "Ivy Brilliance", kind: "Product · education", summary: "An education platform spanning ERP and learning-management workflows for schools and crèches.", tools: ["TypeScript", "React", "Next.js", "NestJS"], mark: "IB /", tone: "blue", link: "https://ivybrilliance.com/", source: "https://github.com/IvyBrilliance" },
	{ id: "ivy-qt", title: "Ivy crèche desktop", kind: "Desktop · C++", summary: "A Qt desktop client designed around crèche-management workflows and the existing Ivy Brilliance API.", tools: ["C++", "Qt", "REST API", "Design patterns"], mark: "QT /", tone: "green", status: "in-progress" },
	{ id: "studentin-api", title: "StudentIn management API", kind: "Backend · architecture", summary: "An ASP.NET Core API for the independent StudentIn management app, with clear ownership boundaries around shared listing data.", tools: ["C#", "ASP.NET Core", "SQL", "API design"], mark: "API /", tone: "ink", status: "in-progress" },
	{ id: "journalentry-api", title: "Journal Entry CMS API", kind: "Backend · publishing", summary: "A C# API direction for a multi-site publishing CMS that can serve Journal Entry and other sites' blogs.", tools: ["C#", "ASP.NET Core", "CMS", "SQL"], mark: "CMS /", tone: "orange", status: "in-progress" },
	{ id: "journalentry", title: "Journal Entry", kind: "Product · publishing", summary: "A writing platform for independent voices, with accounts, posts and a public reading experience.", tools: ["Next.js", "React", "Firebase", "Publishing"], mark: "JE /", tone: "blue", link: "/", source: "https://github.com/DanielRomeo/EconJournalEntry", status: "live" },
	{ id: "studentin-analytics", title: "StudentIn analytics", kind: "Data · portfolio study", summary: "A planned end-to-end accommodation-data study: ETL, SQL analysis, a dashboard and a clear written interpretation of the findings.", tools: ["Python", "Pandas", "SQL", "Power BI", "Streamlit"], mark: "DATA /", tone: "orange", status: "in-progress" },
	{ id: "ivy-analytics", title: "Ivy Brilliance analytics", kind: "Data · portfolio study", summary: "A planned education-operations study combining structured data, SQL, exploratory analysis and an interactive dashboard.", tools: ["Python", "NumPy", "SQL", "Excel", "Streamlit"], mark: "IVY /", tone: "blue", status: "in-progress" },
	{ id: "fakeiec", title: "FakeIEC", kind: "Data · civic technology", summary: "An election-themed project exploring the intersection of public-facing software and data-driven presentation.", tools: ["Data visualisation", "Web app", "Civic tech"], mark: "IEC /", tone: "green", link: "https://fakeiec.vercel.app/", source: "https://github.com/DanielRomeo/fakeiec", status: "live" },
	{ id: "jackscript", title: "jackscript.js", kind: "Open source · package", summary: "A JavaScript/TypeScript package published for other developers to use, with a focus on discrete-mathematics utilities.", tools: ["TypeScript", "npm", "Library design"], mark: "JS /", tone: "ink", link: "https://www.npmjs.com/package/jackscript-js", source: "https://github.com/jack-script/jackscript-js", status: "live" },
	{ id: "ivydale", title: "IvyDale Fashion", kind: "Product · commerce", summary: "A fashion-focused web presence, showing range beyond education and publishing products.", tools: ["Web development", "Commerce", "Brand experience"], mark: "ID /", tone: "orange", link: "https://ivydalefashion.co.za/", status: "live" },
];

export const profiles = {
	daniel: {
		name: "Daniel",
		role: "Data, software & the questions behind them.",
		intro: "I turn messy information into useful decisions—and build the software that makes those decisions easier to act on.",
		angle: "Data science / analytics",
		about: "I’m a final-year Computer Science student and economics degree holder. My work brings an analyst’s curiosity to real products: how data is collected, queried, explained and turned into something useful.",
		featured: ["fakeiec", "studentin-analytics", "ivy-analytics"],
		order: ["fakeiec", "studentin-analytics", "ivy-analytics", "studentin", "ivybrilliance", "journalentry", "jackscript", "ivy-qt", "studentin-api", "journalentry-api", "ivydale"],
		strengths: ["Python, Pandas & NumPy", "Raw SQL & data modelling", "Excel, Power BI & Streamlit", "Economics-informed analysis"],
	},
	romeo: {
		name: "Romeo",
		role: "Full-stack engineer. Product-minded builder.",
		intro: "I build practical software across the stack—from considered interfaces to APIs, databases and the infrastructure that keeps them running.",
		angle: "Full-stack engineering",
		about: "I’m a final-year Computer Science student and economics degree holder. I like owning the whole journey: understanding the problem, shaping the product, building its systems and explaining the decisions along the way.",
		featured: ["studentin", "ivybrilliance", "journalentry"],
		order: ["studentin", "ivybrilliance", "journalentry", "studentin-api", "journalentry-api", "ivy-qt", "jackscript", "ivydale", "fakeiec", "studentin-analytics", "ivy-analytics"],
		strengths: ["TypeScript, React & Next.js", "C#, ASP.NET Core & NestJS", "C++ & Qt", "API, database & cloud architecture"],
	},
} as const;

export const projectById = (id: string) => projects.find((project) => project.id === id)!;
export const orderedProjects = (persona: Persona) => profiles[persona].order.map(projectById);
export const isPersona = (value: string): value is Persona => value === "daniel" || value === "romeo";
