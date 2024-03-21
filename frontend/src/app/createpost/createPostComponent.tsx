"use client";
import Image from "next/image";
import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import MarkdownEditor from "./markdownEditor";
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


// Main component
const CreatePostComponent = () => {
	const [post, setPost] = useState<Post>({ title: "", content: "" });
	const [thumbnail, setThumbnail] = useState<any>(''); // thumbnail state
	const [downloadUrl, setDownloadUrl] = useState<any>()

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPost({ ...post, title: event.target.value });
	};
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPost({ ...post, content: event.target.value });
	};
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = event.target.files?.[0]; // works
		console.log(file);

		if (file && file.type.startsWith('image/')) { // Ensure it's an image
			const reader = new FileReader();
			console.log("starts with image") // true

			reader.onload = (event) => {
				if (event.target && event.target.result) { // Check for existence and result
					const blob = new Blob([event.target.result], { type: file.type });
					// console.log(blob);
					setThumbnail(blob)
				  } else {
					// Handle the case where reading failed (optional)
				  }
			}
			// console.log(true);
			reader.readAsArrayBuffer(file);
		} else{
			console.log('File is not an image.');
		}

	}

	
	// create post function:
	const createPost = async () => {

		const imageRef = ref(imageDb, `files/${uuidv4()}`);

		// 'file' comes from the Blob or File API
		uploadBytes(imageRef, thumbnail).then( async (snapshot) => {
			console.log('Uploaded a blob or file!');
			console.log(snapshot)
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

						case 'storage/unknown':
						// Unknown error occurred, inspect the server response
						break;
					}
				}
			);
		});

		// create post function: also make use of the firestor collection function
		const postsCollectionRef = collection(db, "posts");
		await addDoc(postsCollectionRef, {
			title: post.title,
			post: post.content,
			author: {
				name: auth.currentUser?.displayName,
				id: auth.currentUser?.uid,
			},
			created: new Date().toDateString(),
		});
	}; // end of creat post function

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

					<input type='file' onChange={handleInputChange}></input>
					{/* <img src={downloadUrl} alt="Image description" /> */}

					<hr />
					{downloadUrl ? <Image src={downloadUrl} width={200} height={200} alt="Uploaded Image"></Image> : <>niks</> }
					<hr />
					

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
