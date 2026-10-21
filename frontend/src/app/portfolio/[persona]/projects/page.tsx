import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectsPage } from "../../_components/PortfolioUI";
import { isPersona, profiles } from "@/lib/portfolio";

export const generateStaticParams = () => [{ persona: "daniel" }, { persona: "romeo" }];

export function generateMetadata({ params }: { params: { persona: string } }): Metadata {
	if (!isPersona(params.persona)) return {};
	return { title: `${profiles[params.persona].name} — Projects`, description: `Projects by Daniel Romeo Mamphekgo, with a focus on ${profiles[params.persona].angle.toLowerCase()}.` };
}

export default function Page({ params }: { params: { persona: string } }) {
	if (!isPersona(params.persona)) notFound();
	return <ProjectsPage persona={params.persona} />;
}
