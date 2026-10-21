import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioHome } from "../_components/PortfolioUI";
import { getDanielPosts } from "@/lib/portfolioPosts";
import { featuredVideos } from "@/lib/portfolioVideos";
import { isPersona, profiles } from "@/lib/portfolio";

export const revalidate = 3600;
export const generateStaticParams = () => [{ persona: "daniel" }, { persona: "romeo" }];

export function generateMetadata({ params }: { params: { persona: string } }): Metadata {
	if (!isPersona(params.persona)) return {};
	const profile = profiles[params.persona];
	return { title: `${profile.name} — ${profile.angle}`, description: profile.intro };
}

export default async function Page({ params }: { params: { persona: string } }) {
	if (!isPersona(params.persona)) notFound();
	const posts = await getDanielPosts();
	return <PortfolioHome persona={params.persona} posts={posts} videos={featuredVideos} />;
}
