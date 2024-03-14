import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

// icons:
import { IoPersonOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgFeed } from "react-icons/cg";
import { IoBookmarksOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { FaRegEnvelopeOpen } from "react-icons/fa6";
import { MdInsertChartOutlined } from "react-icons/md";
import { GrLineChart } from "react-icons/gr";

// styles:
import Styles from './_styles/sideNavbar.module.scss'

const SideNavbar = () => {

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor:any, open:any) => (event:any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const list = (anchor:any) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List className={`${Styles.list}`}>
                {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))} */}

                <ListItem disablePadding>
                    <ListItemButton >
                        &emsp;&emsp;
                        <ListItemText className={`${Styles.chatter}`} primary={"CHATTER"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton >
                        &emsp;&emsp;
                        <ListItemText primary={"Overview"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                    &emsp;&emsp;&emsp;
                        <CgFeed></CgFeed>
                        &nbsp;&nbsp;
                        <ListItemText primary={"Feed"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
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
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                    &emsp;&emsp;&emsp;
                        <MdInsertChartOutlined></MdInsertChartOutlined>
                        &nbsp;&nbsp;

                        <ListItemText primary={"Analytics"} />
                    </ListItemButton>
                </ListItem>
            
            <Divider />
            <ListItem disablePadding>
                    <ListItemButton>
                    &emsp;&emsp;
                        <ListItemText className={`${Styles.trendingItem}`} primary={"Trending Tags"} />
                        &nbsp;&nbsp;
                        <GrLineChart></GrLineChart>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                    &emsp;&emsp; &emsp;
                        <ListItemText primary={"Programming"} />
                    </ListItemButton>
                </ListItem>
            <Divider />
            <ListItem disablePadding>
                    <ListItemButton>
                    &emsp;
                        <ListItemText className={`${Styles.personalItem}`} primary={"Personal"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                    &emsp;&emsp;&emsp;
                            <IoPersonOutline></IoPersonOutline>
                        &nbsp;&nbsp;
                        <ListItemText primary={"Account"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                    &emsp;&emsp;&emsp;
                        <IoIosNotificationsOutline></IoIosNotificationsOutline>
                        &nbsp;&nbsp;
                        <ListItemText primary={"Notifications"} />
                    </ListItemButton>
                </ListItem>
            <Divider />
            
                <ListItem disablePadding>
                    <ListItemButton>
                    &emsp;&emsp;
                        <ListItemText className={`${Styles.logoutbutton}`} primary={"Logout"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div className={`${Styles.navbar}`}>
            {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))} */}


            <MenuIcon
                onClick={
                    toggleDrawer("left", true)
                }
            />

            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>

        </div>
    )
}

export default SideNavbar