"use client ";
import { Container, Col, Row, Tab, Nav, Tabs } from "react-bootstrap";
import Styles from "../_styles/MainTabComponent.module.scss"
import SignupComponent from "./_signupComponent";
import SigninComponent from "./_signinComponent";


const MainComponent = ()=>{
    
    return (
        <div>
            <Container className={`${Styles.container}`}>

                <Tabs
                    defaultActiveKey="register"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                    >
                    <Tab eventKey="register" title="Register">
                        <SignupComponent></SignupComponent>
                    </Tab>
                    <Tab eventKey="login" title="Login">
                        <SigninComponent></SigninComponent>
                    </Tab>
                    
                </Tabs>
            </Container>
            
        </div>
    )
}

export default MainComponent;