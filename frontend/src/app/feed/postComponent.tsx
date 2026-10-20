"use client";
import Link from "next/link";
import { Card, Row, Col } from "react-bootstrap";
import Styles from "../_styles/Feed/PostComponent.module.scss";
import Image from "next/image";
import { SlBookOpen } from "react-icons/sl";
import { HiArrowRight, HiOutlineDocumentText } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { db } from "../_components/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import PostByline from "../_components/postByline";
import { getPostAuthors, PostAuthor } from "../_components/postAuthors";
// import 

// This is the post component that goes on the Feed page and the Analytics page
interface PostComponentProps {
	searchTerm?: string;
	featuredOnly?: boolean;
}

interface PostData {
	id: string;
	title?: string;
	post?: string;
	thumbnail?: string;
	created?: string;
	category?: string;
	hashtags?: string[];
	featured?: boolean;
	status?: "draft" | "published";
	author?: PostAuthor;
	coAuthors?: PostAuthor[];
}

const PostComponent: React.FC<PostComponentProps> = ({ searchTerm = "", featuredOnly = false }) => {
	const [posts, setPosts] = useState<PostData[]>([]);
  	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [retryKey, setRetryKey] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
            try {
                const ref = collection(db, 'posts');
                const snapshot = await getDocs(ref);

				const data: PostData[] = [];
				snapshot.forEach(doc => {
					const newObject = {
						id: doc.id,
						...doc.data()
					} as PostData;
					data.push(newObject);
                });
				setPosts(data.filter((post) => post.status !== "draft").sort((a, b) => {
					const aTime = a.created ? Date.parse(a.created) : 0;
					const bTime = b.created ? Date.parse(b.created) : 0;
					return bTime - aTime;
				}));
				setError(false);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
				setError(true);
				setLoading(false);
            }
        };

        fetchData();
	}, [retryKey]);

	const getReadTimeMinutes = (content = "") => {
		const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
		return Math.max(1, Math.ceil(words / 200));
	};

	const normalizedSearchTerm = searchTerm.trim().toLowerCase();
	const searchedPosts = posts.filter((post) => {
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
			...(post.coAuthors || []).flatMap((author) => [author.firstname || "", author.lastname || ""]),
		]
			.join(" ")
			.toLowerCase();
		return searchableText.includes(normalizedSearchTerm);
	});
	const explicitlyFeatured = searchedPosts.filter((post) => post.featured);
	const filteredPosts = featuredOnly
		? (explicitlyFeatured.length > 0 ? explicitlyFeatured : searchedPosts.slice(0, 3))
		: searchedPosts;

	const getPlainText = (content = "") => content
		.replace(/!\[[^\]]*\]\([^)]*\)/g, "")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/[#_*`>\-\n]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	const formatDate = (value?: string) => {
		if (!value) return "Recently published";
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return value;
		return new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "short", year: "numeric" }).format(date);
	};

	return (
		<div className={Styles.postsRegion} aria-live="polite">
            {loading ? (
				<div className={Styles.skeletonGrid} aria-label="Loading articles">
					{[0, 1, 2].map((item) => <div className={Styles.skeletonCard} key={item} />)}
				</div>
			) : error ? (
				<div className={Styles.emptyState}>
					<HiOutlineDocumentText />
					<h3>We couldn’t load the feed</h3>
					<p>Check your connection and try again.</p>
					<button type="button" onClick={() => { setLoading(true); setRetryKey((key) => key + 1); }}>Try again</button>
				</div>
            ) : (
                <div className={Styles.cardsContainer}>
                    {filteredPosts.length > 0 ? (
						<Row className={Styles.gridRow}>
							{filteredPosts.map((post) => (
								<Col key={post.id} xl={4} md={6} sm={12} className={Styles.gridCol}>
									<Card className={`${Styles.card}`}>
										<Card.Body className={`${Styles.cardBodyUserinfo}`}>
											<PostByline authors={getPostAuthors(post)} />
											<div className={Styles.createdDate}>{formatDate(post.created)}</div>
										</Card.Body>

										<Link className={Styles.imageLink} href={`/post/${post.id}`} aria-label={`Read ${post.title || "article"}`}>
											{post.thumbnail ? <Image
												className={`${Styles.postThumbnail}`}
												src={post.thumbnail}
												width={700}
												height={420}
												alt=""
											/> : <div className={Styles.thumbnailFallback}><HiOutlineDocumentText /></div>}
										</Link>

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
												{getPlainText(post.post).slice(0, 150)}{getPlainText(post.post).length > 150 ? "…" : ""}
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
												Read article <HiArrowRight />
											</Link>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
                    ) : (
						<div className={Styles.emptyState}>
							<HiOutlineDocumentText />
							<h3>No articles found</h3>
							<p>{searchTerm ? `Try a different search than “${searchTerm}”.` : "New stories will appear here when they are published."}</p>
						</div>
                    )}
                </div>
            )}
        </div>
	);
};

export default PostComponent;


