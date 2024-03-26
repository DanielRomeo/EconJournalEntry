'use client'
import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TopNavbar from "../_components/topNavbar";
import Styles from '../_styles/Account/AccountPageComponent.module.scss'
import { onAuthStateChanged } from "firebase/auth";
import { doc } from "firebase/firestore";
import { auth, db } from "../_components/firebaseConfig";
import { collection , getDoc} from "firebase/firestore";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import EditAccountModal from "./_EditAccountModal";

interface StateType {
	thumbnail?: string,
	firstname: string,
	lastname: string,
	email: string,
	type: string
}

const ProfilePageComponent = () => {
	const [editModalShow, setEditModalShow] = useState<boolean>(false);

	const [userData, setUserdata] = useState<StateType>({
		thumbnail: '',
		firstname: '',
		lastname: '',
		email: '',
		type: ''
	})

	const [height, setHeight] = useState<number>(0); // State to store calculated height

	const handleLoadComplete = (img: any) => {
		const newHeight =
			img.naturalHeight * (img.clientWidth / img.naturalWidth);
		setHeight(newHeight);
	};

	

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
				<Row className={Styles.imageRow}>
					<Col lg='12' md='12' sm='12'>
					{
						userData.thumbnail && userData.thumbnail.length > 0 ? 
						<div>
							<Image
								className={`${Styles.image}`}
								src={userData.thumbnail}
								width={250}
								height={250}
								onLoadingComplete={handleLoadComplete}
								alt="Picture of the author that uses the platform to write journals."
							/>
						</div>
						: <CgProfile size={150} />
					}
						
					</Col>
				</Row>

				<Row className={Styles.userInfoRow}>
					<Col lg='12' md='12' sm='12'>
						<h4>First name: <span>{userData.firstname}</span></h4>
						<h4>Last name: <span>{userData.lastname}</span> </h4>
						<h4>Email address: <span>{userData.email}</span></h4>
						<h4>Writer/Reader: <span>{userData.type}</span></h4>
					</Col>
				</Row>

				<Row className={Styles.editAccountRow}>
					<Col lg='12' md='12' sm='12'>
						<Button onClick={() => setEditModalShow(true)} className={Styles.editAccountButton}>Edit Account</Button>
					</Col>
				</Row>

				<Row className={Styles.deleteAccountRow}>
					<Col lg='12' md='12' sm='12'>
						<Button className={Styles.deleteAccountButton}>Delete Account</Button>
					</Col>
				</Row>
				
			</Container>
           
			<EditAccountModal 
			show={editModalShow}
        	onHide={() => setEditModalShow(false)}></EditAccountModal>
		</div>
	);
};

export default ProfilePageComponent;
