"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../_components/firebaseConfig";
import { getUserDetails } from "../_components/fetchUserDetails";
import { uploadImageToCloudinary } from "../_components/cloudinaryUpload";
import { PostAuthor, authorName } from "../_components/postAuthors";
import SideNavbar from "../_components/sideNavbar";
import MarkdownEditor from "./markdownEditor";
import Styles from "../_styles/CreatePost/CreatePostComponent.module.scss";

type PostForm = { title: string; content: string; category: string; hashtagsInput: string };

const CollaborativePostEditor = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const draftId = searchParams.get("draft");
	const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [post, setPost] = useState<PostForm>({ title: "", content: "", category: "", hashtagsInput: "" });
	const [primaryAuthor, setPrimaryAuthor] = useState<PostAuthor | null>(null);
	const [coAuthors, setCoAuthors] = useState<PostAuthor[]>([]);
	const [coAuthorEmail, setCoAuthorEmail] = useState("");
	const [thumbnail, setThumbnail] = useState<File | null>(null);
	const [thumbnailUrl, setThumbnailUrl] = useState("");
	const [created, setCreated] = useState("");
	const [editorMode, setEditorMode] = useState<"raw" | "assisted">("raw");
	const [inlineImageUploading, setInlineImageUploading] = useState(false);
	const [loading, setLoading] = useState(Boolean(draftId));
	const [saving, setSaving] = useState(false);
	const [isOwner, setIsOwner] = useState(true);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	useEffect(() => onAuthStateChanged(auth, async (user) => {
		if (!user) {
			router.push("/signin");
			return;
		}

		if (!draftId) {
			const details = await getUserDetails(auth);
			setPrimaryAuthor({
				id: user.uid,
				name: `${details?.firstname || ""} ${details?.lastname || ""}`.trim(),
				firstname: details?.firstname || "",
				lastname: details?.lastname || "",
				email: details?.email || user.email || "",
				type: details?.type || "writer",
				bio: details?.bio || "",
				image: details?.image || "",
				facebook: details?.facebook || "",
				instagram: details?.instagram || "",
				x: details?.x || "",
				linkedin: details?.linkedin || "",
			});
			setLoading(false);
			return;
		}

		try {
			const snapshot = await getDoc(doc(db, "drafts", draftId));
			if (!snapshot.exists()) throw new Error("Draft not found.");
			const data = snapshot.data();
			const ownerId = data.ownerId || data.author?.id;
			const collaboratorIds = Array.isArray(data.coAuthorIds) ? data.coAuthorIds : [];
			const owner = ownerId === user.uid;
			if (!owner && !collaboratorIds.includes(user.uid)) throw new Error("You do not have access to this draft.");
			setIsOwner(owner);
			setPrimaryAuthor(data.author || null);
			setCoAuthors(Array.isArray(data.coAuthors) ? data.coAuthors : []);
			setPost({
				title: data.title || "",
				content: data.post || "",
				category: data.category || "",
				hashtagsInput: Array.isArray(data.hashtags) ? data.hashtags.map((tag: string) => `#${tag}`).join(" ") : "",
			});
			setThumbnailUrl(data.thumbnail || "");
			setCreated(data.created || "");
		} catch (loadError: any) {
			setError(loadError.message || "Unable to load this draft.");
		} finally {
			setLoading(false);
		}
	}), [draftId, router]);

	const addCoAuthor = async () => {
		setError("");
		if (!isOwner || !auth.currentUser) return;
		const email = coAuthorEmail.trim();
		if (!email) return;
		try {
			const result = await getDocs(query(collection(db, "users"), where("email", "==", email), limit(1)));
			if (result.empty) throw new Error("No Journal Entry account was found for that email.");
			const userDoc = result.docs[0];
			if (userDoc.id === auth.currentUser.uid) throw new Error("You are already the main author.");
			if (coAuthors.some((author) => author.id === userDoc.id)) throw new Error("That person is already a co-author.");
			const data = userDoc.data();
			setCoAuthors([{
				id: userDoc.id,
				name: `${data.firstname || ""} ${data.lastname || ""}`.trim(),
				firstname: data.firstname || "",
				lastname: data.lastname || "",
				email: data.email || email,
				type: data.type || "writer",
				bio: data.bio || "",
				image: data.image || data.thumbnail || "",
				facebook: data.facebook || "",
				instagram: data.instagram || "",
				x: data.x || "",
				linkedin: data.linkedin || "",
			}]);
			setCoAuthorEmail("");
		} catch (lookupError: any) {
			setError(lookupError.message || "Unable to add that co-author.");
		}
	};

	const buildPayload = async (status: "draft" | "published") => {
		if (!primaryAuthor || !auth.currentUser) throw new Error("Your author profile is not ready.");
		let imageUrl = thumbnailUrl;
		if (thumbnail) imageUrl = await uploadImageToCloudinary(thumbnail, "posts");
		if (status === "published" && !imageUrl) throw new Error("Add a cover image before publishing.");
		if (!post.title.trim()) throw new Error("Add a title before saving.");
		const hashtags = post.hashtagsInput.split(/[,\s]+/).map((tag) => tag.trim().replace(/^#/, "").toLowerCase()).filter(Boolean);
		return {
			title: post.title.trim(), post: post.content, category: post.category.trim(), hashtags,
			thumbnail: imageUrl, author: primaryAuthor, ownerId: primaryAuthor.id,
			coAuthors, coAuthorIds: coAuthors.map((author) => author.id), status,
			created: created || new Date().toISOString(), updated: new Date().toISOString(),
			...(status === "published" ? { publishedAt: new Date().toISOString() } : {}),
		};
	};

	const save = async (status: "draft" | "published") => {
		setMessage(""); setError("");
		if (status === "published" && !isOwner) { setError("Only the main author can publish this post."); return; }
		try {
			setSaving(true);
			const payload = await buildPayload(status);
			if (draftId) {
				if (status === "draft") {
					await updateDoc(doc(db, "drafts", draftId), payload);
					setMessage("Draft saved.");
				} else {
					const reference = await addDoc(collection(db, "posts"), payload);
					await deleteDoc(doc(db, "drafts", draftId));
					router.push(`/post/${reference.id}`);
				}
			} else {
				const reference = await addDoc(collection(db, status === "draft" ? "drafts" : "posts"), payload);
				if (status === "draft") router.replace(`/createpost?draft=${reference.id}`);
				else router.push(`/post/${reference.id}`);
			}
		} catch (saveError: any) {
			setError(saveError.message || "The post could not be saved.");
		} finally {
			setSaving(false);
		}
	};

	const removeDraft = async () => {
		if (!draftId || !isOwner || !window.confirm("Delete this draft? This cannot be undone.")) return;
		try { await deleteDoc(doc(db, "drafts", draftId)); router.push("/drafts"); }
		catch { setError("The draft could not be deleted."); }
	};

	const insertAtCursor = (text: string) => {
		const textarea = contentTextareaRef.current;
		if (!textarea) { setPost((current) => ({ ...current, content: current.content + text })); return; }
		const start = textarea.selectionStart; const end = textarea.selectionEnd;
		setPost((current) => ({ ...current, content: current.content.slice(0, start) + text + current.content.slice(end) }));
	};
	const wrapSelection = (prefix: string, suffix = prefix, placeholder = "text") => {
		const textarea = contentTextareaRef.current;
		if (!textarea) { insertAtCursor(`${prefix}${placeholder}${suffix}`); return; }
		const start = textarea.selectionStart; const end = textarea.selectionEnd;
		const selected = post.content.slice(start, end) || placeholder;
		setPost((current) => ({ ...current, content: current.content.slice(0, start) + prefix + selected + suffix + current.content.slice(end) }));
	};
	const uploadInlineImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]; if (!file) return;
		try { setInlineImageUploading(true); insertAtCursor(`\n\n![${file.name}](${await uploadImageToCloudinary(file, "post-content")})\n\n`); }
		catch { setError("The inline image could not be uploaded."); }
		finally { setInlineImageUploading(false); }
	};

	if (loading) return <Container className={Styles.loadingState}>Loading draft…</Container>;

	return (
		<div className={Styles.main}>
			<SideNavbar />
			<Container className={Styles.container}>
				<div className={Styles.editorHeader}>
					<div><span>{draftId ? "Collaborative draft" : "New article"}</span><h1>{draftId ? "Continue writing" : "Create a post"}</h1></div>
					<div className={Styles.headerActions}>
						{draftId && isOwner && <Button type="button" className={Styles.deleteButton} onClick={removeDraft}>Delete</Button>}
						<Button type="button" className={Styles.draftButton} disabled={saving} onClick={() => save("draft")}>Save draft</Button>
						{isOwner && <Button type="button" className={Styles.publishButton} disabled={saving} onClick={() => save("published")}>Publish</Button>}
					</div>
				</div>
				{!isOwner && <div className={Styles.permissionNote}>You are editing as a co-author. You can save changes to this draft; only {authorName(primaryAuthor || undefined)} can publish or delete it.</div>}
				{message && <div className={Styles.successMessage}>{message}</div>}
				{error && <div className={Styles.errorMessage}>{error}</div>}

				<Row><Col lg="12">
					<section className={Styles.coAuthorPanel}>
						<div><h2>Authors</h2><p>Add one co-author using the email on their Journal Entry account.</p></div>
					<div className={Styles.authorChips}>
						{primaryAuthor && <span><strong>{authorName(primaryAuthor)}</strong><small>Main author</small></span>}
						{coAuthors.map((author) => <span key={author.id}><strong>{authorName(author)}</strong><small>Co-author</small>{isOwner && <button type="button" onClick={() => setCoAuthors([])} aria-label="Remove co-author">×</button>}</span>)}
					</div>
					{isOwner && coAuthors.length === 0 && <div className={Styles.coAuthorInput}><input className="form-control" type="email" value={coAuthorEmail} onChange={(event) => setCoAuthorEmail(event.target.value)} placeholder="coauthor@example.com" /><Button type="button" onClick={addCoAuthor}>Add co-author</Button></div>}
					</section>

					<Form.Group className="mb-4"><Form.Label>Cover image</Form.Label><input className="form-control" type="file" accept="image/*" onChange={(event) => setThumbnail(event.target.files?.[0] || null)} /></Form.Group>
					{(thumbnail || thumbnailUrl) && <Image className={Styles.thumbnailPreview} src={thumbnail ? URL.createObjectURL(thumbnail) : thumbnailUrl} width={420} height={240} alt="Post cover preview" />}
					<Form.Group className="mb-3"><Form.Label>Title</Form.Label><input className="form-control" value={post.title} onChange={(event) => setPost({ ...post, title: event.target.value })} placeholder="A clear, specific title" /></Form.Group>
					<Form.Group className="mb-3"><Form.Label>Category</Form.Label><input className="form-control" value={post.category} onChange={(event) => setPost({ ...post, category: event.target.value })} placeholder="e.g. finance, technology, culture" /></Form.Group>
					<Form.Group className="mb-4"><Form.Label>Hashtags</Form.Label><input className="form-control" value={post.hashtagsInput} onChange={(event) => setPost({ ...post, hashtagsInput: event.target.value })} placeholder="#economics #research" /></Form.Group>

					<Form.Group><Form.Label>Article</Form.Label>
						<div className={Styles.editorTabs}><Button type="button" onClick={() => setEditorMode("raw")} className={editorMode === "raw" ? Styles.activeTabButton : Styles.tabButton}>Raw Markdown</Button><Button type="button" onClick={() => setEditorMode("assisted")} className={editorMode === "assisted" ? Styles.activeTabButton : Styles.tabButton}>Assisted Editor</Button></div>
						{editorMode === "assisted" && <div className={Styles.markdownToolbar}><Button type="button" onClick={() => wrapSelection("**")} className={Styles.toolbarButton}><strong>B</strong></Button><Button type="button" onClick={() => wrapSelection("*")} className={Styles.toolbarButton}><em>I</em></Button><Button type="button" onClick={() => insertAtCursor("\n## Heading\n")} className={Styles.toolbarButton}>H2</Button><Button type="button" onClick={() => insertAtCursor("\n- Item 1\n- Item 2\n")} className={Styles.toolbarButton}>List</Button><Button type="button" onClick={() => insertAtCursor("\n> Quote\n")} className={Styles.toolbarButton}>Quote</Button><Button type="button" onClick={() => insertAtCursor("[link text](https://example.com)")} className={Styles.toolbarButton}>Link</Button></div>}
						<div className={Styles.editorActions}><label className={Styles.inlineImageButton}>{inlineImageUploading ? "Uploading…" : "Add image"}<input type="file" accept="image/*" onChange={uploadInlineImage} /></label></div>
						<textarea ref={contentTextareaRef} className="form-control" rows={14} value={post.content} onChange={(event) => setPost({ ...post, content: event.target.value })} placeholder="Write in Markdown…" />
					</Form.Group>
					<hr /><div className={Styles.preview}><small>Preview</small><MarkdownEditor value={post.content} /></div>
				</Col></Row>
			</Container>
		</div>
	);
};

export default CollaborativePostEditor;
