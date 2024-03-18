'use client'
import { useState , useEffect, PropsWithChildren} from "react";

interface PostPageProps {
    params: {
        postId: string
    }
}

const PostComponent = () => {
    const [postId, setPostId] = useState<string | null>();

	return (
		<div>
           post component
		</div>
	);
};

export default PostComponent;
