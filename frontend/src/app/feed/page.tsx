import type { Metadata } from "next";
import FeedComponent from "./feedComponent";

export const metadata: Metadata = {
	title: "Stories",
	description: "Discover recent essays, analysis, practical lessons, and personal perspectives from Journal Entry writers.",
	alternates: { canonical: "/feed" },
};

const FeedPage = () => {
	
	return (
		<div>
			<FeedComponent></FeedComponent>
		</div>
	);
};

export default FeedPage;
