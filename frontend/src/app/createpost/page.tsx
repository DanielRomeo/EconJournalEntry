import type { Metadata } from "next";
import { Suspense } from "react";
import CollaborativePostEditor from "./collaborativePostEditor";

export const metadata: Metadata = {
	title: "Write an article",
	robots: { index: false, follow: false },
};

const CreatePostPage = () => {
	return (
		<Suspense fallback={<div style={{ padding: "4rem" }}>Loading editor…</div>}>
			<CollaborativePostEditor />
		</Suspense>
	);
};

export default CreatePostPage;
