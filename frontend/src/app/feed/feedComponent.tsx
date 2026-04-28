"use client";
import { Row, Container, Col, Tabs, Tab } from "react-bootstrap";
import Styles from "../_styles/Feed/FeedComponent.module.scss";
import PostComponent from "./postComponent";
import TopNavbar from "../_components/topNavbar";
import { useEffect, useState } from "react";
import { auth, db } from "../_components/firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth functions
import { collection, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const FeedComponent = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(()=>{
		
		onAuthStateChanged(auth, async (user: any) => {
			if (user) {
			// User is logged in
			const uid = user.uid;
			const email = user.email; // Include email if necessary
		
			// Fetch additional user details from Firestore
			try {
				const userRef = doc(collection(db, 'users'), uid); // Create a document reference
				const userDocSnap = await getDoc(userRef); // Get the user document snapshot
				if (userDocSnap.exists()) {
				  const userData = userDocSnap.data();
		  
				} else {
				  console.log('No user document found for this UID.');
				}
			  } catch (error) {
				console.error('Error fetching user data:', error);
			  }
			} else {
			// User is logged out
			console.log('No user is logged in.');
			}
		});
	}, [])

	return (
		<div className={Styles.mainDiv}>
			<TopNavbar searchTerm={searchTerm} onSearchChange={setSearchTerm}></TopNavbar>
			
			<Container className={`${Styles.mainContainer}`}>
				<Row className={`${Styles.headerRow}`}>
					<Col lg="12" md="12" sm="12">
						<h1>Discover. Learn. Share.</h1>
						<small>Stories from builders, readers, and curious minds.</small>
					</Col>
				</Row>

				<Row className={`${Styles.mainRow}`}>
					<Tabs
						defaultActiveKey="Foryou"
						id="fill-tab-example"
						className={`${Styles.tabs} mb-3`}
						fill
					>
						<Tab
							className={`${Styles.tab}`}
							eventKey="Foryou"
							title="For you"
						>
							<PostComponent searchTerm={searchTerm}></PostComponent>
						</Tab>
						<Tab
							className={`${Styles.tab}`}
							eventKey="Featured"
							title="Featured"
						>
							<PostComponent searchTerm={searchTerm}></PostComponent>
						</Tab>
					</Tabs>
				</Row>
			</Container>
		</div>
	);
};

export default FeedComponent;
