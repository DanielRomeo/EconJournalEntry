import {
	Navbar,
	NavDropdown,
	Container,
	Nav,
	NavItem,
	Button,
} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
// import Styles from "../_styles/LandingPage/navbarComponent.module.scss";
import { PropsWithChildren, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Styles from './_styles/topNavbar.module.scss'
import { CiSearch } from "react-icons/ci";

const TopNavbar = ({children}: PropsWithChildren<{}>) => {

    const [height, setHeight] = useState<number>(0); // State to store calculated height

	const handleLoadComplete = (img: any) => {
		const newHeight =
			img.naturalHeight * (img.clientWidth / img.naturalWidth);
		setHeight(newHeight);

		
	};
	return (
		<Navbar className={`${Styles.navBar} `} expand="lg">
			<Container className={`${Styles.navbarContainer}`}>
				
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className={`input-group-text ${Styles.searchButtonInputSpan}`} id="basic-addon1"><CiSearch size={25}></CiSearch></span>
                            </div>
                            <input type="text" className={`${Styles.searchBox} form-control`}  aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
					</Nav>

					<Nav className="mr-auto">
						<NavItem className={`${Styles.navLink}`}>
							<Link href="/signin">
                                <IoIosNotificationsOutline size={30} />
							</Link>
						</NavItem>

						<NavItem>
							<Link href="/signin">
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
