'use client'
import { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../_components/firebaseConfig";
import Image from "next/image";
import TopNavbar from '../../_components/topNavbar';
import MarkdownEditor from '../../createpost/markdownEditor';
import Styles from "../../_styles/Feed/PostView.module.scss";
import AuthorProfileCard from "../../_components/authorProfileCard";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

interface PostPageProps {
	params: { postId: string }
}

// Extract YouTube video ID from various URL formats
const getYouTubeId = (url: string): string | null => {
	const patterns = [
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
		/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
	];
	for (const pattern of patterns) {
		const match = url.match(pattern);
		if (match) return match[1];
	}
	return null;
};

// Detect if post content contains a YouTube link and return the first video ID
const extractFirstYouTubeId = (content: string): string | null => {
	const urlRegex = /https?:\/\/[^\s)]+/g;
	const urls = content.match(urlRegex) || [];
	for (const url of urls) {
		const id = getYouTubeId(url);
		if (id) return id;
	}
	return null;
};

const PostPage = ({ params }: PostPageProps) => {
	const [post, setPost] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async (postId: string) => {
			try {
				const ref = doc(db, 'posts', postId);
				const docSnapshot = await getDoc(ref);
				if (docSnapshot.exists()) {
					setPost({ id: docSnapshot.id, ...docSnapshot.data() });
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchData(params.postId);
	}, []);

	const postUrl = typeof window !== "undefined" ? window.location.href : "";
	const shareText = post?.title || "Check this post on Econ Journal Entry";
	const thumbUrl = post?.thumbnail || "";

	// Social share URLs — thumbnail image embedded via og:image meta but for direct link sharing
	const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
	const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`;
	const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
	const whatsappShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${postUrl}\n${thumbUrl}`)}`;

	const youtubeId = post ? extractFirstYouTubeId(post.post || "") : null;

	return (
		<div>
			<TopNavbar />
			{loading ? (
				<Container><p className="mt-5">Loading post...</p></Container>
			) : post ? (
				<Container className={Styles.postContainer}>
					<Row>
						<Col lg="12" md="12" sm="12">
							{/* Thumbnail */}
							<Image
								src={post.thumbnail}
								className={Styles.postThumbnail}
								width={1200}
								height={520}
								alt={post.title}
							/>

							
							<h1>{post.title}</h1>
							{post.category && (
								<span className={Styles.categoryBadge}>{post.category}</span>
							)}
							{Array.isArray(post.hashtags) && post.hashtags.map((tag: string) => (
								<span key={tag} className={Styles.hashtagBadge}>#{tag}</span>
							))}
							<hr />

							<div className={Styles.articleBody}>
								<MarkdownEditor value={post.post} />
							</div>

							<hr />

							{/* YouTube embed if found in content */}
							{youtubeId && (
								<div className={Styles.youtubeWrap}>
									<iframe
										src={`https://www.youtube.com/embed/${youtubeId}`}
										title="YouTube video"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									/>
								</div>
							)}

							

							<hr />

							{/* Social share with react-icons */}
							<div className={Styles.shareRow}>
								<strong>Share this post:</strong>
								<a href={fbShare} target="_blank" rel="noreferrer" className={`${Styles.shareBtn} ${Styles.fb}`} aria-label="Share on Facebook">
									<FaFacebookF />
								</a>
								<a href={twitterShare} target="_blank" rel="noreferrer" className={`${Styles.shareBtn} ${Styles.twitter}`} aria-label="Share on X (Twitter)">
									<FaTwitter />
								</a>
								<a href={linkedinShare} target="_blank" rel="noreferrer" className={`${Styles.shareBtn} ${Styles.linkedin}`} aria-label="Share on LinkedIn">
									<FaLinkedinIn />
								</a>
								<a href={whatsappShare} target="_blank" rel="noreferrer" className={`${Styles.shareBtn} ${Styles.whatsapp}`} aria-label="Share on WhatsApp">
									<FaWhatsapp />
								</a>
							</div>

							{/* Author card — links to their profile */}
							<a href={`/profile/${post.author?.id}`} className={Styles.authorLink}>
								<AuthorProfileCard author={post.author} />
							</a>
						</Col>
					</Row>
				</Container>
			) : (
				<Container><p className="mt-5">Post not found.</p></Container>
			)}
		</div>
	);
};

export default PostPage;