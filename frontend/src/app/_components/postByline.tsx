import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { authorName, PostAuthor } from "./postAuthors";
import Styles from "./_styles/postByline.module.scss";

type PostBylineProps = { authors: PostAuthor[] };

const PostByline = ({ authors }: PostBylineProps) => {
	const visibleAuthors = authors.length ? authors.slice(0, 2) : [{ id: "guest", firstname: "Guest", lastname: "Writer" }];
	const names = visibleAuthors.map(authorName);

	return (
		<div className={Styles.byline} aria-label={`Written by ${names.join(" and ")}`}>
			<div className={Styles.avatars}>
				{visibleAuthors.map((author) => author.image ? (
					<Image key={author.id} src={author.image} width={38} height={38} alt="" className={Styles.avatar} />
				) : (
					<span key={author.id} className={Styles.emptyAvatar}><CgProfile /></span>
				))}
			</div>
			<div className={Styles.copy}>
				<span>{authors.length > 1 ? "Written by 2 authors" : "Written by"}</span>
				<strong>{names.join(" & ")}</strong>
			</div>
		</div>
	);
};

export default PostByline;
