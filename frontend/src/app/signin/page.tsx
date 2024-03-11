"use client"

import { Row, Col } from "react-bootstrap";
import SignupComponent from "./_signupComponent";
import MainComponent from "./_mainTabComponent";

const SigninPage = ()=>{

    return (
        <Row>
            <Col lg="6" md="6" sm="12">
                image div
            </Col>

            <Col lg="6" md="6" sm="12">
                <MainComponent></MainComponent>
            </Col>
            
        </Row>
    )
}

export default SigninPage;