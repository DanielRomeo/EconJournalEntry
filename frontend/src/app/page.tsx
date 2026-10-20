import type { Metadata } from "next";
import EditorialLandingComponent from "./landing/editorialLandingComponent";

export const metadata: Metadata = {
	title: "Journal Entry",
	description: "Independent writing across economics, finance, technology, science, and culture.",
};

export default function Home() {
	return <EditorialLandingComponent />;
}
