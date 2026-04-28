'use client'
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../../_components/firebaseConfig";
import Image from "next/image";
import TopNavbar from "../../_components/topNavbar";
import Link from "next/link";
import Styles from "../../_styles/Profile/ProfilePage.module.scss";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { SlBookOpen } from "react-icons/sl";

interface ProfilePageProps {
	params: { userId: string }
}

const getReadTimeMinutes = (content: string) => {
	const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
};

const ProfilePage = ({ params }: ProfilePageProps) => {
	const [userData, setUserData] = useState<any>(null);
	const [posts, setPosts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const userRef = doc(db, 'users', params.userId);
				const userSnap = await getDoc(userRef);
				if (userSnap.exists()) {
					setUserData(userSnap.data());
				}

				// Fetch latest 3 posts by this author
				const postsRef = collection(db, 'posts');
				const snapshot = await getDocs(postsRef);
				const allPosts: any[] = [];
				snapshot.forEach(d => allPosts.push({ id: d.id, ...d.data() }));

				const authorPosts = allPosts
					.filter(p => p.author?.id === params.userId)
					.slice(0, 3);

				setPosts(authorPosts);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, []);

	return (
		<div>
			<TopNavbar />
			{loading ? (
				<Container><p className="mt-5">Loading profile...</p></Container>
			) : (
				<Container className={Styles.profileContainer}>
					{/* ── Profile header ────────────────────────────── */}
					<div className={Styles.profileHeader}>
						<div className={Styles.avatarWrap}>
							{userData?.image ? (
								<Image
									src={userData.image}
									width={120}
									height={120}
									className={Styles.avatar}
									alt="Profile"
								/>
							) : (
								<div className={Styles.avatarFallback}><CgProfile size={80} /></div>
							)}
						</div>

						<div className={Styles.profileInfo}>
							<h1>{userData?.firstname} {userData?.lastname}</h1>
							<p className={Styles.roleBadge}>{userData?.type || "Writer"}</p>
							<p className={Styles.bio}>{userData?.bio || "This author has not added a bio yet."}</p>

							{/* Social links */}
							<div className={Styles.socialRow}>
								{userData?.facebook && (
									<a href={userData.facebook} target="_blank" rel="noreferrer" className={`${Styles.socialBtn} ${Styles.fb}`}>
										<FaFacebookF />
									</a>
								)}
								{userData?.instagram && (
									<a href={userData.instagram} target="_blank" rel="noreferrer" className={`${Styles.socialBtn} ${Styles.ig}`}>
										<FaInstagram />
									</a>
								)}
								{userData?.x && (
									<a href={userData.x} target="_blank" rel="noreferrer" className={`${Styles.socialBtn} ${Styles.tw}`}>
										<FaXTwitter />
									</a>
								)}
								{userData?.linkedin && (
									<a href={userData.linkedin} target="_blank" rel="noreferrer" className={`${Styles.socialBtn} ${Styles.li}`}>
										<FaLinkedinIn />
									</a>
								)}
							</div>
						</div>
					</div>

					{/* ── Latest posts ──────────────────────────────── */}
					{posts.length > 0 && (
						<div className={Styles.postsSection}>
							<h2 className={Styles.sectionTitle}>Latest Articles</h2>
							<Row className="g-4">
								{posts.map((post) => (
									<Col key={post.id} lg={4} md={6} sm={12}>
										<Card className={Styles.postCard}>
											{post.thumbnail && (
												<img
													src={post.thumbnail}
													className={Styles.cardThumb}
													alt={post.title}
												/>
											)}
											<Card.Body>
												<Link href={`/post/${post.id}`} className={Styles.cardTitle}>
													{post.title}
												</Link>
												<p className={Styles.readMeta}>
													<SlBookOpen /> {getReadTimeMinutes(post.post)} min read · {post.created}
												</p>
												<p className={Styles.snippet}>
													{(post.post || "").replace(/[#_*`>\-\n]/g, " ").slice(0, 120)}...
												</p>
												<Link href={`/post/${post.id}`}>
													<Button className={Styles.readBtn}>Read More</Button>
												</Link>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</div>
					)}
				</Container>
			)}
		</div>
	);
};

export default ProfilePage;