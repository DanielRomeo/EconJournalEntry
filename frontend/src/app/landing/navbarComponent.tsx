import { Navbar, NavDropdown, Container, Nav, NavItem , Button} from "react-bootstrap"
import Link from "next/link";
import Styles from '../_styles/LandingPage/navbarComponent.module.scss'


const LandingNavbar = () =>{

    return (
        <Navbar className={`${Styles.navBar} bg-body-tertiary`} expand="lg">
            <Container className={`${Styles.navbarContainer}`}>
                <Navbar.Brand className={`${Styles.navbarBrand}`}> <Link className={`${Styles.navbarLink}`} href='/'>CHATTER</Link>  </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">About us</Nav.Link>
                    <Nav.Link href="#home">Contact</Nav.Link>
                    <Nav.Link href="#link">Blog</Nav.Link>
                    
                </Nav>

                <Nav className="mr-auto">
                    <NavItem>
                        <Button className={`${Styles.loginButton}`}>Log in</Button>
                    </NavItem> 
                    
                    <NavItem>
                        <Button className={`${Styles.signupButton}`}>Sign up</Button>
                    </NavItem>
                </Nav>

               

                </Navbar.Collapse>

                
            </Container>
        </Navbar>
    )
}

export default LandingNavbar;