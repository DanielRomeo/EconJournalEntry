import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { authorName, getPostAuthors } from "../../_components/postAuthors";
import { getPublicPost, postExcerpt } from "@/lib/firestorePosts";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import PostPageClient from "./PostPageClient";

type PostPageProps = {
	params: { postId: string };
};

export const revalidate = 300;

const dateValue = (value?: string) => {
	if (!value) return undefined;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
	const post = await getPublicPost(params.postId);
	if (!post) return { title: `Post not found | ${SITE_NAME}`, robots: { index: false, follow: false } };

	const title = post.title || "Journal Entry article";
	const description = postExcerpt(post.post) || `Read ${title} on ${SITE_NAME}.`;
	const url = absoluteUrl(`/post/${post.id}`);
	const images = post.thumbnail ? [{ url: post.thumbnail, alt: title }] : [];
	const authors = getPostAuthors(post).map(authorName);

	return {
		title,
		description,
		keywords: [post.category, ...(post.hashtags || [])].filter(Boolean) as string[],
		authors: authors.map((name) => ({ name })),
		alternates: { canonical: url },
		openGraph: {
			type: "article",
			url,
			title,
			description,
			siteName: SITE_NAME,
			publishedTime: dateValue(post.created) || post.createTime,
			modifiedTime: dateValue(post.updated) || post.updateTime,
			authors,
			tags: [post.category, ...(post.hashtags || [])].filter(Boolean) as string[],
			images: images.length ? images : undefined,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: images.length ? images.map((image) => image.url) : undefined,
		},
		robots: {
			index: true,
			follow: true,
			googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
		},
	};
}

export default async function PostPage({ params }: PostPageProps) {
	const post = await getPublicPost(params.postId);
	if (!post) notFound();

	const url = absoluteUrl(`/post/${post.id}`);
	const description = postExcerpt(post.post) || `Read ${post.title || "this article"} on ${SITE_NAME}.`;
	const authors = getPostAuthors(post);
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		mainEntityOfPage: { "@type": "WebPage", "@id": url },
		headline: post.title,
		description,
		image: post.thumbnail ? [post.thumbnail] : undefined,
		datePublished: dateValue(post.created) || post.createTime,
		dateModified: dateValue(post.updated) || post.updateTime || post.createTime,
		author: authors.map((author) => ({
			"@type": "Person",
			name: authorName(author),
			url: absoluteUrl(`/profile/${author.id}`),
		})),
		publisher: {
			"@type": "Organization",
			name: SITE_NAME,
			logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") },
		},
		articleSection: post.category,
		keywords: [post.category, ...(post.hashtags || [])].filter(Boolean).join(", "),
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
			<PostPageClient post={post} postUrl={url} />
		</>
	);
}
