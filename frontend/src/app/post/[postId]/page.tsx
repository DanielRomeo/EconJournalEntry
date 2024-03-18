'use client'
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";
import { usePathname, useSearchParams } from 'next/navigation'


interface PostPageProps {
    params: {
        postId: string
    }
}

const PostPage = ({params}: PostPageProps) => {
	const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [postId, setPostId] = useState<string | null>();

    useEffect(() =>  {
        console.log(params.postId);
        setPostId(params.postId);
    }, [postId])

	return (
		<div>
           
			<div>
                {postId ? (
                    <p>post number {postId} page</p>
                ) : (
                    <p>Loading post...</p>
                )}
            </div> 
		</div>
	);
};

export default PostPage;
