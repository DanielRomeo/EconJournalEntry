import type { PostAuthor } from "@/app/_components/postAuthors";

const PROJECT_ID = "econjournalentry";
const POSTS_ENDPOINT = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/posts`;

type FirestoreValue = {
	stringValue?: string;
	integerValue?: string;
	doubleValue?: number;
	booleanValue?: boolean;
	timestampValue?: string;
	nullValue?: null;
	arrayValue?: { values?: FirestoreValue[] };
	mapValue?: { fields?: Record<string, FirestoreValue> };
};

type FirestoreDocument = {
	name: string;
	fields?: Record<string, FirestoreValue>;
	createTime?: string;
	updateTime?: string;
};

export type PublicPost = {
	id: string;
	title?: string;
	post?: string;
	thumbnail?: string;
	category?: string;
	hashtags?: string[];
	created?: string;
	updated?: string;
	createTime?: string;
	updateTime?: string;
	author?: PostAuthor;
	coAuthors?: PostAuthor[];
	coAuthorIds?: string[];
	status?: string;
};

const decodeValue = (value: FirestoreValue): unknown => {
	if ("stringValue" in value) return value.stringValue;
	if ("integerValue" in value) return Number(value.integerValue);
	if ("doubleValue" in value) return value.doubleValue;
	if ("booleanValue" in value) return value.booleanValue;
	if ("timestampValue" in value) return value.timestampValue;
	if ("nullValue" in value) return null;
	if (value.arrayValue) return (value.arrayValue.values || []).map(decodeValue);
	if (value.mapValue) return decodeFields(value.mapValue.fields || {});
	return undefined;
};

const decodeFields = (fields: Record<string, FirestoreValue>) =>
	Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decodeValue(value)]));

const decodeDocument = (document: FirestoreDocument): PublicPost => ({
	id: document.name.split("/").pop() || "",
	...decodeFields(document.fields || {}),
	createTime: document.createTime,
	updateTime: document.updateTime,
} as PublicPost);

export const getPublicPost = async (postId: string): Promise<PublicPost | null> => {
	const response = await fetch(`${POSTS_ENDPOINT}/${encodeURIComponent(postId)}`, {
		next: { revalidate: 300 },
	});

	if (response.status === 404) return null;
	if (!response.ok) throw new Error(`Unable to load post metadata (${response.status})`);

	return decodeDocument(await response.json() as FirestoreDocument);
};

export const getPublicPosts = async (): Promise<PublicPost[]> => {
	const posts: PublicPost[] = [];
	let pageToken = "";

	try {
		do {
			const query = new URLSearchParams({ pageSize: "1000" });
			if (pageToken) query.set("pageToken", pageToken);
			const response = await fetch(`${POSTS_ENDPOINT}?${query}`, {
				next: { revalidate: 3600 },
			});
			if (!response.ok) throw new Error(`Unable to load posts (${response.status})`);

			const result = await response.json() as {
				documents?: FirestoreDocument[];
				nextPageToken?: string;
			};
			posts.push(...(result.documents || []).map(decodeDocument));
			pageToken = result.nextPageToken || "";
		} while (pageToken);
	} catch (error) {
		console.error("Unable to build the post sitemap", error);
	}

	return posts.filter((post) => post.status !== "draft");
};

export const postExcerpt = (content = "", maxLength = 160) => {
	const plainText = content
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/<[^>]+>/g, " ")
		.replace(/[#>*_`~|-]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	if (plainText.length <= maxLength) return plainText;
	return `${plainText.slice(0, maxLength - 1).trimEnd()}…`;
};
