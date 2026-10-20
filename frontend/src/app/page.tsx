import type { Metadata } from "next";
import EditorialLandingComponent from "./landing/editorialLandingComponent";

export const metadata: Metadata = {
	title: { absolute: "Journal Entry — Read deeply. Write honestly." },
	description: "Independent writing across economics, finance, technology, science, and culture.",
	alternates: { canonical: "/" },
};

export default function Home() {
	return <EditorialLandingComponent />;
}
