"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Container } from "react-bootstrap";
import { auth, db } from "../_components/firebaseConfig";
import { getPostAuthors, PostAuthor } from "../_components/postAuthors";
import PostByline from "../_components/postByline";
import SideNavbar from "../_components/sideNavbar";
import TopNavbar from "../_components/topNavbar";
import Styles from "../_styles/DraftsPage.module.scss";

type Draft = { id: string; title?: string; updated?: string; author?: PostAuthor; coAuthors?: PostAuthor[]; coAuthorIds?: string[]; ownerId?: string; status?: string };

export default function DraftsPage() {
	const router = useRouter();
	const [drafts, setDrafts] = useState<Draft[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => onAuthStateChanged(auth, async (user) => {
		if (!user) { router.push("/signin"); return; }
		try {
			const [owned, shared] = await Promise.all([
				getDocs(query(collection(db, "drafts"), where("ownerId", "==", user.uid))),
				getDocs(query(collection(db, "drafts"), where("coAuthorIds", "array-contains", user.uid))),
			]);
			const merged = [...owned.docs, ...shared.docs];
			const available = merged.map((item) => ({ id: item.id, ...item.data() } as Draft))
				.filter((draft, index, all) => all.findIndex((item) => item.id === draft.id) === index)
				.sort((a, b) => Date.parse(b.updated || "") - Date.parse(a.updated || ""));
			setDrafts(available);
		} finally { setLoading(false); }
	}), [router]);

	return (
		<div className={Styles.page}>
			<TopNavbar /><SideNavbar />
			<Container className={Styles.container}>
				<header><span>Workspace</span><h1>Your drafts</h1><p>Continue your own drafts or articles where you have been invited as a co-author.</p></header>
				{loading ? <div className={Styles.empty}>Loading drafts…</div> : drafts.length ? (
					<div className={Styles.grid}>{drafts.map((draft) => (
						<Link key={draft.id} href={`/createpost?draft=${draft.id}`} className={Styles.card}>
							<PostByline authors={getPostAuthors(draft)} />
							<h2>{draft.title || "Untitled draft"}</h2>
							<div><span>{(draft.ownerId || draft.author?.id) === auth.currentUser?.uid ? "Main author" : "Co-author"}</span><span>{draft.updated ? `Updated ${new Date(draft.updated).toLocaleDateString("en-ZA")}` : "Draft"}</span></div>
						</Link>
					))}</div>
				) : <div className={Styles.empty}><h2>No drafts yet</h2><p>Save a post as a draft and it will appear here for every invited author.</p><Link href="/createpost">Start a new post</Link></div>}
			</Container>
		</div>
	);
}
