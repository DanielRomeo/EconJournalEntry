'use client'
import { useState, useEffect, useRef } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Image from "next/image";
import TopNavbar from '../../_components/topNavbar';
import MarkdownEditor from '../../createpost/markdownEditor';
import Styles from "../../_styles/Feed/PostView.module.scss";
import AuthorProfileCard from "../../_components/authorProfileCard";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getPostAuthors } from "../../_components/postAuthors";
import type { PublicPost } from "@/lib/firestorePosts";

type PostPageClientProps = {
	post: PublicPost;
	postUrl: string;
};

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

const extractFirstYouTubeId = (content: string): string | null => {
	const urls = content.match(/https?:\/\/[^\s)]+/g) || [];
	for (const url of urls) {
		const id = getYouTubeId(url);
		if (id) return id;
	}
	return null;
};

export default function PostPageClient({ post, postUrl }: PostPageClientProps) {
	const [readingProgress, setReadingProgress] = useState(0);
	const articleRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const updateProgress = () => {
			const article = articleRef.current;
			if (!article) return;
			const articleTop = window.scrollY + article.getBoundingClientRect().top;
			const finishLine = Math.max(articleTop + article.scrollHeight - window.innerHeight, articleTop + 1);
			const currentPosition = window.scrollY + 76;
			const percentage = ((currentPosition - articleTop) / (finishLine - articleTop)) * 100;
			setReadingProgress(Math.min(100, Math.max(0, percentage)));
		};
		updateProgress();
		window.addEventListener("scroll", updateProgress, { passive: true });
		window.addEventListener("resize", updateProgress);
		return () => {
			window.removeEventListener("scroll", updateProgress);
			window.removeEventListener("resize", updateProgress);
		};
	}, [post]);

	const shareText = post.title || "Check this post on Journal Entry";
	const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
	const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`;
	const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
	const whatsappShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${postUrl}`)}`;
	const youtubeId = extractFirstYouTubeId(post.post || "");
	const authors = getPostAuthors(post);

	return (
		<div>
			<div className={Styles.readingProgressTrack} role="progressbar" aria-label="Article reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(readingProgress)}>
				<div className={Styles.readingProgressBar} style={{ width: `${readingProgress}%` }} />
			</div>
			<TopNavbar />
			<Container ref={articleRef} className={Styles.postContainer}>
				<Row>
					<Col lg="12" md="12" sm="12">
						{post.thumbnail && (
							<Image src={post.thumbnail} className={Styles.postThumbnail} width={1200} height={520} alt={post.title || "Article cover"} priority />
						)}
						<h1>{post.title}</h1>
						{post.category && <span className={Styles.categoryBadge}>{post.category}</span>}
						{Array.isArray(post.hashtags) && post.hashtags.map((tag) => (
							<span key={tag} className={Styles.hashtagBadge}>#{tag}</span>
						))}
						<hr />
						<article className={Styles.articleBody}>
							<MarkdownEditor value={post.post || ""} />
						</article>
						<hr />
						{youtubeId && (
							<div className={Styles.youtubeWrap}>
								<iframe src={`https://www.youtube.com/embed/${youtubeId}`} title={`Video for ${post.title || "this article"}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
							</div>
						)}
						<hr />
						<div className={Styles.shareRow}>
							<strong>Share this post:</strong>
							<a href={fbShare} target="_blank" rel="noreferrer" className={`${Styles.shareBtn} ${Styles.fb}`} aria-label="Share on Facebook"><FaFacebookF /></a>
							<a href={twitterShare} target="_blank" rel="noreferrer" className={`${Styles.shareBtn} ${Styles.twitter}`} aria-label="Share on X (Twitter)"><FaXTwitter /></a>
							<a href={linkedinShare} target="_blank" rel="noreferrer" className={`${Styles.shareBtn} ${Styles.linkedin}`} aria-label="Share on LinkedIn"><FaLinkedinIn /></a>
							<a href={whatsappShare} target="_blank" rel="noreferrer" className={`${Styles.shareBtn} ${Styles.whatsapp}`} aria-label="Share on WhatsApp"><FaWhatsapp /></a>
						</div>
						<section className={Styles.authorsSection} aria-labelledby="authors-heading">
							<h2 id="authors-heading">{authors.length > 1 ? "About the authors" : "About the author"}</h2>
							<div className={Styles.authorsGrid}>
								{authors.map((author, index) => (
									<a key={author.id} href={`/profile/${author.id}`} className={Styles.authorLink}>
										<AuthorProfileCard author={author} title={authors.length > 1 ? (index === 0 ? "Main author" : "Co-author") : "About the author"} />
									</a>
								))}
							</div>
						</section>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
