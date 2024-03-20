'use client'
import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import SideNavbar from "../_components/sideNavbar";
import TopNavbar from "../_components/topNavbar";
import Styles from '../_styles/Profile/ProfileComponent.module.scss'
import { onAuthStateChanged } from "firebase/auth";
import { doc } from "firebase/firestore";
import { auth, db } from "../_components/firebaseConfig";
import { collection , getDoc} from "firebase/firestore";

interface StateType {
	firstname: string,
	lastname: string,
	email: string,
	type: string
}

const ProfilePageComponent = () => {

	const [userData, setUserdata] = useState<StateType>({
		firstname: '',
		lastname: '',
		email: '',
		type: ''
	})

	useEffect(()=>{
		onAuthStateChanged(auth, async (user: any) => {
			if (user) {
			// User is logged in
			const uid = user.uid;
			const email = user.email; // Include email if necessary
			try {
				const userRef = doc(collection(db, 'users'), uid); // Create a document reference
				const userDocSnap = await getDoc(userRef); // Get the user document snapshot
				if (userDocSnap.exists()) {
					const userData = userDocSnap.data();
					
					setUserdata({ 
						...userData, 
						firstname: userData.firstname  ,
						lastname: userData.lastname  ,
						email: userData.email  ,
						type: userData.type  
					});
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
		<div>
            {/* <SideNavbar></SideNavbar> */}
            <TopNavbar></TopNavbar>
			
			<Container className={Styles.container}>
				<Row>
					<Col lg='12' md='12' sm='12'>
						<h4>First name: <span>{userData.firstname}</span></h4>
						<h4>Last name: <span>{userData.lastname}</span> </h4>
						<h4>Email address: <span>{userData.email}</span></h4>
						<h4>Writer/Reader: <span>{userData.type}</span></h4>
					</Col>
				</Row>
			</Container>
           
		</div>
	);
};

export default ProfilePageComponent;
