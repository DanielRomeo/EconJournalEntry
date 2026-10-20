'use client'
import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TopNavbar from "../_components/topNavbar";
import Styles from '../_styles/Account/AccountPageComponent.module.scss'
import { onAuthStateChanged } from "firebase/auth";
import { doc } from "firebase/firestore";
import { auth, db } from "../_components/firebaseConfig";
import { collection, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import EditAccountModal from "./_EditAccountModal";
import WritingRhythm from "../_components/writingRhythm";

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
	const [posts, setPosts] = useState<any[]>([]);

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

	useEffect(()=>{
		const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
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
					if (String(userData.type || "").toLowerCase() === "writer") {
						const postsSnapshot = await getDocs(collection(db, "posts"));
						const authorPosts: any[] = [];
						postsSnapshot.forEach((postDoc) => {
							const post = { id: postDoc.id, ...postDoc.data() } as any;
							if (post.status !== "draft" && (post.author?.id === uid || post.coAuthorIds?.includes(uid))) authorPosts.push(post);
						});
						setPosts(authorPosts);
					}
				} else {
				  console.log('No user document found for this UID.');
				}
			  } catch (error) {
				console.error('Error fetching user data:', error);
			  } finally {
				setLoading(false);
			  }
			} else {
				setLoading(false);
			}
		});
		return unsubscribe;
	}, [])
	
	return (
		<div className={Styles.page}>
            {/* <SideNavbar></SideNavbar> */}
            <TopNavbar></TopNavbar>

			
			
			<Container className={Styles.container}>
				<div className={Styles.pageHeading}>
					<span>Account settings</span>
					<h1>Your profile</h1>
					<p>Keep your public identity and author details up to date.</p>
				</div>
				{
					loading ? <div className={Styles.loading}>Loading your profile…</div> :
					
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
										alt="Picture of the author that uses the platform to write journals."
									/>
								</div>
								: <CgProfile className={Styles.emptyAvatar} />
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

						{String(userData.type || "").toLowerCase() === "writer" && (
							<div className={Styles.writingRhythmRow}><WritingRhythm posts={posts} className={Styles.accountRhythm} /></div>
						)}

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
