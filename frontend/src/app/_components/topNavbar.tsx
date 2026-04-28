import {
	Navbar,
	Container,
	Nav,
	NavItem,
} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Styles from './_styles/topNavbar.module.scss'
import { CiSearch } from "react-icons/ci";

import SideNavbar from "./sideNavbar";

interface TopNavbarProps extends PropsWithChildren {
	searchTerm?: string;
	onSearchChange?: (value: string) => void;
}

const TopNavbar = ({ children, searchTerm = "", onSearchChange }: TopNavbarProps) => {


    const [height, setHeight] = useState<number>(0); // State to store calculated height

	const handleLoadComplete = (img: any) => {
		const newHeight =
			img.naturalHeight * (img.clientWidth / img.naturalWidth);
		setHeight(newHeight);
	};

	return (
		<Navbar className={`${Styles.navBar} navbar-expand-sm `}>
			<Container className={`${Styles.navbarContainer}`}>
				<Navbar.Brand className={`${Styles.navbarBrand}`}>
				<SideNavbar></SideNavbar>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse className={Styles.collapsedNavbar} id="basic-navbar-nav">
					<Nav className="mx-auto">
						
                        <div className="input-group mb-3">
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

					<Nav className={`${Styles.rightHandNav} "mr-auto"`}>
						<NavItem className={`${Styles.navLink}`}>
							<Link href="/signin">
                                <IoIosNotificationsOutline size={30} />
							</Link>
						</NavItem>

						<NavItem>
							<Link href="/account">
                            <Image
								className={`${Styles.image}`}
								src="/personSectionImage.png"
								width={50}
								height={50}
								onLoadingComplete={handleLoadComplete}
								alt="Picture of the author that uses the platform to write journals."
							/>
							</Link>
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default TopNavbar;
