import { getPublicPosts, type PublicPost } from "@/lib/firestorePosts";

const matchesDaniel = (author?: PublicPost["author"]) => {
	if (!author) return false;
	const name = (author.name || `${author.firstname || ""} ${author.lastname || ""}`).trim().toLowerCase();
	return name === "daniel mamphekgo" || name === "daniel romeo mamphekgo";
};

const postTime = (post: PublicPost) => {
	const date = post.updated || post.created || post.updateTime || post.createTime || "";
	const parsed = Date.parse(date);
	return Number.isNaN(parsed) ? 0 : parsed;
};

export async function getDanielPosts() {
	const posts = await getPublicPosts();
	return posts
		.filter((post) => matchesDaniel(post.author) || post.coAuthors?.some(matchesDaniel))
		.sort((a, b) => postTime(b) - postTime(a));
}
