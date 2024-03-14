import React, { useState } from 'react';
import { Navbar, Nav, Container, Collapse, Button } from 'react-bootstrap';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Styles from './_styles/sideNavbar.module.scss'
import { DeleteLocalStorage } from './localStorage';
import { useRouter } from 'next/navigation'; // Import from next/navigation

const SideNavbar = ()=>{
	const router = useRouter()


	const logout  = () =>{
		DeleteLocalStorage();
		router.push('/signin');
	}
	const [toggled, setToggled] = React.useState(false);

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
      <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="always">
          <button className="sb-button" onClick={() => setToggled(!toggled)}>
            Toggle
          </button>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>

          <MenuItem> <Button variant='danger' onClick={logout} className={`${Styles.SideNavbar}`}>Logout</Button></MenuItem>
        </Menu>
      </Sidebar>
      
          
        
    </div>
  )
}

export default SideNavbar;