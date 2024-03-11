import React, { useState } from 'react';
import { Navbar, Nav, Container, Collapse } from 'react-bootstrap';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const SideNavbar = ()=>{
    return (
        
    <Sidebar>
    <Menu>
        <SubMenu label="Charts">
        <MenuItem> Pie charts </MenuItem>
        <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
    </Menu>
    </Sidebar>
    )
}

export default SideNavbar;