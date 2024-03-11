import React, { useState } from 'react';
import { Navbar, Nav, Container, Collapse } from 'react-bootstrap';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const SideNavbar = ()=>{
   
        
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
              </Menu>
            </Sidebar>
            
               
              
          </div>
        )
}

export default SideNavbar;