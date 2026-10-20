export interface PostAuthor {
	id: string;
	name?: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	type?: string;
	bio?: string;
	image?: string;
	facebook?: string;
	instagram?: string;
	x?: string;
	linkedin?: string;
}

export const authorName = (author?: PostAuthor) => {
	if (!author) return "Guest Writer";
	return author.name || `${author.firstname || ""} ${author.lastname || ""}`.trim() || "Guest Writer";
};

export const getPostAuthors = (post?: { author?: PostAuthor; coAuthors?: PostAuthor[] }) => {
	const authors = [post?.author, ...(Array.isArray(post?.coAuthors) ? post!.coAuthors! : [])]
		.filter((author): author is PostAuthor => Boolean(author?.id));
	return authors.filter((author, index) => authors.findIndex((item) => item.id === author.id) === index);
};
