import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WritingPage } from "../../_components/PortfolioUI";
import { getDanielPosts } from "@/lib/portfolioPosts";
import { isPersona, profiles } from "@/lib/portfolio";

export const revalidate = 3600;
export const generateStaticParams = () => [{ persona: "daniel" }, { persona: "romeo" }];

export function generateMetadata({ params }: { params: { persona: string } }): Metadata {
	if (!isPersona(params.persona)) return {};
	return { title: `${profiles[params.persona].name} — Writing`, description: "Published writing by Daniel Romeo Mamphekgo on Journal Entry." };
}

export default async function Page({ params }: { params: { persona: string } }) {
	if (!isPersona(params.persona)) notFound();
	const posts = await getDanielPosts();
	return <WritingPage persona={params.persona} posts={posts} />;
}
