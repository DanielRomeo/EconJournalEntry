"use client";

import {
	Navbar,
	Container,
	Nav,
} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Styles from './_styles/topNavbar.module.scss'
import { CiSearch } from "react-icons/ci";

import SideNavbar from "./sideNavbar";
import ThemeToggle from "./themeToggle";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { CgProfile } from "react-icons/cg";

interface TopNavbarProps extends PropsWithChildren {
	searchTerm?: string;
	onSearchChange?: (value: string) => void;
}

const TopNavbar = ({ children, searchTerm = "", onSearchChange }: TopNavbarProps) => {
	const [profileImage, setProfileImage] = useState("");

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setProfileImage("");
				return;
			}
			try {
				const snapshot = await getDoc(doc(db, "users", user.uid));
				setProfileImage(snapshot.exists() ? snapshot.data().image || "" : "");
			} catch (error) {
				console.error("Unable to load the navigation profile image", error);
				setProfileImage("");
			}
		});
		return unsubscribe;
	}, []);

	return (
		<Navbar className={`${Styles.navBar} navbar-expand-md`} expand="md">
			<Container className={`${Styles.navbarContainer}`}>
				<div className={Styles.brandGroup}>
				<SideNavbar></SideNavbar>
					<Link href="/feed" className={Styles.wordmark} aria-label="Journal Entry home">
						<span className={Styles.brandMark}>JE</span>
						<span>Journal Entry</span>
					</Link>
				</div>
				<Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Open search and account actions">
					<CiSearch size={22} />
				</Navbar.Toggle>
				<Navbar.Collapse className={Styles.collapsedNavbar} id="basic-navbar-nav">
					<Nav className={Styles.searchNav}>
						<div className={`input-group ${Styles.searchGroup}`}>
                            <div className="input-group-prepend">
                                <span className={`input-group-text ${Styles.searchButtonInputSpan}`} id="basic-addon1"><CiSearch size={25}></CiSearch></span>
                            </div>
                            <input
								type="text"
								value={searchTerm}
								onChange={(event) => onSearchChange?.(event.target.value)}
								className={`${Styles.searchBox} form-control`}
								placeholder="Search posts, #hashtags, categories"
								aria-label="Search posts"
								aria-describedby="basic-addon1"
							/>
                        </div>
					</Nav>

					<Nav className={Styles.rightHandNav}>
						<Link className={Styles.writeLink} href="/createpost"><HiOutlinePencilSquare /> Write</Link>
						<ThemeToggle />
						<Link className={Styles.navLink} href="/signin" aria-label="Notifications">
							<IoIosNotificationsOutline size={25} />
						</Link>
						<Link href="/account" className={Styles.profileLink} aria-label="Open account">
							{profileImage ? (
								<Image className={Styles.image} src={profileImage} width={40} height={40} alt="Your profile" />
							) : (
								<span className={Styles.emptyAvatar}><CgProfile /></span>
							)}
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default TopNavbar;
