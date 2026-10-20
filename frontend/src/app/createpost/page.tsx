import { Suspense } from "react";
import CollaborativePostEditor from "./collaborativePostEditor";

const CreatePostPage = () => {
	return (
		<Suspense fallback={<div style={{ padding: "4rem" }}>Loading editor…</div>}>
			<CollaborativePostEditor />
		</Suspense>
	);
};

export default CreatePostPage;
