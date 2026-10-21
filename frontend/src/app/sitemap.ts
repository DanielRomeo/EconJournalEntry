import type { MetadataRoute } from "next";
import { getPublicPosts } from "@/lib/firestorePosts";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
		{ url: absoluteUrl("/feed"), changeFrequency: "daily", priority: 0.9 },
		{ url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.7 },
		{ url: absoluteUrl("/community"), changeFrequency: "weekly", priority: 0.6 },
		{ url: absoluteUrl("/topics"), changeFrequency: "weekly", priority: 0.6 },
		{ url: absoluteUrl("/trending"), changeFrequency: "daily", priority: 0.6 },
		{ url: absoluteUrl("/start-writing"), changeFrequency: "monthly", priority: 0.6 },
		{ url: absoluteUrl("/editor-guide"), changeFrequency: "monthly", priority: 0.5 },
		{ url: absoluteUrl("/documentation"), changeFrequency: "monthly", priority: 0.4 },
		{ url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.3 },
		{ url: absoluteUrl("/portfolio"), changeFrequency: "monthly", priority: 0.7 },
		...(["daniel", "romeo"] as const).flatMap((persona) => [
			{ url: absoluteUrl(`/portfolio/${persona}`), changeFrequency: "monthly" as const, priority: 0.8 },
			{ url: absoluteUrl(`/portfolio/${persona}/projects`), changeFrequency: "monthly" as const, priority: 0.7 },
			{ url: absoluteUrl(`/portfolio/${persona}/writing`), changeFrequency: "weekly" as const, priority: 0.6 },
		]),
	];
	const posts = await getPublicPosts();
	const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
		url: absoluteUrl(`/post/${post.id}`),
		lastModified: post.updateTime || post.createTime || post.updated || post.created,
		changeFrequency: "monthly",
		priority: 0.8,
	}));

	return [...staticRoutes, ...postRoutes];
}
