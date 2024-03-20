"use client";
import { Row, Container, Col, Button, Tabs, Tab } from "react-bootstrap";
import Styles from "../_styles/Feed/FeedComponent.module.scss";
import { FaPen } from "react-icons/fa";
import PostComponent from "./postComponent";
import Link from "next/link";
import SideNavbar from "../_components/sideNavbar";
import TopNavbar from "../_components/topNavbar";
import { useEffect } from "react";
import { auth, db } from "../_components/firebaseConfig";
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth functions
import { collection, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions


const FeedComponent = () => {

	useEffect(()=>{
		
		onAuthStateChanged(auth, async (user: any) => {
			if (user) {
			// User is logged in
			const uid = user.uid;
			const email = user.email; // Include email if necessary
			console.log('Logged in user:', { uid, email });
		
			// Fetch additional user details from Firestore
			try {
				const userRef = doc(collection(db, 'users'), uid); // Create a document reference
				const userDocSnap = await getDoc(userRef); // Get the user document snapshot
				if (userDocSnap.exists()) {
				  const userData = userDocSnap.data();
				//   console.log('Complete user data:', userData);
		  
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
			<SideNavbar></SideNavbar>

			<Container className={`${Styles.navbarContainer}`}>
				<TopNavbar></TopNavbar>
			</Container>
			
			<Container className={`${Styles.mainContainer}`}>
				<Row className={`${Styles.headerRow}`}>
					<Col lg="8" md="8" sm="12">
						<h1>FEED</h1>
						<small>Explore different content youd love </small>
					</Col>

					<Col lg="4" md="4" sm="12">
						<Link href="/createpost">
							<Button className={`${Styles.postButton}`}>
								<FaPen /> Post a content
							</Button>
						</Link>
					</Col>
				</Row>

				<Row className={`${Styles.mainRow}`}>
					<Tabs
						defaultActiveKey="register"
						id="fill-tab-example"
						className={`${Styles.tabs} mb-3`}
						fill
					>
						<Tab
							className={`${Styles.tab}`}
							eventKey="Foryou"
							title="For you"
						>
							<PostComponent></PostComponent>
							<PostComponent></PostComponent>
						</Tab>
						<Tab
							className={`${Styles.tab}`}
							eventKey="Featured"
							title="Featured"
						>
							sdfsdfs
						</Tab>
						<Tab
							className={`${Styles.tab}`}
							eventKey="Recent"
							title="Recent"
						>
							re
						</Tab>
					</Tabs>
				</Row>
			</Container>
		</div>
	);
};

export default FeedComponent;
