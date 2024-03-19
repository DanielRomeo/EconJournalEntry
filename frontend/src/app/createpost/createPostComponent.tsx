"use client";
import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import MarkdownEditor from "./markdownEditor"; // Assuming the path is correct
import Styles from "../_styles/CreatePost/CreatePostComponent.module.scss";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, imageDb } from "../_components/firebaseConfig";
import SideNavbar from "../_components/sideNavbar";

import { v4 as uuidv4} from 'uuid'
import {ref, uploadBytes, getDownloadURL, getStorage} from 'firebase/storage'


interface Post {
	title: string;
	content: string;
}

const CreatePostComponent = () => {
	const [post, setPost] = useState<Post>({ title: "", content: "" });
	// const [thumbnail, setThumbnail] = useState<ArrayBuffer | Uint16Array | Blob | undefined>();
	const [thumbnail, setThumbnail] = useState<any>();
	const [downloadUrl, setDownloadUrl] = useState<any>()

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPost({ ...post, title: event.target.value });
	};

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPost({ ...post, content: event.target.value });
	};

	// create post function: also make use of the firestor collection function
	// we use our own reference name...
	const postsCollectionRef = collection(db, "posts");

	// create post function:
	const createPost = async () => {
		// Generate a unique filename using uuid
		//  const filename = `${uuidv4()}.${thumbnail.type.split("/")[1]}`;
		//  const imgRef = ref(imageDb, `files/${filename}`);
		const imageRef = ref(imageDb, `files/${uuidv4()}`);

   
		// Upload the thumbnail to Firebase Storage
		// const uploadTask = uploadBytes(imageRef, thumbnail);
		// console.log(uploadTask)

		// 'file' comes from the Blob or File API
		uploadBytes(imageRef, thumbnail).then( async (snapshot) => {
			console.log('Uploaded a blob or file!');
			console.log(snapshot)

			// get download url:
			await getDownloadURL(imageRef)
				.then((url: string) => {
				// Insert url into an <img> tag to "download"
				setDownloadUrl(url)
				console.log(url);
				})
				.catch((error: any) => {
				
					switch (error.code) {
						case 'storage/object-not-found':
						// File doesn't exist
						break;
						case 'storage/unauthorized':
						// User doesn't have permission to access the object
						break;
						case 'storage/canceled':
						// User canceled the upload
						break;

						// ...

						case 'storage/unknown':
						// Unknown error occurred, inspect the server response
						break;
					}
			});
		});


		// Get the download URL after successful upload
		// const snapshot: any = await uploadTask;
		// const downloadURL: any = await snapshot.ref.getDownloadURL();
   
		// Get the download URL
		



		await addDoc(postsCollectionRef, {
			// thumbnail: downloadURL,
			title: post.title,
			post: post.content,
			author: {
				name: auth.currentUser?.displayName,
				id: auth.currentUser?.uid,
			},
			created: new Date().toDateString(),
		});
	};

	return (
		<div className={`${Styles.main}`}>
			<SideNavbar></SideNavbar>
			<Container className={`${Styles.container}`}>
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
					{/* Display post title (replace with your logic) */}

					<input type='file' onChange={(e)=>{ setThumbnail(e.target.value[0]) } }></input>
					<img src={downloadUrl} alt="Image description" />
					{downloadUrl} && <img src={downloadUrl} alt="Uploaded Image" />

					{/* Title input field */}
					<input
						className={`form-control`}
						type="text"
						value={post.title}
						onChange={handleTitleChange}
						placeholder="Enter Post Title"
					/>
					
					{/* Textfield or textarea for markdown input */}
					<textarea className={`form-control`}
					placeholder="Enter your content in markdown"
					value={post.content} 
					onChange={handleChange} />
				</Row>

				<hr />

				<Row>
					<small>Your results will be displayed here...</small>
					{/* Render the edited markdown content */}
					<MarkdownEditor value={post.content} />
				</Row>
			</Container>
		</div>
	);
};

export default CreatePostComponent;
