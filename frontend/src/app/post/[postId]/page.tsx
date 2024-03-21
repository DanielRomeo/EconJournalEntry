'use client'
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";
import { usePathname, useSearchParams } from 'next/navigation'
import { Container, Col, Row } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../_components/firebaseConfig";
import Image from "next/image";
// import TopNavbar from "@/app/_components/topNavbar";
import TopNavbar from '../../_components/topNavbar'
import MarkdownEditor from '../../createpost/markdownEditor'


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
    const [post, setPost] = useState<any>([]);
  	const [loading, setLoading] = useState(false);

      const [height, setHeight] = useState<number>(0); // State to store calculated height

      const handleLoadComplete = (img: any) => {
          const newHeight =
              img.naturalHeight * (img.clientWidth / img.naturalWidth);
          setHeight(newHeight);
      };

    const fetchData = async (postId: string) => {
        try {
            const ref = doc(db, 'posts', postId); // Assuming postId is the ID of the post you want to fetch
            const docSnapshot = await getDoc(ref);
    
            if (docSnapshot.exists()) {
                console.log('docSnap exists')
                const postData = {
                    id: docSnapshot.id,
                    ...docSnapshot.data()
                };
                setPost(postData); // Assuming setPost is a state updater function to store the fetched post
                console.log(postData)
                setLoading(false);
            } else {
                // Post with the provided ID does not exist
                console.log('Post not found');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const postId = params.postId; // Replace 'your-post-id' with the actual ID of the post you want to fetch
        fetchData(postId);
    }, []);


	return (
		<div>
           <TopNavbar></TopNavbar>
			<div>
                {post ? (
                    // <p>post number {postId} page</p>
                    <Container>
                        <Row> 
                            <Col lg='12' md='12' sm='12'>
                            <Image
                                src={post.thumbnail}
                                width={200}
                                height={200}
                                // onLoadingComplete={handleLoadComplete}
                                alt="Picture of thumbnail on post page of chatter page."
                            />
                            <hr />
                            <h4>{post.title}</h4>
                            <hr />
                            <MarkdownEditor value={post.post} />
                            </Col>
                        </Row>
                    </Container>
                ) : (
                    <p>Loading post...</p>
                )}
            </div> 
		</div>
	);
};

export default PostPage;
