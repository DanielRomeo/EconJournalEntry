import Image from "next/image";
import Styles from "./_styles/authorProfileCard.module.scss";

interface AuthorData {
	firstname?: string;
	lastname?: string;
	bio?: string;
	image?: string;
	type?: string;
	facebook?: string;
	instagram?: string;
	x?: string;
	linkedin?: string;
}

interface AuthorProfileCardProps {
	author?: AuthorData;
	title?: string;
	compact?: boolean;
}

const AuthorProfileCard = ({
	author,
	title = "About the author",
	compact = false,
}: AuthorProfileCardProps) => {
	const fullName = `${author?.firstname || "Guest"} ${author?.lastname || "Writer"}`.trim();

	return (
		<div className={`${Styles.card} ${compact ? Styles.compact : ""}`}>
			<Image
				src={author?.image || "/Dans Econ logo copy.png"}
				width={compact ? 56 : 84}
				height={compact ? 56 : 84}
				className={Styles.image}
				alt="Author profile image"
			/>
			<div>
				{!compact && <h5>{title}</h5>}
				<p className={Styles.name}>{fullName}</p>
				<p className={Styles.meta}>{author?.type || "Writer"}</p>
				{!compact && (
					<>
						<p className={Styles.bio}>
							{author?.bio || "This author has not added a profile bio yet."}
						</p>
						<div className={Styles.socialRow}>
							{author?.facebook && <a href={author.facebook} target="_blank" rel="noreferrer">Facebook</a>}
							{author?.instagram && <a href={author.instagram} target="_blank" rel="noreferrer">Instagram</a>}
							{author?.x && <a href={author.x} target="_blank" rel="noreferrer">X</a>}
							{author?.linkedin && <a href={author.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default AuthorProfileCard;
