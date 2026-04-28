'use client'
import { useState , useEffect} from "react";
import { Container, Col, Row } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../_components/firebaseConfig";
import Image from "next/image";
import TopNavbar from '../../_components/topNavbar'
import MarkdownEditor from '../../createpost/markdownEditor'
import Styles from "../../_styles/Feed/PostView.module.scss";
import AuthorProfileCard from "../../_components/authorProfileCard";


interface PostPageProps {
    params: {
        postId: string
    }
}

const PostPage = ({params}: PostPageProps) => {
    const [post, setPost] = useState<any>(null);
  	const [loading, setLoading] = useState(true);

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
        const postId = params.postId;
        fetchData(postId);
    }, []);

    const postUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = post?.title || "Check this post on Econ Journal";

	return (
		<div>
           <TopNavbar></TopNavbar>
			<div>
                {loading ? (
                    <p>Loading post...</p>
                ) : post ? (
                    <Container className={Styles.postContainer}>
                        <Row> 
                            <Col lg='12' md='12' sm='12'>
                            <Image
                                src={post.thumbnail}
                                className={Styles.postThumbnail}
                                width={1200}
                                height={520}
                                alt="Picture of thumbnail on post page of chatter page."
                            />
                            <hr />
                            <h1>{post.title}</h1>
                            <hr />
                            <div className={Styles.articleBody}>
                                <MarkdownEditor value={post.post} />
                            </div>
                            <hr />
                            <div className={Styles.shareRow}>
                                <strong>Share this post:</strong>
                                <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}>Facebook</a>
                                <a target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`}>X</a>
                                <a target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}>LinkedIn</a>
                                <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${postUrl}`)}`}>WhatsApp</a>
                            </div>
                            <AuthorProfileCard author={post.author} />
                            </Col>
                        </Row>
                    </Container>
                ) : (
                    <p>Post not found.</p>
                )}
            </div> 
		</div>
	);
};

export default PostPage;
