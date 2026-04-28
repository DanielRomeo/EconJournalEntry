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
	image?: string,
	firstname: string,
	lastname: string,
	email: string,
	type: string,
	bio: string,
	facebook: string,
	instagram: string,
	x: string,
	linkedin: string
}

const ProfilePageComponent = () => {
	const [editModalShow, setEditModalShow] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const [userData, setUserdata] = useState<StateType>({
		image: '',
		firstname: '',
		lastname: '',
		email: '',
		type: '',
		bio: '',
		facebook: '',
		instagram: '',
		x: '',
		linkedin: ''
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
						type: userData.type,
						bio: userData.bio || "",
						facebook: userData.facebook || "",
						instagram: userData.instagram || "",
						x: userData.x || "",
						linkedin: userData.linkedin || ""
					});
					setLoading(false);
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
				{
					loading ? <>Loading ...</> : 
					
					<>
						<Row className={Styles.imageRow}>
							<Col lg='12' md='12' sm='12'>
							{
								userData.image && userData.image.length > 0 ? 
								<div>
									<Image
										className={`${Styles.image}`}
										src={userData.image}
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
								<h4>Bio: <span>{userData.bio || "No bio yet."}</span></h4>
								<h4>Facebook: <span>{userData.facebook || "-"}</span></h4>
								<h4>Instagram: <span>{userData.instagram || "-"}</span></h4>
								<h4>X: <span>{userData.x || "-"}</span></h4>
								<h4>LinkedIn: <span>{userData.linkedin || "-"}</span></h4>
							</Col>
						</Row>

						<Row className={Styles.editAccountRow}>
							<Col lg='12' md='12' sm='12'>
								<Button onClick={() => setEditModalShow(true)} className={Styles.editAccountButton}>Edit Account</Button>
							</Col>
						</Row>

						{/* <Row className={Styles.deleteAccountRow}>
							<Col lg='12' md='12' sm='12'>
								<Button className={Styles.deleteAccountButton}>Delete Account</Button>
							</Col>
						</Row> */}
					</>
				}

				
				
			</Container>
			{
				loading ? <></> : 
				<>
					<EditAccountModal 
					show={editModalShow}
					onHide={() => setEditModalShow(false)}
					userdata={userData ? userData : ''}
					></EditAccountModal>
				</>
			}
			
			
		</div>
	);
};

export default ProfilePageComponent;
