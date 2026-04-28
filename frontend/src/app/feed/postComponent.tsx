"use client";
import Link from "next/link";
import { Card, Button, Row, Col } from "react-bootstrap";
import Styles from "../_styles/Feed/PostComponent.module.scss";
import Image from "next/image";
import { SlBookOpen } from "react-icons/sl";
import { useState, useEffect } from "react";
import { db } from "../_components/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import AuthorProfileCard from "../_components/authorProfileCard";
// import 

// This is the post component that goes on the Feed page and the Analytics page
interface PostComponentProps {
	searchTerm?: string;
}

const PostComponent: React.FC<PostComponentProps> = ({ searchTerm = "" }) => {
	const [posts, setPosts] = useState<any>([]);
  	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
            try {
                const ref = collection(db, 'posts');
                const snapshot = await getDocs(ref);

                const data: any[] = [];
                await snapshot.forEach(doc => {
                    // console.log(doc.data())
                
					let newObject = {
						id: doc.id,
						...doc.data()
					}
					// console.log(newObject)	
					data.push(newObject);
					// console.log(data);
                });
				// console.log(data)
                setPosts(data);
				// console.log(data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Ensure loading state is set to false even in case of error
            }
        };

        fetchData();
	}, []);

	const getReadTimeMinutes = (content: string) => {
		const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
		return Math.max(1, Math.ceil(words / 200));
	};

	const normalizedSearchTerm = searchTerm.trim().toLowerCase();
	const filteredPosts = posts.filter((post: any) => {
		if (!normalizedSearchTerm) {
			return true;
		}
		const hashtagsText = Array.isArray(post.hashtags)
			? post.hashtags.join(" ")
			: "";
		const searchableText = [
			post.title || "",
			post.post || "",
			post.category || "",
			hashtagsText,
			post.author?.firstname || "",
			post.author?.lastname || "",
		]
			.join(" ")
			.toLowerCase();
		return searchableText.includes(normalizedSearchTerm);
	});

	return (
		<div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className={Styles.cardsContainer}>
                    {filteredPosts.length > 0 ? (
						<Row className={Styles.gridRow}>
							{filteredPosts.map((post: any, index: number) => (
								<Col key={index} lg={4} md={6} sm={12} className={Styles.gridCol}>
									<Card className={`${Styles.card}`}>
										<Card.Body className={`${Styles.cardBodyUserinfo}`}>
											<AuthorProfileCard author={post.author} compact />
											<div className={Styles.createdDate}>{post.created}</div>
										</Card.Body>

										<Image
											className={`${Styles.postThumbnail}`}
											src={post.thumbnail}
											width={500}
											height={320}
											alt="Post thumbnail"
										/>

										<Card.Body className={`${Styles.cardBodyPostDetails}`}>
											<Link className={`${Styles.link}`} href={`/post/${post.id}`}>
												<Card.Title className={`${Styles.cardBodyPostDetailsTitle}`}>
													{post.title}
												</Card.Title>
											</Link>
											<Card.Text className={Styles.readMeta}>
												<SlBookOpen /> {getReadTimeMinutes(post.post)} mins read
											</Card.Text>
											<Card.Text className={Styles.postSnippet}>
												{(post.post || "").replace(/[#_*`>\-\n]/g, " ").slice(0, 140)}...
											</Card.Text>
											<div className={Styles.metaRow}>
												{post.category && (
													<span className={Styles.categoryBadge}>{post.category}</span>
												)}
												{Array.isArray(post.hashtags) &&
													post.hashtags.slice(0, 3).map((tag: string) => (
														<span key={tag} className={Styles.hashtagBadge}>#{tag}</span>
													))}
											</div>
											<Link href={`/post/${post.id}`} className={Styles.readMoreLink}>
												<Button className={Styles.readMoreButton}>Read more</Button>
											</Link>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
                    ) : (
                        <div>No posts found</div>
                    )}
                </div>
            )}
        </div>
	);
};

export default PostComponent;


