"use client";
import Image from "next/image";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import MarkdownEditor from "./markdownEditor";
import Styles from "../_styles/CreatePost/CreatePostComponent.module.scss";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, imageDb } from "../_components/firebaseConfig";
import SideNavbar from "../_components/sideNavbar";
import { v4 as uuidv4} from 'uuid'
import {ref, uploadBytes, getDownloadURL, getStorage} from 'firebase/storage'

import { getUserDetails, UserDetails } from "../_components/fetchUserDetails";
import AlertDismissible from "../_components/dismissableAlert";

interface Post {
	title: string;
	content: string;
}


// Main component
const CreatePostComponent = () => {
	const [post, setPost] = useState<Post>({ title: "", content: "" });
	const [thumbnail, setThumbnail] = useState<any>(); // thumbnail state
	const [downloadUrl, setDownloadUrl] = useState<any>()
	const [height, setHeight] = useState<number>(0); // State to store calculated height
	const [postStatusSuccess, setPostStatusSuccess] = useState<boolean>(false);
	const [postStatusError, setPostStatusError] = useState<boolean>(false);

	const handleLoadCompleteImage = (event: React.SyntheticEvent<HTMLImageElement>, thumbnail: Blob) => {
		const img = event.target as HTMLImageElement;
		const newHeight = img.naturalHeight * (img.width / img.naturalWidth);
		setHeight(newHeight); // Assuming setHeight is a state setter function
	  };
	
	  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
		  setThumbnail(file);
		}
	  };

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
		try {
			const imageRef = ref(imageDb, `files/${uuidv4()}`);

			if(thumbnail === undefined){
				setPostStatusError(true);
				return;
			}
		
			// Upload the thumbnail to storage
			const uploadTaskSnapshot = await uploadBytes(imageRef, thumbnail);
			console.log('Uploaded a blob or file:', uploadTaskSnapshot);
		
			// Get the download URL of the uploaded image
			const imageUrl = await getDownloadURL(imageRef);
			console.log('Image download URL:', imageUrl);

			// get the user details:
			let userDetails: UserDetails | null = await getUserDetails(auth);
		
			// Create a new post in Firestore
			const postsCollectionRef =  await collection(db, "posts");
			await addDoc(postsCollectionRef, {
			  thumbnail: imageUrl,
			  title: post.title,
			  post: post.content,
			  author: {
				name: auth.currentUser?.email,
				id: auth.currentUser?.uid,
				firstname: userDetails?.firstname,
				lastname: userDetails?.lastname,
				email: userDetails?.email,
				type: userDetails?.type
			  },
			  created: new Date().toDateString(),
			});
		
			setPostStatusSuccess(true)
		} catch (error: any) {
			console.error('Error creating post:', error);
			setPostStatusError(true);
			// Handle specific errors if needed
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
				default:
				// Handle other errors
				break;
			}
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
						{thumbnail ? <div><Image src={URL.createObjectURL(thumbnail)} onLoad={(event:any) => handleLoadCompleteImage(event, thumbnail)}  width={200} height={height} alt="Uploaded Image"></Image> <hr/></div> : <></> }
						
						
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
						
						<br />

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Enter contents of the Post</Form.Label>
								<textarea className={`form-control`}
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
