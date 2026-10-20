import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

// icons:
import { IoPersonOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgFeed } from "react-icons/cg";
import { IoBookmarksOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { FaRegEnvelopeOpen } from "react-icons/fa6";
import { MdInsertChartOutlined } from "react-icons/md";
import { GrLineChart } from "react-icons/gr";
import { FaPen } from "react-icons/fa";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";

// firebase:
import { signOut } from 'firebase/auth'; // Import Firebase Auth functions
import { auth } from "./firebaseConfig";
import { useRouter } from "next/navigation";

import  { forwardRef, useImperativeHandle } from "react";

// styles:
import Styles from "./_styles/sideNavbar.module.scss";

const SideNavbar = forwardRef((props, ref) => {
	const router = useRouter();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const handleLinkClick = (urlname: string) =>{
		router.push(`/${urlname}`);
	}

	// logout function:
	const handleLogout =  async () =>{
		try {
			await signOut(auth);
			router.push('/signin');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	}

	const toggleDrawer = (anchor: any, open: any) => (event: any) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor: any) => (
		<Box
			sx={{
				width: anchor === "top" || anchor === "bottom" ? "auto" : 288,
			}}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List className={`${Styles.list}`}>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemText
							className={`${Styles.chatter}`}
							primary={"Journal Entry"}
						/>
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton>
						<ListItemText className={Styles.sectionLabel} primary={"Navigation"} />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={()=>{handleLinkClick('feed')}}>
						<CgFeed></CgFeed>
						<ListItemText primary={"Feed"} />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={()=>{handleLinkClick('createpost')}}>
						<FaPen></FaPen>
						<ListItemText primary={"Create Post"} />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={()=>{handleLinkClick('drafts')}}>
						<HiOutlineDocumentDuplicate />
						<ListItemText primary={"Drafts"} />
					</ListItemButton>
				</ListItem>
				{/* <ListItem disablePadding>
					<ListItemButton onClick={handleLogout} className={Styles.logoutItem}>
						&emsp;&emsp;&emsp;
						<IoBookmarksOutline></IoBookmarksOutline>
						&nbsp;&nbsp;
						<ListItemText primary={"Bookmarks"} />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						&emsp;&emsp;&emsp;
						<AiOutlineTeam></AiOutlineTeam>
						&nbsp;&nbsp;
						<ListItemText primary={"Team blogs"} />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						&emsp;&emsp;&emsp;
						<FaRegEnvelopeOpen></FaRegEnvelopeOpen>
						&nbsp;&nbsp;
						<ListItemText primary={"Drafts"} />
					</ListItemButton>
				</ListItem> */}


				{/* <ListItem disablePadding>
					<ListItemButton>
						&emsp;&emsp;&emsp;
						<MdInsertChartOutlined></MdInsertChartOutlined>
						&nbsp;&nbsp;
						<ListItemText primary={"Analytics"} />
					</ListItemButton>
				</ListItem>

				<Divider /> */}


				{/* <ListItem disablePadding>
					<ListItemButton>
						&emsp;&emsp;
						<ListItemText
							className={`${Styles.trendingItem}`}
							primary={"Trending Tags"}
						/>
						&nbsp;&nbsp;
						<GrLineChart></GrLineChart>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						&emsp;&emsp; &emsp;
						<ListItemText primary={"Programming"} />
					</ListItemButton>
				</ListItem> */}
				<Divider />
				{/* <ListItem disablePadding>
					<ListItemButton>
						&emsp;
						<ListItemText
							className={`${Styles.personalItem}`}
							primary={"Personal"}
						/>
					</ListItemButton>
				</ListItem> */}

				<ListItem disablePadding>
					<ListItemButton onClick={()=>{handleLinkClick('account')}}>
						<IoPersonOutline></IoPersonOutline>
						<ListItemText primary={"Account"} />
					</ListItemButton>
				</ListItem>

				{/* <ListItem disablePadding>
					<ListItemButton>
						&emsp;&emsp;&emsp;
						<IoIosNotificationsOutline></IoIosNotificationsOutline>
						&nbsp;&nbsp;
						<ListItemText primary={"Notifications"} />
					</ListItemButton>
				</ListItem> */}
				<Divider />

				<ListItem disablePadding>
					<ListItemButton>
						{/* <Link> */}
							<ListItemText
								className={`${Styles.logoutbutton}`}
								primary={"Logout"}
							/>
						{/* </Link> */}
						
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<div className={`${Styles.navbar}`}>
			
			<IconButton className={Styles.menuButton} onClick={toggleDrawer("left", true)} aria-label="Open navigation menu">
				<MenuIcon className={Styles.menuIcon} />
			</IconButton>

			<Drawer
				className={Styles.drawer}
				anchor={"left"}
				open={state["left"]}
				onClose={toggleDrawer("left", false)}
				PaperProps={{ className: Styles.drawerPaper }}
			>
				{list("left")}
			</Drawer>
		</div>
	);
});

SideNavbar.displayName = "SideNavbar";

export default SideNavbar;
