"use client";
import Image from "next/image";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import React, { useRef, useState } from "react";
import MarkdownEditor from "./markdownEditor";
import Styles from "../_styles/CreatePost/CreatePostComponent.module.scss";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../_components/firebaseConfig";
import SideNavbar from "../_components/sideNavbar";
import { uploadImageToCloudinary } from "../_components/cloudinaryUpload";

import { getUserDetails, UserDetails } from "../_components/fetchUserDetails";
import AlertDismissible from "../_components/dismissableAlert";
import { ensureUserProfileDoc } from "../_components/ensureUserProfileDoc";

interface Post {
	title: string;
	content: string;
	category: string;
	hashtagsInput: string;
}


// Main component
const CreatePostComponent = () => {
	const [post, setPost] = useState<Post>({
		title: "",
		content: "",
		category: "",
		hashtagsInput: "",
	});
	const [thumbnail, setThumbnail] = useState<File | null>(null);
	const [inlineImageUploading, setInlineImageUploading] = useState<boolean>(false);
	const [editorMode, setEditorMode] = useState<"raw" | "assisted">("raw");
	const [postStatusSuccess, setPostStatusSuccess] = useState<boolean>(false);
	const [postStatusError, setPostStatusError] = useState<boolean>(false);
	const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPost({ ...post, title: event.target.value });
	};
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPost({ ...post, content: event.target.value });
	};
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = event.target.files?.[0];
		if (file && file.type.startsWith("image/")) {
			setThumbnail(file);
		}
	};

	const handleInlineMarkdownImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file || !file.type.startsWith("image/")) {
			return;
		}

		try {
			setInlineImageUploading(true);
			const imageUrl = await uploadImageToCloudinary(file, "post-content");
			insertAtCursor(`\n\n![${file.name}](${imageUrl})\n\n`);
		} catch (error) {
			console.error("Failed to upload inline markdown image", error);
			setPostStatusError(true);
		} finally {
			setInlineImageUploading(false);
		}
	};

	const insertAtCursor = (text: string) => {
		const textarea = contentTextareaRef.current;
		if (!textarea) {
			setPost((prev) => ({ ...prev, content: `${prev.content}${text}` }));
			return;
		}

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const currentContent = post.content;
		const nextContent =
			currentContent.slice(0, start) + text + currentContent.slice(end);
		setPost((prev) => ({ ...prev, content: nextContent }));
	};

	const wrapSelection = (prefix: string, suffix = prefix, placeholder = "text") => {
		const textarea = contentTextareaRef.current;
		if (!textarea) {
			insertAtCursor(`${prefix}${placeholder}${suffix}`);
			return;
		}

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selected = post.content.slice(start, end) || placeholder;
		const wrapped = `${prefix}${selected}${suffix}`;
		const nextContent =
			post.content.slice(0, start) + wrapped + post.content.slice(end);
		setPost((prev) => ({ ...prev, content: nextContent }));
	};

	const addHeading = () => insertAtCursor("\n## Heading\n");
	const addBulletList = () => insertAtCursor("\n- Item 1\n- Item 2\n");
	const addNumberList = () => insertAtCursor("\n1. First\n2. Second\n");
	const addQuote = () => insertAtCursor("\n> Quote\n");
	const addCodeBlock = () => insertAtCursor("\n```ts\n// code\n```\n");
	const addLink = () => insertAtCursor("[link text](https://example.com)");

	
	// create post function:
	const createPost = async () => {
		try {
			if (auth.currentUser) {
				await ensureUserProfileDoc(auth.currentUser);
			}
			if (!thumbnail) {
				setPostStatusError(true);
				return;
			}

			const imageUrl = await uploadImageToCloudinary(thumbnail, "posts");

			// get the user details:
			let userDetails: UserDetails | null = await getUserDetails(auth);
			const fallbackEmail = auth.currentUser?.email || "";
			const fallbackName = fallbackEmail.split("@")[0] || "Guest Writer";
			const authorFirstname = userDetails?.firstname || fallbackName;
			const authorLastname = userDetails?.lastname || "";
			const hashtags = post.hashtagsInput
				.split(/[,\s]+/)
				.map((tag) => tag.trim().replace(/^#/, ""))
				.filter(Boolean)
				.map((tag) => tag.toLowerCase());
		
			// Create a new post in Firestore
			const postsCollectionRef =  await collection(db, "posts");
			await addDoc(postsCollectionRef, {
			  thumbnail: imageUrl,
			  title: post.title,
			  post: post.content,
			  category: post.category.trim(),
			  hashtags,
			  author: {
				name: `${authorFirstname} ${authorLastname}`.trim(),
				id: auth.currentUser?.uid || "",
				firstname: authorFirstname,
				lastname: authorLastname,
				email: userDetails?.email || fallbackEmail,
				type: userDetails?.type || "writer",
				bio: userDetails?.bio || "",
				image: userDetails?.image || "",
				facebook: userDetails?.facebook || "",
				instagram: userDetails?.instagram || "",
				x: userDetails?.x || "",
				linkedin: userDetails?.linkedin || ""
			  },
			  created: new Date().toDateString(),
			});
		
			setPostStatusSuccess(true)
		} catch (error: any) {
			console.error('Error creating post:', error);
			setPostStatusError(true);
			// Handle specific errors if needed
			// Legacy storage errors removed after moving to Cloudinary uploads.
		}

		
	}; // end of creat post function

	return (
		<div className={`${Styles.main}`}>
			<SideNavbar></SideNavbar>
			<Container className={`${Styles.container}`}>
				
				{
					postStatusSuccess=== true ? <AlertDismissible color="green" information="You have successfully created a post"></AlertDismissible> : <div></div>
				}
				{
					postStatusError === true ? <AlertDismissible color="red" information="There was an error when creating the post"></AlertDismissible> : <div></div>
				}

				<Row className={`${Styles.row1}`}>
					<Col className={`${Styles.col}`} lg="12" md="12" sm="12">
						<Button
							onClick={createPost}
							className={`${Styles.publishButton}`}
						>
							Publish
						</Button>
					</Col>
				</Row>

				<Row className={`${Styles.row2}`}>
					<Col className="" lg='12' sm='12' md='12'>

						<input type='file' onChange={handleInputChange}></input>

						<hr />
						{thumbnail ? <div><Image className={Styles.thumbnailPreview} src={URL.createObjectURL(thumbnail)} width={340} height={220} alt="Uploaded Image"></Image> <hr/></div> : <></> }
						
						
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Enter title of the Post</Form.Label>
							<input
								className={`form-control`}
								type="text"
								value={post.title}
								onChange={handleTitleChange}
								placeholder="Enter Post Title"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formCategory">
							<Form.Label>Category</Form.Label>
							<input
								className="form-control"
								type="text"
								value={post.category}
								onChange={(event) =>
									setPost({ ...post, category: event.target.value })
								}
								placeholder="e.g. finance, productivity, dev tools"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formHashtags">
							<Form.Label>Hashtags (comma or space separated)</Form.Label>
							<input
								className="form-control"
								type="text"
								value={post.hashtagsInput}
								onChange={(event) =>
									setPost({ ...post, hashtagsInput: event.target.value })
								}
								placeholder="#react #firebase #economics"
							/>
						</Form.Group>
						
						<br />

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Enter contents of the Post</Form.Label>
								<div className={Styles.editorTabs}>
									<Button
										type="button"
										onClick={() => setEditorMode("raw")}
										className={editorMode === "raw" ? Styles.activeTabButton : Styles.tabButton}
									>
										Raw Markdown
									</Button>
									<Button
										type="button"
										onClick={() => setEditorMode("assisted")}
										className={editorMode === "assisted" ? Styles.activeTabButton : Styles.tabButton}
									>
										Assisted Editor
									</Button>
								</div>
								{editorMode === "assisted" && (
									<div className={Styles.markdownToolbar}>
										<Button type="button" onClick={() => wrapSelection("**")} className={Styles.toolbarButton}><strong>B</strong></Button>
										<Button type="button" onClick={() => wrapSelection("*")} className={Styles.toolbarButton}><em>I</em></Button>
										<Button type="button" onClick={addHeading} className={Styles.toolbarButton}>H2</Button>
										<Button type="button" onClick={addBulletList} className={Styles.toolbarButton}>List</Button>
										<Button type="button" onClick={addNumberList} className={Styles.toolbarButton}>1.</Button>
										<Button type="button" onClick={addQuote} className={Styles.toolbarButton}>Quote</Button>
										<Button type="button" onClick={addCodeBlock} className={Styles.toolbarButton}>Code</Button>
										<Button type="button" onClick={addLink} className={Styles.toolbarButton}>Link</Button>
									</div>
								)}
								<div className={Styles.editorActions}>
									<label className={Styles.inlineImageButton}>
										{inlineImageUploading ? "Uploading image..." : "Add image to markdown"}
										<input
											type="file"
											accept="image/*"
											onChange={handleInlineMarkdownImageUpload}
										/>
									</label>
								</div>
								<textarea
									ref={contentTextareaRef}
									className={`form-control`}
									rows={10}
									placeholder="Enter your content in markdown"
									value={post.content} 
									onChange={handleChange} 
								/>
						</Form.Group>
						
					</Col>
					
				</Row>

				<hr />

				<Row className={`${Styles.row3}`}>
					<small>Your results will be displayed here...</small>
					{/* Render the edited markdown content */}
					<MarkdownEditor value={post.content} />
				</Row>
			</Container>
		</div>
	);
};

export default CreatePostComponent;
